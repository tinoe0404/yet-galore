'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { ProductCard } from './ProductCard';
import { Heading } from '@/components/ui/Typography';
import Link from 'next/link';

export function FeaturedProducts({ products }: { products: any[] }) {
  if (!products?.length) return null;

  return (
    <section className="section-padding container-wide border-b border-border">
      <div className="text-center mb-16 md:mb-24">
        <Heading>Selected Pieces</Heading>
      </div>
      
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="product-grid"
      >
        {products.map((product: any) => (
          <motion.div key={product.id} variants={fadeUp}>
            <ProductCard product={product} variant="featured" />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 md:mt-24 text-center">
        <Link href="/catalogue" className="link-underline font-sans text-sm tracking-wider uppercase text-black">
          View All Products
        </Link>
      </div>
    </section>
  );
}
