import React, { useState } from 'react';
import { Copy, Check, Phone } from 'lucide-react';
import HalftoneWordmarkFooter, { type FooterColumn } from '@/components/ui/halftone-wordmark-footer';
import { AnimatedGradient } from '@/components/ui/animated-gradient';

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Works",
    links: [
      { label: "Lexis AI", href: "https://lex-is-ai.vercel.app/app/" },
      { label: "TruthShield", href: "https://truthshield-nu.vercel.app/" },
      { label: "Basera & Homie", href: "https://homie-two-pi.vercel.app/" },
    ],
  },
  {
    title: "Menu",
    links: [
      { label: "Home", href: "#hero" },
      { label: "Works", href: "#works" },
      { label: "My Stack", href: "#stack" },
      { label: "About", href: "#about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/HARSHITKUMAR987" },
      { label: "LinkedIn", href: "https://linkedin.com/in/harshit-kumar-942691285" },
      { label: "LeetCode (300+)", href: "https://leetcode.com/u/Harshitkumar_987/" },
      { label: "Email Me", href: "mailto:harshitkk5830@gmail.com" },
    ],
  },
];

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const email = 'harshitkk5830@gmail.com';
  const phone = '+91 7417958374';

  const copyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative pt-24 pb-0 max-w-7xl mx-auto z-10 overflow-hidden border-t border-white/[0.06]">
      {/* 1. Grand Call-to-Action Card */}
      <div className="px-4 sm:px-6 lg:px-12 mb-16">
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden p-8 sm:p-14 border border-white/10 shadow-2xl bg-[#090a0f]">
          {/* Fluid WebGL Animated Gradient Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <AnimatedGradient
              config={{ preset: "Aurora", speed: 8 }}
              noise={{ opacity: 0.12 }}
              className="absolute inset-0 opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 pointer-events-none" />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-medium block">
                Get In Touch
              </span>
              <h2 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Let&apos;s build resilient systems together.
              </h2>
              <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
                Open for software engineering opportunities, AI research collaborations, and systems architecture ventures.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-sans text-xs sm:text-sm font-semibold hover:bg-white/90 transition-all shadow-xl active:scale-95 cursor-pointer w-full sm:w-auto md:w-full"
              >
                {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                <span>{copied ? 'Email Copied!' : email}</span>
              </button>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.1] hover:bg-white/[0.18] text-white font-sans text-xs sm:text-sm font-medium transition-all border border-white/20 cursor-pointer backdrop-blur-sm w-full sm:w-auto md:w-full"
              >
                <Phone size={15} />
                <span>{phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Halftone Wordmark Footer with Spring-Displaced Interactive Dots */}
      <div className="w-full relative">
        <HalftoneWordmarkFooter
          wordmark="harshit"
          label="Harshit Kumar"
          meta="©2026 · IIIT Kota CSE · All Systems Live"
          columns={FOOTER_COLUMNS}
          backToTop={true}
          preset="night"
          palette={{
            background: "#000000",
            ink: "#f1f5f9",
            warm: "#38bdf8",
          }}
          height="520px"
          dotGap={6}
          radius={85}
          crop={0.22}
          grain={0.35}
          interactive={true}
        />
      </div>
    </footer>
  );
};

export default Footer;
