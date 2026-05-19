'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CollectionHeroContent } from './CollectionHeroContent';

// ─── Props ───────────────────────────────────────────────────────────
interface FullscreenCollectionSectionProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  index: number;
  /** Total number of sections (for progress context) */
  total: number;
}

/**
 * A single fullscreen (100dvh) collection slide.
 *
 * Features:
 * - Edge-to-edge background image with CSS `object-cover`
 * - Subtle parallax scale effect on the image (1.15 → 1.0)
 * - Cinematic dark gradient overlay for text contrast
 * - `CollectionHeroContent` overlay with staggered animations
 * - `scroll-snap-align: start` for the snap-scroll system
 */
export function FullscreenCollectionSection({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  image,
  index,
  total,
}: FullscreenCollectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: track scroll progress of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Image scale: 1.15 when entering → 1.0 when centred → 1.05 when leaving
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.05]);
  // Subtle vertical movement for depth
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={sectionRef}
      id={`collection-${index}`}
      className="snap-section relative w-full overflow-hidden flex flex-col justify-end"
      aria-label={`${title} collection`}
    >
      {/* ── Background Image with Parallax ──────────────────────── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: imageScale, y: imageY }}
      >
        <img
          src={image}
          alt={`${title} collection`}
          decoding="async"
          loading={index === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── Cinematic Gradient Overlay ───────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 z-10" />

      {/* ── Content Overlay ─────────────────────────────────────── */}
      <CollectionHeroContent
        title={title}
        subtitle={subtitle}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        index={index}
      />

      {/* ── Section number indicator (bottom-right) ─────────────── */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 z-20 font-sans text-white/30 text-xs tracking-widest">
        <span className="text-white/80 text-sm font-light">{String(index + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(total).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
