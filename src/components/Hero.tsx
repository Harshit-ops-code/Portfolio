import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import { SplineScene } from '@/components/ui/splite';
import { GithubIcon, LinkedinIcon } from './Icons';
import { gsap, smoothScrollTo } from '@/lib/gsapSetup';

const HERO_GRADIENT_CONFIG = {
  preset: 'custom' as const,
  color1: '#020308',
  color2: '#0f1742',
  color3: '#0ea5e9',
  rotation: -22,
  proportion: 62,
  scale: 0.55,
  speed: 7,
  distortion: 34,
  swirl: 72,
  swirlIterations: 8,
  softness: 92,
  offset: 120,
  shape: 'Edge' as const,
  shapeSize: 45,
};

const HERO_NOISE_CONFIG = { opacity: 0.08 };
const HERO_NAME_CHARS = ['H', 'A', 'R', 'S', 'H', 'I', 'T'] as const;

interface HeroProps {
  revealReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ revealReady = true }) => {
  const heroRef = useRef<HTMLElement>(null);
  const auraParallaxRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    smoothScrollTo(id);
  };

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Deep multi-plane scroll parallax: Background -> Giant Name -> 3D Robot
        gsap.to('[data-hero-bg]', {
          yPercent: 18,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });

        gsap.to('[data-hero-name]', {
          y: -60,
          scale: 1.08,
          opacity: 0.16,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });

        gsap.to('[data-hero-spline]', {
          y: 55,
          scale: 0.92,
          opacity: 0.28,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: '8% top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });

        gsap.to('[data-hero-bottom]', {
          y: -26,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: '4% top',
            end: '34% top',
            scrub: 0.6,
          },
        });

        // Subtle continuous ambient orbit rotation on background HUD rings
        gsap.to('[data-hero-ring-cw]', {
          rotation: 360,
          duration: 72,
          ease: 'none',
          repeat: -1,
        });
        gsap.to('[data-hero-ring-ccw]', {
          rotation: -360,
          duration: 54,
          ease: 'none',
          repeat: -1,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Subtle pointer depth response on background atmospheric halo (desktop only)
  useEffect(() => {
    const aura = auraParallaxRef.current;
    const root = heroRef.current;
    if (!aura || !root) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const moveX = gsap.quickTo(aura, 'x', { duration: 0.9, ease: 'power3.out' });
    const moveY = gsap.quickTo(aura, 'y', { duration: 0.9, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      moveX(nx * 44);
      moveY(ny * 32);
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    return () => root.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[660px] max-h-[1080px] flex flex-col justify-between overflow-hidden bg-[#020307] z-10 select-none"
    >
      {/* =====================================================================
          LAYER 0: Atmospheric Fluid Shader + Architectural HUD Grid + Orbital Rings
         ===================================================================== */}
      <div
        data-hero-bg
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 will-change-transform"
      >
        {/* Custom Cobalt/Sapphire/Cyan Swirl WebGL Shader */}
        <AnimatedGradient
          config={HERO_GRADIENT_CONFIG}
          noise={HERO_NOISE_CONFIG}
          className="absolute inset-0 opacity-75"
        />

        {/* Deep Indigo + Ice-Blue Studio Backlight Halo Behind Center Robot (Pure Radial, Zero GPU Blur) */}
        <div
          ref={auraParallaxRef}
          className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[min(92vw,920px)] h-[min(78vh,680px)] rounded-full pointer-events-none will-change-transform"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(186, 230, 253, 0.22) 0%, rgba(99, 102, 241, 0.18) 28%, rgba(14, 165, 233, 0.08) 52%, transparent 72%)',
          }}
        />

        {/* Crisp Perspective Matrix Grid (faded softly into obsidian edges) */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(215, 226, 234, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(215, 226, 234, 0.12) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 68% 60% at 50% 46%, black 12%, transparent 76%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 68% 60% at 50% 46%, black 12%, transparent 76%)',
          }}
        />

        {/* Subtle Precision Orbital Telemetry Rings Behind Robot */}
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            data-hero-ring-cw
            className="w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] lg:w-[660px] lg:h-[660px] rounded-full border border-dashed border-sky-300/[0.13] flex items-center justify-center will-change-transform"
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          </div>
          <div
            data-hero-ring-ccw
            className="absolute inset-10 sm:inset-14 rounded-full border border-white/[0.08] will-change-transform"
          >
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400/70" />
          </div>
        </div>

        {/* Edge Vignettes & Bottom Blending Fade into Next Section */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_28%,rgba(0,0,0,0.78)_88%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#000000] via-[#000000]/75 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#000000]/80 to-transparent" />
      </div>

      {/* Interactive Cursor Spotlight */}
      <Spotlight
        className="-top-32 left-1/2 -translate-x-1/2 pointer-events-none z-[5]"
        size={640}
      />

      {/* =====================================================================
          LAYER 1 (z-10): HANDWRITTEN "Hi, I'm" + SEQUENTIAL "HARSHIT" BEHIND ROBOT
         ===================================================================== */}
      <div
        data-hero-name
        className="absolute inset-x-0 top-[37%] sm:top-[38%] -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center justify-center px-2 sm:px-6 will-change-transform"
      >
        <div className="w-full max-w-[1520px] flex flex-col items-center">
          {/* Handwritten "Hi, I'm" tucked clearly to upper-left of the robot head */}
          <div className="w-full max-w-[1320px] flex justify-start pl-[6vw] sm:pl-[9vw] xl:pl-[130px] -mb-2 sm:-mb-5 md:-mb-7">
            <div className="relative inline-block -rotate-2">
              <motion.span
                initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.4 }}
                animate={
                  revealReady
                    ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                    : { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }
                }
                transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-handwriting font-bold tracking-[0.02em] block leading-none text-transparent bg-clip-text pr-2"
                style={{
                  fontSize: 'clamp(2.25rem, 5.4vw, 76px)',
                  backgroundImage:
                    'linear-gradient(110deg, #F0F9FF 0%, #BAE6FD 52%, #38BDF8 100%)',
                }}
              >
                Hi, I&apos;m
              </motion.span>

              {/* Glowing Stylus Ink Tip Sweeping Across "Hi, I'm" */}
              <motion.span
                aria-hidden="true"
                initial={{ left: '0%', opacity: 0, scale: 0.6 }}
                animate={
                  revealReady
                    ? {
                        left: ['0%', '96%'],
                        opacity: [0, 1, 1, 0],
                        scale: [0.6, 1.1, 1, 0.4],
                      }
                    : { left: '0%', opacity: 0 }
                }
                transition={{
                  duration: 0.72,
                  delay: 0.08,
                  times: [0, 0.12, 0.84, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute top-[42%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-200 shadow-[0_0_16px_4px_rgba(56,189,248,0.85)] pointer-events-none"
              />

              {/* Self-Drawing Signature Swash Underline */}
              <svg
                viewBox="0 0 220 24"
                fill="none"
                aria-hidden="true"
                className="w-[105%] h-3.5 sm:h-5 -mt-0.5 sm:-mt-1 overflow-visible"
              >
                <defs>
                  <linearGradient id="hero-swash-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
                    <stop offset="65%" stopColor="#BAE6FD" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 4 14 Q 88 2 212 11"
                  stroke="url(#hero-swash-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    revealReady
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.55, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </div>
          </div>

          {/* Monumental "HARSHIT" Written Character-by-Character Behind Robot */}
          <h1
            aria-label="Hi, I'm Harshit"
            className="font-kanit font-black uppercase whitespace-nowrap leading-[0.84] tracking-[-0.03em] flex items-center justify-center"
            style={{ fontSize: 'clamp(4.2rem, 18.2vw, 256px)' }}
          >
            {HERO_NAME_CHARS.map((char, idx) => (
              <motion.span
                key={`${char}-${idx}`}
                aria-hidden="true"
                initial={{
                  clipPath: 'inset(0% 100% 0% 0%)',
                  y: 14,
                  rotate: -2.5,
                  opacity: 0.15,
                }}
                animate={
                  revealReady
                    ? {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        y: 0,
                        rotate: 0,
                        opacity: 1,
                      }
                    : {
                        clipPath: 'inset(0% 100% 0% 0%)',
                        y: 14,
                        rotate: -2.5,
                        opacity: 0.15,
                      }
                }
                transition={{
                  duration: 0.42,
                  delay: 0.62 + idx * 0.085,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block text-transparent bg-clip-text will-change-transform"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, #FFFFFF 0%, #E2ECF4 50%, #86A6C4 100%)',
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>
      </div>

      {/* =====================================================================
          LAYER 2 (z-20): CENTERED 3D INTERACTIVE SPLINE ROBOT
         ===================================================================== */}
      <div
        data-hero-spline
        className="absolute inset-x-0 bottom-0 top-[76px] sm:top-[68px] z-20 flex items-end justify-center pointer-events-none touch-pan-y will-change-transform"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Rim Contrast Glow Directly Behind Robot's Black Torso */}
        <div
          className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[460px] h-[360px] sm:h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(215, 226, 234, 0.16) 0%, rgba(56, 189, 248, 0.11) 42%, transparent 72%)',
          }}
        />

        <div
          data-cursor-text="DRAG 3D"
          className="w-full max-w-[780px] h-full relative z-10 pointer-events-auto touch-pan-y"
          style={{ touchAction: 'pan-y' }}
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Top Spacer for Fixed Floating Navbar */}
      <div className="h-20 shrink-0 pointer-events-none" />

      {/* =====================================================================
          LAYER 3 (z-30): CLEAN PERIMETER BOTTOM BAR (Never Blocks Robot/Name)
         ===================================================================== */}
      <div
        data-hero-bottom
        className="relative z-30 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-5 sm:pb-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pointer-events-none"
      >
        {/* Bottom-Left: Clean Identity Stamp */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 pointer-events-auto"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#D7E2EA]/60">
            B.Tech CSE &apos;28 — IIIT Kota
          </span>
          <p className="font-sans text-xs sm:text-sm font-medium text-white/90 max-w-[300px] leading-snug">
            Software Engineer — Backend, C++ &amp; Applied AI
          </p>
        </motion.div>

        {/* Bottom-Center: Interactive Scroll Prompt */}
        <button
          type="button"
          onClick={() => scrollTo('works')}
          aria-label="Scroll to featured projects"
          className="hidden lg:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06080f]/85 hover:bg-white/15 border border-white/12 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors cursor-pointer pointer-events-auto"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={12} />
          </motion.span>
        </button>

        {/* Bottom-Right: Compact Action Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
          className="flex items-center gap-2.5 pointer-events-auto"
        >
          <a
            href="https://github.com/Harshit-ops-code"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            data-cursor-text="GITHUB"
            className="w-10 h-10 rounded-full bg-[#06080f]/85 hover:bg-white/15 border border-white/15 hover:border-white/35 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href="https://www.linkedin.com/in/harshit-kumar-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            data-cursor-text="LINKEDIN"
            className="w-10 h-10 rounded-full bg-[#06080f]/85 hover:bg-sky-500/20 border border-white/15 hover:border-sky-400/40 flex items-center justify-center text-white/80 hover:text-sky-300 transition-all active:scale-95"
          >
            <LinkedinIcon size={16} />
          </a>

          <button
            type="button"
            onClick={() => scrollTo('works')}
            data-cursor-text="EXPLORE ↓"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#D7E2EA] text-black text-xs sm:text-sm font-sans font-semibold transition-all shadow-[0_10px_30px_rgba(255,255,255,0.18)] active:scale-95 cursor-pointer"
          >
            <span>Explore Works</span>
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
