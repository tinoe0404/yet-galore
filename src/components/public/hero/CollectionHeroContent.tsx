'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ─── Animation Variants ─────────────────────────────────────────────
const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_LUXURY },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: EASE_LUXURY, delay: 0.1 },
  },
};

// ─── Props ───────────────────────────────────────────────────────────
interface CollectionHeroContentProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  /** Index of this slide (used for alternating alignment) */
  index: number;
}

/**
 * The text + CTA overlay rendered on each fullscreen collection section.
 *
 * Uses Framer Motion `whileInView` so animations trigger each time
 * the section snaps into the viewport.
 */
export function CollectionHeroContent({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  index,
}: CollectionHeroContentProps) {
  // Alternate alignment: even slides left-aligned, odd slides right-aligned
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      className={`
        relative z-20 flex flex-col gap-4 md:gap-6
        px-8 md:px-16 lg:px-24 pb-24 md:pb-32
        ${isEven ? 'items-start text-left' : 'items-end text-right'}
      `}
    >
      {/* Decorative line */}
      <motion.div
        variants={lineVariants}
        className={`h-[1px] w-16 md:w-24 bg-white/40 mb-2 ${isEven ? 'origin-left' : 'origin-right'}`}
      />

      {/* Subtitle / Tag */}
      <motion.span
        variants={childVariants}
        className="font-sans uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60"
      >
        {subtitle}
      </motion.span>

      {/* Large Title */}
      <motion.h2
        variants={childVariants}
        className="font-display font-light text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] tracking-tight text-white drop-shadow-2xl"
      >
        {title}
      </motion.h2>

      {/* CTA Button */}
      <motion.div variants={childVariants} className="mt-4 md:mt-8">
        <Link
          href={ctaHref}
          className="
            group relative inline-flex items-center gap-3
            px-8 py-4 md:px-10 md:py-5
            border border-white/30 text-white
            font-sans text-[10px] md:text-xs uppercase tracking-[0.25em]
            transition-all duration-500
            hover:bg-white hover:text-black hover:border-white
            active:scale-[0.98]
          "
        >
          {ctaLabel}
          {/* Arrow icon */}
          <svg
            className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
}
