import React from 'react';
import { soundEngine } from '../utils/audio';
import { ExternalLink, CheckCircle2, Globe, Shield, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectShowcase: React.FC = () => {
  const projects = [
    {
      id: 'homie',
      title: 'Basera & Homie — Direct Relocation Engine',
      category: 'AI & Geospatial Platform',
      tagline: "India's first direct relocation engine eliminating brokers with AI negotiation & geospatial mapping.",
      liveUrl: 'https://homie-two-pi.vercel.app/',
      githubUrl: 'https://github.com/Harshit-ops-code',
      badge: 'Live Deployment',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: <Globe size={18} className="text-amber-600" />,
      features: [
        'Engineered an interactive real-time LLM negotiation simulator with Groq/Llama-3 streaming APIs, achieving under 350ms average TTFT with dynamic landlord patience bars.',
        'Built custom point-in-polygon ray-casting algorithms for map draw-to-search across 1,000+ coordinates in under 8ms execution time.',
        'Eliminated cold-start MongoDB connection overhead by 92% (2,000ms down to <150ms) using a custom DNS-lookup patch.',
      ],
      stack: ['Next.js 16', 'Groq / Llama-3', 'MongoDB', 'Leaflet Maps', 'Ray-Casting Alg', 'Tailwind CSS'],
      mockupPreview: {
        header: 'homie-two-pi.vercel.app',
        title: 'Virtual Landlord Simulator & Polygon Search',
        chips: ['Mrs. Kapoor (Landlord)', '3BHK Indiranagar', 'Patience: 85%', 'Latency: 310ms'],
        highlight: 'Real-time streaming LLM dialogue with dynamic concession floors & rent bargaining.',
      },
    },
    {
      id: 'lexis-ai',
      title: 'Lexis AI — Multi-Agent Content Pipeline',
      category: 'Autonomous Multi-Agent System',
      tagline: 'Stateful 8-stage LangGraph pipeline with RAG fact-checking and parallel C++ translation.',
      liveUrl: 'https://lex-is-ai.vercel.app/app/',
      githubUrl: 'https://github.com/Harshit-ops-code',
      badge: 'ET Hackathon Top 6k',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: <Sparkles size={18} className="text-indigo-600" />,
      features: [
        'Architected an 8-stage stateful LangGraph pipeline integrating Groq LLMs, local ChromaDB (all-MiniLM-L6-v2), and web search for 5-layer compliance auditing.',
        'Engineered a high-performance C++ localization engine for post-approval parallel translations and integrated Stability AI APIs for automated social asset generation.',
        'Built a FastAPI backend serving a modular SPA featuring animated 3D geodesic canvas visuals, containerized with Docker and Pytest.',
      ],
      stack: ['LangGraph', 'FastAPI', 'Groq LLM', 'C++', 'ChromaDB', 'Docker', 'Stability AI', 'Pytest'],
      mockupPreview: {
        header: 'lex-is-ai.vercel.app/app',
        title: '8-Stage Stateful Pipeline Inspector',
        chips: ['Stage 1: Research', 'Stage 3: ChromaDB RAG', 'Stage 5: C++ Engine', 'Compliance: 100%'],
        highlight: 'Self-correcting refinement loop ensuring 100% adherence to editorial guidelines.',
      },
    },
    {
      id: 'truthshield',
      title: 'TruthShield Sentinel Core',
      category: 'Security & Deepfake Forensics',
      tagline: 'High-throughput security API & Chrome extension for real-time visual forensics and text scam detection.',
      liveUrl: 'https://truthshield-nu.vercel.app/',
      githubUrl: 'https://github.com/Harshit-ops-code',
      badge: 'API + Chrome Ext (V3)',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: <Shield size={18} className="text-emerald-600" />,
      features: [
        'Architected a scalable forensic platform integrating Hugging Face computer vision models and Groq LLMs, achieving ~92% accuracy (peaking at 94% on text).',
        'Developed FastAPI and Node.js REST APIs minimizing text inference latency to under 120ms and complex visual forensics to under 1.8s.',
        'Engineered Manifest V3 Chrome Extension companion for context-menu audits and deployed backend scaling to 10,000+ daily queries.',
      ],
      stack: ['Hugging Face CV', 'Groq LLM', 'FastAPI', 'Node.js', 'Chrome Extension V3', 'Gemini API'],
      mockupPreview: {
        header: 'truthshield-nu.vercel.app',
        title: 'Live Disinformation & Forensic Sandbox',
        chips: ['Model: Hello-SimpleAI', 'Face Boundary: Verified', 'Text Latency: 115ms', 'Accuracy: 94%'],
        highlight: 'Real-time multi-API verification cross-referencing global publications and metadata.',
      },
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          <span>01 // Selected Projects</span>
        </div>
        <h2 className="font-space font-bold text-3xl sm:text-5xl text-[#121316] tracking-tight">
          Featured Engineering Work
        </h2>
        <p className="font-sans text-base text-[#5e6068] max-w-2xl">
          Real production systems built with modern web frameworks, low-latency AI pipelines, and algorithmic optimization.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-16">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="paper-card rounded-3xl p-6 sm:p-10 bg-white border border-[#e6e3dc] shadow-sm hover:shadow-xl transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Project Details (Col 6) */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border ${proj.badgeColor}`}>
                    {proj.badge}
                  </span>
                  <span className="font-mono text-xs text-[#8b8d96]">{proj.category}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-space font-bold text-2xl sm:text-3xl text-[#121316] tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#5e6068] leading-relaxed">
                    {proj.tagline}
                  </p>
                </div>

                {/* Key Achievements Bullet Points */}
                <div className="space-y-2.5 pt-2">
                  {proj.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5e6068]">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#f3f1ec] text-[#121316] border border-[#e6e3dc]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#e6e3dc]">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundEngine.playTick()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#121316] hover:bg-black text-white font-mono text-xs font-medium transition-all shadow-xs"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink size={13} />
                  </a>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundEngine.playTick()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f3f1ec] hover:bg-[#e6e3dc] text-[#121316] font-mono text-xs font-medium transition-all border border-[#e6e3dc]"
                  >
                    <GithubIcon size={13} />
                    <span>View Source</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Clean Interactive Browser Mockup (Col 6) */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[#e6e3dc] bg-[#fbfaf7] overflow-hidden shadow-md">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#f3f1ec] border-b border-[#e6e3dc]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="font-mono text-[11px] text-[#8b8d96] bg-white px-3 py-1 rounded-md border border-[#e6e3dc] flex items-center gap-1.5">
                      <span>https://{proj.mockupPreview.header}</span>
                    </div>
                    <div className="w-8" />
                  </div>

                  {/* Browser Mockup Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-space font-semibold text-sm sm:text-base text-[#121316]">
                        {proj.mockupPreview.title}
                      </div>
                      <span className="font-mono text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                        Active Node
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#e6e3dc] text-xs font-mono text-[#5e6068] leading-relaxed">
                      {proj.mockupPreview.highlight}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      {proj.mockupPreview.chips.map((chip, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-2.5 rounded-lg bg-white border border-[#e6e3dc] text-[#121316] font-medium truncate"
                        >
                          {chip}
                        </div>
                      ))}
                    </div>

                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-mono text-xs font-semibold transition-colors border border-indigo-200"
                    >
                      Click to interact with live deployment →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
