'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, EASE_SMOOTH } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { Subheading, BodyText } from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';

export function AboutTeaser() {
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section className="w-full flex flex-col md:flex-row border-b border-border">
      {/* Image Left — absolute fill inside min-h-[600px] wrapper, parallax */}
      <motion.div 
        ref={imageRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 h-[50vh] md:h-auto min-h-[600px] relative bg-beige overflow-hidden"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <img 
            src="/images/about.jpeg" 
            alt="Editorial" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
      </motion.div>

      {/* Text Right */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-background">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-md space-y-8"
        >
          <Subheading>The Yet Galore Story</Subheading>
          <div className="space-y-6">
            <BodyText>
              Yet Galore is a reflection of intentional creation rooted in culture, environment, and identity. Based in Victoria Falls, Zimbabwe, the brand blends raw expression with refined construction to create garments that feel both personal and timeless.
            </BodyText>
          </div>
          <div className="pt-4">
            <Button variant="ghost" onClick={() => router.push('/about')} className="-ml-4">
              Read Our Story →
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
