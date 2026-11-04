import React from 'react';
import { soundEngine } from '../utils/audio';
import { X, ArrowUpRight, Terminal, Layers, ShieldCheck, MapPin, Code2, Orbit } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface IndexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IndexModal: React.FC<IndexModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const chapters = [
    {
      id: 'hero',
      num: '00',
      title: 'Identity & System Manifest',
      desc: 'Harshit Kumar portrait, IIIT Kota CSE, and sub-200ms GenAI infrastructure.',
      icon: <Terminal size={16} className="text-indigo-400" />,
    },
    {
      id: 'tech-galaxy',
      num: '01',
      title: '3D Celestial Tech Galaxy',
      desc: 'Interactive 3D space cloud with real-time planetary nodes and telemetry.',
      icon: <Orbit size={16} className="text-cyan-400" />,
    },
    {
      id: 'lexis-ai',
      num: '02',
      title: 'Lexis AI — Multi-Agent Content Pipeline',
      desc: '8-stage stateful LangGraph pipeline, Groq LLMs & C++ translation engine.',
      icon: <Layers size={16} className="text-purple-400" />,
    },
    {
      id: 'truthshield',
      num: '03',
      title: 'TruthShield — Deepfake Forensic Sentinel',
      desc: 'Hugging Face CV models & Groq LLMs; <120ms text inference, Chrome Ext V3.',
      icon: <ShieldCheck size={16} className="text-emerald-400" />,
    },
    {
      id: 'basera',
      num: '04',
      title: 'Basera & Homie — Relocation Engine',
      desc: 'Groq streaming LLM landlord simulator (<350ms TTFT) & custom ray-casting (<8ms).',
      icon: <MapPin size={16} className="text-amber-400" />,
    },
    {
      id: 'simulator',
      num: '05',
      title: 'Interactive Engineering Simulator',
      desc: 'Live benchmark for TTFT streaming, polygon raycast, and agent state graph.',
      icon: <Code2 size={16} className="text-pink-400" />,
    },
    {
      id: 'systems',
      num: '06',
      title: 'DSA, Architecture & Leadership',
      desc: '300+ C++ DSA problems, CodeChef 2-Star, TechKnow Council (6,000+ footfall).',
      icon: <Terminal size={16} className="text-blue-400" />,
    },
    {
      id: 'contact',
      num: '07',
      title: 'Let’s Build — Contact & Dispatch',
      desc: 'Direct communication channels, email dispatch, and availability.',
      icon: <ArrowUpRight size={16} className="text-rose-400" />,
    },
  ];

  const handleSelect = (id: string) => {
    soundEngine.playChapterSelect();
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0b0c13] mode-awake:bg-[#f3f1ec] border border-white/10 mode-awake:border-black/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 mode-awake:border-black/10 pb-4 mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-indigo-400 font-semibold">
              Navigation Registry
            </span>
            <h3 className="font-syne font-bold text-xl text-white mode-awake:text-black">
              System Chapters & Modules
            </h3>
          </div>
          <button
            onClick={() => {
              soundEngine.playTick();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/5 mode-awake:bg-black/5 hover:bg-white/10 mode-awake:hover:bg-black/10 text-white/70 mode-awake:text-black/70 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chapters list */}
        <div className="space-y-3">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              onClick={() => handleSelect(ch.id)}
              onMouseEnter={() => soundEngine.playTick()}
              className="group p-3 sm:p-4 rounded-xl border border-white/5 mode-awake:border-black/5 hover:border-indigo-500/40 mode-awake:hover:border-indigo-600/40 bg-white/[0.02] mode-awake:bg-black/[0.02] hover:bg-indigo-500/5 mode-awake:hover:bg-indigo-600/5 cursor-pointer transition-all flex items-start gap-4"
            >
              <div className="font-mono text-xs font-semibold text-white/40 mode-awake:text-black/40 group-hover:text-indigo-400 pt-0.5">
                {ch.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {ch.icon}
                  <h4 className="font-space font-medium text-sm sm:text-base text-white/90 mode-awake:text-black/90 group-hover:text-white mode-awake:group-hover:text-black transition-colors">
                    {ch.title}
                  </h4>
                </div>
                <p className="font-sans text-xs text-white/50 mode-awake:text-black/60 mt-1">
                  {ch.desc}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/20 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1"
              />
            </div>
          ))}
        </div>

        {/* Direct Footer Links */}
        <div className="mt-8 pt-4 border-t border-white/10 mode-awake:border-black/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/60 mode-awake:text-black/60">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Harshit-ops-code"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white mode-awake:hover:text-black flex items-center gap-1 transition-colors"
            >
              <GithubIcon size={13} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/harshit-kumar-ai/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white mode-awake:hover:text-black flex items-center gap-1 transition-colors"
            >
              <LinkedinIcon size={13} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://leetcode.com/u/Randomguy5830/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white mode-awake:hover:text-black transition-colors"
            >
              LeetCode
            </a>
          </div>
          <div>IIIT Kota · 2024–2028</div>
        </div>
      </div>
    </div>
  );
};
