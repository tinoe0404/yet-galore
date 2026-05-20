'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FullscreenCollectionSection } from './FullscreenCollectionSection';
import { ScrollProgressIndicator } from './ScrollProgressIndicator';
import { Footer } from '@/components/public/footer/Footer';
import { HeroSection } from '@/components/public/hero/HeroSection';

// ─── Types ───────────────────────────────────────────────────────────
export interface CollectionSlideData {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}


interface SnapScrollContainerProps {
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  collections: CollectionSlideData[];
}


/**
 * Fullscreen vertical snap-scroll container.
 *
 * How the snapping system works:
 * ──────────────────────────────
 * 1. The container uses CSS `scroll-snap-type: y mandatory` for native
 *    browser-level snap scrolling (best perf, no JS overhead).
 * 2. Each child `FullscreenCollectionSection` has `scroll-snap-align: start`
 *    and `scroll-snap-stop: always` so one section is visible at a time.
 * 3. An IntersectionObserver tracks which section is most visible and
 *    updates the `activeIndex` for the dot nav.
 * 4. Clicking a dot calls `scrollIntoView({ behavior: 'smooth' })` on
 *    the target section.
 * 5. On mobile, native touch scrolling + CSS snap handles everything.
 *
 * Performance optimizations:
 * ──────────────────────────
 * - CSS snap (no JS scroll hijacking)
 * - `will-change: transform` on animated images
 * - `loading="lazy"` on non-first images
 * - IntersectionObserver (passive, no scroll listener)
 */
export function SnapScrollContainer({
  heroHeadline,
  heroSubheadline,
  heroImage,
  collections,
}: SnapScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Track active section via IntersectionObserver ─────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>('.snap-section');
    sectionRefs.current = Array.from(sections);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [collections.length]);

  // ── Dot click → scroll to section ────────────────────────────────
  const handleDotClick = useCallback((index: number) => {
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="snap-container"
    >
      {/* Hero Section as the first snap section */}
      <div className="snap-section w-full">
        <HeroSection 
          headline={heroHeadline}
          subheadline={heroSubheadline}
          ctaLabel="VIEW COLLECTION"
          ctaHref="/catalogue"
          image={heroImage}
        />
      </div>

      {collections.map((collection, index) => (
        <FullscreenCollectionSection
          key={collection.id}
          title={collection.title}
          subtitle={collection.subtitle}
          ctaLabel={collection.ctaLabel}
          ctaHref={collection.ctaHref}
          image={collection.image}
          index={index}
          total={collections.length}
        />
      ))}

      {/* Footer as the final snap section */}
      <div className="snap-start snap-always w-full bg-charcoal">
        <Footer />
      </div>

      {/* Dot navigation (Total = 1 hero + collections) */}
      <ScrollProgressIndicator
        total={collections.length + 1}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
      />
    </div>
  );
}
