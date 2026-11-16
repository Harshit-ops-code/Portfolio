"use client";

import React, { useRef, useEffect } from "react";
import { 
  hwfHex, 
  hwfRadius, 
  hwfStep, 
  hwfWarmth, 
  hwfFitSize 
} from "./halftone-wordmark-footer";

export interface InteractiveHalftoneWordmarkProps {
  wordmark?: string;
  palette?: {
    background?: string;
    ink?: string;
    warm?: string;
  };
  dotGap?: number;
  radius?: number;
  crop?: number;
  grain?: number;
  fontFamily?: string;
  fontWeight?: number;
  className?: string;
}

const DEFAULT_FONT = '"Kanit", "Google Sans Flex", "Inter Tight", system-ui, sans-serif';

export const InteractiveHalftoneWordmark: React.FC<InteractiveHalftoneWordmarkProps> = ({
  wordmark = "HARSHIT",
  palette = {
    background: "transparent",
    ink: "#e2e8f0",
    warm: "#38bdf8",
  },
  dotGap = 6,
  radius = 90,
  crop = 0.18,
  grain = 0,
  fontFamily = DEFAULT_FONT,
  fontWeight = 900,
  className = "",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = {
    background: palette.background ?? "transparent",
    ink: palette.ink || "#e2e8f0",
    warm: palette.warm || "#38bdf8",
  };

  const opts = useRef({ colors, dotGap, radius, crop, grain, fontFamily, fontWeight, wordmark });
  opts.current = { colors, dotGap, radius, crop, grain, fontFamily, fontWeight, wordmark };

  const key = [wordmark, dotGap, crop, grain, fontFamily, fontWeight, colors.background, colors.ink, colors.warm].join("|");

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let visible = true;
    let awake = true;
    let ring = { x: 0, y: 0, t: -1 };

    let dots = new Float32Array(0);
    let count = 0;
    const ink = hwfHex(opts.current.colors.ink) || [226, 232, 240];
    const warm = hwfHex(opts.current.colors.warm) || [56, 189, 248];

    const layout = () => {
      const o = opts.current;
      const rect = root.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      // Render offscreen text mask to calculate pixel coverage for halftone
      const mask = document.createElement("canvas");
      mask.width = w;
      mask.height = h;
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;

      m.font = `${o.fontWeight} 100px ${o.fontFamily}`;
      const word = o.wordmark || " ";
      const fit = hwfFitSize(m.measureText(word).width, w * 1.02);
      m.font = `${o.fontWeight} ${fit}px ${o.fontFamily}`;
      const box = m.measureText(word);
      const cap = box.actualBoundingBoxAscent || fit * 0.72;
      const c = Math.max(0, Math.min(0.6, o.crop));
      m.fillStyle = "#000";
      m.textBaseline = "alphabetic";
      m.fillText(word, (w - box.width) / 2, h + cap * c);
      const img = m.getImageData(0, 0, w, h).data;

      const gap = Math.max(3, o.dotGap);
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      const tmp: number[] = [];

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sum = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3));
              const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3));
              sum += img[(y * w + x) * 4 + 3];
            }
          }
          const cov = sum / (9 * 255);
          if (cov < 0.05) continue;
          const hx = gx * gap + gap / 2;
          const hy = gy * gap + gap / 2;
          tmp.push(hx, hy, 0, 0, hx, hy, hwfRadius(cov, gap));
        }
      }

      dots = new Float32Array(tmp);
      count = tmp.length / 7;
      awake = true;
    };

    const draw = (now: number) => {
      const o = opts.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Completely clear to transparent — no hard rectangle edges or clipping lines
      ctx.clearRect(0, 0, w, h);
      if (o.colors.background && o.colors.background !== "transparent") {
        ctx.fillStyle = o.colors.background;
        ctx.fillRect(0, 0, w, h);
      }

      const r = !reduced ? Math.max(0, o.radius) : 0;
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t;
      const ringR = ringAge * 0.95;
      let moving = false;

      for (let i = 0; i < count; i++) {
        const j = i * 7;
        let x = dots[j];
        let y = dots[j + 1];
        let vx = dots[j + 2];
        let vy = dots[j + 3];
        const hx = dots[j + 4];
        const hy = dots[j + 5];

        if (!reduced) {
          // Shockwave ripple wave propagation
          if (ringAge < 950) {
            const dx = hx - ring.x;
            const dy = hy - ring.y;
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 28);
            if (band > 0) {
              const f = band * 3.4 * (1 - ringAge / 950);
              vx += (dx / d) * f;
              vy += (dy / d) * f;
            }
          }

          // Spring physics back to home position
          const s = hwfStep(x, y, vx, vy, hx, hy, px, py, r);
          x = s[0];
          y = s[1];
          vx = s[2];
          vy = s[3];

          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) {
            moving = true;
          } else {
            x = hx;
            y = hy;
            vx = 0;
            vy = 0;
          }

          dots[j] = x;
          dots[j + 1] = y;
          dots[j + 2] = vx;
          dots[j + 3] = vy;
        }

        // Color warmth based on displacement
        const k = hwfWarmth(x, y, hx, hy, 28);
        ctx.fillStyle =
          k > 0.02
            ? "rgb(" +
              Math.round(ink[0] + (warm[0] - ink[0]) * k) + "," +
              Math.round(ink[1] + (warm[1] - ink[1]) * k) + "," +
              Math.round(ink[2] + (warm[2] - ink[2]) * k) + ")"
            : o.colors.ink;

        ctx.beginPath();
        ctx.arc(x, y, dots[j + 6], 0, 6.2832);
        ctx.fill();
      }

      awake = moving || ringAge < 950 || px > -1e4;
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      draw(now);
      if (awake) raf = requestAnimationFrame(loop);
    };

    const wake = () => {
      awake = true;
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const toLocal = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      px = p[0];
      py = p[1];
      wake();
    };

    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      wake();
    };

    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      const p = toLocal(e);
      ring = { x: p[0], y: p[1], t: performance.now() };
      wake();
    };

    layout();
    draw(performance.now());
    wake();

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);

    const ro = new ResizeObserver(() => {
      layout();
      wake();
    });
    ro.observe(root);

    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true;
      if (visible) wake();
    });
    io.observe(root);

    let alive = true;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!alive) return;
        layout();
        wake();
      });
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
    };
  }, [key]);

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer bg-transparent ${className}`}
      data-cursor-text="RIPPLE"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-transparent" />
      <span className="sr-only">{wordmark}</span>
    </div>
  );
};

export default InteractiveHalftoneWordmark;
