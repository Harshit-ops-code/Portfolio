import React, { useRef, useEffect } from 'react';

export const ParticleHands: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const width = canvas.width;
    const height = canvas.height;
    const cy = height / 2;

    // Generate Left Arm & Pointing Hand Particles (Creation of Adam Left)
    for (let x = 40; x < width * 0.46; x += 6) {
      const progress = (x - 40) / (width * 0.46 - 40);
      // Arm thickness tapers to index finger tip
      const thickness = 50 * (1 - progress * 0.7);
      const curveY = cy + Math.sin(progress * Math.PI * 0.8) * 30 + (progress > 0.7 ? -15 * (progress - 0.7) : 0);

      const count = Math.max(3, Math.round(thickness / 6));
      for (let i = 0; i < count; i++) {
        const offsetY = (Math.random() - 0.5) * thickness;
        particles.push({
          x: x + (Math.random() - 0.5) * 4,
          y: curveY + offsetY,
          baseX: x + (Math.random() - 0.5) * 4,
          baseY: curveY + offsetY,
          size: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.6 + 0.3,
        });
      }
    }

    // Generate Right Arm & Reaching Hand Particles (Creation of Adam Right)
    for (let x = width - 40; x > width * 0.54; x -= 6) {
      const progress = (width - 40 - x) / (width - 40 - width * 0.54);
      const thickness = 55 * (1 - progress * 0.7);
      const curveY = cy - Math.sin(progress * Math.PI * 0.8) * 25 + (progress > 0.7 ? 10 * (progress - 0.7) : 0);

      const count = Math.max(3, Math.round(thickness / 6));
      for (let i = 0; i < count; i++) {
        const offsetY = (Math.random() - 0.5) * thickness;
        particles.push({
          x: x + (Math.random() - 0.5) * 4,
          y: curveY + offsetY,
          baseX: x + (Math.random() - 0.5) * 4,
          baseY: curveY + offsetY,
          size: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.6 + 0.3,
        });
      }
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Draw Particles
      particles.forEach((p) => {
        // Subtle breathing float
        p.y = p.baseY + Math.sin(time + p.baseX * 0.02) * 2;
        p.x = p.baseX + Math.cos(time + p.baseY * 0.02) * 1.2;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // The Golden Spark / Contact Point between the two fingertips
      const sparkX = width / 2;
      const sparkY = cy + Math.sin(time) * 3;
      const sparkR = 12 + Math.sin(time * 3) * 4;

      const sparkGrad = ctx.createRadialGradient(sparkX, sparkY, 0, sparkX, sparkY, sparkR);
      sparkGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      sparkGrad.addColorStop(0.3, 'rgba(168, 85, 247, 0.6)');
      sparkGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sparkGrad;
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, sparkR, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto z-10 overflow-hidden text-center select-none">
      {/* Quote Heading (Poulo Video Frame 00:59) */}
      <div className="max-w-2xl mx-auto space-y-3 mb-8">
        <p className="font-serif italic text-xl sm:text-2xl text-white/90 tracking-wide">
          &ldquo;Engineering is not just writing code. Engineering is building systems that never break.&rdquo;
        </p>
        <span className="font-mono text-xs uppercase tracking-widest text-white/40 block">
          Harshit Kumar · Architecture &amp; Precision
        </span>
      </div>

      {/* Particle Canvas (Creation of Adam Hands Touching in Stardust) */}
      <div className="relative w-full max-w-4xl mx-auto aspect-[16/7] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={880}
          height={380}
          className="w-full h-full pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        />
      </div>
    </section>
  );
};

