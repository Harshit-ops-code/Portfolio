import React, { useEffect, useRef } from 'react';
import asciiData from '../../data/asciiHandsData.json';

interface PointData {
  nx: number;
  ny: number;
  density: number;
  tier: number; // 0: low, 1: mid, 2: bright
  ch: string;
  curX: number;
  curY: number;
  activeChar: string;
  scrambleTimer: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  char: string;
  size: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
}

const MATRIX_GLYPHS = ['0', '1', 'X', 'Y', 'Z', '✦', '✧', '⚡', '*', '+', '§', 'Δ', 'Ω'];
const SPARK_CHARS = ['✦', '✧', '⚡', '•', '+', '*', '·'];
const SPARK_COLORS = ['#38bdf8', '#67e8f9', '#a5f3fc', '#ffffff', '#fbbf24', '#34d399'];

export const AsciiHands: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let isHovering = false;

    // Load points with pre-assigned tiers for batch styling
    const points: PointData[] = (asciiData as [number, number, number, string][]).map(
      ([nx, ny, density, ch]) => {
        let tier = 0;
        if (density > 0.65) tier = 2;
        else if (density > 0.35) tier = 1;

        return {
          nx,
          ny,
          density,
          tier,
          ch,
          curX: 0,
          curY: 0,
          activeChar: ch,
          scrambleTimer: 0,
        };
      }
    );

    const sparks: SparkParticle[] = [];
    const shockwaves: Shockwave[] = [];

    // Cached font strings to avoid runtime string allocations in render loop
    let normalFont = '400 12px "JetBrains Mono", monospace';
    let boldFont = '600 14px "JetBrains Mono", monospace';

    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(Math.min(680, Math.max(380, width * 0.52)));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const baseFontSize = Math.max(9, Math.min(13.5, width / 95));
      normalFont = `400 ${baseFontSize}px "JetBrains Mono", monospace`;
      boldFont = `600 ${baseFontSize + 2}px "JetBrains Mono", monospace`;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.curX = p.nx * width;
        p.curY = p.ny * height;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pause rendering when scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Mouse & Touch handling
    const updateMouse = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = clientX - rect.left;
      mouseY = clientY - rect.top;
      isHovering = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      isHovering = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const triggerShockwave = (cx: number, cy: number) => {
      shockwaves.push({
        x: cx,
        y: cy,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.65,
        speed: 16,
        strength: 1.0,
      });

      // Emit sparks at click location
      for (let i = 0; i < 14; i++) {
        const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 3.5 + 1.5;
        sparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          char: SPARK_CHARS[i % SPARK_CHARS.length],
          size: Math.random() * 4 + 9,
          color: SPARK_COLORS[i % SPARK_COLORS.length],
        });
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      triggerShockwave(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const cx = e.touches[0].clientX - rect.left;
        const cy = e.touches[0].clientY - rect.top;
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
        triggerShockwave(cx, cy);
      }
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('click', onClick);
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchstart', onTouchStart, { passive: true });

    let time = 0;
    const maxDist = 110;
    const maxDistSq = maxDist * maxDist;

    // Pre-allocated arrays for batched points per frame
    const tier0Indices: number[] = [];
    const tier1Indices: number[] = [];
    const tier2Indices: number[] = [];
    const activeIndices: number[] = [];

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.024;

      ctx.clearRect(0, 0, width, height);

      // Fingertip coordinates
      const fingerLeftX = width * 0.504;
      const fingerLeftY = height * 0.582;
      const fingerRightX = width * 0.523;
      const fingerRightY = height * 0.555;
      const gapCenterX = (fingerLeftX + fingerRightX) * 0.5;
      const gapCenterY = (fingerLeftY + fingerRightY) * 0.5;

      // Mouse distance to gap
      const gapDx = mouseX - gapCenterX;
      const gapDy = mouseY - gapCenterY;
      const isNearGap = gapDx * gapDx + gapDy * gapDy < 19600; // 140^2

      // Continuous Creation Spark Particle Emitter at fingertip gap
      const sparkRate = isNearGap ? 0.6 : 0.25;
      if (Math.random() < sparkRate) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        sparks.push({
          x: gapCenterX + (Math.random() - 0.5) * 20,
          y: gapCenterY + (Math.random() - 0.5) * 14,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          alpha: 1.0,
          char: SPARK_CHARS[Math.floor(Math.random() * SPARK_CHARS.length)],
          size: Math.random() * 5 + 8,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        });
      }

      // Update shockwaves
      const hasShockwaves = shockwaves.length > 0;
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed;
        sw.strength *= 0.95;
        if (sw.radius > sw.maxRadius || sw.strength < 0.02) {
          shockwaves.splice(s, 1);
        }
      }

      // Reset batch buckets
      tier0Indices.length = 0;
      tier1Indices.length = 0;
      tier2Indices.length = 0;
      activeIndices.length = 0;

      const len = points.length;
      const checkMouse = isHovering && mouseX > 0 && mouseY > 0;

      // 1. Process physics and bucket points
      for (let i = 0; i < len; i++) {
        const p = points[i];
        const targetX = p.nx * width;
        const targetY = p.ny * height + Math.sin(time * 1.6 + p.nx * 7.5) * 2.2;

        let pushX = 0;
        let pushY = 0;
        let isInfluenced = false;

        // Fast squared-distance mouse repulsion check (avoids Math.sqrt for 98% of points!)
        if (checkMouse) {
          const dx = targetX - mouseX;
          const dy = targetY - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 18;
            pushX = (dx / dist) * force;
            pushY = (dy / dist) * force;
            isInfluenced = true;

            // Matrix cipher scramble on hover
            p.scrambleTimer++;
            if (p.scrambleTimer % 4 === 0) {
              p.activeChar = MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
            }
          }
        }

        // Apply shockwaves if active
        if (hasShockwaves) {
          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s];
            const swDx = targetX - sw.x;
            const swDy = targetY - sw.y;
            const sDist = Math.hypot(swDx, swDy);
            const waveDist = Math.abs(sDist - sw.radius);
            if (waveDist < 35 && sDist > 0) {
              const waveForce = (1 - waveDist / 35) * 14 * sw.strength;
              pushX += (swDx / sDist) * waveForce;
              pushY += (swDy / sDist) * waveForce;
              isInfluenced = true;
            }
          }
        }

        // Spring smoothing to target position
        p.curX += (targetX + pushX - p.curX) * 0.22;
        p.curY += (targetY + pushY - p.curY) * 0.22;

        if (isInfluenced) {
          activeIndices.push(i);
        } else {
          p.activeChar = p.ch;
          if (p.tier === 2) tier2Indices.push(i);
          else if (p.tier === 1) tier1Indices.push(i);
          else tier0Indices.push(i);
        }
      }

      // 2. High-Performance Batched Canvas Rendering
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = normalFont;

      // Batch 1: Slate-Silver Body
      ctx.fillStyle = 'rgba(160, 175, 200, 0.75)';
      for (let j = 0; j < tier0Indices.length; j++) {
        const p = points[tier0Indices[j]];
        ctx.fillText(p.activeChar, p.curX, p.curY);
      }

      // Batch 2: Crisp Silver Midtones
      ctx.fillStyle = 'rgba(226, 232, 240, 0.88)';
      for (let j = 0; j < tier1Indices.length; j++) {
        const p = points[tier1Indices[j]];
        ctx.fillText(p.activeChar, p.curX, p.curY);
      }

      // Batch 3: Solid White Highlights & Fingertips
      ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
      for (let j = 0; j < tier2Indices.length; j++) {
        const p = points[tier2Indices[j]];
        ctx.fillText(p.activeChar, p.curX, p.curY);
      }

      // Batch 4: Active Hover Points (Electric Cyan & Emerald)
      if (activeIndices.length > 0) {
        ctx.font = boldFont;
        for (let j = 0; j < activeIndices.length; j++) {
          const p = points[activeIndices[j]];
          ctx.fillStyle = j % 2 === 0 ? '#38bdf8' : '#34d399';
          ctx.fillText(p.activeChar, p.curX, p.curY);
        }
      }

      // 3. Render creation spark particles
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.018;

        if (sp.alpha <= 0) {
          sparks.splice(s, 1);
          continue;
        }

        ctx.font = `bold ${sp.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = Math.max(0, sp.alpha);
        ctx.fillText(sp.char, sp.x, sp.y);
        ctx.globalAlpha = 1.0;
      }

      // 4. Ambient radial electric glow between fingertips
      const glowRadius = isNearGap ? 110 : 70;
      const gapGlow = ctx.createRadialGradient(gapCenterX, gapCenterY, 0, gapCenterX, gapCenterY, glowRadius);
      gapGlow.addColorStop(0, isNearGap ? 'rgba(56, 189, 248, 0.35)' : 'rgba(56, 189, 248, 0.16)');
      gapGlow.addColorStop(0.6, 'rgba(52, 211, 153, 0.05)');
      gapGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gapGlow;
      ctx.beginPath();
      ctx.arc(gapCenterX, gapCenterY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 5. Electric lightning arc between fingertips
      if (isNearGap || Math.random() < 0.15) {
        ctx.save();
        ctx.strokeStyle = isNearGap ? 'rgba(255, 255, 255, 0.95)' : 'rgba(125, 211, 252, 0.6)';
        ctx.lineWidth = isNearGap ? 2 : 1.2;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(fingerLeftX, fingerLeftY);
        const steps = 5;
        for (let j = 1; j < steps; j++) {
          const t = j / steps;
          const lx = fingerLeftX + (fingerRightX - fingerLeftX) * t;
          const ly = fingerLeftY + (fingerRightY - fingerLeftY) * t;
          const jitterX = (Math.random() - 0.5) * (isNearGap ? 12 : 6);
          const jitterY = (Math.random() - 0.5) * (isNearGap ? 12 : 6);
          ctx.lineTo(lx + jitterX, ly + jitterY);
        }
        ctx.lineTo(fingerRightX, fingerRightY);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('click', onClick);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden flex flex-col items-center justify-center cursor-crosshair select-none ${className}`}
    >
      {/* Top Cybernetic Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-white/50 font-mono text-[11px] sm:text-xs tracking-wider">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 font-medium">NEURAL_SYNTHESIS // 0x484152</span>
          </div>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline text-white/40">CREATION_OF_ADAM.SYS</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-white/40">[HOVER TO DISRUPT · CLICK TO PULSE]</span>
          {/* Dynamic Audio Visualizer Bars (100% GPU CSS Animation, Zero CPU/JS Overhead) */}
          <div className="flex items-end gap-1 h-5">
            <span className="w-1 bg-white/70 rounded-full animate-pulse h-3" />
            <span className="w-1 bg-white/85 rounded-full animate-pulse h-5" style={{ animationDuration: '0.8s' }} />
            <span className="w-1 bg-white/95 rounded-full animate-pulse h-4" style={{ animationDuration: '1.4s' }} />
            <span className="w-1 bg-white/70 rounded-full animate-pulse h-2" style={{ animationDuration: '0.9s' }} />
            <span className="w-1 bg-white/85 rounded-full animate-pulse h-3.5" style={{ animationDuration: '1.1s' }} />
          </div>
        </div>
      </div>

      {/* Main High-Performance Canvas with pan-y touch action for smooth mobile scrolling */}
      <canvas ref={canvasRef} className="block w-full h-auto touch-pan-y" style={{ touchAction: 'pan-y' }} />

      {/* Retro Wireframe Window Badge Overlay (Directly recreating the PROJECT . EXE motif in code) */}
      <div className="absolute top-[32%] sm:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex">
        <div className="border border-white/25 bg-black/70 backdrop-blur-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-sm shadow-xl flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[11px] text-white/90">
          <span className="tracking-widest font-semibold uppercase text-sky-400">PROJECT . EXE</span>
          <div className="flex items-center gap-1 text-white/40">
            <span className="w-2 h-0.5 sm:w-2.5 sm:h-0.5 bg-white/40" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 border border-white/40 inline-block" />
            <span className="text-[9px] sm:text-[10px] leading-none">✕</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Telemetry */}
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between pointer-events-none text-white/40 font-mono text-[9px] sm:text-[11px] tracking-wider sm:tracking-widest">
        <span>LATENCY: &lt;0.08ms · RUNTIME</span>
        <span className="text-sky-400/80">3,621 NODES</span>
      </div>

      {/* Lateral Soft Vignettes (Dissolves edges seamlessly into pure pitch black #000000) */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/60 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default AsciiHands;
