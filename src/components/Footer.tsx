import React, { useEffect, useRef, useState } from 'react';
import { 
  Copy, 
  Check, 
  Phone, 
  Download, 
  ExternalLink, 
  ArrowUp, 
  Send 
} from 'lucide-react';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import { InteractiveHalftoneWordmark } from '@/components/ui/InteractiveHalftoneWordmark';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import { gsap, smoothScrollTo } from '@/lib/gsapSetup';
import { playChime, playPop, playTick } from '@/utils/sound';

interface FooterProps {
  onShowToast?: (message: string) => void;
}

const FOOTER_GRADIENT_CONFIG = { preset: 'Aurora' as const, speed: 8 };
const FOOTER_NOISE_CONFIG = { opacity: 0.12 };

export const Footer: React.FC<FooterProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [noteSent, setNoteSent] = useState(false);
  const [sparkClicked, setSparkClicked] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const handsSectionRef = useRef<HTMLDivElement>(null);
  const handLeftRef = useRef<HTMLDivElement>(null);
  const handRightRef = useRef<HTMLDivElement>(null);

  const email = 'harshitkk5830@gmail.com';
  const phone = '+91 7417958374';

  const copyEmail = () => {
    navigator.clipboard?.writeText(email);
    playChime();
    setCopied(true);
    onShowToast?.('Email copied to clipboard! 📋');
    setTimeout(() => setCopied(false), 2400);
  };

  const handleQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    playChime();
    setNoteSent(true);
    onShowToast?.(`Thanks for connecting! I'll reply to ${emailInput} within 24h. ✨`);
    setEmailInput('');
    setTimeout(() => setNoteSent(false), 4000);
  };

  const triggerSpark = () => {
    playTick();
    setSparkClicked(true);
    onShowToast?.('⚡ Creation Spark: Engineering with Human Ingenuity & AI');
    setTimeout(() => setSparkClicked(false), 700);
  };

  const scrollToTop = () => {
    playPop();
    smoothScrollTo(0);
  };

  // GSAP ScrollTrigger Motion
  useEffect(() => {
    const footer = footerRef.current;
    const card = cardRef.current;
    const handsSection = handsSectionRef.current;
    const handLeft = handLeftRef.current;
    const handRight = handRightRef.current;

    if (!footer || !card) return;

    const ctx = gsap.context(() => {
      // 1. CTA Card Smooth Entrance
      gsap.from(card, {
        y: 52,
        scale: 0.95,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        },
      });

      // 2. Footer Columns Staggered Reveal
      gsap.from('[data-footer-col]', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-footer-columns]',
          start: 'top 85%',
          once: true,
        },
      });

      // 3. Michelangelo Hands Scroll Parallax: Reach in smoothly as you scroll
      if (handsSection && handLeft && handRight) {
        gsap.fromTo(
          handLeft,
          { xPercent: -15, yPercent: 4, opacity: 0.75 },
          {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: handsSection,
              start: 'top 92%',
              end: 'bottom bottom',
              scrub: 0.65,
            },
          }
        );

        gsap.fromTo(
          handRight,
          { xPercent: 15, yPercent: -4, opacity: 0.75 },
          {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: handsSection,
              start: 'top 92%',
              end: 'bottom bottom',
              scrub: 0.65,
            },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full bg-[#000000] text-white pt-24 sm:pt-32 pb-0 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Subtle Aurora Ambient Radial Glow in Sky/Cyan */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] pointer-events-none rounded-full blur-[170px] opacity-[0.14] bg-[radial-gradient(circle,_#38bdf8_0%,_#6366f1_45%,_transparent_75%)]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* ====================================================================
            1. GRAND CALL-TO-ACTION CARD (Signature WebGL Aurora Background)
            ==================================================================== */}
        <div className="mb-20">
          <div
            ref={cardRef}
            className="relative rounded-3xl sm:rounded-[36px] overflow-hidden p-8 sm:p-14 border border-white/10 shadow-2xl bg-[#090a0f] will-change-transform"
          >
            {/* Fluid WebGL Animated Gradient Background (Preset: Aurora) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <AnimatedGradient
                config={FOOTER_GRADIENT_CONFIG}
                noise={FOOTER_NOISE_CONFIG}
                className="absolute inset-0 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 pointer-events-none" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Heading & Subtext */}
              <div className="md:col-span-8 space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-medium block">
                  Contact
                </span>
                <h2 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                  Let&apos;s build something together.
                </h2>
                <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
                  Open to software engineering internships, backend or AI work, and freelance builds.
                </p>
              </div>

              {/* Right Column: Clean Action Buttons */}
              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
                <button
                  onClick={copyEmail}
                  data-cursor-text={copied ? 'COPIED' : 'COPY'}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-sans text-xs sm:text-sm font-semibold hover:bg-white/90 transition-all shadow-xl active:scale-95 cursor-pointer w-full sm:w-auto md:w-full"
                >
                  {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                  <span>{copied ? 'Email Copied!' : email}</span>
                </button>

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  data-cursor-text="DIAL"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#141722]/90 hover:bg-[#1c2030] text-white font-sans text-xs sm:text-sm font-medium transition-all border border-white/20 cursor-pointer w-full sm:w-auto md:w-full"
                >
                  <Phone size={15} />
                  <span>{phone}</span>
                </a>

                <a
                  href="/Harshit_Kumar_Resume.pdf"
                  download="Harshit_Kumar_Resume.pdf"
                  data-cursor-text="RESUME PDF"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white/90 font-sans text-xs sm:text-sm font-medium transition-all border border-white/15 cursor-pointer w-full sm:w-auto md:w-full"
                >
                  <Download size={15} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. FOUR-PART FOOTER COLUMNS
            ==================================================================== */}
        <div
          data-footer-columns
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pt-8 pb-16 border-b border-white/[0.08] relative z-10"
        >
          {/* Brand & Identity (Col 1) */}
          <div data-footer-col className="lg:col-span-4 space-y-4">
            <a
              href="#hero"
              className="inline-flex items-center gap-2 text-white hover:text-sky-400 transition-colors"
            >
              <span className="font-sans font-bold text-xl tracking-tight text-white">
                Harshit Kumar
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-neutral-400 uppercase">
                IIIT Kota
              </span>
            </a>

            <p className="font-sans text-sm text-neutral-400 max-w-sm leading-relaxed">
              Full-Stack &amp; GenAI Engineer. Crafting scalable distributed backends, multi-agent pipelines, and modern web applications.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/in/harshit-kumar-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onMouseEnter={() => playTick()}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <LinkedinIcon size={16} />
              </a>

              <a
                href="https://github.com/Harshit-ops-code"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onMouseEnter={() => playTick()}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <GithubIcon size={16} />
              </a>

              <a
                href="https://leetcode.com/u/Harshitkumar_987/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                onMouseEnter={() => playTick()}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <LeetCodeIcon size={16} />
              </a>
            </div>
          </div>

          {/* Featured Works Column (Col 2) */}
          <div data-footer-col className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold">
              Works
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400 font-sans">
              <li>
                <a href="https://lex-is-ai.vercel.app/app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <span>Lexis AI Engine</span>
                  <ExternalLink size={12} className="opacity-40" />
                </a>
              </li>
              <li>
                <a href="https://truthshield-nu.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <span>TruthShield</span>
                  <ExternalLink size={12} className="opacity-40" />
                </a>
              </li>
              <li>
                <a href="https://homie-two-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <span>Basera &amp; Homie</span>
                  <ExternalLink size={12} className="opacity-40" />
                </a>
              </li>
              <li>
                <a href="https://parahari.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <span>P.R.A.H.A.R.I.</span>
                  <ExternalLink size={12} className="opacity-40" />
                </a>
              </li>
              <li>
                <a href="https://govolt.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <span>GoVolt</span>
                  <ExternalLink size={12} className="opacity-40" />
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column (Col 3) */}
          <div data-footer-col className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold">
              Menu
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400 font-sans">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#works" className="hover:text-white transition-colors">Works</a></li>
              <li><a href="#stack" className="hover:text-white transition-colors">My Stack</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li>
                <button 
                  type="button" 
                  onClick={scrollToTop} 
                  className="hover:text-sky-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Back to top</span>
                  <ArrowUp size={12} />
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Ping / Quick Note (Col 4) */}
          <div data-footer-col className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold">
              Connect
            </h4>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed">
              Drop your email to get in touch or discuss an engineering opportunity.
            </p>

            <form onSubmit={handleQuickNote} className="space-y-2 pt-1">
              <div className="relative flex items-center bg-white/[0.04] border border-white/12 rounded-full p-1 pl-3.5 backdrop-blur-md focus-within:border-white/30 focus-within:shadow-[0_0_16px_rgba(255,255,255,0.08)] transition-all">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@gmail.com"
                  required
                  className="bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-neutral-500 w-full min-w-0"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  <Send size={13} />
                </button>
              </div>
              <span className="text-[11px] text-neutral-500 block">
                {noteSent ? '✓ Message sent!' : 'harshitkk5830@gmail.com'}
              </span>
            </form>
          </div>
        </div>
      </div>

      {/* ====================================================================
          3. MICHELANGELO MARBLE HANDS & INTERACTIVE HALFTONE "HARSHIT" WORDMARK
          Seamless full-bleed integration with zero cutoff lines or borders
          ==================================================================== */}
      <div
        ref={handsSectionRef}
        className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden flex flex-col items-center justify-start pt-8 sm:pt-12 select-none bg-black"
      >
        {/* Soft Celestial Glow diffused seamlessly across background */}
        <div 
          aria-hidden="true" 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] rounded-full blur-[160px] opacity-25 bg-[radial-gradient(ellipse,_#38bdf8_0%,_#6366f1_35%,_transparent_75%)] pointer-events-none z-0" 
        />

        {/* ====================================================================
            INTERACTIVE HALFTONE WORDMARK (Full-Bleed Transparent Layer)
            Covers 100% of the hands section seamlessly — no box, no edges, no lines.
            ==================================================================== */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
          <InteractiveHalftoneWordmark
            wordmark="HARSHIT"
            palette={{
              background: "transparent",
              ink: "#e2e8f0",
              warm: "#38bdf8",
            }}
            dotGap={6}
            radius={90}
            crop={0.16}
            grain={0}
            fontFamily='"Kanit", "Google Sans Flex", -apple-system, sans-serif'
            fontWeight={900}
            className="w-full h-full"
          />
        </div>

        {/* Center Creed Centered between the Reaching Hands */}
        <div className="relative z-20 text-center flex flex-col items-center justify-center space-y-1 px-4 mt-1 sm:mt-2 pointer-events-none">
          <span className="text-xs font-mono text-neutral-400 tracking-wider">
            &copy; 2026
          </span>
          <span className="text-base sm:text-lg font-semibold text-white tracking-wide font-sans">
            Harshit Kumar
          </span>
          <span className="text-xs sm:text-sm text-neutral-400 font-sans">
            Full-Stack &amp; GenAI Engineer &middot; IIIT Kota
          </span>
        </div>

        {/* Left Carrara Marble Sculpture Hand (Creation of Adam) */}
        <div
          ref={handLeftRef}
          className="absolute left-0 top-[2%] sm:top-[5%] w-[46%] max-w-[580px] min-w-[250px] pointer-events-none z-10 will-change-transform"
          style={{
            filter: 'drop-shadow(0 0 35px rgba(240, 162, 76, 0.25))',
          }}
        >
          <img
            src="/assets/hand-left.png"
            alt="Carrara marble hand with warm rim light reaching in from left"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Right Carrara Marble Sculpture Hand (Creation of Adam) */}
        <div
          ref={handRightRef}
          className="absolute right-0 top-[7%] sm:top-[11%] w-[44%] max-w-[550px] min-w-[240px] pointer-events-none z-10 will-change-transform"
          style={{
            filter: 'drop-shadow(0 0 35px rgba(240, 162, 76, 0.25))',
          }}
        >
          <img
            src="/assets/hand-right.png"
            alt="Carrara marble hand with warm rim light reaching in from right"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Divine Spark of Creation: Perfectly Centered Between Fingertips */}
        <div 
          onClick={triggerSpark}
          title="The Spark of Creation: Human & Machine"
          className="absolute top-[35%] sm:top-[37%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer p-6 group pointer-events-auto"
        >
          {/* Breathing ethereal plasma spark */}
          <div className="relative flex items-center justify-center">
            {/* Outer soft ambient aura */}
            <div className={`absolute w-12 h-12 rounded-full bg-sky-400/25 blur-md transition-all duration-300 pointer-events-none ${
              sparkClicked ? 'scale-[2.5] bg-sky-300/60' : 'group-hover:scale-125'
            }`} />
            
            {/* Inner radiant spark core */}
            <div className={`w-3.5 h-3.5 rounded-full bg-white transition-all duration-300 pointer-events-none ${
              sparkClicked 
                ? 'scale-[2.5] shadow-[0_0_35px_12px_rgba(56,189,248,1),0_0_50px_20px_rgba(240,162,76,0.8)]' 
                : 'shadow-[0_0_20px_5px_rgba(56,189,248,0.9),0_0_35px_10px_rgba(240,162,76,0.5)] group-hover:scale-125 animate-pulse'
            }`} />
          </div>
          <span className="sr-only">Divine Spark of Creation</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
