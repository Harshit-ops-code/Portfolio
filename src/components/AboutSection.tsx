import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  Trophy,
  Users,
  MapPin,
  ArrowUpRight,
  Code2,
  Calendar,
  Gamepad2,
  Download,
} from 'lucide-react';
import { LeetCodeIcon, GithubIcon, LinkedinIcon } from './Icons';
import { gsap } from '@/lib/gsapSetup';
import { playPop } from '@/utils/sound';

import harshitPortrait from '../assets/harshit-portrait.webp';
import iiitKotaLogo from '../assets/iiit-kota-logo.png';

type ExperienceTrack = 'all' | 'leadership' | 'engineering';

interface ExperienceItem {
  id: string;
  track: Exclude<ExperienceTrack, 'all'>;
  role: string;
  organization: string;
  period: string;
  accent: string;
  icon: React.ReactNode;
  metricBadge: string;
  highlights: string[];
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'techknow-council',
    track: 'leadership',
    role: 'Senior Executive Event Manager',
    organization: 'TechKnow Council, IIIT Kota',
    period: 'Jan 2025 – May 2026',
    accent: '#34d399',
    icon: <Users size={16} className="text-emerald-400" />,
    metricBadge: '6,000+ Footfall',
    highlights: [
      'Ran 5+ technical events, hackathons, and workshops across campus.',
      'Brought in and coordinated 10+ corporate sponsors for Tech Summit 2026 and HackTheChain 4.0.',
      'Managed budgeting, schedules, and registration operations across teams.',
    ],
    tags: ['5+ Hackathons', '10+ Sponsors', 'Tech Summit 2026', 'HackTheChain 4.0'],
  },
  {
    id: 'et-stars',
    track: 'engineering',
    role: 'Phase 2 Finalist (Top 7% Nationally)',
    organization: 'Economic Times Campus Stars Gen AI Hackathon',
    period: '2024',
    accent: '#f59e0b',
    icon: <Trophy size={16} className="text-amber-400" />,
    metricBadge: 'Top 6,000 / 54k+',
    highlights: [
      'Placed in the top 6,000 teams nationally out of more than 54,000 teams.',
      'Built an 8-stage LangGraph workflow using Groq streaming and local ChromaDB search.',
    ],
    tags: ['LangGraph', 'ChromaDB RAG', 'Groq'],
  },
  {
    id: 'clutch-esports',
    track: 'leadership',
    role: 'Social Media & Brand Lead',
    organization: 'Esports Club Clutch, IIIT Kota',
    period: 'Aug 2024 – Present',
    accent: '#818cf8',
    icon: <Gamepad2 size={16} className="text-indigo-400" />,
    metricBadge: '+30% Engagement',
    highlights: [
      'Grew club engagement by 30%+ through consistent tournament campaigns and content schedules.',
      'Coordinated match day streams and event coverage for campus tournaments.',
    ],
    tags: ['Content Campaigns', 'Tournament Ops', 'Social Growth'],
  },
  {
    id: 'systems-dsa',
    track: 'engineering',
    role: '300+ DSA Problems Solved · CodeChef 2-Star',
    organization: 'LeetCode & CodeChef',
    period: '2024 – Present',
    accent: '#38bdf8',
    icon: <Code2 size={16} className="text-sky-400" />,
    metricBadge: '300+ Solved',
    highlights: [
      'Solved 300+ problems in C++ focused on graphs, dynamic programming, trees, and greedy algorithms.',
      '2-Star rated on CodeChef from timed algorithmic contests.',
    ],
    tags: ['C++', 'CodeChef 2-Star', 'Graphs', 'Dynamic Programming'],
  },
];

const MANIFESTO_SEGMENTS: Array<{ text: string; strong?: boolean }> = [
  { text: "I'm" },
  { text: 'a' },
  { text: 'Computer' },
  { text: 'Science' },
  { text: 'student' },
  { text: 'at' },
  { text: 'IIIT' },
  { text: 'Kota' },
  { text: 'who' },
  { text: 'likes' },
  { text: 'building' },
  { text: 'things' },
  { text: 'from' },
  { text: 'scratch' },
  { text: '—' },
  { text: 'multi-step' },
  { text: 'LangGraph', strong: true },
  { text: 'AI' },
  { text: 'workflows,', strong: true },
  { text: 'fast' },
  { text: 'APIs,' },
  { text: 'and' },
  { text: 'C++', strong: true },
  { text: 'backend' },
  { text: 'tools' },
  { text: 'that' },
  { text: 'hold' },
  { text: 'up' },
  { text: 'in' },
  { text: 'real' },
  { text: 'use.' },
];

const CORE_FOCUS_AREAS = [
  'Multi-Agent Workflows',
  'Operating Systems',
  'C++ Algorithms',
  'Backend APIs',
  'System Design',
] as const;

const TRACK_TABS: Array<{ id: ExperienceTrack; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'engineering', label: 'Hackathons & DSA' },
  { id: 'leadership', label: 'Campus Leadership' },
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [activeTrack, setActiveTrack] = useState<ExperienceTrack>('all');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 24, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4.5, -4.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4.5, 4.5]), springConfig);

  const handlePortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = portraitRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePortraitLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.from('[data-about-reveal]', {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('[data-about-bento]', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-about-grid]',
          start: 'top 84%',
          once: true,
        },
      });

      gsap.from('[data-edu-reveal]', {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-edu-section]',
          start: 'top 84%',
          once: true,
        },
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-about-photo]',
          { scale: 1.1, yPercent: -5 },
          {
            scale: 1.0,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-about-grid]',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          '[data-manifesto-word]',
          { opacity: 0.25, y: 3 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-manifesto-wrap]',
              start: 'top 86%',
              end: 'bottom 54%',
              scrub: 0.6,
            },
          }
        );

        gsap.fromTo(
          '[data-timeline-spine]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-timeline-list]',
              start: 'top 80%',
              end: 'bottom 55%',
              scrub: 0.65,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const visibleExperiences =
    activeTrack === 'all'
      ? EXPERIENCES
      : EXPERIENCES.filter((item) => item.track === activeTrack);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 px-4 sm:px-8 md:px-10 max-w-6xl mx-auto z-10 select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <span
            data-about-reveal
            className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/55 block mb-2"
          >
            Background
          </span>

          <h2
            data-about-reveal
            className="hero-heading font-kanit font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9.5vw, 122px)' }}
          >
            About Me
          </h2>

          <p
            data-about-reveal
            className="text-[#D7E2EA]/70 text-sm sm:text-base mt-2 max-w-xl leading-relaxed font-light"
          >
            Computer Science undergrad at IIIT Kota working on full-stack web apps, AI pipelines, and C++ problem solving.
          </p>
        </div>

        <span
          data-about-reveal
          className="font-mono text-xs text-[#D7E2EA]/50 self-start md:self-auto"
        >
          Kota, India
        </span>
      </div>

      {/* Bento Portrait + Bio + Key Numbers */}
      <div
        data-about-grid
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-16 sm:mb-20 items-stretch"
      >
        {/* Portrait */}
        <motion.div
          ref={portraitRef}
          data-about-bento
          onMouseMove={handlePortraitMove}
          onMouseLeave={handlePortraitLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="lg:col-span-5 relative group"
        >
          <div
            data-cursor-text="PHOTO"
            className="relative h-full min-h-[420px] sm:min-h-[460px] rounded-3xl overflow-hidden bg-[#090a0f] border border-white/15 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)]"
          >
            <img
              data-about-photo
              src={harshitPortrait}
              alt="Harshit Kumar in the Himalayas"
              className="w-full h-full object-cover object-center will-change-transform"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            {/* Clean Editorial Caption (no overlapping floating pill cards) */}
            <div className="absolute bottom-5 inset-x-5 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-kanit font-bold text-2xl text-white tracking-tight leading-none">
                  Harshit Kumar
                </h3>
                <p className="font-sans text-xs text-white/70 mt-1.5">
                  B.Tech CSE — IIIT Kota
                </p>
              </div>
              <span className="font-mono text-[11px] text-white/50 shrink-0">
                Himalayas
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bio + Numbers */}
        <div data-about-bento className="lg:col-span-7 flex flex-col gap-5">
          <div className="flex-1 rounded-3xl bg-[#090a0f] border border-white/15 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-kanit font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Building software that feels fast and holds up in production.
              </h3>

              <p
                data-manifesto-wrap
                className="font-sans text-base sm:text-lg text-[#D7E2EA]/85 leading-relaxed flex flex-wrap gap-x-[0.32em] gap-y-0.5"
              >
                {MANIFESTO_SEGMENTS.map((seg, i) => (
                  <span
                    key={i}
                    data-manifesto-word
                    className={
                      seg.strong
                        ? 'text-sky-200 font-semibold inline-block'
                        : 'inline-block'
                    }
                  >
                    {seg.text}
                  </span>
                ))}
              </p>

              <p className="font-sans text-xs sm:text-sm text-white/55 leading-relaxed">
                Outside of shipping side projects and fixing cold-start bottlenecks, I help run campus tech events with TechKnow Council, solve graph and DP problems on LeetCode, and travel whenever semester breaks allow.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-2.5">
              <a
                href="/Harshit_Kumar_Resume.pdf"
                download="Harshit_Kumar_Resume.pdf"
                data-cursor-text="RESUME PDF"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-[#D7E2EA] font-mono text-xs font-semibold transition-colors"
              >
                <Download size={14} />
                <span>Download Resume</span>
              </a>

              <a
                href="https://github.com/Harshit-ops-code"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="GITHUB"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/15 text-white border border-white/12 font-mono text-xs transition-colors"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
                <ArrowUpRight size={12} className="text-white/50" />
              </a>

              <a
                href="https://www.linkedin.com/in/harshit-kumar-ai"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="LINKEDIN"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-sky-500/20 text-white border border-white/12 hover:border-sky-400/40 font-mono text-xs transition-colors"
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="text-white/50" />
              </a>

              <a
                href="https://leetcode.com/u/Harshitkumar_987/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="LEETCODE"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-amber-500/15 text-white border border-white/12 hover:border-amber-400/40 font-mono text-xs transition-colors"
              >
                <LeetCodeIcon size={14} />
                <span>LeetCode</span>
                <ArrowUpRight size={12} className="text-white/50" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#090a0f] border border-white/15 p-4 flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                Algorithms
              </span>
              <div className="mt-2">
                <div className="font-kanit font-black text-2xl sm:text-3xl text-white leading-none">
                  300+
                </div>
                <p className="font-sans text-xs text-sky-400 mt-1">
                  C++ solved, CodeChef 2-Star
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#090a0f] border border-white/15 p-4 flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                ET Campus Stars
              </span>
              <div className="mt-2">
                <div className="font-kanit font-black text-2xl sm:text-3xl text-white leading-none">
                  Top 7%
                </div>
                <p className="font-sans text-xs text-amber-400 mt-1">
                  Top 6,000 of 54k+ teams
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#090a0f] border border-white/15 p-4 flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                TechKnow Council
              </span>
              <div className="mt-2">
                <div className="font-kanit font-black text-2xl sm:text-3xl text-white leading-none">
                  6,000+
                </div>
                <p className="font-sans text-xs text-emerald-400 mt-1">
                  Footfall across 5+ events
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education & Experience */}
      <div data-edu-section className="border-t border-white/[0.08] pt-14 sm:pt-16">
        <div
          data-edu-reveal
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 sm:mb-12"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 block mb-1.5">
              Timeline
            </span>
            <h3 className="font-kanit font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Education &amp; Experience
            </h3>
          </div>

          <div className="inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 self-start md:self-auto">
            {TRACK_TABS.map((tab) => {
              const active = activeTrack === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playPop();
                    setActiveTrack(tab.id);
                  }}
                  className={`relative px-3.5 sm:px-4 py-1.5 rounded-full font-mono text-[11px] transition-colors cursor-pointer ${
                    active ? 'text-black font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="about-track-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-white"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* IIIT Kota Card */}
          <div data-edu-reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-[#090a0f] border border-white/15 p-6 sm:p-7 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] p-2 border border-white/15 flex items-center justify-center shrink-0">
                  <img
                    src={iiitKotaLogo}
                    alt="Indian Institute of Information Technology Kota"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <span className="font-mono text-[11px] text-sky-400 font-medium block mb-1">
                    IIIT Kota
                  </span>
                  <h4 className="font-kanit font-bold text-xl text-white leading-snug">
                    Indian Institute of Information Technology, Kota
                  </h4>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <p className="font-sans text-base font-semibold text-white">
                  B.Tech in Computer Science &amp; Engineering
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/55">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-sky-400" />
                    <span>2024 – 2028</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-emerald-400" />
                    <span>Kota, Rajasthan</span>
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                  Coursework and independent projects focused on operating systems, algorithms in C++, backend engineering, and applied AI.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2.5">
                  Focus Areas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CORE_FOCUS_AREAS.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-[#D7E2EA]/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience List */}
          <div
            data-timeline-list
            className="lg:col-span-7 relative pl-6 sm:pl-8 border-l border-white/10 space-y-5"
          >
            <div
              data-timeline-spine
              className="absolute -left-[1px] top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-emerald-400 via-sky-400 to-indigo-500 pointer-events-none"
            />

            <AnimatePresence mode="popLayout">
              {visibleExperiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative group"
                >
                  <span
                    className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full border-2 border-black transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: exp.accent }}
                  />

                  <div className="rounded-2xl bg-[#090a0f] border border-white/12 group-hover:border-white/25 p-5 sm:p-6 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          {exp.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-kanit font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                            {exp.role}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-white/65 font-medium">
                            {exp.organization}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1 shrink-0">
                        <span
                          className="font-mono text-[11px] font-semibold"
                          style={{ color: exp.accent }}
                        >
                          {exp.metricBadge}
                        </span>
                        <span className="font-mono text-[11px] text-white/40">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {exp.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="font-sans text-xs sm:text-sm text-[#D7E2EA]/70 leading-relaxed flex items-start gap-2"
                        >
                          <span
                            className="w-1 h-1 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: exp.accent }}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.07] font-mono text-[10px] text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
