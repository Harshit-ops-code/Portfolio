import React, { useState } from 'react';
import KeycapOrb, { type Keycap } from '@/components/ui/keycap-orb';
import { CheckCircle2, Keyboard } from 'lucide-react';
import {
  PythonLogo,
  CppLogo,
  ReactLogo,
  NextLogo,
  DockerLogo,
  MongoLogo,
  PostgresLogo,
  FastApiLogo,
  LangGraphLogo,
  GroqLogo,
  ChromaLogo,
  HuggingFaceLogo,
  TypeScriptLogo,
  GeminiLogo,
  NodeLogo,
  LangChainLogo,
  ChromeExtLogo,
  SqliteLogo,
  RayCastingLogo,
} from './TechLogos';

interface TechItem {
  id: string;
  name: string;
  label: string;
  category: string;
  benchmark: string;
  deployment: string;
  role: string;
  logo: React.ReactNode;
  finish: 'ink' | 'ash' | 'cobalt' | 'lime' | 'glass';
  hotkey?: string;
  orbIcon?: string;
}

const ALL_TECH_ITEMS: TechItem[] = [
  // Column 1
  {
    id: 'lg',
    name: 'LangGraph',
    label: 'Multi-Agent Orchestration',
    category: 'AI',
    benchmark: 'Multi-Agent Orchestration',
    deployment: 'Lexis AI (8 Stateful Stages)',
    role: 'Cyclic state machines, human-in-the-loop gates, and multi-agent consensus pipelines.',
    logo: <LangGraphLogo className="w-5 h-5" />,
    finish: 'ink',
    hotkey: 'l',
    orbIcon: 'langgraph',
  },
  {
    id: 'hf',
    name: 'Hugging Face CV',
    label: '92% Forensic Accuracy',
    category: 'Computer Vision',
    benchmark: '92% Forensic Accuracy',
    deployment: 'TruthShield Core',
    role: 'Facial artifact detection, deepfake frequency domain analysis, and visual tampering scoring.',
    logo: <HuggingFaceLogo className="w-5 h-5" />,
    finish: 'ash',
    hotkey: 'h',
    orbIcon: 'huggingface',
  },
  {
    id: 'fa',
    name: 'FastAPI',
    label: 'Sub-200ms REST APIs',
    category: 'Backend',
    benchmark: 'Sub-200ms REST APIs',
    deployment: 'Lexis AI & TruthShield',
    role: 'Asynchronous event-loop endpoints, Pydantic data schemas, and high-throughput streaming.',
    logo: <FastApiLogo className="w-5 h-5" />,
    finish: 'ash',
    hotkey: 'f',
    orbIcon: 'fastapi',
  },
  {
    id: 'nd',
    name: 'Node.js',
    label: 'Microservice Services',
    category: 'Backend',
    benchmark: 'Microservice Services',
    deployment: 'Basera Core',
    role: 'Lightweight async I/O worker routines, cluster processes, and WebSocket signaling.',
    logo: <NodeLogo className="w-5 h-5" />,
    finish: 'lime',
    hotkey: 'j',
  },
  {
    id: 'cpp',
    name: 'C++',
    label: '300+ Problems Solved',
    category: 'Systems',
    benchmark: '300+ Problems Solved',
    deployment: 'Core Ray-Casting Engine',
    role: 'Low-latency memory management, spatial partitioning, and high-performance graph processing.',
    logo: <CppLogo className="w-5 h-5" />,
    finish: 'cobalt',
    hotkey: 'c',
    orbIcon: 'cpp',
  },
  {
    id: 'rc-alg',
    name: 'Ray-Casting Alg',
    label: '<8ms across 1,000 Coords',
    category: 'Algorithms',
    benchmark: '<8ms across 1,000 Coords',
    deployment: 'Basera Geofencing',
    role: 'Zero-lag point-in-polygon boundary resolution for verified neighborhood mapping.',
    logo: <RayCastingLogo className="w-5 h-5" />,
    finish: 'glass',
    hotkey: 'a',
  },
  {
    id: 'ch-vec',
    name: 'ChromaDB Vector',
    label: 'Cosine Distance Embeddings',
    category: 'Vector DB',
    benchmark: 'Cosine Distance Embeddings',
    deployment: 'Lexis AI Auditing',
    role: 'Embedding storage with fast cosine nearest-neighbor search for verified legal precedent.',
    logo: <ChromaLogo className="w-5 h-5" />,
    finish: 'glass',
    hotkey: 'v',
    orbIcon: 'chromadb',
  },

  // Column 2
  {
    id: 'gq',
    name: 'Groq (Llama-3)',
    label: '<358ms TTFT Streaming',
    category: 'AI Inference',
    benchmark: '<358ms TTFT Streaming',
    deployment: 'Lexis AI & Basera',
    role: 'Ultra-fast LPU inference enabling conversational AI negotiations with zero noticeable delay.',
    logo: <GroqLogo className="w-5 h-5" />,
    finish: 'cobalt',
    hotkey: 'g',
    orbIcon: 'groq',
  },
  {
    id: 'gm',
    name: 'Gemini API',
    label: 'Multimodal Fallback',
    category: 'Multimodal AI',
    benchmark: 'Multimodal Fallback',
    deployment: 'TruthShield Sentinel',
    role: 'High-context reasoning, complex cross-modal verification, and visual tamper forensic inspection.',
    logo: <GeminiLogo className="w-5 h-5" />,
    finish: 'lime',
    hotkey: 'e',
    orbIcon: 'gemini',
  },
  {
    id: 'nx',
    name: 'Next.js 16',
    label: 'Full-Stack Modern App',
    category: 'Full-Stack',
    benchmark: 'Full-Stack Modern App',
    deployment: 'Lexis AI & Basera',
    role: 'Turbopack bundling, server actions, dynamic streaming hydration, and edge middleware routing.',
    logo: <NextLogo className="w-5 h-5" />,
    finish: 'ash',
    hotkey: 'n',
    orbIcon: 'nextjs',
  },
  {
    id: 'dk',
    name: 'Docker',
    label: 'Containerization',
    category: 'DevOps',
    benchmark: 'Containerization',
    deployment: 'Multi-Stage Production',
    role: 'Lightweight reproducible Linux containers, isolated runtime environments, and CI orchestration.',
    logo: <DockerLogo className="w-5 h-5" />,
    finish: 'ash',
    hotkey: 'd',
    orbIcon: 'docker',
  },
  {
    id: 'py',
    name: 'Python',
    label: 'Primary Backend & AI',
    category: 'Backend & AI',
    benchmark: 'Primary Backend & AI',
    deployment: 'All AI Workloads',
    role: 'NumPy tensor processing, LangChain / LangGraph agents, and high-concurrency microservices.',
    logo: <PythonLogo className="w-5 h-5" />,
    finish: 'cobalt',
    hotkey: 'p',
    orbIcon: 'python',
  },
  {
    id: 'mg',
    name: 'MongoDB',
    label: 'Compound Indices & DNS Patch',
    category: 'Database',
    benchmark: 'Compound Indices & DNS Patch',
    deployment: 'Basera & TruthShield',
    role: 'High-scale document database with patched connection timeouts and optimized shard queries.',
    logo: <MongoLogo className="w-5 h-5" />,
    finish: 'lime',
    hotkey: 'm',
    orbIcon: 'mongodb',
  },
  {
    id: 'sq',
    name: 'SQLite',
    label: 'Embedded Zero-Config DB',
    category: 'Database',
    benchmark: 'Embedded Zero-Config DB',
    deployment: 'Local Caching Layer',
    role: 'Zero-latency local cache store for offline evaluation records and immediate response recall.',
    logo: <SqliteLogo className="w-5 h-5" />,
    finish: 'ink',
    hotkey: 'q',
  },

  // Column 3
  {
    id: 'cd',
    name: 'ChromaDB',
    label: 'Vector Embeddings',
    category: 'Vector Search',
    benchmark: 'Vector Embeddings',
    deployment: 'Lexis AI RAG',
    role: 'Local semantic memory store powering ground-truth legal citations without hallucinations.',
    logo: <ChromaLogo className="w-5 h-5" />,
    finish: 'glass',
    hotkey: 'u',
    orbIcon: 'chromadb',
  },
  {
    id: 'lc',
    name: 'LangChain',
    label: 'Agentic Tool Calling',
    category: 'Agentic Framework',
    benchmark: 'Agentic Tool Calling',
    deployment: 'Lexis AI',
    role: 'Dynamic function invocation, API tool calling schemas, and prompt chaining pipelines.',
    logo: <LangChainLogo className="w-5 h-5" />,
    finish: 'lime',
    hotkey: 'k',
  },
  {
    id: 'rc',
    name: 'React 19',
    label: 'Concurrent UI Systems',
    category: 'Frontend',
    benchmark: 'Concurrent UI Systems',
    deployment: 'All Frontends',
    role: 'Concurrent rendering mode, non-blocking UI transitions, and modular component hierarchy.',
    logo: <ReactLogo className="w-5 h-5" />,
    finish: 'glass',
    hotkey: 'r',
    orbIcon: 'react',
  },
  {
    id: 'ex',
    name: 'Manifest V3 Extensions',
    label: 'Chrome Browser Ext',
    category: 'Browser Extension',
    benchmark: 'Chrome Browser Ext',
    deployment: 'TruthShield Extension',
    role: 'Background service workers, active tab DOM scraping, and instant URL safety telemetry.',
    logo: <ChromeExtLogo className="w-5 h-5" />,
    finish: 'ash',
    hotkey: 'x',
  },
  {
    id: 'ts',
    name: 'TypeScript',
    label: 'Type-Safe Architecture',
    category: 'Language',
    benchmark: 'Type-Safe Architecture',
    deployment: 'Enterprise Standards',
    role: 'End-to-end interface contracts, compile-time safety, and zero runtime type errors.',
    logo: <TypeScriptLogo className="w-5 h-5" />,
    finish: 'cobalt',
    hotkey: 's',
    orbIcon: 'typescript',
  },
  {
    id: 'pg',
    name: 'PostgreSQL & SQL',
    label: 'Relational ACID Storage',
    category: 'Database',
    benchmark: 'Relational ACID Storage',
    deployment: 'Enterprise Store',
    role: 'ACID transactions, relational schema integrity, and composite index tuning.',
    logo: <PostgresLogo className="w-5 h-5" />,
    finish: 'cobalt',
    hotkey: 'o',
  },
];

// Curated Keycaps with Real Tech Stack Logos for the WebGL2 Orb
const HARSHIT_KEYS: Keycap[] = [
  { icon: 'cpp', label: 'C++', finish: 'cobalt', hotkey: 'c' },
  { icon: 'react', label: 'React 19', finish: 'glass', hotkey: 'r' },
  { icon: 'python', label: 'Python', finish: 'cobalt', hotkey: 'p' },
  { icon: 'langgraph', label: 'LangGraph', finish: 'ink', hotkey: 'l' },
  { icon: 'groq', label: 'Groq', finish: 'cobalt', hotkey: 'g' },
  { icon: 'docker', label: 'Docker', finish: 'ash', hotkey: 'd' },
  { icon: 'nextjs', label: 'Next.js 16', finish: 'ash', hotkey: 'n' },
  { icon: 'mongodb', label: 'MongoDB', finish: 'lime', hotkey: 'm' },
  { icon: 'fastapi', label: 'FastAPI', finish: 'ash', hotkey: 'f' },
  { icon: 'typescript', label: 'TypeScript', finish: 'cobalt', hotkey: 's' },
  { icon: 'chromadb', label: 'ChromaDB RAG', finish: 'glass', hotkey: 'v' },
  { icon: 'huggingface', label: 'Hugging Face', finish: 'ash', hotkey: 'h' },
  { icon: 'gemini', label: 'Gemini Multimodal', finish: 'lime', hotkey: 'e' },
  { icon: 'iiit', label: 'IIIT Kota', finish: 'cobalt', hotkey: 'i' },
  { icon: 'terminal', label: 'Terminal', finish: 'ink', hotkey: 't' },
  { icon: 'code', label: 'LeetCode 300+', finish: 'cobalt', hotkey: 'k' },
  { icon: 'shield', label: 'TruthShield Core', finish: 'glass', hotkey: 'w' },
  { icon: 'bolt', label: 'Low Latency TTFT', finish: 'ash', hotkey: 'b' },
  { icon: 'layers', label: '8 Stateful Stages', finish: 'glass', hotkey: 'y' },
  { icon: 'search', label: 'Vector Cosine Search', finish: 'ink', hotkey: 'q' },
  { icon: 'star', label: 'ET Hackathon Top 6k', finish: 'lime', hotkey: 'x' },
  { icon: 'gear', label: 'DNS Optimization', finish: 'ash', hotkey: 'o' },
  { icon: 'cube', label: 'Container Cluster', finish: 'glass', hotkey: 'u' },
  { icon: 'check', label: 'Production Verified', finish: 'lime', hotkey: 'z' },
];

export const TechStack: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem>(ALL_TECH_ITEMS[0]);
  const [pressedKeyText, setPressedKeyText] = useState<string>('LangGraph');

  const handleSelectTech = (item: TechItem) => {
    setSelectedTech(item);
    setPressedKeyText(item.name);
  };

  const handleKeycapPress = (key: Keycap) => {
    const icon = key.icon;
    const label = key.label || icon || 'Mechanical Key';
    setPressedKeyText(label);

    const match = ALL_TECH_ITEMS.find(
      (t) =>
        t.orbIcon === icon ||
        t.name.toLowerCase().includes(label.toLowerCase()) ||
        label.toLowerCase().includes(t.name.toLowerCase())
    );
    if (match) {
      setSelectedTech(match);
    }
  };

  // Group into 3 columns
  const col1 = ALL_TECH_ITEMS.slice(0, 7);
  const col2 = ALL_TECH_ITEMS.slice(7, 14);
  const col3 = ALL_TECH_ITEMS.slice(14, 20);

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-medium block">
            Skills &amp; Technologies
          </span>
          <h2 className="font-sans font-bold text-4xl sm:text-5xl text-white tracking-tight">
            My Stack
          </h2>
          <p className="font-sans text-sm text-[#a1a1aa] max-w-2xl">
            Technologies and frameworks used in production across distributed systems, autonomous multi-agent pipelines, and low-latency engines.
          </p>
        </div>
      </div>

      {/* 3D MECHANICAL KEYCAP ORB FLOATING STAGE */}
      <div className="rounded-3xl sm:rounded-[36px] bg-[#030306] border border-white/10 p-4 sm:p-7 shadow-2xl relative overflow-hidden mb-12">
        {/* HUD Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-2 border-b border-white/[0.06] mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-xs text-white/80">
              Active Keycap: <strong className="text-white font-semibold">{pressedKeyText}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-white/50">
            <Keyboard size={13} className="text-white/70" />
            <span>Type on physical keyboard or drag orb to rotate</span>
          </div>
        </div>

        {/* 3D Keycap Orb Canvas */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-black/50 shadow-inner">
          <KeycapOrb
            keys={HARSHIT_KEYS}
            rings={10}
            scale={0.72}
            speed={-0.6}
            height="460px"
            background="#030306"
            glow="#2563eb"
            onKeyPress={handleKeycapPress}
            palette={{
              ink: { cap: '#121318', legend: '#fafafa' },
              ash: { cap: '#22232e', legend: '#60a5fa' },
              cobalt: { cap: '#1d4ed8', legend: '#ffffff' },
              lime: { cap: '#10b981', legend: '#042f2e' },
              glass: { cap: '#6366f1', legend: '#ffffff' },
            }}
          />
        </div>
      </div>

      {/* 3-COLUMN PILL MATRIX + LIVE TELEMETRY INSPECTOR CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: 3 Columns of Tech Pills (Exact Layout from User Screenshot with Real SVG Logos) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Column 1 */}
          <div className="space-y-3">
            {col1.map((item) => {
              const isSelected = selectedTech.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTech(item)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#151724] border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                      : 'bg-[#090a10] border-white/[0.08] hover:border-white/20 hover:bg-[#0e1017]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 p-2 shadow-inner">
                    {item.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-sans font-semibold text-xs sm:text-sm text-white truncate">
                      {item.name}
                    </div>
                    <div className="font-mono text-[10px] text-white/40 truncate">
                      {item.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            {col2.map((item) => {
              const isSelected = selectedTech.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTech(item)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#151724] border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                      : 'bg-[#090a10] border-white/[0.08] hover:border-white/20 hover:bg-[#0e1017]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 p-2 shadow-inner">
                    {item.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-sans font-semibold text-xs sm:text-sm text-white truncate">
                      {item.name}
                    </div>
                    <div className="font-mono text-[10px] text-white/40 truncate">
                      {item.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            {col3.map((item) => {
              const isSelected = selectedTech.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTech(item)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#151724] border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                      : 'bg-[#090a10] border-white/[0.08] hover:border-white/20 hover:bg-[#0e1017]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 p-2 shadow-inner">
                    {item.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-sans font-semibold text-xs sm:text-sm text-white truncate">
                      {item.name}
                    </div>
                    <div className="font-mono text-[10px] text-white/40 truncate">
                      {item.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Live Telemetry Inspector Card (Exact Layout from User Screenshot with Real SVG Logo) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="rounded-3xl bg-[#08090e] border border-white/15 p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
            {/* Top Identity with Large Logo */}
            <div className="flex items-center gap-4 border-b border-white/[0.08] pb-5">
              <div className="w-14 h-14 rounded-2xl bg-black/80 border border-white/15 flex items-center justify-center p-3 shadow-lg shrink-0">
                {selectedTech.logo}
              </div>
              <div>
                <span className="font-mono text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
                  Category: {selectedTech.category}
                </span>
                <h3 className="font-sans font-bold text-2xl text-white tracking-tight mt-0.5">
                  {selectedTech.name}
                </h3>
              </div>
            </div>

            {/* Technical Benchmark */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                Technical Benchmark
              </span>
              <div className="font-sans font-semibold text-sm sm:text-base text-indigo-300">
                {selectedTech.benchmark}
              </div>
            </div>

            {/* Production Deployment */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                Production Deployment
              </span>
              <div className="font-sans font-medium text-xs sm:text-sm text-white/90">
                {selectedTech.deployment}
              </div>
            </div>

            {/* Architectural Role */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                Architectural Role
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                {selectedTech.role}
              </p>
            </div>

            {/* Status Footer */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 size={14} />
              <span>Integrated &amp; tested in production</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
