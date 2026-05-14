'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { ProductCard } from './ProductCard';
import { Heading } from '@/components/ui/Typography';

export function RelatedProductsGrid({ products }: { products: any[] }) {
  return (
    <section className="mt-32 border-t border-border pt-24 pb-32">
      <div className="container-wide px-6 lg:px-12">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <Heading>You May Also Like</Heading>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide"
        >
          {products.map((product: any) => (
            <motion.div key={product.id} variants={fadeUp} className="min-w-[85vw] sm:min-w-[50vw] md:min-w-0 snap-start">
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
