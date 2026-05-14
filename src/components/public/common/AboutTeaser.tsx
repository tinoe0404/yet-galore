'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { Subheading, BodyText } from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';

export function AboutTeaser() {
  const router = useRouter();

  return (
    <section className="w-full flex flex-col md:flex-row border-b border-border">
      {/* Image Left */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 h-[50vh] md:h-auto min-h-[600px] relative bg-beige"
      >
        <Image 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Editorial" 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
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
              Founded on the principles of restraint and uncompromising quality, Yet Galore is a curated catalogue of luxury essentials. We believe that true luxury lies in the details—the precision of a stitch, the weight of a fabric, and the timelessness of a silhouette.
            </BodyText>
            <BodyText>
              Our collection is meticulously selected for individuals who appreciate the quiet confidence of well-made garments.
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
