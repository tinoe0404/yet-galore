import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: any;
  variant?: 'default' | 'featured' | 'editorial';
  priority?: boolean;
}

export function ProductCard({ product, variant = 'default', priority = false }: ProductCardProps) {
  // Safe image parsing
  const firstImage = product.images?.[0];
  const imageUrl = firstImage?.publicId 
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,c_fill,w_800,h_1000/${firstImage.publicId}`
    : (firstImage?.url || 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop');

  return (
    <Link href={`/product/${product.slug}`} className="group block w-full">
      <div className={cn(
        "relative w-full overflow-hidden bg-beige border border-transparent transition-colors duration-300 group-hover:border-border",
        variant === 'featured' ? "aspect-[3/4]" : "aspect-square"
      )}>
        <Image
          src={imageUrl}
          alt={firstImage?.altText || product.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay Label for hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="font-sans text-xs tracking-widest uppercase text-white">View Piece</span>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col items-center text-center space-y-1">
        <h3 className="font-display text-xl md:text-2xl opacity-80 group-hover:opacity-100 transition-opacity">
          {product.name}
        </h3>
        <p className="font-sans text-xs text-muted tracking-widest uppercase">
          {product.category?.name || 'Category'}
        </p>
      </div>
    </Link>
  );
}
