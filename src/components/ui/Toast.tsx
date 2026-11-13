import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

export interface ToastProps {
  message: string | null;
  icon?: React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({ message, icon }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[120] pointer-events-none"
        >
          <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#0a0c12]/90 border border-emerald-500/35 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.18)] backdrop-blur-2xl text-white">
            <span className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shrink-0">
              {icon || <Check size={13} className="text-emerald-400" />}
            </span>
            <span className="font-sans font-medium text-xs sm:text-sm tracking-tight text-white/95 whitespace-nowrap">
              {message}
            </span>
            <Sparkles size={13} className="text-emerald-400/80 animate-pulse ml-0.5" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
