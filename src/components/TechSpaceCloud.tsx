import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audio';
import { Orbit, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export interface TechNode {
  id: string;
  name: string;
  category: 'ai' | 'backend' | 'data';
  color: string;
  badgeColor: string;
  level: string;
  projectUsed: string;
  description: string;
}

const ORBIT_AI: TechNode[] = [
  {
    id: 'langgraph',
    name: 'LangGraph',
    category: 'ai',
    color: '#DC2626',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    level: 'Multi-Agent Orchestration',
    projectUsed: 'Lexis AI (8 Stateful Stages)',
    description: 'Cyclic state machines, human-in-the-loop gates, and multi-agent consensus.',
  },
  {
    id: 'groq',
    name: 'Groq Llama-3',
    category: 'ai',
    color: '#EA580C',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    level: '<350ms TTFT Streaming',
    projectUsed: 'Basera & TruthShield',
    description: 'Ultra-low latency streaming inference, landlord persona simulator, and fact parsing.',
  },
  {
    id: 'chromadb',
    name: 'ChromaDB',
    category: 'ai',
    color: '#9333EA',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    level: 'Vector Embeddings',
    projectUsed: 'Lexis AI (all-MiniLM-L6-v2)',
    description: 'Local cosine similarity search for 5-layer compliance auditing and RAG verification.',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face CV',
    category: 'ai',
    color: '#D97706',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    level: '92% Forensic Accuracy',
    projectUsed: 'TruthShield Sentinel',
    description: 'Deepfake visual forensic models, artifact analysis, and face boundary verification.',
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    category: 'ai',
    color: '#4F46E5',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    level: 'Multimodal Fallback',
    projectUsed: 'TruthShield Security Core',
    description: 'Cross-model verification and deep forensic explanation generation.',
  },
];

const ORBIT_BACKEND: TechNode[] = [
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    color: '#0D9488',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    level: 'Sub-200ms Latency',
    projectUsed: 'Lexis AI & TruthShield',
    description: 'High-throughput asynchronous APIs processing 10,000+ daily requests.',
  },
  {
    id: 'nextjs',
    name: 'Next.js 16',
    category: 'backend',
    color: '#111827',
    badgeColor: 'bg-gray-100 text-gray-800 border-gray-300',
    level: 'Full-Stack Modern App',
    projectUsed: 'Basera (Live on Vercel)',
    description: 'Server components, dynamic streaming routes, and Leaflet map integration.',
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'backend',
    color: '#0284C7',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    level: 'Concurrent UI Systems',
    projectUsed: 'Lexis AI, TruthShield, Portfolio',
    description: 'Concurrent rendering, canvas integration, and custom hook state engines.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'backend',
    color: '#2563EB',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    level: 'Strict Type Safety',
    projectUsed: 'All Web Platforms',
    description: 'Strict type contracts across React 19, Vite, and Node.js microservices.',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'backend',
    color: '#0284C7',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    level: 'Microservice Containers',
    projectUsed: 'Lexis AI & Expense MVP',
    description: 'Isolated reproducible builds, multi-stage Dockerfiles, and container deployments.',
  },
];

const ORBIT_DATA: TechNode[] = [
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'data',
    color: '#16A34A',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    level: 'Optimized Compound Indices',
    projectUsed: 'Basera Relocation Engine',
    description: 'DNS connection patching reducing cold-start latency from 2,000ms to <150ms.',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL & SQL',
    category: 'data',
    color: '#0369A1',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    level: 'Relational ACID Storage',
    projectUsed: 'TruthShield & Expense System',
    description: 'Row-level security policies, query optimization, and structured audit logs.',
  },
  {
    id: 'raycast',
    name: 'Ray-Casting Alg',
    category: 'data',
    color: '#0891B2',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    level: '<8ms across 1,000 Coords',
    projectUsed: 'Basera Geospatial Search',
    description: 'Custom point-in-polygon math calculating custom boundary intersections.',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'data',
    color: '#00599C',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    level: '300+ Problems Solved',
    projectUsed: 'Lexis AI & CodeChef',
    description: 'High-throughput parallel localization engine and competitive DSA problem solving.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'data',
    color: '#2563EB',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    level: 'Primary Backend & AI',
    projectUsed: 'TruthShield, Lexis AI, Juris',
    description: 'FastAPI REST architectures, asynchronous data pipelines, and Pytest coverage.',
  },
];

export const TechSpaceCloud: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechNode>(ORBIT_AI[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  // Smooth continuous ambient orbit animation (pauses on hover)
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (!isPaused && !isDraggingRef.current) {
        setRotationAngle((prev) => (prev + 0.18) % 360);
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Drag to spin orbits
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    setRotationAngle((prev) => (prev + dx * 0.4) % 360);
    lastXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section id="tech-galaxy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          <Orbit size={13} className="animate-spin" style={{ animationDuration: '10s' }} />
          <span>02 // Interactive Tech Galaxy</span>
        </div>
        <h2 className="font-space font-bold text-3xl sm:text-5xl text-[#121316] tracking-tight">
          Technologies in Orbit
        </h2>
        <p className="font-sans text-base text-[#5e6068] max-w-2xl">
          Three concentric celestial orbital rings (AI, Systems, and Data). Click any planetary node to inspect technical metrics and production usage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center paper-card rounded-3xl p-6 sm:p-10 bg-white border border-[#e6e3dc] shadow-sm">
        {/* Interactive Concentric Orbits Canvas (Col 7) */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
            setIsPaused(false);
          }}
          onMouseEnter={() => setIsPaused(true)}
          className="lg:col-span-7 h-[460px] sm:h-[500px] relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing bg-[#fbfaf7] rounded-2xl border border-[#e6e3dc] overflow-hidden"
        >
          {/* Sun Core (Harshit Kumar Core) */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-500/20 flex flex-col items-center justify-center font-space z-10 pointer-events-none">
            <Sparkles size={16} className="text-amber-300 mb-0.5" />
            <span className="font-bold text-xs tracking-tight">Core</span>
            <span className="font-mono text-[9px] text-indigo-200">IIIT Kota</span>
          </div>

          {/* Orbit 1: Inner Ring (AI & Multi-Agent) - Radius 95px */}
          <div className="absolute w-[190px] h-[190px] rounded-full border border-dashed border-red-300 pointer-events-none" />
          {ORBIT_AI.map((node, i) => {
            const count = ORBIT_AI.length;
            const angleDeg = (360 / count) * i + rotationAngle;
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 95;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            const isSelected = selectedTech.id === node.id;

            return (
              <button
                key={node.id}
                onClick={() => {
                  soundEngine.playTick();
                  setSelectedTech(node);
                }}
                className={`absolute transition-transform duration-75 cursor-pointer z-20`}
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold border shadow-xs transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-700 shadow-md scale-110 ring-2 ring-red-400/40'
                      : 'bg-white hover:bg-red-50 text-red-900 border-red-200 hover:scale-105'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="whitespace-nowrap">{node.name}</span>
                </div>
              </button>
            );
          })}

          {/* Orbit 2: Middle Ring (Backend & Frameworks) - Radius 160px */}
          <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-indigo-200 pointer-events-none" />
          {ORBIT_BACKEND.map((node, i) => {
            const count = ORBIT_BACKEND.length;
            const angleDeg = (360 / count) * i - rotationAngle * 0.7; // counter-rotates
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 160;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            const isSelected = selectedTech.id === node.id;

            return (
              <button
                key={node.id}
                onClick={() => {
                  soundEngine.playTick();
                  setSelectedTech(node);
                }}
                className={`absolute transition-transform duration-75 cursor-pointer z-20`}
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold border shadow-xs transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-110 ring-2 ring-indigo-400/40'
                      : 'bg-white hover:bg-indigo-50 text-indigo-900 border-indigo-200 hover:scale-105'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="whitespace-nowrap">{node.name}</span>
                </div>
              </button>
            );
          })}

          {/* Orbit 3: Outer Ring (Data & Core Systems) - Radius 220px */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-emerald-200 pointer-events-none" />
          {ORBIT_DATA.map((node, i) => {
            const count = ORBIT_DATA.length;
            const angleDeg = (360 / count) * i + rotationAngle * 0.5;
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 220;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            const isSelected = selectedTech.id === node.id;

            return (
              <button
                key={node.id}
                onClick={() => {
                  soundEngine.playTick();
                  setSelectedTech(node);
                }}
                className={`absolute transition-transform duration-75 cursor-pointer z-20`}
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold border shadow-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-110 ring-2 ring-emerald-400/40'
                      : 'bg-white hover:bg-emerald-50 text-emerald-900 border-emerald-200 hover:scale-105'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="whitespace-nowrap">{node.name}</span>
                </div>
              </button>
            );
          })}

          {/* Helper caption */}
          <div className="absolute bottom-3 left-3 font-mono text-[11px] text-[#8b8d96] pointer-events-none flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-[#e6e3dc]">
            <Compass size={12} />
            <span>Hover to pause · Drag to spin orbits</span>
          </div>

          <div className="absolute top-3 right-3 font-mono text-[10px] text-[#8b8d96] space-y-1 bg-white/80 p-2 rounded-md border border-[#e6e3dc]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Orbit 1: AI &amp; LangGraph</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Orbit 2: Frameworks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Orbit 3: Data &amp; C++</span>
            </div>
          </div>
        </div>

        {/* Selected Technology Inspector (Col 5) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#fbfaf7] border border-[#e6e3dc] space-y-5">
          <div className="flex items-center justify-between border-b border-[#e6e3dc] pb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shadow-xs font-mono text-sm"
                style={{ backgroundColor: selectedTech.color }}
              >
                {selectedTech.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-700 font-semibold">
                  Category: {selectedTech.category}
                </span>
                <h3 className="font-space font-bold text-2xl text-[#121316]">
                  {selectedTech.name}
                </h3>
              </div>
            </div>

            <span className={`font-mono text-xs px-2.5 py-1 rounded-md border ${selectedTech.badgeColor}`}>
              Active Node
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-white border border-[#e6e3dc]">
              <span className="font-mono text-[10px] text-[#8b8d96] uppercase tracking-wider">
                Technical Benchmark
              </span>
              <div className="font-space font-semibold text-lg text-indigo-700 mt-0.5">
                {selectedTech.level}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#e6e3dc]">
              <span className="font-mono text-[10px] text-[#8b8d96] uppercase tracking-wider">
                Production System Usage
              </span>
              <div className="font-space font-medium text-[#121316] mt-0.5">
                {selectedTech.projectUsed}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#e6e3dc]">
              <span className="font-mono text-[10px] text-[#8b8d96] uppercase tracking-wider">
                Architectural Responsibility
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#5e6068] mt-1 leading-relaxed">
                {selectedTech.description}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 font-mono text-xs text-emerald-700">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>Verified across live deployments</span>
          </div>
        </div>
      </div>
    </section>
  );
};
