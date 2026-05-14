'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { Heading, BodyText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export function ContactTeaser() {
  const router = useRouter();

  return (
    <section className="w-full bg-cream section-padding px-6 flex items-center justify-center">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        className="text-center max-w-xl space-y-8"
      >
        <div className="space-y-4">
          <Heading>Have a question?</Heading>
          <BodyText className="text-muted">
            We're happy to assist with product enquiries, styling advice, or any other questions you may have.
          </BodyText>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button variant="primary" onClick={() => router.push('/contact')}>
            Contact Us
          </Button>
          <Button variant="outline" onClick={() => window.open('https://wa.me/123456789', '_blank')}>
            WhatsApp Us
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
