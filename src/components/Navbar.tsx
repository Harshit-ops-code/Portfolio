import React, { useState } from 'react';
import { Home, Briefcase, Cpu, User, Sparkles, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex items-center justify-center px-2 sm:px-4 pointer-events-none">
      <div className="flex items-center gap-1.5 sm:gap-3 pointer-events-auto max-w-full">
        {/* Main Floating Nav Pill Dock (poulo.site exact aesthetic) */}
        <div className="poulo-dock flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-full border border-white/10 bg-[#0d0e12]/85 backdrop-blur-xl shadow-2xl relative">
          {/* Section: Home */}
          <button
            onClick={() => scrollTo('hero')}
            title="Home"
            className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer relative group ${
              activeSection === 'hero'
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Home size={14} className="sm:w-[15px] sm:h-[15px]" />
            <span className="sr-only">Home</span>
          </button>

          {/* Section: Works */}
          <button
            onClick={() => scrollTo('works')}
            title="Works"
            className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer relative group ${
              activeSection === 'works'
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Briefcase size={14} className="sm:w-[15px] sm:h-[15px]" />
            <span className="sr-only">Works</span>
          </button>

          {/* Section: My Stack */}
          <button
            onClick={() => scrollTo('stack')}
            title="My Stack"
            className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer relative group ${
              activeSection === 'stack'
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Cpu size={14} className="sm:w-[15px] sm:h-[15px]" />
            <span className="sr-only">My Stack</span>
          </button>

          {/* Section: About Me */}
          <button
            onClick={() => scrollTo('about')}
            title="About Me"
            className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer relative group ${
              activeSection === 'about'
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <User size={14} className="sm:w-[15px] sm:h-[15px]" />
            <span className="sr-only">About Me</span>
          </button>

          {/* Sleek Vertical Divider */}
          <span className="w-[1px] h-3.5 sm:h-4 bg-white/20 mx-0.5 sm:mx-1" />

          {/* External Navigation: GitHub */}
          <div className="relative">
            <a
              href="https://github.com/HARSHITKUMAR987"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Harshit's GitHub"
              onMouseEnter={() => setActiveTooltip('github')}
              onMouseLeave={() => setActiveTooltip(null)}
              className="p-2 sm:p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-90 group relative"
            >
              <GithubIcon
                size={15}
                className="transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-3"
              />
            </a>

            {/* Floating Tooltip Card for GitHub */}
            {activeTooltip === 'github' && (
              <div className="hidden sm:flex absolute top-full mt-3 left-1/2 -translate-x-1/2 p-2.5 rounded-2xl bg-[#0b0c10]/95 border border-white/20 shadow-2xl backdrop-blur-xl z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 flex-col gap-0.5 text-left pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-white tracking-tight">GitHub</span>
                  <span className="font-mono text-[10px] text-white/40">/HARSHITKUMAR987</span>
                  <ArrowUpRight size={11} className="text-white/50 ml-auto" />
                </div>
                <span className="font-sans text-[11px] text-white/60 pl-3.5">
                  300+ C++ DSA Solved · LangGraph &amp; GenAI Repos
                </span>
              </div>
            )}
          </div>

          {/* External Navigation: LinkedIn */}
          <div className="relative">
            <a
              href="https://linkedin.com/in/harshit-kumar-942691285"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Harshit on LinkedIn"
              onMouseEnter={() => setActiveTooltip('linkedin')}
              onMouseLeave={() => setActiveTooltip(null)}
              className="p-2 sm:p-2.5 rounded-full text-white/60 hover:text-[#38bdf8] hover:bg-sky-500/15 transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-90 group relative"
            >
              <LinkedinIcon
                size={15}
                className="transition-transform duration-300 group-hover:scale-115 group-hover:rotate-3"
              />
            </a>

            {/* Floating Tooltip Card for LinkedIn */}
            {activeTooltip === 'linkedin' && (
              <div className="hidden sm:flex absolute top-full mt-3 left-1/2 -translate-x-1/2 p-2.5 rounded-2xl bg-[#0b0c10]/95 border border-sky-500/30 shadow-2xl backdrop-blur-xl z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 flex-col gap-0.5 text-left pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
                  <span className="font-mono text-xs font-semibold text-sky-400 tracking-tight">LinkedIn</span>
                  <span className="font-mono text-[10px] text-white/40">/in/harshit-kumar</span>
                  <ArrowUpRight size={11} className="text-sky-400 ml-auto" />
                </div>
                <span className="font-sans text-[11px] text-white/60 pl-3.5">
                  IIIT Kota CSE · Connect &amp; Professional Network
                </span>
              </div>
            )}
          </div>
        </div>

        {/* High-Contrast White CTA Pill */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('contact');
          }}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-white/90 text-[#000000] font-sans font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-white/10 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Sparkles size={13} className="text-black sm:w-3.5 sm:h-3.5" />
          <span className="hidden min-[380px]:inline">Get in Touch</span>
          <span className="min-[380px]:hidden">Touch</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
