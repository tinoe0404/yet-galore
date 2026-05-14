'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ProductGalleryProps {
  images: any[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return <div className="w-full aspect-[4/5] bg-beige" />;

  const activeImage = images[activeIndex];
  
  const getImageUrl = (img: any, transforms: string) => {
    if (img.publicId) return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${img.publicId}`;
    if (img.url) return img.url;
    return 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1500&auto=format&fit=crop';
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Primary Image */}
      <div 
        className="relative w-full aspect-[4/5] bg-beige cursor-zoom-in overflow-hidden"
        onClick={() => setIsLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={getImageUrl(activeImage, 'f_auto,q_auto,c_fill,w_1200,h_1500')}
              alt={activeImage.altText || 'Product Image'}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails (Desktop) / Dots (Mobile) */}
      {images.length > 1 && (
        <>
          {/* Mobile Dots */}
          <div className="flex md:hidden justify-center gap-2 pt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  activeIndex === idx ? "bg-black" : "bg-black/20"
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Desktop Thumbnails */}
          <div className="hidden md:flex gap-4 overflow-x-auto pb-2 snap-x">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 bg-beige transition-all border-2 snap-start",
                  activeIndex === idx ? "border-black" : "border-transparent hover:border-black/30"
                )}
              >
                <Image
                  src={getImageUrl(img, 'f_auto,q_auto,c_fill,w_160,h_160')}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 z-50 text-black hover:opacity-70 transition-opacity"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
            <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
              <Image
                src={getImageUrl(activeImage, 'f_auto,q_auto,c_limit,w_2000,h_2000')}
                alt={activeImage.altText || 'Product Image Full'}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            
            {/* Lightbox Controls */}
            {images.length > 1 && (
              <div className="absolute bottom-6 flex gap-4">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      activeIndex === idx ? "bg-black" : "bg-black/20"
                    )}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
