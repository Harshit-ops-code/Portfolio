import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KeycapOrb, { type Keycap } from '@/components/ui/keycap-orb';
import { gsap } from '@/lib/gsapSetup';
import {
  CheckCircle2,
  Keyboard,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
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

type FinishKey = TechItem['finish'];

const FINISH_ACCENTS: Record<
  FinishKey,
  { glow: string; border: string; badge: string; text: string; spotlight: string }
> = {
  cobalt: {
    glow: 'rgba(59, 130, 246, 0.38)',
    border: 'rgba(96, 165, 250, 0.72)',
    badge: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
    text: 'text-blue-300',
    spotlight: 'rgba(59, 130, 246, 0.20)',
  },
  lime: {
    glow: 'rgba(16, 185, 129, 0.35)',
    border: 'rgba(52, 211, 153, 0.70)',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    text: 'text-emerald-300',
    spotlight: 'rgba(16, 185, 129, 0.18)',
  },
  glass: {
    glow: 'rgba(99, 102, 241, 0.40)',
    border: 'rgba(129, 140, 248, 0.75)',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30',
    text: 'text-indigo-300',
    spotlight: 'rgba(99, 102, 241, 0.22)',
  },
  ash: {
    glow: 'rgba(56, 189, 248, 0.34)',
    border: 'rgba(56, 189, 248, 0.68)',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
    text: 'text-sky-300',
    spotlight: 'rgba(56, 189, 248, 0.18)',
  },
  ink: {
    glow: 'rgba(167, 139, 250, 0.36)',
    border: 'rgba(167, 139, 250, 0.72)',
    badge: 'bg-violet-500/15 text-violet-300 border-violet-400/30',
    text: 'text-violet-300',
    spotlight: 'rgba(167, 139, 250, 0.20)',
  },
};

const CATEGORIES = [
  { id: 'all', label: 'All Stack', count: 20 },
  { id: 'ai', label: 'AI & Multi-Agent', count: 6 },
  { id: 'backend', label: 'Backend & Systems', count: 6 },
  { id: 'database', label: 'Databases & Storage', count: 4 },
  { id: 'frontend', label: 'Frontend & Web', count: 4 },
];

function getItemsForCategory(category: string): TechItem[] {
  return ALL_TECH_ITEMS.filter((item) => {
    if (category === 'all') return true;
    if (category === 'ai') return ['lg', 'hf', 'gq', 'gm', 'lc', 'cd'].includes(item.id);
    if (category === 'backend') return ['fa', 'nd', 'cpp', 'py', 'dk', 'rc-alg'].includes(item.id);
    if (category === 'database') return ['mg', 'sq', 'pg', 'ch-vec'].includes(item.id);
    if (category === 'frontend') return ['nx', 'rc', 'ts', 'ex'].includes(item.id);
    return true;
  });
}

function modIndex(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [wheelSlot, setWheelSlot] = useState<number>(0);
  const [dragOffsetPx, setDragOffsetPx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [autoSpin, setAutoSpin] = useState<boolean>(false);
  const [customKeyText, setCustomKeyText] = useState<string | null>(null);
  const [stageWidth, setStageWidth] = useState<number>(1100);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-stack-header] > *', {
        y: 28,
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

      gsap.from('[data-stack-orb]', {
        y: 44,
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-stack-orb]',
          start: 'top 86%',
          once: true,
        },
      });

      gsap.from('[data-stack-wheel], [data-stack-inspector]', {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-stack-wheel]',
          start: 'top 88%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);
  const dragMetaRef = useRef<{
    active: boolean;
    startX: number;
    lastX: number;
    lastTime: number;
    velocityX: number;
    moved: boolean;
  }>({
    active: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0,
    moved: false,
  });

  const filteredTechItems = getItemsForCategory(activeCategory);
  const itemCount = filteredTechItems.length || 1;

  // Responsive geometry for the 3D horizontal wheel
  const isMobile = stageWidth < 600;
  const isTablet = stageWidth >= 600 && stageWidth < 980;
  const wheelGeom = isMobile
    ? { radiusX: 330, cardW: 172, cardH: 196, arcDrop: 84, depthZ: 190, dragStepPx: 115 }
    : isTablet
      ? { radiusX: 430, cardW: 198, cardH: 218, arcDrop: 110, depthZ: 250, dragStepPx: 140 }
      : { radiusX: 525, cardW: 224, cardH: 238, arcDrop: 132, depthZ: 310, dragStepPx: 165 };

  const effectiveProgress = wheelSlot - dragOffsetPx / wheelGeom.dragStepPx;
  const centerSlot = Math.round(effectiveProgress);
  const activeRealIndex = modIndex(wheelSlot, itemCount);
  const displayRealIndex = modIndex(centerSlot, itemCount);
  const selectedTech = filteredTechItems[displayRealIndex] || ALL_TECH_ITEMS[0];
  const activeAccent = FINISH_ACCENTS[selectedTech.finish];

  // Observe wheel container width for crisp responsive arc math
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    setStageWidth(el.clientWidth || 1100);
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setStageWidth(entry.contentRect.width);
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Active Keycap HUD text: custom override from physical key press or active center card
  const activeItem = filteredTechItems[activeRealIndex] || ALL_TECH_ITEMS[0];
  const pressedKeyText = customKeyText || activeItem.name;

  // Step wheel by relative spoke delta
  const stepWheel = useCallback((delta: number) => {
    setCustomKeyText(null);
    setWheelSlot((prev) => prev + delta);
  }, []);

  // Auto-spin timer (pauses while hovered or dragging)
  useEffect(() => {
    if (!autoSpin || isHovered || isDragging) return;
    const id = window.setInterval(() => {
      setWheelSlot((prev) => prev + 1);
    }, 2800);
    return () => window.clearInterval(id);
  }, [autoSpin, isHovered, isDragging]);

  // Drag handlers using window listeners so card clicks & dragging both work seamlessly
  const handleWheelPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore right/non-primary mouse buttons or clicks inside nested buttons like arrows
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const target = e.target as HTMLElement;
    if (target.closest('[data-wheel-control="true"]')) return;

    const now = performance.now();
    dragMetaRef.current = {
      active: true,
      startX: e.clientX,
      lastX: e.clientX,
      lastTime: now,
      velocityX: 0,
      moved: false,
    };
    setIsDragging(true);
    setDragOffsetPx(0);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: PointerEvent) => {
      const meta = dragMetaRef.current;
      if (!meta.active) return;

      const delta = e.clientX - meta.startX;
      if (Math.abs(delta) > 6) {
        meta.moved = true;
      }

      const now = performance.now();
      const dt = Math.max(8, now - meta.lastTime);
      const instantVx = (e.clientX - meta.lastX) / dt;
      meta.velocityX = meta.velocityX * 0.45 + instantVx * 0.55;
      meta.lastX = e.clientX;
      meta.lastTime = now;

      setDragOffsetPx(delta);
    };

    const onPointerUp = (e: PointerEvent) => {
      const meta = dragMetaRef.current;
      if (!meta.active) return;
      meta.active = false;

      const delta = e.clientX - meta.startX;
      const projectedDelta = delta + meta.velocityX * 135;
      let stepDelta = Math.round(-projectedDelta / wheelGeom.dragStepPx);

      if (Math.abs(delta) > 26 && stepDelta === 0) {
        stepDelta = delta < 0 ? 1 : -1;
      }

      if (stepDelta !== 0) {
        setCustomKeyText(null);
        setWheelSlot((prev) => prev + stepDelta);
      }

      setDragOffsetPx(0);
      setIsDragging(false);

      // Keep `moved` latched briefly through the synchronous `click` event dispatch
      window.setTimeout(() => {
        dragMetaRef.current.moved = false;
      }, 60);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isDragging, wheelGeom.dragStepPx]);

  // Handle category filter change cleanly
  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setActiveCategory(catId);
    setWheelSlot(0);
    setDragOffsetPx(0);
    setCustomKeyText(null);
  };

  // Sync Keycap Orb clicks -> spin wheel smoothly to matching technology
  const handleKeycapPress = (key: Keycap) => {
    const icon = key.icon;
    const label = key.label || icon || 'Mechanical Key';
    setCustomKeyText(label);

    const match = ALL_TECH_ITEMS.find(
      (t) =>
        t.orbIcon === icon ||
        t.name.toLowerCase().includes(label.toLowerCase()) ||
        label.toLowerCase().includes(t.name.toLowerCase())
    );
    if (!match) return;

    const currentItems = getItemsForCategory(activeCategory);
    const idxInCurrent = currentItems.findIndex((t) => t.id === match.id);

    if (idxInCurrent >= 0) {
      const currentMod = modIndex(wheelSlot, currentItems.length);
      let diff = idxInCurrent - currentMod;
      if (diff > currentItems.length / 2) diff -= currentItems.length;
      if (diff < -currentItems.length / 2) diff += currentItems.length;
      setWheelSlot((prev) => prev + diff);
    } else {
      const allIdx = ALL_TECH_ITEMS.findIndex((t) => t.id === match.id);
      setActiveCategory('all');
      setWheelSlot(allIdx >= 0 ? allIdx : 0);
      setDragOffsetPx(0);
    }
  };

  // Horizontal wheel/trackpad gesture on the wheel stage
  const wheelLockRef = useRef<number>(0);
  const handleWheelGesture = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 12) {
      const now = performance.now();
      if (now - wheelLockRef.current < 160) return;
      wheelLockRef.current = now;
      stepWheel(e.deltaX > 0 ? 1 : -1);
    }
  };

  // Keyboard Left/Right navigation when wheel stage is focused
  const handleWheelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepWheel(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepWheel(-1);
    }
  };

  // Compute visible 9-slot circular window around centerSlot
  // Outer slots (|offset| >= 3) stay mounted at opacity 0 so wrap transitions never flash across screen
  const visibleSlots = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((rel) => centerSlot + rel);

  const getCardTransform = (offset: number) => {
    const thetaDeg = Math.max(-88, Math.min(88, offset * 24));
    const thetaRad = (thetaDeg * Math.PI) / 180;
    const absOff = Math.abs(offset);

    const x = Math.sin(thetaRad) * wheelGeom.radiusX;
    const y = (1 - Math.cos(thetaRad)) * wheelGeom.arcDrop;
    const z = -(1 - Math.cos(thetaRad)) * wheelGeom.depthZ;
    const rotateY = -thetaDeg * 0.56;
    const rotateZ = thetaDeg * 0.16;
    const scale = Math.max(0.56, 1.04 - absOff * 0.14);
    const opacity = absOff >= 2.8 ? 0 : Math.max(0, 1 - Math.pow(absOff / 2.8, 1.45));
    const zIndex = Math.round(60 - absOff * 12);

    return { x, y, z, rotateY, rotateZ, scale, opacity, zIndex };
  };

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div data-stack-header className="space-y-2">
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
      <div
        data-stack-orb
        className="rounded-3xl sm:rounded-[36px] bg-[#030306] border border-white/10 p-4 sm:p-7 shadow-2xl relative overflow-hidden mb-14"
      >
        {/* HUD Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-2 border-b border-white/[0.06] mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
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
        <div
          data-cursor-text="DRAG ORB"
          className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-black/50 shadow-inner"
        >
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

      {/* ========================================================
          3D HORIZONTAL WHEEL SLIDER + TELEMETRY INSPECTOR DECK
         ======================================================== */}
      <div className="space-y-6">
        {/* Top Controls: Category Filter Pills + Wheel Auto-Spin & Index HUD */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.id
                      ? 'bg-black/15 text-black'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs text-white/50 hidden sm:inline">
              SPOKE{' '}
              <strong className="text-white">
                {String(displayRealIndex + 1).padStart(2, '0')}
              </strong>{' '}
              / {String(itemCount).padStart(2, '0')}
            </span>

            <button
              onClick={() => setAutoSpin((s) => !s)}
              className={`px-3 py-1.5 rounded-full font-mono text-[11px] border transition-all cursor-pointer flex items-center gap-1.5 ${
                autoSpin
                  ? 'bg-indigo-500/20 border-indigo-400/60 text-indigo-200'
                  : 'bg-white/[0.04] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]'
              }`}
              title="Toggle Auto-Spin Wheel"
            >
              {autoSpin ? <Pause size={12} /> : <Play size={12} />}
              <span>{autoSpin ? 'Auto-Spin ON' : 'Auto-Spin'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            3D CURVED HORIZONTAL WHEEL STAGE
           ======================================================== */}
        <div
          ref={stageRef}
          tabIndex={0}
          data-stack-wheel
          data-horizontal-wheel="true"
          data-cursor-text="DRAG WHEEL"
          onKeyDown={handleWheelKeyDown}
          onWheel={handleWheelGesture}
          onPointerDown={handleWheelPointerDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full h-[350px] sm:h-[390px] flex flex-col items-center justify-center overflow-hidden select-none outline-none touch-pan-y ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          {/* Ambient center spotlight synced with active tech finish */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[240px] rounded-full pointer-events-none transition-colors duration-500"
            style={{
              background: `radial-gradient(circle at center, ${activeAccent.spotlight}, transparent 70%)`,
            }}
          />

          {/* Subtle Curved Wheel Rim Guide Lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="wheel-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="25%" stopColor="rgba(129,140,248,0.22)" />
                <stop offset="50%" stopColor="rgba(129,140,248,0.65)" />
                <stop offset="75%" stopColor="rgba(129,140,248,0.22)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <ellipse
              cx="600"
              cy="640"
              rx="660"
              ry="490"
              fill="none"
              stroke="url(#wheel-arc-grad)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <ellipse
              cx="600"
              cy="670"
              rx="690"
              ry="505"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </svg>

          {/* 3D Perspective Carousel Plane */}
          <div
            className="relative w-full h-[275px] sm:h-[295px] flex items-center justify-center"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {visibleSlots.map((vSlot) => {
              const realIdx = modIndex(vSlot, itemCount);
              const item = filteredTechItems[realIdx] || ALL_TECH_ITEMS[0];
              const offset = vSlot - effectiveProgress;
              const isCentered = Math.abs(offset) < 0.45;
              const isVisible = Math.abs(offset) < 2.75;
              const accent = FINISH_ACCENTS[item.finish];
              const tf = getCardTransform(offset);

              // Position newly mounted outer slots gently past the horizon
              const entryDir = offset >= 0 ? 1 : -1;
              const entryTf = getCardTransform(offset + entryDir * 0.9);

              return (
                <motion.button
                  key={`${activeCategory}-${vSlot}`}
                  type="button"
                  onClick={() => {
                    if (dragMetaRef.current.moved) return;
                    if (vSlot !== wheelSlot) {
                      setCustomKeyText(null);
                      setWheelSlot(vSlot);
                    }
                  }}
                  initial={{
                    x: entryTf.x,
                    y: entryTf.y,
                    z: entryTf.z,
                    rotateY: entryTf.rotateY,
                    rotateZ: entryTf.rotateZ,
                    scale: entryTf.scale,
                    opacity: 0,
                  }}
                  animate={{
                    x: tf.x,
                    y: tf.y,
                    z: tf.z,
                    rotateY: tf.rotateY,
                    rotateZ: tf.rotateZ,
                    scale: tf.scale,
                    opacity: tf.opacity,
                  }}
                  transition={
                    isDragging
                      ? { duration: 0.04, ease: 'linear' }
                      : { type: 'spring', stiffness: 280, damping: 28, mass: 0.85 }
                  }
                  style={{
                    position: 'absolute',
                    width: `${wheelGeom.cardW}px`,
                    height: `${wheelGeom.cardH}px`,
                    zIndex: tf.zIndex,
                    transformStyle: 'preserve-3d',
                    pointerEvents: isVisible ? 'auto' : 'none',
                    borderColor: isCentered ? accent.border : 'rgba(255,255,255,0.10)',
                    boxShadow: isCentered
                      ? `0 22px 50px -12px rgba(0,0,0,0.85), 0 0 36px -4px ${accent.glow}`
                      : '0 14px 32px -12px rgba(0,0,0,0.75)',
                  }}
                  className={`rounded-3xl p-4 sm:p-5 flex flex-col justify-between text-left border transition-colors duration-300 group select-none cursor-pointer ${
                    isCentered
                      ? 'bg-gradient-to-b from-[#171926] via-[#0e1018] to-[#08090e]'
                      : 'bg-gradient-to-b from-[#10121b]/95 via-[#090a10]/95 to-[#06070b]/95 hover:border-white/25'
                  }`}
                >
                  {/* Top Specular Rim Highlight on Active Card */}
                  {isCentered && (
                    <div
                      className="absolute inset-x-6 top-0 h-[1px] pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)`,
                      }}
                    />
                  )}

                  {/* Top Row: Category + Hotkey */}
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border truncate ${
                        isCentered
                          ? accent.badge
                          : 'bg-white/[0.05] text-white/55 border-white/10'
                      }`}
                    >
                      {item.category}
                    </span>

                    {item.hotkey && (
                      <span className="font-mono text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-white/[0.06] text-white/60 border border-white/10 shrink-0">
                        [{item.hotkey.toUpperCase()}]
                      </span>
                    )}
                  </div>

                  {/* Centerpiece: Floating Logo Lens */}
                  <div className="my-auto flex flex-col items-center text-center py-2">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-3 border relative transition-transform duration-300 ${
                        isCentered
                          ? 'bg-black/90 border-white/25 scale-105'
                          : 'bg-black/65 border-white/10 group-hover:scale-105'
                      }`}
                      style={
                        isCentered
                          ? { boxShadow: `0 0 24px -4px ${accent.glow}` }
                          : undefined
                      }
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                        {item.logo}
                      </div>
                    </div>

                    <h4 className="font-kanit font-bold text-base sm:text-xl text-white tracking-tight mt-3 leading-tight truncate max-w-full">
                      {item.name}
                    </h4>
                    <p className="font-mono text-[10px] sm:text-[11px] text-white/45 truncate max-w-full mt-0.5">
                      {item.deployment}
                    </p>
                  </div>

                  {/* Bottom Metric Strip */}
                  <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between gap-2 w-full">
                    <span
                      className={`font-mono text-[10px] truncate ${
                        isCentered ? accent.text : 'text-white/60'
                      }`}
                    >
                      {item.benchmark}
                    </span>

                    {isCentered && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Floating Prev / Next Circular Controls on Left & Right Edges */}
          <button
            type="button"
            data-wheel-control="true"
            onClick={() => stepWheel(-1)}
            aria-label="Spin wheel backward"
            className="flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[75] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-white text-white hover:text-black border border-white/20 items-center justify-center backdrop-blur-md transition-all shadow-xl cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            data-wheel-control="true"
            onClick={() => stepWheel(1)}
            aria-label="Spin wheel forward"
            className="flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[75] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-white text-white hover:text-black border border-white/20 items-center justify-center backdrop-blur-md transition-all shadow-xl cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ========================================================
            SYNCHRONIZED LIVE TELEMETRY INSPECTOR DECK
           ======================================================== */}
        <div
          data-stack-inspector
          className="rounded-3xl bg-[#07080d]/95 border border-white/12 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none transition-colors duration-500"
            style={{
              background: `radial-gradient(circle at center, ${activeAccent.spotlight}, transparent 70%)`,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTech.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10"
            >
              {/* Col 1: Tech Identity Lockup */}
              <div className="lg:col-span-4 flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-5 lg:pb-0 lg:pr-6">
                <div
                  className="w-16 h-16 rounded-2xl bg-black/85 border border-white/15 flex items-center justify-center p-3 shadow-lg shrink-0"
                  style={{ boxShadow: `0 0 24px -6px ${activeAccent.glow}` }}
                >
                  <div className="w-9 h-9 flex items-center justify-center">
                    {selectedTech.logo}
                  </div>
                </div>
                <div className="min-w-0">
                  <span
                    className={`font-mono text-[10px] font-semibold tracking-wider uppercase block ${activeAccent.text}`}
                  >
                    {selectedTech.category}
                  </span>
                  <h3 className="font-kanit font-bold text-2xl sm:text-3xl text-white tracking-tight mt-0.5 truncate">
                    {selectedTech.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-mono text-emerald-400">
                    <CheckCircle2 size={13} />
                    <span>Core Stack</span>
                  </div>
                </div>
              </div>

              {/* Col 2: Highlight + Where It's Used */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-5 lg:pb-0 lg:pr-6">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                    Benchmark
                  </span>
                  <div className={`font-sans font-semibold text-sm ${activeAccent.text}`}>
                    {selectedTech.benchmark}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                    Used In
                  </span>
                  <div className="font-sans font-medium text-sm text-white/90">
                    {selectedTech.deployment}
                  </div>
                </div>
              </div>

              {/* Col 3: Role + Hotkey */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                    How I Use It
                  </span>
                  {selectedTech.hotkey && (
                    <span className="font-mono text-[10px] text-white/45">
                      Keycap:{' '}
                      <kbd className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded">
                        [{selectedTech.hotkey.toUpperCase()}]
                      </kbd>
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                  {selectedTech.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
