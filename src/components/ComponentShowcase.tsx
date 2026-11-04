import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { Check, ShieldCheck, Zap, Activity, AlertCircle } from 'lucide-react';

export const ComponentShowcase: React.FC = () => {
  const [toggleState, setToggleState] = useState(true);
  const [activeTab, setActiveTab] = useState<'agent' | 'speed' | 'rag'>('agent');
  const [isCopied, setIsCopied] = useState(false);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Section Subhead (Exact Poulo Video Frame 00:11) */}
      <div className="max-w-4xl mb-12">
        <h3 className="font-sans font-medium text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug">
          Engineered components and systems directly rooted in technical discovery, bridging low-latency algorithms with intuitive, responsive interfaces.
        </h3>
      </div>

      {/* Bento Grid of Interactive UI Widgets (Exact Layout from Video Frames 00:12 - 00:14) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Card 1: User / Agent Persona Card (Col 4) */}
        <div className="md:col-span-4 rounded-3xl bg-[#090a0f] border border-white/10 p-6 flex flex-col justify-between shadow-xl group hover:border-white/20 transition-all">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 overflow-hidden flex items-center justify-center font-bold text-white">
                HK
              </div>
              <div>
                <h4 className="font-sans font-bold text-base text-white">Harshit Kumar</h4>
                <p className="font-mono text-xs text-white/50">AI &amp; Systems Engineer</p>
                <p className="font-mono text-[10px] text-indigo-400">IIIT Kota · 2024–2028</p>
              </div>
            </div>

            <div className="pt-2 space-y-2 text-xs font-sans text-white/70">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span>Multi-Agent Pipelines</span>
                <span className="font-mono text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span>C++ Algorithmic Core</span>
                <span className="font-mono text-indigo-400 font-semibold">300+ Solved</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>Status: Available for Roles</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Card 2: Interactive Toggle & Pill Slider (Col 4) */}
        <div className="md:col-span-4 rounded-3xl bg-[#090a0f] border border-white/10 p-6 flex flex-col justify-between shadow-xl hover:border-white/20 transition-all">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase text-white/40 tracking-wider block">
              Interactive Component State
            </span>

            {/* Interactive Pill Switcher */}
            <div className="flex items-center justify-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <button
                onClick={() => {
                  soundEngine.playTick();
                  setToggleState(!toggleState);
                }}
                className={`relative w-28 h-12 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                  toggleState ? 'bg-white' : 'bg-white/10'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full transition-transform duration-300 flex items-center justify-center shadow-md ${
                    toggleState
                      ? 'translate-x-16 bg-black text-white'
                      : 'translate-x-0 bg-white text-black'
                  }`}
                >
                  {toggleState ? <Zap size={16} /> : <Activity size={16} />}
                </div>
              </button>
            </div>

            <div className="text-center font-mono text-xs text-white/60">
              State: <span className="text-white font-bold">{toggleState ? 'Low-Latency Streaming' : 'Batch Evaluation'}</span>
            </div>
          </div>

          {/* Interactive Button */}
          <button
            onClick={() => {
              soundEngine.playTick();
              setIsCopied(true);
              navigator.clipboard?.writeText('harshitkk5830@gmail.com');
              setTimeout(() => setIsCopied(false), 2000);
            }}
            className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-medium transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCopied ? <Check size={13} className="text-emerald-400" /> : <ShieldCheck size={13} />}
            <span>{isCopied ? 'Copied Contact!' : 'harshitkk5830@gmail.com'}</span>
          </button>
        </div>

        {/* Card 3: Live Latency & Telemetry SLA (Col 4) */}
        <div className="md:col-span-4 rounded-3xl bg-[#090a0f] border border-white/10 p-6 flex flex-col justify-between shadow-xl hover:border-white/20 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase text-white/40 tracking-wider">
                Production SLA Benchmarks
              </span>
              <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Passing
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span>Groq LPU TTFT:</span>
                <span className="text-emerald-400 font-bold">&lt; 350ms</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Polygon Ray-Casting:</span>
                <span className="text-indigo-400 font-bold">&lt; 8ms / 1k Coords</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Atlas DNS Cold Start:</span>
                <span className="text-emerald-400 font-bold">-92% (140ms)</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs text-white/60">
            <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
            <span>Zero downtime across 10k+ daily API requests</span>
          </div>
        </div>

        {/* Card 4: Interactive Code / Architectural Pipeline Sandbox (Col 12) */}
        <div className="md:col-span-12 rounded-3xl bg-[#06070a] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
              <h4 className="font-sans font-bold text-lg text-white">
                Studio Telemetry — Architecture Live Preview
              </h4>
            </div>

            {/* Micro Tab Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/5">
              {(['agent', 'speed', 'rag'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    soundEngine.playTick();
                    setActiveTab(tab);
                  }}
                  className={`px-3.5 py-1 rounded-full font-mono text-[11px] transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-black font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab === 'agent' ? 'Multi-Agent' : tab === 'speed' ? 'C++ Engine' : 'ChromaDB RAG'}
                </button>
              ))}
            </div>
          </div>

          {/* Active Sandbox Output */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-white/40 text-[10px] uppercase">Active Protocol</span>
              <div className="text-white font-semibold">
                {activeTab === 'agent' ? 'LangGraph Supervisor Cyclic Loop' : activeTab === 'speed' ? 'Direct Memory Polygon Ray-Cast' : 'Vector Cosine Space Embedding'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-white/40 text-[10px] uppercase">Execution Metric</span>
              <div className="text-emerald-400 font-semibold">
                {activeTab === 'agent' ? '8 Stages · 0 Hallucinations' : activeTab === 'speed' ? 'Sub-8ms latency @ 1,024 vertices' : 'all-MiniLM-L6-v2 Normalized'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-white/40 text-[10px] uppercase">Production Target</span>
              <div className="text-indigo-300 font-semibold">
                {activeTab === 'agent' ? 'Lexis AI (ET Hackathon Finalist)' : activeTab === 'speed' ? 'Basera & Homie Relocation Engine' : 'TruthShield Forensics Core'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

