'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/animations';

export function EditorialBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Subtle parallax on text: -20px over scroll range
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} className="w-full bg-charcoal text-cream py-32 md:py-48 px-6 relative flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        className="max-w-3xl mx-auto text-center relative"
      >
        <div className="w-12 h-[1px] bg-cream/30 mx-auto mb-12" />
        <h2 className="font-display italic text-3xl md:text-5xl lg:text-6xl leading-tight">
          "Crafted for those who understand quality."
        </h2>
        <div className="w-12 h-[1px] bg-cream/30 mx-auto mt-12" />
      </motion.div>
    </section>
  );
}
