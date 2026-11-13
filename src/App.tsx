import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoCarousel } from './components/LogoCarousel';
import { WorksSection } from './components/WorksSection';
import { TechStack } from './components/TechStack';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/ui/CustomCursor';
import { Toast } from './components/ui/Toast';
import {
  initSmoothWheelScroll,
  ScrollTrigger,
  smoothScrollTo,
} from './lib/gsapSetup';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 2400);
  };

  // Minimalist scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll to top on initial page load / refresh & boot GSAP smooth scroll engine
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch {
      // safe fallback
    }

    const cleanupSmooth = initSmoothWheelScroll();

    const refreshOnReady = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshOnReady);
    document.fonts?.ready?.then(refreshOnReady);

    const settleTimer = window.setTimeout(refreshOnReady, 450);

    return () => {
      cleanupSmooth();
      window.removeEventListener('load', refreshOnReady);
      window.clearTimeout(settleTimer);
    };
  }, []);

  // Re-calculate all ScrollTrigger measurements once loading screen exits
  useEffect(() => {
    if (!isLoading) {
      const id = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => window.clearTimeout(id);
    }
  }, [isLoading]);

  // Track active scroll section without layout-thrashing scroll reads
  useEffect(() => {
    const sections = ['hero', 'about', 'works', 'stack', 'contact'];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );

    for (const secId of sections) {
      const el = document.getElementById(secId);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    smoothScrollTo(0);
  };

  return (
    <div className="min-h-screen relative bg-[#000000] text-[#fafafa] selection:bg-white selection:text-black overflow-x-clip">
      {/* 0. Custom Magnetic Context-Aware Cursor */}
      <CustomCursor />

      {/* 1. Top Minimalist Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* 2. 3D Isometric Box Loader Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 3. Floating Pill Navbar Dock */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section with Interactive Neural Topology */}
        <Hero revealReady={!isLoading} />

        {/* 2. Curved Tech & Ecosystem Reel */}
        <LogoCarousel />

        {/* 3. About Me: Editorial Profile & Academic Milestones */}
        <AboutSection />

        {/* 4. Featured Works: Interactive Production Deck */}
        <WorksSection />

        {/* 5. My Stack: 3D Keycap Orb & Tech Matrix */}
        <TechStack />
      </main>

      {/* 6. Footer with Grand CTA & Halftone Wordmark */}
      <Footer onShowToast={showToast} />

      {/* 7. Floating Action Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
