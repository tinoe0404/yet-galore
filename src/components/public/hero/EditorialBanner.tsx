'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function EditorialBanner() {
  return (
    <section className="w-full bg-charcoal text-cream py-32 md:py-48 px-6 relative flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
