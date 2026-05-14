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
    <section className="relative min-h-screen flex flex-col md:flex-row pt-20 md:pt-0 border-b border-border">
      {/* Image Left — absolute fill inside min-h-screen parent */}
      <div className="relative w-full md:w-[55%] h-[60vh] md:h-screen bg-beige overflow-hidden">
        <img 
          src={image} 
          alt="Hero Banner" 
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top" 
        />
      </div>

      {/* Text Right — staggered fadeUp */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-6 md:px-12 py-16 md:py-0 bg-background">
        <motion.div 
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="max-w-lg space-y-8"
        >
          {subheadline && (
            <motion.div variants={heroChild}>
              <Tag>{subheadline}</Tag>
            </motion.div>
          )}
          <motion.div variants={heroChild}>
            <DisplayText className="text-black">
              {headline}
            </DisplayText>
          </motion.div>
          <motion.div variants={heroChild} className="pt-4">
            <Button variant="outline" withArrow onClick={() => router.push(ctaHref)}>
              {ctaLabel}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
