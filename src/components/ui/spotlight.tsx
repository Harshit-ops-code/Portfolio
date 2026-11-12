'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, type SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  fill?: string;
};

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(-size / 2, springOptions);
  const mouseY = useSpring(-size / 2, springOptions);

  const spotlightX = useTransform(mouseX, (x) => x - size / 2);
  const spotlightY = useTransform(mouseY, (y) => y - size / 2);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    parentElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    parentElement.addEventListener('mouseenter', onEnter);
    parentElement.addEventListener('mouseleave', onLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', onEnter);
      parentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute top-0 left-0 rounded-full transition-opacity duration-300 will-change-transform',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        x: spotlightX,
        y: spotlightY,
        background:
          'radial-gradient(circle at center, rgba(226, 232, 240, 0.14) 0%, rgba(148, 163, 184, 0.06) 35%, transparent 70%)',
      }}
    />
  );
}

