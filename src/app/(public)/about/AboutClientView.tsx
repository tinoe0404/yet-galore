'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, slideInLeft, EASE_SMOOTH } from '@/lib/animations';
import { DisplayText, BodyText, Heading } from '@/components/ui/Typography';
import siteProfile from '@/data/siteProfile.json';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export function AboutClientView() {
  const router = useRouter();
  const storyImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyImageRef,
    offset: ['start end', 'end start'],
  });
  const storyImageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div className="w-full bg-background min-h-screen">
      {/* 1. Header & Brand Statement */}
      <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-6 container-wide text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        >
          <span className="font-sans text-xs tracking-widest uppercase text-muted mb-8 block">Our Story</span>
          <h1 className="font-display italic text-3xl md:text-4xl lg:text-5xl leading-tight opacity-90 max-w-3xl mx-auto">
            {`"${siteProfile.tagline}"`}
          </h1>
        </motion.div>
      </section>

      {/* 3. Story Section — slideInLeft text, parallax image */}
      <section className="container-wide px-6 lg:px-12 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={slideInLeft}
            className="w-full md:w-[55%] space-y-8"
          >
            <Heading>The Origin</Heading>
            <div className="space-y-6">
              <BodyText className="leading-relaxed">
                In a world characterized by fleeting trends and disposable consumption, Yet Galore stands as a bastion of permanence. Our journey began with a simple observation: true luxury is quiet. It doesn't need to shout to be recognized.
              </BodyText>
              <BodyText className="leading-relaxed">
                Our aesthetic values are deeply rooted in the concept of restraint. We believe that design is complete not when there is nothing left to add, but when there is nothing left to take away. Every piece in our catalogue is rigorously selected to meet this uncompromising standard.
              </BodyText>
              <BodyText className="leading-relaxed">
                We partner exclusively with artisans who share our philosophy. For us, craftsmanship is not merely a manufacturing process—it is an art form that requires time, intention, and profound respect for the materials.
              </BodyText>
            </div>
          </motion.div>

          {/* Story image — aspect-[3/4] wrapper with parallax */}
          <motion.div 
            ref={storyImageRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH }}
            className="w-full md:w-[45%] aspect-[3/4] relative bg-beige overflow-hidden"
          >
            <motion.div style={{ y: storyImageY }} className="absolute inset-0">
              <img 
                src="/images/yet.jpeg" 
                alt="Craftsmanship Details" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Values Strip */}
      <section className="bg-charcoal text-cream py-24 px-6 lg:px-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-cream/20">
            {[
              { title: 'Quality', desc: 'We utilize only the finest materials, ensuring every garment endures through seasons and generations.' },
              { title: 'Restraint', desc: 'Our designs strip away the unnecessary, leaving only silhouettes of profound elegance and purpose.' },
              { title: 'Intention', desc: 'Every detail is considered. There are no accidents in our curation, only deliberate aesthetic choices.' },
            ].map((value, idx) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: idx * 0.12 }}
                className="pt-8 md:pt-0 md:px-8 first:px-0 text-center md:text-left"
              >
                <h3 className="font-display text-3xl mb-4">{value.title}</h3>
                <p className="font-sans text-sm tracking-wide text-cream/70 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-32 px-6 flex items-center justify-center text-center">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <Button variant="primary" className="py-6" withArrow onClick={() => router.push('/catalogue')}>
            Explore the Collection
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
