import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/audio';
import { Sparkles, CheckCircle2, Play, Volume2, RotateCcw } from 'lucide-react';
import { AnimatedGradient, type PresetName } from '@/components/ui/animated-gradient';

export const AiExperiments: React.FC = () => {
  // 3D Turntable State
  const [isPlaying, setIsPlaying] = useState(false);
  const [turntableRotation, setTurntableRotation] = useState(0);
  const [isDarkDisc, setIsDarkDisc] = useState(true);

  // Shader Studio State
  const [shaderPreset, setShaderPreset] = useState<PresetName>('Oceanic');

  // Hiring Assessment Interactive State
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Turntable Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (isPlaying) {
        setTurntableRotation((prev) => (prev + 0.035) % (Math.PI * 2));
      }

      // 1. Turntable Plinth / Base (Rounded rectangle in dark grey)
      ctx.fillStyle = isDarkDisc ? '#0c0d13' : '#e4e5eb';
      ctx.strokeStyle = isDarkDisc ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx - 130, cy - 100, 260, 200, 24);
      ctx.fill();
      ctx.stroke();

      // 2. Vinyl Record Outer Grooves
      const vinylRadius = 75;
      ctx.save();
      ctx.translate(cx - 30, cy);
      ctx.rotate(turntableRotation);

      ctx.fillStyle = '#08080a';
      ctx.beginPath();
      ctx.arc(0, 0, vinylRadius, 0, Math.PI * 2);
      ctx.fill();

      // Concentric Vinyl Sound Grooves
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      for (let r = 35; r < vinylRadius - 4; r += 7) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Vinyl Center Label
      ctx.fillStyle = isDarkDisc ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fill();

      // Center Spindle Hole
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 3. Tonearm Assembly
      const armPivotX = cx + 80;
      const armPivotY = cy - 60;

      // Arm Base
      ctx.fillStyle = isDarkDisc ? '#22232e' : '#cbd5e1';
      ctx.beginPath();
      ctx.arc(armPivotX, armPivotY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Arm Rod
      const armTargetX = isPlaying ? cx - 15 : cx + 25;
      const armTargetY = isPlaying ? cy + 10 : cy - 20;

      ctx.strokeStyle = isDarkDisc ? '#94a3b8' : '#475569';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(armPivotX, armPivotY);
      ctx.lineTo(armTargetX, armTargetY);
      ctx.stroke();

      // Cartridge / Stylus
      ctx.fillStyle = isDarkDisc ? '#ffffff' : '#000000';
      ctx.beginPath();
      ctx.rect(armTargetX - 4, armTargetY - 4, 10, 8);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, turntableRotation, isDarkDisc]);

  const questions = [
    {
      q: 'Which architecture eliminates cold starts in MongoDB Atlas serverless clusters?',
      options: ['DNS caching patch', 'Infinite retry while loop', 'Raw socket pooling without TLS'],
      correct: 0,
    },
    {
      q: 'What is the optimal graph structure in LangGraph for self-correcting RAG?',
      options: ['Linear sequential chain', 'Cyclic state machine with supervisor', 'Single LLM zero-shot prompt'],
      correct: 1,
    },
    {
      q: 'How does C++ ray-casting achieve sub-8ms point-in-polygon checks across 1,000 coords?',
      options: ['Zero-copy vertex buffers & pre-filtered bounding boxes', 'Calling external Google Maps API', 'Storing coords in localStorage'],
      correct: 0,
    },
  ];

  const handleAnswer = (index: number) => {
    soundEngine.playTick();
    setSelectedAnswer(index);
    if (index === questions[assessmentStep].correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (assessmentStep + 1 < questions.length) {
        setAssessmentStep((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 600);
  };

  const resetAssessment = () => {
    soundEngine.playChapterSelect();
    setAssessmentStep(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <section id="experiments" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Section Header (Poulo Video Frame 00:36) */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/70 text-xs font-mono mb-3">
          <Sparkles size={12} className="text-white" />
          <span>Interactive Prototypes &amp; 3D Lab</span>
        </div>
        <h2 className="font-sans font-bold text-4xl sm:text-5xl text-white tracking-tight">
          AI Experiments
        </h2>
        <p className="font-sans text-sm text-[#a1a1aa] mt-2 max-w-xl">
          High-performance canvas prototypes, interactive components, and algorithmic hiring sandboxes.
        </p>
      </div>

      {/* 3 Interactive Cards Grid (Video Frames 00:37 - 00:43) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Experiment 1: Interactive 3D Turntable Component (Frame 00:37 - 00:42) */}
        <div className="rounded-3xl bg-[#090a0f] border border-white/10 p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-medium text-white/40 uppercase">
                Interactive 3D Turntable
              </span>
              <button
                onClick={() => {
                  soundEngine.playTick();
                  setIsDarkDisc(!isDarkDisc);
                }}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 transition-colors cursor-pointer"
              >
                {isDarkDisc ? 'Light Theme' : 'Dark Theme'}
              </button>
            </div>

            {/* Turntable Canvas Preview */}
            <div className="w-full h-56 flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 overflow-hidden relative">
              <canvas
                ref={canvasRef}
                width={320}
                height={220}
                className="w-full h-full cursor-pointer"
                onClick={() => {
                  soundEngine.playChapterSelect();
                  setIsPlaying(!isPlaying);
                }}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-black font-sans font-bold text-xs shadow-lg">
                    Click to Spin
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="font-sans font-bold text-base text-white">
                Interactive Canvas Turntable
              </h4>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Smooth 60FPS rotational canvas audio player with tonearm physics, vinyl grooving, and dual-tone lighting controls.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={() => {
                soundEngine.playChapterSelect();
                setIsPlaying(!isPlaying);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-sans font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {isPlaying ? <Volume2 size={13} className="text-black" /> : <Play size={13} className="fill-current" />}
              <span>{isPlaying ? 'Pause Vinyl' : 'Play Vinyl'}</span>
            </button>
            <span className="font-mono text-[10px] text-white/40">Canvas 2D Audio UI</span>
          </div>
        </div>

        {/* Experiment 2: WebGL2 Fragment Shader Studio */}
        <div className="rounded-3xl bg-[#090a0f] border border-white/10 p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-medium text-white/40 uppercase">
                WebGL2 Fragment Shader
              </span>
              <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                60 FPS Hardware
              </span>
            </div>

            {/* Live Shader Canvas with Interactive Preset Switcher */}
            <div className="w-full h-56 rounded-2xl border border-white/5 relative overflow-hidden bg-black flex flex-col justify-between p-3">
              <AnimatedGradient
                config={{ preset: shaderPreset, speed: 12 }}
                noise={{ opacity: 0.12 }}
                className="absolute inset-0"
              />
              <div className="relative z-10 flex flex-wrap gap-1 justify-end">
                {(['Aurora', 'Oceanic', 'Amber', 'Toxic', 'Ghost'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      soundEngine.playTick();
                      setShaderPreset(preset);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      shaderPreset === preset
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'bg-black/60 text-white/70 hover:bg-black/90 hover:text-white border border-white/10 backdrop-blur-sm'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="relative z-10 flex items-center gap-1.5 text-[10px] font-mono text-white/80 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Preset: {shaderPreset}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-sans font-bold text-base text-white">
                Procedural Noise &amp; Fluid Gradient
              </h4>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Hardware-accelerated fragment shader running real-time Perlin noise distortion, swirl iterations, and dynamic palette blending.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/40">GLSL / Fragment Shader</span>
            <span className="font-mono text-[10px] text-cyan-400">Interactive Canvas</span>
          </div>
        </div>

        {/* Experiment 3: Hiring Assessment Simulator (Frame 00:38 - 00:43) */}
        <div className="rounded-3xl bg-[#090a0f] border border-white/10 p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-medium text-white/40 uppercase">
                Hiring Assessment
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Interactive Test
              </span>
            </div>

            {/* Assessment Card Box */}
            <div className="w-full min-h-[224px] p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col justify-between">
              {!showResult ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
                    <span>Question {assessmentStep + 1} of {questions.length}</span>
                    <span>Score: {score}</span>
                  </div>

                  <p className="font-sans font-medium text-xs text-white leading-relaxed">
                    {questions[assessmentStep].q}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {questions[assessmentStep].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswer(oIdx)}
                        className={`w-full text-left p-2 rounded-xl text-[11px] font-sans transition-all cursor-pointer ${
                          selectedAnswer === oIdx
                            ? oIdx === questions[assessmentStep].correct
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-white/[0.03] hover:bg-white/[0.08] text-white/70 border border-white/5'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <CheckCircle2 size={28} className="text-emerald-400 mx-auto" />
                  <div>
                    <h5 className="font-sans font-bold text-sm text-white">Assessment Complete!</h5>
                    <p className="font-mono text-xs text-emerald-400 mt-1">Score: {score} / {questions.length} Verified</p>
                  </div>
                  <button
                    onClick={resetAssessment}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono mx-auto cursor-pointer"
                  >
                    <RotateCcw size={11} />
                    <span>Try Again</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="font-sans font-bold text-base text-white">
                Algorithmic Assessment Test
              </h4>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Interactive real-time test of systems architecture, memory models, and stateful graph engineering.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/40">3 Technical Questions</span>
            <span className="font-mono text-[10px] text-emerald-400">Live Evaluation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
