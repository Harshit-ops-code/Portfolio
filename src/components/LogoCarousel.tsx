import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, smoothScrollTo } from '@/lib/gsapSetup';

interface LogoItem {
  id: string;
  name: string;
  category: string;
  svg: React.ReactNode;
}

export const LogoCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopTweenRef = useRef<gsap.core.Tween | null>(null);
  const isHoveredRef = useRef(false);
  const logos: LogoItem[] = [
    {
      id: 'langgraph',
      name: 'LangGraph',
      category: 'Agent Orchestration',
      svg: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 fill-white">
          <circle cx="12" cy="20" r="5" />
          <circle cx="28" cy="12" r="4" />
          <circle cx="28" cy="28" r="4" />
          <path d="M 16 18 L 24 14 M 16 22 L 24 26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'groq',
      name: 'Groq LPU',
      category: '<350ms TTFT',
      svg: (
        <div className="font-sans font-black text-2xl tracking-tighter text-white">
          Q
        </div>
      ),
    },
    {
      id: 'cpp',
      name: 'C++ Systems',
      category: '300+ Solved',
      svg: (
        <div className="font-mono font-bold text-xl tracking-tight text-white">
          C++
        </div>
      ),
    },
    {
      id: 'python',
      name: 'Python / FastAPI',
      category: 'Backend Microservices',
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-white" strokeWidth="1.8">
          <path d="M12 2c5.5 0 7 1.5 7 7v1H9V9c0-2.5 1-4 3-5v-2zm0 20c-5.5 0-7-1.5-7-7v-1h10v1c0 2.5-1 4-3 5v2z" />
          <circle cx="9" cy="6" r="1" fill="white" />
          <circle cx="15" cy="18" r="1" fill="white" />
        </svg>
      ),
    },
    {
      id: 'nextjs',
      name: 'Next.js 16',
      category: 'Production Full-Stack',
      svg: (
        <div className="font-sans font-black text-lg tracking-wider text-white">
          NXT
        </div>
      ),
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'NoSQL Cluster',
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
          <path d="M12 2C12 2 7 8 7 14C7 18 10 21 12 22C14 21 17 18 17 14C17 8 12 2 12 2Z" />
        </svg>
      ),
    },
    {
      id: 'docker',
      name: 'Docker Engine',
      category: 'Containerization',
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-white" strokeWidth="2">
          <rect x="3" y="10" width="3" height="3" rx="0.5" />
          <rect x="7" y="10" width="3" height="3" rx="0.5" />
          <rect x="11" y="10" width="3" height="3" rx="0.5" />
          <rect x="7" y="6" width="3" height="3" rx="0.5" />
          <path d="M2 14c1.5 0 2.5 1 4 1s2.5-1 4-1 2.5 1 4 1 2.5-1 4-1 2.5 1 4 1" />
        </svg>
      ),
    },
    {
      id: 'chromadb',
      name: 'ChromaDB',
      category: 'Vector Embeddings',
      svg: (
        <div className="font-mono font-bold text-base tracking-tight text-white">
          VEC
        </div>
      ),
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.from('[data-logo-header]', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          once: true,
        },
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.to(track, {
          xPercent: -33.333333,
          duration: 24,
          ease: 'none',
          repeat: -1,
        });
        loopTweenRef.current = tween;

        let settleTimer: number | null = null;

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const vel = self.getVelocity();
            const boost = Math.max(-2.8, Math.min(3.8, vel / 450));
            const base = isHoveredRef.current ? 0.25 : 1;
            const targetScale = base + boost;

            gsap.to(tween, {
              timeScale: Math.abs(targetScale) < 0.25 ? base : targetScale,
              duration: 0.2,
              overwrite: 'auto',
            });

            if (settleTimer) window.clearTimeout(settleTimer);
            settleTimer = window.setTimeout(() => {
              gsap.to(tween, {
                timeScale: isHoveredRef.current ? 0.25 : 1,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            }, 140);
          },
        });

        return () => {
          if (settleTimer) window.clearTimeout(settleTimer);
        };
      });
    }, section);

    return () => {
      loopTweenRef.current = null;
      ctx.revert();
    };
  }, []);

  const handleTrackHover = (hovered: boolean) => {
    isHoveredRef.current = hovered;
    if (loopTweenRef.current) {
      gsap.to(loopTweenRef.current, {
        timeScale: hovered ? 0.22 : 1,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 border-t border-b border-white/[0.06]"
    >
      {/* Subtle Stream Header */}
      <div
        data-logo-header
        className="mb-8 text-center sm:text-left flex items-center justify-between"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-white/40">
          Core Technologies &amp; Production Stack
        </p>
        <span className="font-mono text-[11px] text-emerald-400/80 hidden sm:inline-block">
          Velocity-Synced · Live Architecture Reel
        </span>
      </div>

      {/* Seamless Infinite Marquee Stream */}
      <div
        className="relative overflow-hidden py-3"
        onMouseEnter={() => handleTrackHover(true)}
        onMouseLeave={() => handleTrackHover(false)}
      >
        {/* Edge Blur Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />

        {/* Tripled Flex Strip for Seamless -33.333% Wrap */}
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1, 2].map((copyIdx) => (
            <div
              key={copyIdx}
              aria-hidden={copyIdx > 0}
              className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 shrink-0"
            >
              {logos.map((logo) => (
                <button
                  type="button"
                  key={`${copyIdx}-${logo.id}`}
                  onClick={() => smoothScrollTo('stack', 40)}
                  data-cursor-text="STACK ↓"
                  className="group flex-shrink-0 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
                >
                  {/* Circular Disc */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 active:scale-95">
                    {logo.svg}
                  </div>

                  {/* Title & Tag underneath */}
                  <span className="font-sans text-xs font-medium text-white/80 group-hover:text-white mt-2.5 transition-colors">
                    {logo.name}
                  </span>
                  <span className="font-mono text-[10px] text-white/40 group-hover:text-white/60">
                    {logo.category}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;