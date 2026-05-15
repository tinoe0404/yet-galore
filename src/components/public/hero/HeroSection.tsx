'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { heroContainer, heroChild } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { DisplayText, Tag } from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';

export function HeroSection({ headline, subheadline, ctaLabel, ctaHref, image }: { headline: string, subheadline?: string, ctaLabel: string, ctaHref: string, image: string }) {
  const router = useRouter();
  
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image fills the section */}
      <img
        src={image}
        alt="Hero Banner"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top origin-top scale-110 md:scale-125 lg:scale-150"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl space-y-6"
        >
          {subheadline && (
            <motion.div variants={heroChild}>
              <Tag className="text-white/80">{subheadline}</Tag>
            </motion.div>
          )}
          <motion.div variants={heroChild}>
            <DisplayText className="text-white drop-shadow-lg leading-tight text-4xl md:text-[64px] lg:text-[96px]">
              {headline}
            </DisplayText>
          </motion.div>
          <motion.div variants={heroChild} className="pt-6">
            <Button variant="outline" withArrow className="text-white border-white hover:bg-white/5 group" onClick={() => router.push(ctaHref)}>
              {ctaLabel}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
