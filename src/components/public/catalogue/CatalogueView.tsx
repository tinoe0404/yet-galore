import React, { Suspense } from 'react';
import { FilterBar } from './FilterBar';
import { ProductGrid } from './ProductGrid';
import { DisplayText } from '@/components/ui/Typography';

import Link from 'next/link';

export function CatalogueView({ products, categories, title, categoryName }: { products: any[], categories: any[], title: string, categoryName?: string }) {
  return (
    <div className="min-h-screen pt-20 bg-background">


      {/* Page Header */}
      <div className="px-6 lg:px-12 text-center py-12">
        <DisplayText>{title}</DisplayText>
        <p className="mt-4 font-sans text-sm text-muted uppercase tracking-widest">
          {products.length} {products.length === 1 ? 'Piece' : 'Pieces'}
        </p>
        <div className="w-12 h-[1px] bg-border mx-auto mt-8" />
      </div>

      {/* Suspense boundary for nuqs hooks */}
      <Suspense fallback={<ProductGridSkeleton count={products.length || 6} />}>
        <FilterBar categories={categories} />
        <ProductGrid initialProducts={products} />
      </Suspense>
    </div>
  );
}

function ProductGridSkeleton({ count }: { count: number }) {
  return (
    <div className="w-full">
      <div className="w-full h-24 border-b border-border mb-12 animate-pulse bg-beige/50" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-12 pb-24">
        {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
          <div key={i} className="w-full aspect-square bg-beige animate-pulse border border-border/50" />
        ))}
      </div>
    </div>
  );
}
