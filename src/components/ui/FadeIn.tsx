import React, { type ElementType } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  children?: React.ReactNode;
  className?: string;
}

const motionComponentsCache = new Map<ElementType, any>();

function getMotionComponent(asType: ElementType) {
  if (asType === 'div') return motion.div;
  if (asType === 'h1') return motion.h1;
  if (asType === 'h2') return motion.h2;
  if (asType === 'h3') return motion.h3;
  if (asType === 'p') return motion.p;
  if (asType === 'span') return motion.span;
  if (asType === 'nav') return motion.nav;

  if (!motionComponentsCache.has(asType)) {
    motionComponentsCache.set(asType, motion.create(asType as any));
  }
  return motionComponentsCache.get(asType);
}

export const FadeIn: React.FC<FadeInProps> = ({
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as: Component = 'div',
  children,
  className = '',
  ...props
}) => {
  const MotionComponent = getMotionComponent(Component);

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;

