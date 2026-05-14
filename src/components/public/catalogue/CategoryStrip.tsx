'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function CategoryStrip({ categories }: { categories: any[] }) {
  const displayCats = categories.slice(0, 2);

  // If no categories exist, we show a fallback or nothing.
  if (!displayCats.length) return null;

  return (
    <section className="flex flex-col md:flex-row w-full bg-background border-b border-border">
      {displayCats.map((cat: any) => {
        const imageUrl = cat.coverImage || 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1500&auto=format&fit=crop';

        return (
          <motion.div 
            key={cat.id}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            className="relative w-full md:w-1/2 h-[60vw] md:h-[70vh] group overflow-hidden bg-beige border-b md:border-b-0 border-r-0 md:border-r last:border-r-0 border-border"
          >
            <Link href={`/catalogue/${cat.slug}`} className="block w-full h-full">
              <Image 
                src={imageUrl} 
                alt={cat.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/0" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <h3 className="font-display italic text-4xl md:text-5xl text-white opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                  {cat.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </section>
  );
}
