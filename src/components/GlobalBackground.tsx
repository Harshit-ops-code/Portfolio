import React, { useState, useEffect } from 'react';
import { AnimatedGradient, type CustomConfig } from '@/components/ui/animated-gradient';

// Deep, luxury celestial palettes with zero harsh swirls or jarring colors
const COSMIC_PALETTES: CustomConfig[] = [
  {
    preset: 'custom',
    color1: '#000000',
    color2: '#02071a',
    color3: '#0b1d40',
    distortion: 0,
    swirl: 0,
    softness: 100,
    speed: 6,
    scale: 0.5,
    shape: 'Edge',
    proportion: 60,
  },
  {
    preset: 'custom',
    color1: '#000000',
    color2: '#080318',
    color3: '#1c0a3a',
    distortion: 0,
    swirl: 0,
    softness: 100,
    speed: 6,
    scale: 0.5,
    shape: 'Edge',
    proportion: 55,
  },
  {
    preset: 'custom',
    color1: '#000000',
    color2: '#010c1c',
    color3: '#082f49',
    distortion: 0,
    swirl: 0,
    softness: 100,
    speed: 6,
    scale: 0.5,
    shape: 'Edge',
    proportion: 65,
  },
  {
    preset: 'custom',
    color1: '#000000',
    color2: '#05070f',
    color3: '#0f172a',
    distortion: 0,
    swirl: 0,
    softness: 100,
    speed: 5,
    scale: 0.5,
    shape: 'Edge',
    proportion: 50,
  },
];

export const GlobalBackground: React.FC = () => {
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(1);
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // Smooth celestial morph every 14 seconds
    const interval = setInterval(() => {
      setActiveLayer((current) => {
        if (current === 'A') {
          setIndexB((prev) => (prev + 1) % COSMIC_PALETTES.length);
          return 'B';
        } else {
          setIndexA((prev) => (prev + 1) % COSMIC_PALETTES.length);
          return 'A';
        }
      });
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#000000]">
      {/* Layer A */}
      <div
        className={`absolute inset-0 transition-opacity duration-[3500ms] ease-in-out ${
          activeLayer === 'A' ? 'opacity-35' : 'opacity-0'
        }`}
      >
        <AnimatedGradient
          config={COSMIC_PALETTES[indexA]}
          noise={{ opacity: 0.08 }}
        />
      </div>

      {/* Layer B */}
      <div
        className={`absolute inset-0 transition-opacity duration-[3500ms] ease-in-out ${
          activeLayer === 'B' ? 'opacity-35' : 'opacity-0'
        }`}
      >
        <AnimatedGradient
          config={COSMIC_PALETTES[indexB]}
          noise={{ opacity: 0.08 }}
        />
      </div>

      {/* Heavy Radial Vignette protecting text readability at 100% contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_60%,#000000_100%)]" />
    </div>
  );
};

export default GlobalBackground;
