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
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* Background image contained to the hero section so it scrolls away */}
      <div className="absolute inset-0 left-1/2 transform -translate-x-1/2 w-[100vw] h-full overflow-hidden">
        <img
          src={image}
          alt="Hero Banner"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/45 z-5" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
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
