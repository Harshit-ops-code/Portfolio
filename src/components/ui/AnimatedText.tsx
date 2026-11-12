import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
};

export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalChars = text.length;
  let charCounter = 0;

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`select-none ${className}`}>
      {words.map((word, wordIndex) => {
        const characters = word.split('');
        const wordChars = characters.map((char) => {
          const start = charCounter / totalChars;
          const end = Math.min(1, start + 0.04);
          charCounter++;
          return {
            char,
            range: [start, end] as [number, number],
          };
        });

        let spaceInfo: { char: string; range: [number, number] } | null = null;
        if (wordIndex < words.length - 1) {
          const start = charCounter / totalChars;
          const end = Math.min(1, start + 0.04);
          charCounter++;
          spaceInfo = {
            char: '\u00A0',
            range: [start, end],
          };
        }

        return (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((item, idx) => (
                <Character
                  key={idx}
                  char={item.char}
                  progress={scrollYProgress}
                  range={item.range}
                />
              ))}
            </span>
            {spaceInfo && (
              <span className="inline-block">
                <Character
                  char={spaceInfo.char}
                  progress={scrollYProgress}
                  range={spaceInfo.range}
                />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default AnimatedText;

