import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface LiveProjectButtonProps extends HTMLMotionProps<'button'> {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  href?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = 'Live Project',
  onClick,
  className = '',
  href,
  ...props
}) => {
  const content = (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer select-none px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-mono ${className}`}
      {...props}
    >
      <span>{label}</span>
    </motion.button>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default LiveProjectButton;

