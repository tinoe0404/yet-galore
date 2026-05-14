'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { DisplayText, BodyText, Heading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export function AboutClientView() {
  const router = useRouter();

  return (
    <div className="w-full bg-background min-h-screen">
      {/* 1. Hero */}
      <section className="relative w-full h-[70vh] bg-beige flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
          alt="Yet Galore Editorial" 
          fill 
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <DisplayText as="h1" className="text-cream text-5xl md:text-7xl italic">Our Story</DisplayText>
        </motion.div>
      </section>

      {/* 2. Brand Statement */}
      <section className="py-24 md:py-32 px-6 container-wide">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display italic text-3xl md:text-4xl lg:text-5xl leading-tight opacity-90">
            "Yet Galore was born from a desire to elevate the everyday. We curate pieces not just to be worn, but to be experienced—where every stitch speaks to a commitment of unwavering quality."
          </h2>
        </motion.div>
      </section>

      {/* 3. Story Section */}
      <section className="container-wide px-6 lg:px-12 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
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

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="w-full md:w-[45%] aspect-[3/4] relative bg-beige overflow-hidden"
          >
            <Image 
              src="https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop" 
              alt="Craftsmanship Details" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. Values Strip */}
      <section className="bg-charcoal text-cream py-24 px-6 lg:px-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-cream/20">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="pt-8 md:pt-0 md:px-8 first:px-0 text-center md:text-left"
            >
              <h3 className="font-display text-3xl mb-4">Quality</h3>
              <p className="font-sans text-sm tracking-wide text-cream/70 leading-relaxed">
                We utilize only the finest materials, ensuring every garment endures through seasons and generations.
              </p>
            </motion.div>
            
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="pt-8 md:pt-0 md:px-8 text-center md:text-left"
            >
              <h3 className="font-display text-3xl mb-4">Restraint</h3>
              <p className="font-sans text-sm tracking-wide text-cream/70 leading-relaxed">
                Our designs strip away the unnecessary, leaving only silhouettes of profound elegance and purpose.
              </p>
            </motion.div>

            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="pt-8 md:pt-0 md:px-8 last:pr-0 text-center md:text-left"
            >
              <h3 className="font-display text-3xl mb-4">Intention</h3>
              <p className="font-sans text-sm tracking-wide text-cream/70 leading-relaxed">
                Every detail is considered. There are no accidents in our curation, only deliberate aesthetic choices.
              </p>
            </motion.div>
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
