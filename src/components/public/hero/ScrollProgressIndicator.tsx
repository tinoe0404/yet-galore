'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressIndicatorProps {
  /** Total number of sections */
  total: number;
  /** Currently active section index */
  activeIndex: number;
  /** Callback when a dot is clicked */
  onDotClick: (index: number) => void;
}

/**
 * Minimal dot navigation fixed on the right side of the viewport.
 *
 * - One dot per collection
 * - Active dot is wider (pill shape) and brighter
 * - Clicking a dot scrolls to that section
 * - Hidden on small screens, visible from md: breakpoint
 */
export function ScrollProgressIndicator({
  total,
  activeIndex,
  onDotClick,
}: ScrollProgressIndicatorProps) {
  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to section ${i + 1}`}
          className="group relative flex items-center justify-center p-1"
        >
          <motion.div
            animate={{
              width: activeIndex === i ? 3 : 3,
              height: activeIndex === i ? 28 : 12,
              backgroundColor: activeIndex === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full"
          />
          {/* Tooltip label on hover */}
          <span className="
            absolute right-8 whitespace-nowrap
            font-sans text-[10px] uppercase tracking-[0.2em] text-white/0
            group-hover:text-white/70 transition-colors duration-300
            pointer-events-none
          ">
            {String(i + 1).padStart(2, '0')}
          </span>
        </button>
      ))}
    </div>
  );
}
