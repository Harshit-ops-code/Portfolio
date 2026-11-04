import React, { useState } from 'react';
import { FolderGit2 } from 'lucide-react';
import GlassFolder from './ui/glass-folder-cards';
import type { FolderFile, FolderMenuItem } from './ui/glass-folder-cards';

import truthshieldImg from '../assets/truthshield.png';
import truthshieldThreatsImg from '../assets/truthshield-threats.png';
import baseraImg from '../assets/basera.png';
import baseraPortalImg from '../assets/basera-portal.png';
import lexisImg from '../assets/lexis.png';
import lexisEngineImg from '../assets/lexis-engine.png';

type CategoryFilter = 'all' | 'ai' | 'fullstack' | 'security';

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryFilter;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  badge: string;
  folderTone: 'dark' | 'light';
  folderArt: 'aurora' | 'ember' | 'dusk' | 'glacier' | 'verdant';
  folderLabel: string;
  folderMeta: string;
  files: FolderFile[];
  menu: FolderMenuItem[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'lexis-ai',
    title: 'Lexis AI Content Orchestration',
    subtitle: 'Modular 8-stage stateful LangGraph pipeline with ChromaDB RAG auditing and parallel C++ translation.',
    category: 'ai',
    tags: ['#LangGraph', '#FastAPI', '#GroqLPU', '#ChromaDB', '#ParallelCpp'],
    liveUrl: 'https://lex-is-ai.vercel.app/app/',
    githubUrl: 'https://github.com/Harshit-ops-code',
    badge: 'Phase 2 ET Hackathon · Top 6k Finalist',
    folderTone: 'dark',
    folderArt: 'aurora',
    folderLabel: 'Lexis AI',
    folderMeta: '8 Stages · Top 6k',
    files: [
      {
        name: '6-Node Pipeline',
        meta: 'LangGraph · ChromaDB',
        image: lexisEngineImg,
        href: 'https://lex-is-ai.vercel.app/app/',
      },
      {
        name: 'Compliance Audit',
        meta: '5-Layer Self-Correcting',
        image: lexisImg,
        href: 'https://lex-is-ai.vercel.app/app/',
      },
      {
        name: 'C++ Parallel Engine',
        meta: 'Sub-40ms Translation',
        art: 'aurora',
        href: 'https://github.com/Harshit-ops-code',
      },
      {
        name: 'FastAPI Backend',
        meta: 'Pytest 100% Coverage',
        art: 'verdant',
        href: 'https://github.com/Harshit-ops-code',
      },
    ],
    menu: [
      {
        label: 'Launch Live App ↗',
        onSelect: () => window.open('https://lex-is-ai.vercel.app/app/', '_blank'),
      },
      {
        label: 'View Repository ↗',
        onSelect: () => window.open('https://github.com/Harshit-ops-code', '_blank'),
      },
    ],
  },
  {
    id: 'truthshield',
    title: 'TruthShield Sentinel Core',
    subtitle: 'High-throughput security API for real-time visual forensics and text scam identification with Manifest V3 extension.',
    category: 'security',
    tags: ['#DeepfakeForensics', '#HuggingFace', '#GroqLPU', '#ManifestV3'],
    liveUrl: 'https://truthshield-nu.vercel.app/',
    githubUrl: 'https://github.com/Harshit-ops-code',
    badge: 'API + Chrome Extension V3',
    folderTone: 'dark',
    folderArt: 'glacier',
    folderLabel: 'TruthShield Core',
    folderMeta: 'API + Extension · 92% Acc',
    files: [
      {
        name: 'Threat Landscape',
        meta: 'Deepfake & Phishing Screen',
        image: truthshieldThreatsImg,
        href: 'https://truthshield-nu.vercel.app/',
      },
      {
        name: '3D Hologram Sandbox',
        meta: 'Biometric Mesh Scan',
        image: truthshieldImg,
        href: 'https://truthshield-nu.vercel.app/',
      },
      {
        name: 'Manifest V3 Ext',
        meta: 'Context-Menu Audits',
        art: 'glacier',
        href: 'https://github.com/Harshit-ops-code',
      },
      {
        name: 'Dual-Engine Core',
        meta: 'Groq + Gemini Multimodal',
        art: 'ember',
        href: 'https://github.com/Harshit-ops-code',
      },
    ],
    menu: [
      {
        label: 'Launch Forensic Sandbox ↗',
        onSelect: () => window.open('https://truthshield-nu.vercel.app/', '_blank'),
      },
      {
        label: 'View Extension GitHub ↗',
        onSelect: () => window.open('https://github.com/Harshit-ops-code', '_blank'),
      },
    ],
  },
  {
    id: 'homie',
    title: 'Basera & Homie',
    subtitle: 'India’s first direct relocation engine eliminating brokers with streaming LLM landlord negotiations.',
    category: 'fullstack',
    tags: ['#Nextjs16', '#GroqStreaming', '#RayCastingGIS', '#MongoDNS'],
    liveUrl: 'https://homie-two-pi.vercel.app/',
    githubUrl: 'https://github.com/Harshit-ops-code',
    badge: 'Live Deployment · Next.js 16',
    folderTone: 'dark',
    folderArt: 'ember',
    folderLabel: 'Basera & Homie',
    folderMeta: 'Next.js 16 · Zero Broker',
    files: [
      {
        name: 'Delhi NCR Hub',
        meta: '1,200+ Verified Stays',
        image: baseraPortalImg,
        href: 'https://homie-two-pi.vercel.app/',
      },
      {
        name: 'Negotiation Engine',
        meta: 'Groq Llama-3 <350ms TTFT',
        image: baseraImg,
        href: 'https://homie-two-pi.vercel.app/',
      },
      {
        name: 'Ray-Casting GIS',
        meta: '<8ms Poly Containment',
        art: 'ember',
        href: 'https://github.com/Harshit-ops-code',
      },
      {
        name: 'DNS Cache Patch',
        meta: '-92% Cold Starts',
        art: 'dusk',
        href: 'https://github.com/Harshit-ops-code',
      },
    ],
    menu: [
      {
        label: 'Launch Portal ↗',
        onSelect: () => window.open('https://homie-two-pi.vercel.app/', '_blank'),
      },
      {
        label: 'View Architecture GitHub ↗',
        onSelect: () => window.open('https://github.com/Harshit-ops-code', '_blank'),
      },
    ],
  },
];

export const WorksSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'lexis-ai': true,
    'truthshield': true,
    'homie': true,
  });

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  const handleFolderOpenChange = (id: string, isOpen: boolean) => {
    setOpenFolders((prev) => ({ ...prev, [id]: isOpen }));
  };

  return (
    <section id="works" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Works Section Header & Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">
              Interactive 3D Glass Dossiers
            </span>
          </div>
          <h2 className="font-sans font-bold text-5xl sm:text-6xl text-white tracking-tight">
            Works.
          </h2>
          <p className="font-sans text-sm text-white/60 mt-2 max-w-xl">
            Physical frosted-glass folders containing production architectures, live screen captures, and verified benchmarks. Hover to lean · click to unseal or launch apps.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai', label: 'AI & Agentics' },
            { id: 'fullstack', label: 'FullStack Platforms' },
            { id: 'security', label: 'Security & Forensics' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryFilter)}
              className={`px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-[#000000] shadow-md font-semibold'
                  : 'bg-[#12131a] hover:bg-[#1a1b24] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Glass Folders Showcase - Open Canvas Flow */}
      <div className="relative py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
              <FolderGit2 size={16} />
            </div>
            <div>
              <span className="font-sans font-semibold text-sm text-white block">
                Project Files &amp; Live Deployments
              </span>
              <span className="font-mono text-[11px] text-white/40">
                Click any sheet inside the folder to open its live app or repository
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const allOpen = Object.values(openFolders).every(Boolean);
                setOpenFolders({
                  'lexis-ai': !allOpen,
                  'truthshield': !allOpen,
                  'homie': !allOpen,
                });
              }}
              className="px-3.5 py-1.5 rounded-full font-mono text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              {Object.values(openFolders).every(Boolean) ? 'Fold All Dossiers' : 'Unseal All Dossiers'}
            </button>
          </div>
        </div>

        {/* Responsive Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start justify-items-center py-4">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="flex flex-col items-center transition-transform duration-300 hover:scale-[1.01]"
            >
              <GlassFolder
                label={proj.folderLabel}
                meta={proj.folderMeta}
                tone={proj.folderTone}
                art={proj.folderArt}
                seed={idx * 7 + 3}
                width={330}
                action="more"
                labelPlacement="bottom-left"
                open={openFolders[proj.id]}
                onOpenChange={(isOpen) => handleFolderOpenChange(proj.id, isOpen)}
                appearDelay={idx * 120}
                files={proj.files}
                menu={proj.menu}
                className="cursor-pointer shadow-2xl"
              />

              <div className="mt-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                <button
                  type="button"
                  onClick={() => {
                    setOpenFolders((prev) => ({
                      ...prev,
                      [proj.id]: !prev[proj.id],
                    }));
                  }}
                  className="font-mono text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {openFolders[proj.id] ? 'Fold dossier ▲' : 'Unseal dossier ▼'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
