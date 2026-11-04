import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 overflow-hidden"
    >
      {/* 1. Fluid WebGL Animated Gradient Background - Tailored exclusively for Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatedGradient
          config={{ preset: "Oceanic", speed: 6 }}
          noise={{ opacity: 0.1 }}
          className="absolute inset-0 opacity-40"
        />
        {/* Soft edge and text vignetting for 100% typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/80" />
      </div>

      {/* Dynamic Cursor Spotlight from ibelick/spotlight */}
      <Spotlight
        className="-top-40 right-10 md:right-32 md:-top-20 pointer-events-none z-10"
        size={460}
      />

      {/* Main 2-Column Responsive Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-20">
        {/* ============================================================ */}
        {/* LEFT COLUMN: Clean, High-Impact Name & Basic Info Only       */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Academic Credential */}
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-medium block">
            IIIT Kota · B.Tech CSE (2024–2028)
          </span>

          {/* Name & Main Title Lockup */}
          <div className="space-y-1">
            <h1 className="font-sans font-bold text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
              Harshit Kumar
            </h1>
            <p className="font-sans text-xl sm:text-2xl text-white/80 font-medium tracking-tight">
              AI &amp; Systems Engineer
            </p>
          </div>

          {/* Summary from Resume */}
          <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed">
            Third-year CSE student at IIIT Kota specializing in scalable GenAI systems, multi-agent AI orchestration, and high-throughput backend APIs.
          </p>

          {/* Core Tech Stack */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {['C++', 'Python', 'FastAPI', 'LangGraph', 'Groq', 'Next.js', 'MongoDB'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70 font-mono text-xs hover:border-white/20 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs">
              LeetCode 300+
            </span>
          </div>

          {/* Action Dock */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollTo('works')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs sm:text-sm font-sans font-semibold transition-all hover:bg-white/90 shadow-xl active:scale-95 cursor-pointer"
            >
              <span>See my work</span>
              <ArrowUpRight size={15} />
            </button>

            <button
              onClick={() => scrollTo('about')}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs sm:text-sm font-sans font-medium transition-all border border-white/10 cursor-pointer shadow-sm active:scale-95"
            >
              <span>About me</span>
            </button>

            {/* GitHub Quick-Nav Pill */}
            <a
              href="https://github.com/HARSHITKUMAR987"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="group flex items-center gap-2 px-4 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-white/80 hover:text-white text-xs sm:text-sm font-mono transition-all border border-white/10 hover:border-white/30 cursor-pointer shadow-sm active:scale-95"
            >
              <GithubIcon size={15} className="transition-transform duration-200 group-hover:scale-115" />
              <span>GitHub</span>
              <ArrowUpRight size={13} className="text-white/40 group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn Quick-Nav Pill */}
            <a
              href="https://linkedin.com/in/harshit-kumar-942691285"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group flex items-center gap-2 px-4 py-3 rounded-full bg-white/[0.04] hover:bg-sky-500/15 text-white/80 hover:text-[#38bdf8] text-xs sm:text-sm font-mono transition-all border border-white/10 hover:border-sky-500/30 cursor-pointer shadow-sm active:scale-95"
            >
              <LinkedinIcon size={15} className="transition-transform duration-200 group-hover:scale-115" />
              <span>LinkedIn</span>
              <ArrowUpRight size={13} className="text-white/40 group-hover:text-sky-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Full-Height Interactive 3D Robot Spline Canvas */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[520px] lg:h-[660px] flex items-center justify-center touch-pan-y" style={{ touchAction: 'pan-y' }}>
          {/* Subtle Ambient Radial Floor Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* Full Spline Interactive 3D Canvas */}
          <div className="w-full h-full relative z-10 touch-pan-y" style={{ touchAction: 'pan-y' }}>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />

            {/* Bottom floating instruction tag */}
            <div className="absolute bottom-4 right-4 sm:right-8 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/50 text-[11px] font-mono pointer-events-none flex items-center gap-2 shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              <span>Cursor-responsive 3D · Drag to rotate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
