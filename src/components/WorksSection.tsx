import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';
import {
  X,
  ZoomIn,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { LiveProjectButton } from './ui/LiveProjectButton';
import { Magnet } from './ui/Magnet';
import { GithubIcon } from './Icons';
import { gsap } from '../lib/gsapSetup';
import { playPop, playSwitch } from '@/utils/sound';

import truthshieldImg from '../assets/truthshield.png';
import truthshieldThreatsImg from '../assets/truthshield-threats.png';
import baseraImg from '../assets/basera.png';
import baseraPortalImg from '../assets/basera-portal.png';
import lexisImg from '../assets/lexis.png';
import lexisEngineImg from '../assets/lexis-engine.png';
import prahariImg from '../assets/prahari.jpg';
import prahariMapImg from '../assets/prahari-map.jpg';
import govoltImg from '../assets/govolt.jpg';
import govoltCycleImg from '../assets/govolt-cycle.jpg';

interface ProjectMetric {
  label: string;
  value: string;
}

interface ProjectCardData {
  id: string;
  number: string;
  category: string;
  name: string;
  tagline: string;
  domainUrl: string;
  metrics: ProjectMetric[];
  stack: string[];
  images: {
    primary: string;
    primaryLabel: string;
    secondary: string;
    secondaryLabel: string;
  };
  liveUrl: string;
  githubUrl: string;
  accentColor: string;
}

const FLAGSHIP_PROJECTS: ProjectCardData[] = [
  {
    id: 'lexis-ai',
    number: '01',
    category: 'Autonomous Multi-Agent · Top 7% Nationally',
    name: 'Lexis AI Engine',
    tagline:
      '8-Stage Stateful LangGraph Pipeline with RAG Fact-Checking & Parallel C++ Localization',
    domainUrl: 'lex-is-ai.vercel.app/app',
    metrics: [
      { label: 'Orchestration', value: '8 Nodes' },
      { label: 'LLM Latency', value: '<350ms TTFT' },
      { label: 'C++ Engine', value: '<40ms Parallel' },
    ],
    stack: ['LangGraph', 'Groq Llama-3', 'ChromaDB RAG', 'FastAPI', 'C++', 'Docker'],
    images: {
      primary: lexisImg,
      primaryLabel: 'Multi-Agent Workspace & 3D Neural Core',
      secondary: lexisEngineImg,
      secondaryLabel: '6-Stage LangGraph & 5-Layer Compliance Pipeline',
    },
    liveUrl: 'https://lex-is-ai.vercel.app/app/',
    githubUrl: 'https://github.com/Harshit-ops-code',
    accentColor: '#818cf8',
  },
  {
    id: 'truthshield',
    number: '02',
    category: 'Cybersecurity · Forensic AI & Manifest V3',
    name: 'TruthShield Sentinel',
    tagline:
      'Real-Time Deepfake Vision Forensics & <120ms Phishing Defense with Browser Extension',
    domainUrl: 'truthshield-nu.vercel.app',
    metrics: [
      { label: 'Forensic Acc.', value: '92% Vision' },
      { label: 'Text Audit', value: '<120ms REST' },
      { label: 'Extension', value: 'Manifest V3' },
    ],
    stack: ['Hugging Face CV', 'Gemini Multimodal', 'FastAPI', 'Node.js', 'Chrome V3'],
    images: {
      primary: truthshieldImg,
      primaryLabel: 'Biometric Safety Sandbox & Live Hologram Feed',
      secondary: truthshieldThreatsImg,
      secondaryLabel: 'Real-Time Deepfake & Threat Landscape Matrix',
    },
    liveUrl: 'https://truthshield-nu.vercel.app/',
    githubUrl: 'https://github.com/Harshit-ops-code',
    accentColor: '#38bdf8',
  },
  {
    id: 'basera',
    number: '03',
    category: 'Full-Stack GIS · Zero-Broker Relocation',
    name: 'Basera & Homie',
    tagline:
      'Direct Relocation Engine with <8ms Ray-Casting Geo Search & Streaming LLM Negotiation',
    domainUrl: 'homie-two-pi.vercel.app',
    metrics: [
      { label: 'Cold Start', value: '-92% DNS Patch' },
      { label: 'Ray-Casting', value: '<8ms / 1k Pts' },
      { label: 'Negotiation', value: '<350ms TTFT' },
    ],
    stack: ['Next.js 16', 'Groq Streaming', 'MongoDB', 'Ray-Casting Alg', 'TypeScript'],
    images: {
      primary: baseraImg,
      primaryLabel: 'Zero-Broker Direct Relocation Portal',
      secondary: baseraPortalImg,
      secondaryLabel: 'Live City Intelligence & Metro Corridor Matrix',
    },
    liveUrl: 'https://homie-two-pi.vercel.app/',
    githubUrl: 'https://github.com/Harshit-ops-code',
    accentColor: '#34d399',
  },
  {
    id: 'prahari',
    number: '04',
    category: 'Cybersecurity · SIH 2026 Interception',
    name: 'P.R.A.H.A.R.I.',
    tagline:
      'Predictive ATM Cashout Interception Interface with Spatial Radar & Live Leaflet Node Mapper UI',
    domainUrl: 'parahari.vercel.app',
    metrics: [
      { label: 'Scope', value: 'SIH 2026 UI' },
      { label: 'Mapping', value: 'Leaflet Live' },
      { label: 'Module', value: 'NCRP Matrix' },
    ],
    stack: ['React', 'TypeScript', 'Leaflet Maps', 'Tailwind CSS', 'FastAPI'],
    images: {
      primary: prahariImg,
      primaryLabel: 'Overview · Predictive ATM Interception Hero',
      secondary: prahariMapImg,
      secondaryLabel: 'AI Geospatial Node Mapper · Live Satellite Feed',
    },
    liveUrl: 'https://parahari.vercel.app/',
    githubUrl: 'https://github.com/Harshit-ops-code/PARAHARI',
    accentColor: '#a855f7',
  },
  {
    id: 'govolt',
    number: '05',
    category: 'CleanTech · Circular EV Battery Swap',
    name: 'GoVolt Network',
    tagline:
      '100% Circular EV Battery Swap Interface featuring Station Telemetry Card & Zero-Waste Ring',
    domainUrl: 'govolt.vercel.app',
    metrics: [
      { label: 'Station', value: '4.2 kW UI' },
      { label: 'Lifecycle', value: '0% Landfill' },
      { label: 'Focus', value: 'Full-Stack UI' },
    ],
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Vercel'],
    images: {
      primary: govoltImg,
      primaryLabel: 'Circular Battery Network · Station Active Card',
      secondary: govoltCycleImg,
      secondaryLabel: 'Second-Life Solar Storage & 0% Waste Ring',
    },
    liveUrl: 'https://govolt.vercel.app/',
    githubUrl: 'https://github.com/Harshit-ops-code/Govolt',
    accentColor: '#10b981',
  },
];

interface StickyCardProps {
  project: ProjectCardData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onOpenGallery: (project: ProjectCardData, initialSlide: 0 | 1) => void;
}

const StickyProjectCard: React.FC<StickyCardProps> = ({
  project,
  index,
  totalCards,
  progress,
  onOpenGallery,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activePreview, setActivePreview] = useState<'primary' | 'secondary'>('primary');

  // Scroll-linked entry parallax inside each card's browser stage
  const { scrollYProgress: entryProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'start start'],
  });
  const showcaseY = useTransform(entryProgress, [0, 1], [24, 0]);
  const showcaseScale = useTransform(entryProgress, [0, 1], [0.96, 1]);

  // Stacking scale & depth dimming synchronized across cardsTrackRef
  const isLast = index === totalCards - 1;
  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scrollableSpan = Math.max(1, totalCards * 82 - 100);
  const startCover = isLast ? 0 : Math.min(0.95, Math.max(0, (index * 82) / scrollableSpan));

  const stackScale = useTransform(
    progress,
    isLast ? [0, 1] : [startCover, 1],
    isLast ? [1, 1] : [1, targetScale]
  );

  const maxDimOpacity = Math.min(0.38, (totalCards - 1 - index) * 0.14);
  const dimOpacity = useTransform(
    progress,
    isLast ? [0, 1] : [startCover, 1],
    isLast ? [0, 0] : [0, maxDimOpacity]
  );

  // Smooth interactive 3D pointer tilt on hover
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const rotateX = useSpring(tiltXRaw, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(tiltYRaw, { stiffness: 220, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltXRaw.set(-py * 3.5);
    tiltYRaw.set(px * 3.5);
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
  };

  const displayedScreenshot =
    activePreview === 'primary' ? project.images.primary : project.images.secondary;
  const displayedLabel =
    activePreview === 'primary' ? project.images.primaryLabel : project.images.secondaryLabel;

  return (
    <div
      ref={wrapperRef}
      className="h-[82vh] flex items-start justify-center sticky select-none"
      style={{
        // Sits cleanly below fixed floating navbar dock (top-5, ends ~68px)
        top: `calc(5.25rem + ${index * 22}px)`,
        zIndex: index + 10,
        perspective: '1400px',
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          scale: stackScale,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-6xl mx-auto rounded-[32px] sm:rounded-[42px] md:rounded-[50px] border-2 border-[#D7E2EA]/85 bg-[#0C0C0C] p-4 sm:p-5 md:p-6 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.96)] origin-top transition-colors duration-300 group overflow-hidden"
      >
        {/* Depth Dim Overlay for stacked cards beneath */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-black pointer-events-none z-20"
          style={{ opacity: dimOpacity }}
        />

        {/* Interactive Pointer Spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(560px circle at var(--spot-x, 50%) var(--spot-y, 20%), rgba(215, 226, 234, 0.08), transparent 65%)',
          }}
        />

        {/* Ambient Corner Accent Glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25 pointer-events-none transition-opacity duration-500 group-hover:opacity-45"
          style={{
            background: `radial-gradient(circle at center, ${project.accentColor}, transparent 70%)`,
          }}
        />

        {/* ========================================================
            TOP ROW: Huge Number, Category, Name, Action Controls
           ======================================================== */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-3.5 sm:mb-5 pb-3.5 sm:pb-4 border-b border-[#D7E2EA]/15">
          <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
            <span
              className="font-kanit font-black text-[#D7E2EA] leading-none shrink-0"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col min-w-0">
              <span className="text-[#D7E2EA]/75 font-mono uppercase tracking-wider text-[10px] sm:text-xs flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: project.accentColor }}
                />
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-kanit font-semibold uppercase tracking-tight text-lg sm:text-2xl md:text-3xl truncate mt-0.5">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Source on GitHub"
              data-cursor-text="SOURCE"
              className="p-2.5 sm:p-3 rounded-full border border-[#D7E2EA]/40 hover:border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <GithubIcon size={16} />
            </a>

            <Magnet padding={40} strength={3}>
              <LiveProjectButton
                href={project.liveUrl}
                label="Live Project"
                data-cursor-text="LIVE ↗"
              />
            </Magnet>
          </div>
        </div>

        {/* ========================================================
            BOTTOM ROW: 40% System Architecture + Telemetry / 60% Interactive Dark Browser Showcase
           ======================================================== */}
        <div className="relative z-10 flex flex-col lg:flex-row gap-3.5 sm:gap-5 items-stretch">
          {/* LEFT COLUMN (40%): Architecture Preview + Dark Metrics Card */}
          <div className="w-full lg:w-[40%] flex flex-col gap-3 sm:gap-4 justify-between">
            {/* Top Left: Framed Secondary Architecture View (aspect 2.1:1 matches raw 1024x480 cleanly) */}
            <div
              onClick={() => onOpenGallery(project, 1)}
              data-cursor-text="INSPECT"
              className="w-full aspect-[16/8.2] max-h-[195px] overflow-hidden rounded-[22px] sm:rounded-[28px] bg-[#13151d] border border-white/12 p-1.5 sm:p-2 relative group/mini cursor-pointer shadow-inner"
            >
              <div className="w-full h-full rounded-[16px] sm:rounded-[22px] overflow-hidden relative bg-white/5">
                <img
                  src={project.images.secondary}
                  alt={`${project.name} architecture overview`}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/mini:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover/mini:opacity-95 transition-opacity" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-white/90 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 truncate">
                    {project.images.secondaryLabel}
                  </span>
                  <span className="p-1.5 rounded-full bg-black/70 text-white/90 border border-white/15 shrink-0">
                    <ZoomIn size={12} />
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Left: Production Metrics & Engineering Stack */}
            <div className="flex-1 rounded-[22px] sm:rounded-[28px] bg-[#12141c] border border-white/10 p-4 sm:p-5 flex flex-col justify-between gap-3">
              <div className="space-y-3">
                <p className="font-sans text-xs sm:text-sm text-[#D7E2EA]/80 leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/[0.07]"
                    >
                      <div
                        className="font-mono font-bold text-[11px] sm:text-xs truncate"
                        style={{ color: project.accentColor }}
                      >
                        {m.value}
                      </div>
                      <div className="font-mono text-[9px] text-white/45 uppercase tracking-wider truncate mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-white/[0.07]">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] text-white/75 border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (60%): Interactive Dark Browser Showcase Stage (Zero text cropping!) */}
          <div className="w-full lg:w-[60%] rounded-[24px] sm:rounded-[34px] bg-gradient-to-br from-[#141722] via-[#0e1017] to-[#08090d] border border-white/12 p-3 sm:p-5 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Radial Studio Lighting behind Browser Mockup */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 45%, ${project.accentColor}44, transparent 70%)`,
              }}
            />

            {/* Switcher Pill Bar above screen */}
            <div className="relative z-10 flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-full border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    playSwitch();
                    setActivePreview('primary');
                  }}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all cursor-pointer ${
                    activePreview === 'primary'
                      ? 'bg-white text-black font-semibold'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  Portal View
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSwitch();
                    setActivePreview('secondary');
                  }}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all cursor-pointer ${
                    activePreview === 'secondary'
                      ? 'bg-white text-black font-semibold'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  Architecture
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  playPop();
                  onOpenGallery(project, activePreview === 'primary' ? 0 : 1);
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 font-mono text-[10px] text-white/80 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ZoomIn size={11} />
                <span>Expand</span>
              </button>
            </div>

            {/* Dark macOS Browser Window with Uncropped 16:8.2 Viewport */}
            <motion.div
              style={{ y: showcaseY, scale: showcaseScale }}
              onClick={() => onOpenGallery(project, activePreview === 'primary' ? 0 : 1)}
              data-cursor-text="INSPECT"
              className="relative z-10 w-full rounded-2xl overflow-hidden border border-white/15 bg-[#090a0f] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)] cursor-pointer group/screen"
            >
              {/* Browser Window Top Chrome */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#161822] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>

                <div className="px-3 py-0.5 rounded-md bg-black/50 border border-white/10 font-mono text-[10px] text-white/60 truncate max-w-[200px] sm:max-w-xs">
                  https://{project.domainUrl}
                </div>

                <span className="font-mono text-[9px] text-emerald-400">
                  LIVE
                </span>
              </div>

              {/* Clean Widescreen Render Container */}
              <div className="relative w-full aspect-[16/8.2] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={displayedScreenshot}
                    src={displayedScreenshot}
                    alt={displayedLabel}
                    initial={{ opacity: 0.4, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.25 }}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/screen:scale-[1.03]"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Caption Footer inside Right Column */}
            <div className="relative z-10 flex items-center justify-between pt-2.5 text-[11px] font-mono text-white/55">
              <span className="truncate pr-2">{displayedLabel}</span>
              <span className="shrink-0 text-white/75 flex items-center gap-1">
                <Layers size={11} style={{ color: project.accentColor }} />
                Click screen to zoom
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const WorksSection: React.FC = () => {
  const [galleryState, setGalleryState] = useState<{
    project: ProjectCardData;
    slide: 0 | 1;
  } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);

  // Scope useScroll cleanly to ONLY the stacking cards track
  const { scrollYProgress } = useScroll({
    target: cardsTrackRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-works-reveal]', {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      });

      gsap.to('[data-works-title]', {
        y: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top 15%',
          scrub: 0.7,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Keyboard support inside Lightbox (Escape, Left, Right)
  useEffect(() => {
    if (!galleryState) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGalleryState(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setGalleryState((prev) =>
          prev ? { ...prev, slide: prev.slide === 0 ? 1 : 0 } : null
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [galleryState]);

  const activeLightboxImage = galleryState
    ? galleryState.slide === 0
      ? galleryState.project.images.primary
      : galleryState.project.images.secondary
    : '';
  const activeLightboxCaption = galleryState
    ? galleryState.slide === 0
      ? galleryState.project.images.primaryLabel
      : galleryState.project.images.secondaryLabel
    : '';

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative z-10 w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-8 md:px-10 pt-20 sm:pt-28 md:pt-32 pb-24 sm:pb-32 select-none -mt-10 sm:-mt-12 md:-mt-14"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <span data-works-reveal className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/55 block mb-2">
            Selected Work
          </span>

          <div data-works-title className="will-change-transform">
            <h2
              data-works-reveal
              className="hero-heading font-kanit font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
            >
              Projects
            </h2>
          </div>

          <p
            data-works-reveal
            className="text-[#D7E2EA]/70 text-sm sm:text-base mt-2 max-w-xl leading-relaxed font-light"
          >
            Deployed multi-agent AI tools, security utilities, and full-stack web platforms.
          </p>
        </div>

        <span
          data-works-reveal
          className="font-mono text-xs text-[#D7E2EA]/50 self-start md:self-auto"
        >
          01 — 05
        </span>
      </div>

      {/* Sticky Stacking Cards Track */}
      <div
        ref={cardsTrackRef}
        className="relative w-full max-w-6xl mx-auto flex flex-col"
      >
        {FLAGSHIP_PROJECTS.map((project, index) => (
          <StickyProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={FLAGSHIP_PROJECTS.length}
            progress={scrollYProgress}
            onOpenGallery={(proj, initialSlide) =>
              setGalleryState({ project: proj, slide: initialSlide })
            }
          />
        ))}
      </div>

      {/* Interactive Lightbox Gallery Modal */}
      <AnimatePresence>
        {galleryState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryState(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-[32px] sm:rounded-[40px] overflow-hidden border border-white/20 bg-[#0C0C0C] shadow-2xl flex flex-col cursor-default"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white"
                  >
                    {galleryState.project.number}
                  </span>
                  <span className="font-mono text-xs text-white/80 truncate">
                    {galleryState.project.name} — {activeLightboxCaption}
                  </span>
                </div>

                <button
                  onClick={() => setGalleryState(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Close Preview (Esc)"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Image Stage */}
              <div className="relative p-4 sm:p-6 bg-[#07080c] flex items-center justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setGalleryState((prev) =>
                      prev ? { ...prev, slide: prev.slide === 0 ? 1 : 0 } : null
                    )
                  }
                  className="absolute left-4 sm:left-6 z-10 w-10 h-10 rounded-full bg-black/75 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={18} />
                </button>

                <img
                  src={activeLightboxImage}
                  alt={activeLightboxCaption}
                  className="max-h-[70vh] w-auto max-w-full rounded-2xl border border-white/15 object-contain shadow-2xl"
                />

                <button
                  type="button"
                  onClick={() =>
                    setGalleryState((prev) =>
                      prev ? { ...prev, slide: prev.slide === 0 ? 1 : 0 } : null
                    )
                  }
                  className="absolute right-4 sm:right-6 z-10 w-10 h-10 rounded-full bg-black/75 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-t border-white/10 bg-black/40 text-xs font-mono text-white/60">
                <span>Press ← / → to switch views · Esc to close</span>
                <a
                  href={galleryState.project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-white text-black font-semibold flex items-center gap-1.5 hover:bg-white/90 transition-colors"
                >
                  Open Live Site <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorksSection;
