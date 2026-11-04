import React, { useRef, useEffect, useState } from 'react';
import { soundEngine } from '../utils/audio';
import { RotateCw, Sparkles, Compass } from 'lucide-react';

interface ConstellationNode {
  id: string;
  label: string;
  isHub: boolean;
  hubId?: string;
  x: number;
  y: number;
  z: number;
  vx?: number;
  vy?: number;
  color: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
  description: string;
}

// 4 Primary Hubs + Orbiting Satellites (matching frames 00:55 - 00:58 of poulo.site)
const HUBS: ConstellationNode[] = [
  {
    id: 'hub-ai',
    label: 'GenAI & Multi-Agent Systems',
    isHub: true,
    x: -160,
    y: -80,
    z: 40,
    color: '#ffffff',
    description: 'Stateful supervisor graphs, cyclic agent loops, and RAG fact-checking.',
  },
  {
    id: 'hub-systems',
    label: 'Low-Latency C++ & Algorithms',
    isHub: true,
    x: 170,
    y: -70,
    z: -30,
    color: '#ffffff',
    description: 'Zero-copy memory layouts, ray-casting engines, and 300+ LeetCode DSA.',
  },
  {
    id: 'hub-fullstack',
    label: 'Full-Stack & Cloud Platforms',
    isHub: true,
    x: -120,
    y: 110,
    z: -40,
    color: '#ffffff',
    description: 'Next.js 16 App Router, React 19 concurrent state, and Docker containers.',
  },
  {
    id: 'hub-security',
    label: 'Security & Deepfake Forensics',
    isHub: true,
    x: 150,
    y: 90,
    z: 50,
    color: '#ffffff',
    description: 'Real-time computer vision artifact detection and Chrome Manifest V3 extensions.',
  },
];

const SATELLITES: Omit<ConstellationNode, 'x' | 'y' | 'z'>[] = [
  // AI Satellites
  {
    id: 'langgraph',
    label: 'LangGraph',
    isHub: false,
    hubId: 'hub-ai',
    color: '#ef4444',
    orbitRadius: 90,
    orbitSpeed: 0.007,
    orbitAngle: 0.2,
    description: '8-stage stateful supervisor graph with conditional human-in-the-loop gates.',
  },
  {
    id: 'groq',
    label: 'Groq Llama-3',
    isHub: false,
    hubId: 'hub-ai',
    color: '#f97316',
    orbitRadius: 105,
    orbitSpeed: -0.009,
    orbitAngle: 1.8,
    description: '<350ms TTFT streaming inference powering dynamic tenant-landlord negotiations.',
  },
  {
    id: 'chromadb',
    label: 'ChromaDB RAG',
    isHub: false,
    hubId: 'hub-ai',
    color: '#8b5cf6',
    orbitRadius: 80,
    orbitSpeed: 0.011,
    orbitAngle: 3.4,
    description: 'Local all-MiniLM-L6-v2 vector embeddings and 5-layer compliance auditor.',
  },
  {
    id: 'gemini',
    label: 'Gemini API',
    isHub: false,
    hubId: 'hub-ai',
    color: '#4285f4',
    orbitRadius: 115,
    orbitSpeed: 0.008,
    orbitAngle: 4.8,
    description: 'Cross-model verification and deep explanation synthesis fallback.',
  },

  // Systems Satellites
  {
    id: 'cpp',
    label: 'C++ Systems',
    isHub: false,
    hubId: 'hub-systems',
    color: '#00599c',
    orbitRadius: 85,
    orbitSpeed: 0.008,
    orbitAngle: 0.5,
    description: 'Multithreaded text localization pipeline and point-in-polygon ray-caster.',
  },
  {
    id: 'raycast',
    label: 'Ray-Casting Alg',
    isHub: false,
    hubId: 'hub-systems',
    color: '#06b6d4',
    orbitRadius: 110,
    orbitSpeed: -0.007,
    orbitAngle: 2.1,
    description: 'Draw-to-search polygon coordinates checked in <8ms across 1,000+ points.',
  },
  {
    id: 'fastapi',
    label: 'FastAPI',
    isHub: false,
    hubId: 'hub-systems',
    color: '#009688',
    orbitRadius: 95,
    orbitSpeed: 0.012,
    orbitAngle: 3.9,
    description: 'Asynchronous non-blocking REST APIs serving 10,000+ requests daily.',
  },
  {
    id: 'python',
    label: 'Python AsyncIO',
    isHub: false,
    hubId: 'hub-systems',
    color: '#387eb8',
    orbitRadius: 100,
    orbitSpeed: -0.01,
    orbitAngle: 5.2,
    description: 'High-throughput event loops and robust Pytest validation infrastructure.',
  },

  // Full-Stack Satellites
  {
    id: 'nextjs',
    label: 'Next.js 16',
    isHub: false,
    hubId: 'hub-fullstack',
    color: '#ffffff',
    orbitRadius: 90,
    orbitSpeed: 0.009,
    orbitAngle: 1.0,
    description: 'Server Components, dynamic route handlers, and zero cold-start database connection pooling.',
  },
  {
    id: 'react',
    label: 'React 19',
    isHub: false,
    hubId: 'hub-fullstack',
    color: '#61dafb',
    orbitRadius: 80,
    orbitSpeed: -0.011,
    orbitAngle: 2.8,
    description: 'Concurrent rendering architecture and interactive 60FPS canvas visualizers.',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    isHub: false,
    hubId: 'hub-fullstack',
    color: '#3178c6',
    orbitRadius: 105,
    orbitSpeed: 0.007,
    orbitAngle: 4.4,
    description: 'End-to-end strict type safety across Chrome extensions, APIs, and client state.',
  },
  {
    id: 'docker',
    label: 'Docker & Microservices',
    isHub: false,
    hubId: 'hub-fullstack',
    color: '#2496ed',
    orbitRadius: 115,
    orbitSpeed: -0.008,
    orbitAngle: 5.7,
    description: 'Containerized multi-stage deployments with hardened Alpine runtime images.',
  },

  // Security & Data Satellites
  {
    id: 'huggingface',
    label: 'Hugging Face CV',
    isHub: false,
    hubId: 'hub-security',
    color: '#ffd21e',
    orbitRadius: 85,
    orbitSpeed: 0.009,
    orbitAngle: 0.8,
    description: 'Facial boundary verification and forensic artifact detection achieving 92% accuracy.',
  },
  {
    id: 'mongodb',
    label: 'MongoDB Geospatial',
    isHub: false,
    hubId: 'hub-security',
    color: '#13aa52',
    orbitRadius: 100,
    orbitSpeed: -0.01,
    orbitAngle: 2.5,
    description: 'Custom DNS patch reducing Atlas cold starts from 2,000ms to <150ms (-92%).',
  },
  {
    id: 'chrome-ext',
    label: 'Manifest V3 Ext',
    isHub: false,
    hubId: 'hub-security',
    color: '#f59e0b',
    orbitRadius: 110,
    orbitSpeed: 0.008,
    orbitAngle: 4.2,
    description: 'Real-time browser security extension for instant contextual deepfake inspection.',
  },
];

export const Constellation3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);

  // 3D Rotation State
  const rotationRef = useRef({ rotX: 0.15, rotY: 0.25, targetRotX: 0.15, targetRotY: 0.25 });
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const nodesRef = useRef<ConstellationNode[]>([]);

  // Initialize coordinates
  useEffect(() => {
    const satNodes: ConstellationNode[] = SATELLITES.map((sat) => {
      const hub = HUBS.find((h) => h.id === sat.hubId) || HUBS[0];
      const angle = sat.orbitAngle || 0;
      const r = sat.orbitRadius || 90;
      return {
        ...sat,
        x: hub.x + Math.cos(angle) * r,
        y: hub.y + Math.sin(angle) * r * 0.6,
        z: hub.z + Math.sin(angle) * r * 0.8,
      };
    });

    nodesRef.current = [...HUBS, ...satNodes];
  }, []);

  // 3D Render Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fov = 420;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Smooth auto-rotation when not dragging
      if (!isDraggingRef.current) {
        rotationRef.current.targetRotY += 0.0022;
      }
      rotationRef.current.rotX += (rotationRef.current.targetRotX - rotationRef.current.rotX) * 0.08;
      rotationRef.current.rotY += (rotationRef.current.targetRotY - rotationRef.current.rotY) * 0.08;

      const cosX = Math.cos(rotationRef.current.rotX);
      const sinX = Math.sin(rotationRef.current.rotX);
      const cosY = Math.cos(rotationRef.current.rotY);
      const sinY = Math.sin(rotationRef.current.rotY);

      // Update satellite orbits
      nodesRef.current.forEach((n) => {
        if (!n.isHub && n.hubId) {
          const hub = nodesRef.current.find((h) => h.id === n.hubId);
          if (hub && n.orbitSpeed !== undefined && n.orbitAngle !== undefined && n.orbitRadius !== undefined) {
            n.orbitAngle += n.orbitSpeed;
            n.x = hub.x + Math.cos(n.orbitAngle) * n.orbitRadius;
            n.y = hub.y + Math.sin(n.orbitAngle) * n.orbitRadius * 0.6;
            n.z = hub.z + Math.sin(n.orbitAngle) * n.orbitRadius * 0.8;
          }
        }
      });

      // 3D Projection Calculation
      interface ProjectedNode {
        node: ConstellationNode;
        screenX: number;
        screenY: number;
        scale: number;
        z3d: number;
      }

      const projected: ProjectedNode[] = nodesRef.current.map((node) => {
        // Rotate around Y
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        // Rotate around X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective scale
        const scale = fov / (fov + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;

        return { node, screenX, screenY, scale, z3d: z2 };
      });

      // Sort by depth (painter's algorithm)
      projected.sort((a, b) => b.z3d - a.z3d);

      // Draw Orbit Rings around Major Hubs (exact visual from frame 00:55 - 00:58)
      HUBS.forEach((hub) => {
        const projHub = projected.find((p) => p.node.id === hub.id);
        if (projHub) {
          ctx.beginPath();
          ctx.ellipse(
            projHub.screenX,
            projHub.screenY,
            100 * projHub.scale,
            45 * projHub.scale,
            rotationRef.current.rotX,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw Synaptic Connection Lines
      projected.forEach((p) => {
        if (!p.node.isHub && p.node.hubId) {
          const targetHub = projected.find((item) => item.node.id === p.node.hubId);
          if (targetHub) {
            const isHighlighted =
              hoveredNode?.id === p.node.id ||
              hoveredNode?.id === targetHub.node.id ||
              selectedNode?.id === p.node.id;

            ctx.beginPath();
            ctx.moveTo(p.screenX, p.screenY);
            ctx.lineTo(targetHub.screenX, targetHub.screenY);

            if (isHighlighted) {
              ctx.strokeStyle = p.node.color;
              ctx.lineWidth = 1.8 * p.scale;
              ctx.shadowColor = p.node.color;
              ctx.shadowBlur = 8;
            } else {
              const alpha = Math.max(0.04, Math.min(0.2, (p.scale - 0.5) * 0.3));
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.lineWidth = 0.8 * p.scale;
              ctx.shadowBlur = 0;
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Inter-Hub Bridges (connect all 4 main hubs)
      for (let i = 0; i < HUBS.length; i++) {
        for (let j = i + 1; j < HUBS.length; j++) {
          const p1 = projected.find((p) => p.node.id === HUBS[i].id);
          const p2 = projected.find((p) => p.node.id === HUBS[j].id);
          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      projected.forEach((p) => {
        const isHovered = hoveredNode?.id === p.node.id;
        const isSelected = selectedNode?.id === p.node.id;
        const radius = (p.node.isHub ? 6 : 3.5) * p.scale;

        // Ambient Halo
        if (p.node.isHub || isHovered || isSelected) {
          const haloR = radius * 3.5;
          const halo = ctx.createRadialGradient(p.screenX, p.screenY, 0, p.screenX, p.screenY, haloR);
          halo.addColorStop(0, `${p.node.color}55`);
          halo.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, haloR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node Core Circle
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered || isSelected ? '#ffffff' : p.node.isHub ? '#ffffff' : '#a1a1aa';
        ctx.fill();

        // Node Label Typography (Exact style from Poulo frame 00:55 - 00:58)
        ctx.save();
        if (p.node.isHub) {
          ctx.font = `bold ${Math.round(11 * p.scale)}px sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(p.node.label, p.screenX, p.screenY + radius + 4);
        } else {
          ctx.font = `${Math.round(9 * p.scale)}px sans-serif`;
          ctx.fillStyle = isHovered || isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.65)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(p.node.label, p.screenX, p.screenY + radius + 3);
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [hoveredNode, selectedNode]);

  // Mouse drag rotation & hover tracking
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      rotationRef.current.targetRotY += deltaX * 0.007;
      rotationRef.current.targetRotX += deltaY * 0.007;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    } else {
      // Raycasting hit test
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const fov = 420;
      const cosX = Math.cos(rotationRef.current.rotX);
      const sinX = Math.sin(rotationRef.current.rotX);
      const cosY = Math.cos(rotationRef.current.rotY);
      const sinY = Math.sin(rotationRef.current.rotY);

      let found: ConstellationNode | null = null;
      for (const node of nodesRef.current) {
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;
        const scale = fov / (fov + z2);
        const sx = cx + x1 * scale;
        const sy = cy + y2 * scale;

        const dist = Math.hypot(sx - mouseX, sy - mouseY);
        if (dist <= (node.isHub ? 22 : 14)) {
          found = node;
          break;
        }
      }

      if (found !== hoveredNode) {
        if (found) soundEngine.playTick();
        setHoveredNode(found);
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleClick = () => {
    if (hoveredNode) {
      soundEngine.playChapterSelect();
      setSelectedNode(hoveredNode);
    }
  };

  return (
    <div className="relative rounded-3xl bg-[#030305] border border-white/10 p-4 sm:p-8 shadow-2xl overflow-hidden select-none">
      {/* Top Controls Overlay */}
      <div className="flex items-center justify-between px-2 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-white animate-pulse" />
          <span className="font-mono text-xs text-white/80 font-medium">
            3D Interactive Constellation Universe
          </span>
          <span className="text-[10px] font-mono text-white/40 hidden sm:inline">
            (Click &amp; Drag in 3D Space)
          </span>
        </div>

        <button
          onClick={() => {
            soundEngine.playTick();
            rotationRef.current.targetRotX = 0.15;
            rotationRef.current.targetRotY = 0.25;
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/10 text-white/60 hover:text-white text-xs font-mono transition-colors border border-white/10 cursor-pointer"
        >
          <RotateCw size={11} />
          <span>Reset Orbit Angle</span>
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={860}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
          className="w-full h-full cursor-grab active:cursor-grabbing rounded-2xl"
        />

        {/* Floating Tooltip HUD on Hover / Click */}
        {(hoveredNode || selectedNode) && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 p-4 rounded-2xl bg-[#0c0d13]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                {(hoveredNode || selectedNode)?.isHub ? 'Galactic Core Hub' : 'Connected Subsystem'}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: (hoveredNode || selectedNode)?.color }}
              />
            </div>
            <div className="font-sans font-bold text-sm text-white">
              {(hoveredNode || selectedNode)?.label}
            </div>
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              {(hoveredNode || selectedNode)?.description}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-1.5">
          <Compass size={12} />
          <span>Rotational momentum enabled · 60FPS perspective render</span>
        </div>
        <span>4 Core Hubs · 15 Interconnected Orbitals</span>
      </div>
    </div>
  );
};

