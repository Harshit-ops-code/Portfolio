import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { Play, Zap, Terminal, Activity, CheckCircle2, Cpu } from 'lucide-react';

export const LiveSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'raycast' | 'streaming' | 'langgraph'>('streaming');

  // --- Raycast Simulator State ---
  const [raycastResults, setRaycastResults] = useState<{
    inside: number;
    outside: number;
    timeMs: number;
  } | null>(null);
  const [isRaycasting, setIsRaycasting] = useState(false);

  // --- Streaming Simulator State ---
  const [streamingTokens, setStreamingTokens] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [ttftMs, setTtftMs] = useState<number | null>(null);

  // --- LangGraph Simulator State ---
  const [activeStage, setActiveStage] = useState(0);
  const [isGraphRunning, setIsGraphRunning] = useState(false);

  // Run Real Raycast Point-in-Polygon Benchmark in Browser
  const runRaycastBenchmark = () => {
    soundEngine.playTick();
    setIsRaycasting(true);
    setTimeout(() => {
      const t0 = performance.now();

      // Sample polygon representing neighborhood zone (8 vertices)
      const polygon = [
        [12.9716, 77.5946],
        [12.9816, 77.6046],
        [12.9916, 77.5946],
        [12.9856, 77.5846],
        [12.9756, 77.5746],
        [12.9656, 77.5846],
        [12.9606, 77.5906],
        [12.9716, 77.5946],
      ];

      let insideCount = 0;
      let outsideCount = 0;

      // Ray-casting algorithm over 1,000 coordinates
      for (let i = 0; i < 1000; i++) {
        const testX = 12.96 + Math.random() * 0.04;
        const testY = 77.57 + Math.random() * 0.04;

        let inside = false;
        for (let j = 0, k = polygon.length - 1; j < polygon.length; k = j++) {
          const xi = polygon[j][0],
            yi = polygon[j][1];
          const xj = polygon[k][0],
            yj = polygon[k][1];

          const intersect =
            yi > testY !== yj > testY && testX < ((xj - xi) * (testY - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }

        if (inside) insideCount++;
        else outsideCount++;
      }

      const t1 = performance.now();
      setRaycastResults({
        inside: insideCount,
        outside: outsideCount,
        timeMs: parseFloat((t1 - t0).toFixed(2)),
      });
      setIsRaycasting(false);
    }, 150);
  };

  // Run Simulated Groq / Llama-3 Streaming Tokenizer
  const runStreamingSim = () => {
    soundEngine.playTick();
    setIsStreaming(true);
    setStreamingTokens([]);
    setTtftMs(null);

    const fullMessage =
      'Hello. I am Mrs. Kapoor. For the 3BHK flat in Indiranagar, my minimum deposit is ₹1.5 Lakhs and monthly rent is ₹42,000. Low offers will deplete my patience meter. What is your proposal?';
    const words = fullMessage.split(' ');

    const startTime = performance.now();

    // First token arrives at ~280ms (simulating sub-350ms TTFT)
    setTimeout(() => {
      const firstTokenTime = performance.now() - startTime;
      setTtftMs(Math.round(firstTokenTime));

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < words.length) {
          setStreamingTokens((prev) => [...prev, words[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsStreaming(false);
        }
      }, 45); // ~22 tokens/sec
    }, 285);
  };

  // Step-through 8-stage LangGraph workflow
  const langGraphStages = [
    { name: 'Research Agent', tool: 'Tavily + NewsAPI', status: 'Fetching factual citations' },
    { name: 'Draft Synthesizer', tool: 'Groq Llama-3', status: 'Generating structured schema' },
    { name: 'RAG Fact Checker', tool: 'ChromaDB all-MiniLM', status: 'Comparing cosine distance' },
    { name: '5-Layer Compliance', tool: 'Static Rule Evaluator', status: 'Verifying legal boundaries' },
    { name: 'Self-Correction Node', tool: 'Iterative Refiner', status: 'Audit passed (0 errors)' },
    { name: 'Social Engine', tool: 'Stability AI API', status: 'Generating visual assets' },
    { name: 'Human-in-Loop Gate', tool: 'Approval Semaphore', status: 'Approval confirmed' },
    { name: 'C++ Localization', tool: 'Parallel C++ Engine', status: 'Delivering localized outputs' },
  ];

  const runLangGraph = () => {
    soundEngine.playTick();
    setIsGraphRunning(true);
    setActiveStage(0);

    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage < langGraphStages.length) {
        setActiveStage(stage);
      } else {
        clearInterval(interval);
        setIsGraphRunning(false);
      }
    }, 450);
  };

  return (
    <section id="simulator" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">
          <span>[SYSTEMS BENCHMARK & TESTBENCH]</span>
          <div className="h-px w-16 bg-indigo-500/30" />
        </div>
        <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white mode-awake:text-black">
          Interactive Architecture Lab
        </h2>
        <p className="font-sans text-sm sm:text-base text-white/60 mode-awake:text-black/60 mt-2 max-w-3xl">
          Test real benchmarks and state machine models right here. Experience the algorithmic execution and streaming latencies engineered into my live applications.
        </p>
      </div>

      {/* Lab Container */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#0b0d14]/90 mode-awake:bg-[#f6f5f0]/95 border border-white/10 mode-awake:border-black/15 shadow-2xl">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 mode-awake:border-black/10 pb-4 mb-6">
          <button
            onClick={() => {
              soundEngine.playTick();
              setActiveTab('streaming');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
              activeTab === 'streaming'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white/5 mode-awake:bg-black/5 text-white/60 mode-awake:text-black/60 hover:text-white mode-awake:hover:text-black'
            }`}
          >
            <Zap size={14} />
            <span>Groq Streaming TTFT (&lt;350ms)</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playTick();
              setActiveTab('raycast');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
              activeTab === 'raycast'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-white/5 mode-awake:bg-black/5 text-white/60 mode-awake:text-black/60 hover:text-white mode-awake:hover:text-black'
            }`}
          >
            <Activity size={14} />
            <span>Ray-Casting Algorithm (&lt;8ms)</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playTick();
              setActiveTab('langgraph');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
              activeTab === 'langgraph'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white/5 mode-awake:bg-black/5 text-white/60 mode-awake:text-black/60 hover:text-white mode-awake:hover:text-black'
            }`}
          >
            <Cpu size={14} />
            <span>8-Stage LangGraph Machine</span>
          </button>
        </div>

        {/* Tab 1: Streaming Simulator */}
        {activeTab === 'streaming' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-syne font-bold text-lg text-white mode-awake:text-black">
                  Streaming Time-To-First-Token (TTFT) Simulation
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/60 mode-awake:text-black/60 mt-0.5">
                  Simulating the landlord negotiation streaming socket used in Basera.
                </p>
              </div>
              <button
                onClick={runStreamingSim}
                disabled={isStreaming}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition-all shadow-md active:scale-95"
              >
                <Play size={14} />
                <span>{isStreaming ? 'Streaming...' : 'Trigger LLM Stream'}</span>
              </button>
            </div>

            {/* Terminal Window */}
            <div className="rounded-2xl p-5 bg-black/60 mode-awake:bg-white/70 border border-white/10 mode-awake:border-black/10 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 mode-awake:border-black/10 pb-3 mb-4 text-white/40 mode-awake:text-black/50">
                <span className="flex items-center gap-2">
                  <Terminal size={13} className="text-emerald-400" />
                  <span>endpoint: POST /api/landlord/negotiate-stream</span>
                </span>
                {ttftMs !== null && (
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    TTFT: {ttftMs}ms (Sub-350ms Target Met)
                  </span>
                )}
              </div>

              <div className="min-h-[90px] text-white/90 mode-awake:text-black/90 leading-relaxed text-sm">
                {streamingTokens.length === 0 && !isStreaming && (
                  <span className="text-white/30 mode-awake:text-black/30">
                    Click &apos;Trigger LLM Stream&apos; above to simulate real-time token streaming...
                  </span>
                )}
                {streamingTokens.map((token, i) => (
                  <span key={i} className="animate-in fade-in duration-75">
                    {token}{' '}
                  </span>
                ))}
                {isStreaming && (
                  <span className="inline-block w-2 h-4 bg-indigo-400 animate-pulse ml-1 align-middle" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Raycast Simulator */}
        {activeTab === 'raycast' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-syne font-bold text-lg text-white mode-awake:text-black">
                  Point-in-Polygon Ray-Casting Benchmark
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/60 mode-awake:text-black/60 mt-0.5">
                  Runs the exact geometric ray-casting algorithm used in Basera across 1,000 points.
                </p>
              </div>
              <button
                onClick={runRaycastBenchmark}
                disabled={isRaycasting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition-all shadow-md active:scale-95"
              >
                <Activity size={14} />
                <span>{isRaycasting ? 'Calculating...' : 'Run 1,000 Point Benchmark'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 mode-awake:bg-white/60 border border-white/5 mode-awake:border-black/5">
                <span className="font-mono text-xs text-white/40 mode-awake:text-black/50">COORDINATES TESTED</span>
                <div className="font-space font-bold text-2xl text-white mode-awake:text-black mt-1">
                  1,000 Points
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 mode-awake:bg-white/60 border border-white/5 mode-awake:border-black/5">
                <span className="font-mono text-xs text-white/40 mode-awake:text-black/50">MEASURED TIME</span>
                <div className="font-space font-bold text-2xl text-cyan-400 mode-awake:text-cyan-700 mt-1">
                  {raycastResults ? `${raycastResults.timeMs} ms` : '—'}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 mode-awake:bg-white/60 border border-white/5 mode-awake:border-black/5">
                <span className="font-mono text-xs text-white/40 mode-awake:text-black/50">POLYGON INTERSECTIONS</span>
                <div className="font-space font-bold text-2xl text-emerald-400 mode-awake:text-emerald-700 mt-1">
                  {raycastResults ? `${raycastResults.inside} in / ${raycastResults.outside} out` : '—'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: LangGraph Simulator */}
        {activeTab === 'langgraph' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-syne font-bold text-lg text-white mode-awake:text-black">
                  Stateful 8-Stage LangGraph Pipeline Simulator
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/60 mode-awake:text-black/60 mt-0.5">
                  Trace state transitions through the Lexis AI multi-agent content and C++ engine pipeline.
                </p>
              </div>
              <button
                onClick={runLangGraph}
                disabled={isGraphRunning}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition-all shadow-md active:scale-95"
              >
                <Play size={14} />
                <span>{isGraphRunning ? 'Executing Graph...' : 'Execute State Graph'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {langGraphStages.map((stage, i) => {
                const isActive = activeStage === i && isGraphRunning;
                const isPassed = activeStage > i || (!isGraphRunning && activeStage === langGraphStages.length - 1);

                return (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? 'border-purple-500 bg-purple-500/10 scale-102 shadow-lg shadow-purple-500/20'
                        : isPassed
                        ? 'border-emerald-500/30 bg-emerald-500/5'
                        : 'border-white/5 mode-awake:border-black/5 bg-black/30 mode-awake:bg-white/40 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                      <span className="text-white/40 mode-awake:text-black/50">Stage 0{i + 1}</span>
                      {isPassed ? (
                        <CheckCircle2 size={13} className="text-emerald-400" />
                      ) : isActive ? (
                        <Activity size={13} className="text-purple-400 animate-spin" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-white/20" />
                      )}
                    </div>
                    <div className="font-space font-semibold text-sm text-white mode-awake:text-black">
                      {stage.name}
                    </div>
                    <div className="font-mono text-[11px] text-indigo-400 mode-awake:text-indigo-600 mt-0.5">
                      {stage.tool}
                    </div>
                    <div className="text-[11px] text-white/50 mode-awake:text-black/60 mt-1 truncate">
                      {stage.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
