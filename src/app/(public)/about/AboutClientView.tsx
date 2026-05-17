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
                Yet Galore is built on the idea that clothing should carry meaning. Every garment is created with intention, reflecting a process that values time, effort, and authenticity. Based in Victoria Falls, Zimbabwe, the brand draws from the intersection of tourism and local life — where movement, storytelling, and craftsmanship meet.
              </BodyText>
              <BodyText className="leading-relaxed">
                Materials are carefully considered, often repurposed and reworked to give them new life. Through dyeing, layering, and reconstruction, each fabric develops its own character. This commitment to sustainability means garments are not mass-produced but thoughtfully made, carrying the marks of their making.
              </BodyText>
              <BodyText className="leading-relaxed">
                Our work explores the balance between process and product, allowing the journey of creation to exist just as boldly as the final piece.
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
              { title: 'Sustainability', desc: 'Materials are repurposed and reworked with care, reducing waste and giving fabric new life.' },
              { title: 'Craftsmanship', desc: 'Each seam and detail is considered — the hand behind the garment is never concealed.' },
              { title: 'Intention', desc: 'Every piece begins as an idea shaped by observation and experimentation. Nothing is fixed, everything is explored.' },
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

      {/* 4.5 The Process */}
      <section className="container-wide px-6 lg:px-12 py-20 md:py-32">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-3xl mx-auto space-y-8 text-center md:text-left"
        >
          <Heading>The Process</Heading>
          <div className="space-y-6 text-left">
            <BodyText className="leading-relaxed">
              Every piece begins as an idea shaped by observation and experimentation. From the first sketch to the selection of fabric, the process is guided by instinct and curiosity. Dyed textiles, raw cuts, and unstructured forms mark the early stages of creation — where nothing is fixed and everything is explored.
            </BodyText>
            <BodyText className="leading-relaxed">
              The stitchings remain deliberately exposed, forming a quiet dialogue between precision and process. Each seam is left visible with intent, revealing the hand behind the garment rather than concealing it. This rawness is not a flaw — it is a signature.
            </BodyText>
          </div>
        </motion.div>
      </section>

      {/* 4.6 Cultural Presence */}
      <section className="bg-beige py-24 px-6 lg:px-12">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="container-wide max-w-4xl mx-auto space-y-8 text-center md:text-left"
        >
          <Heading>Cultural & Event Presence</Heading>
          <BodyText className="leading-relaxed text-left md:text-center max-w-3xl mx-auto">
            Yet Galore exists within a growing creative landscape. Through showcases at Zimbabwe Fashion Week, Creative Economy Week, and Fabrik Party, the brand continues to engage with a wider audience while staying connected to its roots. These moments reflect not only progress but also the importance of community, collaboration, and representation within the fashion space.
          </BodyText>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            {["Zimbabwe Fashion Week", "Creative Economy Week", "Fabrik Party", "Skeyiandstrobo"].map((event) => (
              <span key={event} className="px-4 py-2 border border-black/20 rounded-full font-sans text-[13px] text-black tracking-wider uppercase">
                {event}
              </span>
            ))}
          </div>
        </motion.div>
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
