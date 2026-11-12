import React, { useState, useEffect, useRef } from 'react';
import BoxLoader from './ui/box-loader';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const completedRef = useRef(false);

  const finishLoading = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFading(true);

    setTimeout(() => {
      try {
        window.scrollTo(0, 0);
      } catch {
        // Safe fallback
      }
      onComplete?.();
    }, 280);
  };

  useEffect(() => {
    // Smooth progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          finishLoading();
          return 100;
        }
        const increment = Math.floor(Math.random() * 6) + 4;
        return Math.min(100, prev + increment);
      });
    }, 28);

    // Fallback safety timeout: ensure portfolio ALWAYS reveals cleanly
    const safetyTimeout = setTimeout(() => {
      clearInterval(interval);
      finishLoading();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, []);

  const paddedProgress = progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : '100';

  return (
    <div
      onClick={finishLoading}
      className={`fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center cursor-pointer select-none transition-opacity duration-300 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading portfolio"
    >
      {/* 3D Isometric Folding Box Loader */}
      <div className="relative mb-14 flex items-center justify-center">
        <BoxLoader size={38} />
      </div>

      {/* Numerical Progress Indicator */}
      <div className="flex flex-col items-center gap-1.5 mt-4">
        <span className="font-mono text-sm tracking-wider text-white">
          {paddedProgress}%
        </span>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          Harshit Kumar
        </p>

        <span className="font-mono text-[10px] text-white/25 mt-1">
          Click anywhere to skip
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
