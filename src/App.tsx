import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoCarousel } from './components/LogoCarousel';
import { WorksSection } from './components/WorksSection';
import { TechStack } from './components/TechStack';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top on initial page load / refresh
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch {
      // safe fallback
    }
  }, []);

  // Track active scroll section for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'stack', 'about', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen relative bg-[#000000] text-[#fafafa] selection:bg-white selection:text-black">
      {/* 3D Isometric Box Loader Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Floating Pill Navbar Dock */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Curved Tech & Ecosystem Reel */}
        <LogoCarousel />

        {/* 3. Works Section with Real Live Projects */}
        <WorksSection />

        {/* 4. My Stack: 3D Keycap Orb & Tech Matrix */}
        <TechStack />

        {/* 5. About Me: IIIT Kota, Competitive Programming, Leadership */}
        <AboutSection />
      </main>

      {/* 6. Footer with Grand CTA & Halftone Wordmark */}
      <Footer />
    </div>
  );
};

export default App;
