import React from 'react';
import { soundEngine } from '../utils/audio';
import { Trophy, Users, Award, ExternalLink, GraduationCap, CheckCircle } from 'lucide-react';

export const SystemsDepth: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          <span>03 // Background &amp; Impact</span>
        </div>
        <h2 className="font-space font-bold text-3xl sm:text-5xl text-[#121316] tracking-tight">
          Experience, DSA &amp; Leadership
        </h2>
        <p className="font-sans text-base text-[#5e6068] max-w-2xl">
          Strong low-level C++ foundations paired with leadership in managing 6,000+ attendee hackathons.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Education */}
        <div className="paper-card rounded-2xl p-6 sm:p-7 bg-white border border-[#e6e3dc] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <GraduationCap size={20} />
          </div>
          <div>
            <span className="font-mono text-xs text-[#8b8d96] uppercase">2024 – 2028</span>
            <h3 className="font-space font-bold text-xl text-[#121316] mt-0.5">
              IIIT Kota, Rajasthan
            </h3>
            <p className="font-sans text-sm text-indigo-700 font-medium">
              B.Tech in Computer Science and Engineering
            </p>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#5e6068] leading-relaxed">
            Specializing in scalable GenAI systems, multi-agent AI orchestration, and high-throughput backend APIs.
          </p>
          <div className="pt-2 border-t border-[#e6e3dc] font-mono text-xs text-[#8b8d96]">
            Class of 2028 · Kota, Rajasthan
          </div>
        </div>

        {/* Card 2: 300+ DSA in C++ */}
        <div className="paper-card rounded-2xl p-6 sm:p-7 bg-white border border-[#e6e3dc] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Trophy size={20} />
          </div>
          <div>
            <span className="font-mono text-xs text-[#8b8d96] uppercase">Competitive Programming</span>
            <h3 className="font-space font-bold text-xl text-[#121316] mt-0.5">
              300+ DSA Solved (C++)
            </h3>
            <p className="font-sans text-sm text-amber-800 font-medium">
              LeetCode &amp; CodeChef 2-Star
            </p>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#5e6068] leading-relaxed">
            Rigorous problem-solving under strict time and memory complexity limits. Proficient in graphs, dynamic programming, and ray-casting geometric algorithms.
          </p>
          <div className="flex items-center gap-3 pt-2 border-t border-[#e6e3dc] font-mono text-xs">
            <a
              href="https://leetcode.com/u/Randomguy5830/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundEngine.playTick()}
              className="text-indigo-700 hover:text-indigo-900 font-medium flex items-center gap-1"
            >
              <span>LeetCode Profile</span>
              <ExternalLink size={11} />
            </a>
            <span className="text-[#e6e3dc]">•</span>
            <a
              href="https://codolio.com/profile/randomguy121"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundEngine.playTick()}
              className="text-indigo-700 hover:text-indigo-900 font-medium flex items-center gap-1"
            >
              <span>Codolio</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Card 3: Hackathon & Recognition */}
        <div className="paper-card rounded-2xl p-6 sm:p-7 bg-white border border-[#e6e3dc] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Award size={20} />
          </div>
          <div>
            <span className="font-mono text-xs text-[#8b8d96] uppercase">National Recognition</span>
            <h3 className="font-space font-bold text-xl text-[#121316] mt-0.5">
              ET Gen AI Hackathon
            </h3>
            <p className="font-sans text-sm text-purple-800 font-medium">
              Top 6,000 of 54,000+ Teams
            </p>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#5e6068] leading-relaxed">
            Qualified Phase 2 of the Economic Times Gen AI Hackathon with the Lexis AI multi-agent content orchestration engine.
          </p>
          <div className="pt-2 border-t border-[#e6e3dc] font-mono text-xs text-[#8b8d96]">
            Deloitte &amp; IBM/ISTE Certified
          </div>
        </div>

        {/* Card 4: Event Leadership (TechKnow Council) */}
        <div className="paper-card rounded-2xl p-6 sm:p-7 bg-white border border-[#e6e3dc] space-y-4 md:col-span-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <span className="font-mono text-xs text-[#8b8d96] uppercase">Jan 2025 – May 2026</span>
            <h3 className="font-space font-bold text-xl text-[#121316] mt-0.5">
              Senior Executive Event Manager — TechKnow Council
            </h3>
            <p className="font-sans text-sm text-emerald-800 font-medium">
              HackTheChain 4.0 &amp; Tech Summit 2026 · IIIT Kota
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#5e6068] pt-1">
            <div className="flex items-start gap-2">
              <CheckCircle size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Planned &amp; executed 5+ technical events and hackathons managing a total footfall of over 6,000 attendees.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Coordinated 10+ corporate vendors across budgeting, sponsorships, registrations, and on-ground operations.</span>
            </div>
          </div>
        </div>

        {/* Card 5: Esports Club Clutch */}
        <div className="paper-card rounded-2xl p-6 sm:p-7 bg-white border border-[#e6e3dc] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <span className="font-mono text-xs text-[#8b8d96] uppercase">Aug 2024 – Present</span>
            <h3 className="font-space font-bold text-xl text-[#121316] mt-0.5">
              Social Media Lead
            </h3>
            <p className="font-sans text-sm text-rose-800 font-medium">
              Esports Club Clutch · IIIT Kota
            </p>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#5e6068] leading-relaxed">
            Grew club&apos;s social media following by 30%+ through targeted content planning and online marketing for inter-college tournaments.
          </p>
        </div>
      </div>
    </section>
  );
};
