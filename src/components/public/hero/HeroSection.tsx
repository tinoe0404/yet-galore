'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { DisplayText, Tag } from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';

export function HeroSection({ headline, subheadline, ctaLabel, ctaHref, image }: { headline: string, subheadline?: string, ctaLabel: string, ctaHref: string, image: string }) {
  const router = useRouter();
  
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row pt-20 md:pt-0 border-b border-border">
      {/* Image Left */}
      <div className="relative w-full md:w-[55%] h-[60vh] md:h-screen bg-beige">
        <Image 
          src={image} 
          alt="Hero Banner" 
          fill 
          priority
          unoptimized
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>

      {/* Text Right */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-6 md:px-12 py-16 md:py-0 bg-background">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeUp}
          className="max-w-lg space-y-8"
        >
          {subheadline && <Tag>{subheadline}</Tag>}
          <DisplayText className="text-black">
            {headline}
          </DisplayText>
          <div className="pt-4">
            <Button variant="outline" withArrow onClick={() => router.push(ctaHref)}>
              {ctaLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
