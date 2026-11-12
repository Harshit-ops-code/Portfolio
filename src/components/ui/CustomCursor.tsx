import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsapSetup';

type CursorMode = 'default' | 'pointer' | 'label' | 'text';

export const CustomCursor: React.FC = () => {
  const [enabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillTextRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const cursorMetaRef = useRef({
    visible: false,
    pressed: false,
    lastStateKey: 'default',
    lastTarget: null as EventTarget | null,
  });

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }

    document.documentElement.classList.add('has-custom-cursor');
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const circle = circleRef.current;
    const pill = pillRef.current;
    const pillText = pillTextRef.current;
    const pulse = pulseRef.current;

    if (!root || !dot || !ring || !circle || !pill || !pillText || !pulse) return;

    gsap.set([dot, ring, pulse], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
    });
    gsap.set(root, { autoAlpha: 0 });
    gsap.set(pill, { scale: 0.5, autoAlpha: 0 });
    gsap.set(pulse, { scale: 0.4, autoAlpha: 0 });

    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.055, ease: 'power3.out' });
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.055, ease: 'power3.out' });

    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3.out' });
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3.out' });

    const movePulseX = gsap.quickTo(pulse, 'x', { duration: 0.12, ease: 'power2.out' });
    const movePulseY = gsap.quickTo(pulse, 'y', { duration: 0.12, ease: 'power2.out' });

    const meta = cursorMetaRef.current;

    const applyMode = (mode: CursorMode, label = '') => {
      const stateKey = `${mode}:${label}`;
      if (stateKey === meta.lastStateKey) return;
      meta.lastStateKey = stateKey;

      if (mode === 'label' && label) {
        pillText.textContent = label;
        gsap.to(dot, {
          scale: 0,
          autoAlpha: 0,
          duration: 0.18,
          ease: 'power2.out',
        });
        gsap.to(circle, {
          scale: 0.55,
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power2.out',
        });
        gsap.to(pill, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.26,
          ease: 'back.out(1.7)',
        });
        return;
      }

      gsap.to(pill, {
        scale: 0.5,
        autoAlpha: 0,
        duration: 0.16,
        ease: 'power2.in',
      });

      if (mode === 'pointer') {
        gsap.to(dot, {
          scale: meta.pressed ? 0.5 : 0.7,
          autoAlpha: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
        gsap.to(circle, {
          scale: 1.5,
          autoAlpha: 1,
          borderColor: 'rgba(255, 255, 255, 0.85)',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          duration: 0.26,
          ease: 'power3.out',
        });
      } else if (mode === 'text') {
        gsap.to(dot, {
          scale: 0.85,
          autoAlpha: 0.9,
          duration: 0.2,
          ease: 'power2.out',
        });
        gsap.to(circle, {
          scale: 0.72,
          autoAlpha: 0.55,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          duration: 0.24,
          ease: 'power3.out',
        });
      } else {
        gsap.to(dot, {
          scale: meta.pressed ? 0.65 : 1,
          autoAlpha: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
        gsap.to(circle, {
          scale: 1,
          autoAlpha: 1,
          borderColor: 'rgba(255, 255, 255, 0.42)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          duration: 0.28,
          ease: 'power3.out',
        });
      }
    };

    const resolveTargetContext = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        applyMode('default');
        return;
      }

      const interactive = target.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor="pointer"], summary, label, select'
      );
      const labelHost = target.closest<HTMLElement>('[data-cursor-text]');

      if (labelHost) {
        // Yield to nested links/buttons that don't define their own cursor label
        const innerControlOverrides =
          interactive && interactive !== labelHost && labelHost.contains(interactive);

        if (!innerControlOverrides) {
          const text = labelHost.dataset.cursorText?.trim();
          if (text) {
            applyMode('label', text);
            return;
          }
        }
      }

      if (interactive) {
        applyMode('pointer');
        return;
      }

      if (target.closest('input, textarea, [data-cursor="text"]')) {
        applyMode('text');
        return;
      }

      applyMode('default');
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        document.documentElement.classList.remove('has-custom-cursor');
        if (meta.visible) {
          meta.visible = false;
          gsap.to(root, { autoAlpha: 0, duration: 0.12 });
        }
        return;
      }

      if (!meta.visible) {
        meta.visible = true;
        meta.lastTarget = null;
        document.documentElement.classList.add('has-custom-cursor');
        gsap.set([dot, ring, pulse], { x: e.clientX, y: e.clientY });
        gsap.to(root, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' });
      }

      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
      movePulseX(e.clientX);
      movePulseY(e.clientY);

      if (e.target !== meta.lastTarget) {
        meta.lastTarget = e.target;
        resolveTargetContext(e.target);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      meta.pressed = true;

      gsap.to(ring, { scale: 0.82, duration: 0.14, ease: 'power2.out' });
      if (!meta.lastStateKey.startsWith('label:')) {
        gsap.to(dot, { scale: 0.6, duration: 0.14, ease: 'power2.out' });
      }

      gsap.fromTo(
        pulse,
        { scale: 0.35, autoAlpha: 0.65 },
        { scale: 1.85, autoAlpha: 0, duration: 0.45, ease: 'power2.out', overwrite: true }
      );
    };

    const onPointerUp = () => {
      meta.pressed = false;
      gsap.to(ring, { scale: 1, duration: 0.28, ease: 'elastic.out(1, 0.55)' });
      if (!meta.lastStateKey.startsWith('label:')) {
        gsap.to(dot, {
          scale: meta.lastStateKey === 'pointer:' ? 0.7 : 1,
          duration: 0.22,
          ease: 'power2.out',
        });
      }
    };

    const onMouseLeaveWindow = () => {
      meta.visible = false;
      gsap.to(root, { autoAlpha: 0, duration: 0.18, ease: 'power2.out' });
    };

    const onMouseEnterWindow = () => {
      if (document.documentElement.classList.contains('has-custom-cursor')) {
        gsap.to(root, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' });
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none"
      style={{ opacity: 0 }}
    >
      {/* Click Ripple Ring */}
      <div
        ref={pulseRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/60 pointer-events-none"
      />

      {/* Trailing Orbital Ring + Morphing Pill Label */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center will-change-transform"
      >
        <div
          ref={circleRef}
          className="w-9 h-9 rounded-full border border-white/40 bg-white/[0.02] transition-none will-change-transform"
        />

        <div
          ref={pillRef}
          className="absolute inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#fafafa] text-[#050507] border border-white shadow-[0_10px_28px_rgba(0,0,0,0.65)] font-mono text-[10px] font-bold tracking-[0.14em] uppercase whitespace-nowrap will-change-transform"
        >
          <span ref={pillTextRef} />
        </div>
      </div>

      {/* Zero-Lag Inner Core Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none will-change-transform"
      />
    </div>
  );
};

export default CustomCursor;
