import React from 'react';
import {
  Trophy,
  Users,
  MapPin,
  ArrowUpRight,
  Code2,
  Mountain,
  Calendar,
  Gamepad2,
} from 'lucide-react';
import { LeetCodeIcon, GithubIcon } from './Icons';

import harshitPortrait from '../assets/harshit-portrait.png';
import iiitKotaLogo from '../assets/iiit-kota-logo.png';
import AsciiHands from './ui/AsciiHands';

interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  icon: React.ReactNode;
  highlights: string[];
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'techknow-council',
    role: 'Senior Executive Event Manager',
    organization: 'TechKnow Council, IIIT Kota',
    period: 'Jan 2025 – May 2026',
    location: 'Kota, Rajasthan',
    icon: <Users size={16} className="text-emerald-400" />,
    highlights: [
      'Organized 5+ flagship technical events, hackathons, and workshops with 6,000+ total footfall.',
      'Secured and coordinated 10+ corporate sponsorships for Tech Summit 2026 and HackTheChain 4.0.',
      'Managed cross-functional teams handling budgeting, logistics, and developer registrations.',
    ],
    tags: ['6,000+ Attendees', '5+ Hackathons', 'Tech Summit 2026', 'HackTheChain 4.0'],
  },
  {
    id: 'clutch-esports',
    role: 'Social Media & Brand Lead',
    organization: 'Esports Club Clutch, IIIT Kota',
    period: 'Aug 2024 – Present',
    location: 'Kota, Rajasthan',
    icon: <Gamepad2 size={16} className="text-indigo-400" />,
    highlights: [
      'Grew digital community engagement by 30%+ through targeted promotional campaigns and content scheduling.',
      'Managed live tournament broadcasts, graphic assets, and social media coverage for campus gaming leagues.',
    ],
    tags: ['+30% Engagement', 'Tournament Operations', 'Brand Marketing'],
  },
  {
    id: 'et-stars',
    role: 'Phase 2 Finalist (Top 6,000 / 54k+ Teams)',
    organization: 'Economic Times Campus Stars Gen AI Hackathon',
    period: '2024',
    location: 'National Level',
    icon: <Trophy size={16} className="text-amber-400" />,
    highlights: [
      'Ranked in the top 7% nationally out of 54,000+ participating engineering teams.',
      'Architected an 8-stage stateful LangGraph pipeline using Groq LPU streaming and local ChromaDB RAG.',
    ],
    tags: ['Top 6,000 Nationally', 'LangGraph Multi-Agent', 'ChromaDB RAG', 'Groq LPU'],
  },
  {
    id: 'systems-dsa',
    role: '300+ Problems Solved (C++) & CodeChef 2-Star',
    organization: 'Competitive Programming',
    period: '2024 – Present',
    location: 'LeetCode & CodeChef',
    icon: <Code2 size={16} className="text-cyan-400" />,
    highlights: [
      'Solved 300+ algorithmic problems in C++ covering graph theory, dynamic programming, and data structures.',
      'Maintained 2-Star rating on CodeChef under strict time and memory constraints.',
    ],
    tags: ['300+ C++ Solved', 'CodeChef 2-Star', 'DSA', 'Graph Theory'],
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10">
      {/* ========================================================
          1. CREATION OF SYNTHESIS SHOWCASE (Living Interactive Code Canvas)
             Zero Static Image · Pure High-Density ASCII · Interactive Physics
         ======================================================== */}
      <div className="relative w-full py-6 sm:py-10 flex flex-col items-center justify-center border-b border-white/[0.06] mb-20">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-sky-500/[0.03] rounded-full blur-3xl pointer-events-none" />

        {/* Living Interactive Creation Hands (Pure Code & Canvas, High Density) */}
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
          <AsciiHands />
        </div>
      </div>

      {/* ========================================================
          2. SECTION HEADER & EDITORIAL HARSHIT PROFILE
         ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">
              The Engineer Behind The Terminal
            </span>
          </div>
          <h2 className="font-sans font-bold text-5xl sm:text-6xl text-white tracking-tight">
            About Me.
          </h2>
        </div>

        <p className="font-sans text-sm sm:text-base text-white/60 max-w-lg leading-relaxed">
          Full-stack GenAI &amp; systems engineer crafting resilient multi-agent architectures, zero-latency algorithms, and production software.
        </p>
      </div>

      {/* Editorial Profile Flow (Seamless, without heavy card borders) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-24 items-center">
        {/* Left: Real Photo of Harshit in Himalayas (Col 5) */}
        <div className="lg:col-span-5 relative group">
          <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            <img
              src={harshitPortrait}
              alt="Harshit Kumar in the Himalayas"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

            {/* Top Pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[11px] text-white/80">
              <Mountain size={12} className="text-emerald-400" />
              <span>Himalayan Trails · Builder</span>
            </div>

            {/* Bottom Floating Info Pill inside Image */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Harshit Kumar
                  </h3>
                  <p className="font-sans text-xs text-white/60">
                    B.Tech CSE &apos;28 · IIIT Kota
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="mt-4 grid grid-cols-3 gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div>
              <span className="font-mono text-[10px] uppercase text-white/40 block">Focus</span>
              <span className="font-sans font-semibold text-xs text-white">GenAI &amp; Systems</span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-white/40 block">LeetCode</span>
              <span className="font-sans font-semibold text-xs text-white">300+ Solved</span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-white/40 block">Hackathon</span>
              <span className="font-sans font-semibold text-xs text-white">Top 6k ET Stars</span>
            </div>
          </div>
        </div>

        {/* Right: Personal Manifesto & Philosophy (Col 7 - Open Editorial Text) */}
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400/90 font-medium block">
            Engineering Mindset &amp; Craft
          </span>

          <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight leading-snug">
            Human Intent. Machine Precision.
          </h3>

          <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            I believe modern software should feel deterministic, tactile, and blazingly fast. Rather than building fragile AI wrappers, I engineer stateful <strong className="text-white font-semibold">LangGraph multi-agent pipelines</strong>, low-latency <strong className="text-white font-semibold">C++ algorithmic cores</strong>, and resilient backend services that solve real problems with verified benchmarks.
          </p>

          <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
            When I&apos;m not tuning supervisor graphs or optimizing serverless cold starts (-92%), you&apos;ll find me tackling graph theory challenges, organizing campus hackathons, or exploring high-altitude trails in the Himalayas.
          </p>

          {/* Social Proof Strip */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                <Code2 size={18} />
              </div>
              <div>
                <span className="font-sans font-semibold text-sm text-white block">
                  300+ Problems Solved
                </span>
                <span className="font-mono text-[11px] text-white/40">
                  LeetCode &amp; CodeChef 2-Star Rated
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/HARSHITKUMAR987"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors border border-white/10"
              >
                <GithubIcon size={13} />
                <span>GitHub</span>
                <ArrowUpRight size={11} className="text-white/40" />
              </a>

              <a
                href="https://leetcode.com/u/Harshitkumar_987/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors border border-white/10"
              >
                <LeetCodeIcon size={13} />
                <span>LeetCode</span>
                <ArrowUpRight size={11} className="text-white/40" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. EDUCATION & LEADERSHIP (Continuous Scrollable Stream)
         ======================================================== */}
      <div className="border-t border-white/[0.08] pt-16">
        <div className="mb-12">
          <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Education &amp; Leadership.
          </h3>
          <p className="font-sans text-sm text-white/50 mt-1">
            Academic background at IIIT Kota, campus event leadership, and competitive engineering milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: IIIT Kota Academic Block (Col 5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-start gap-4">
              {/* IIIT Kota Official Circular Crest */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] p-1.5 border border-white/15 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-lg">
                <img
                  src={iiitKotaLogo}
                  alt="Indian Institute of Information Technology Kota"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 font-mono text-[10px] text-sky-400 font-medium inline-block mb-1.5">
                  Institute of National Importance
                </span>
                <h4 className="font-sans font-bold text-xl text-white leading-snug">
                  Indian Institute of Information Technology, Kota
                </h4>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-sans text-base font-semibold text-white">
                B.Tech in Computer Science &amp; Engineering
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-white/50">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-sky-400/80" />
                  <span>2024 – 2028 (Expected)</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-white/40" />
                  <span>Kota, Rajasthan</span>
                </span>
              </div>

              <p className="font-sans text-sm text-white/60 leading-relaxed pt-3 border-t border-white/[0.06]">
                Focusing on distributed operating systems, stateful multi-agent systems (LangGraph), and low-latency C++ algorithmic cores.
              </p>
            </div>

            {/* Core Coursework & Domain Tags */}
            <div className="pt-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2.5">
                Core Focus Areas
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Multi-Agent Systems',
                  'Operating Systems',
                  'Low-Latency C++',
                  'High-Throughput APIs',
                  'DSA & System Design',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Continuous Timeline Stream (Col 7 - Natural Scroll Stream) */}
          <div className="lg:col-span-7 relative pl-6 sm:pl-8 border-l border-white/10 space-y-10">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Node on Spine */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white/20 border-2 border-black group-hover:bg-white transition-colors" />

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                  <div>
                    <h4 className="font-sans font-bold text-lg text-white tracking-tight">
                      {exp.role}
                    </h4>
                    <p className="font-sans text-sm text-white/70 font-medium">
                      {exp.organization}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-white/40 flex-shrink-0">
                    {exp.period}
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-1.5 mb-3 pl-1">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/5 font-mono text-[10px] text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;