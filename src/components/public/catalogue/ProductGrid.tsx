'use client';

import React, { useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { ProductCard } from '../product/ProductCard';
import { BodyText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const [searchQuery, setSearchQuery] = useQueryState('search');
  const [sortValue] = useQueryState('sort');

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortValue) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [initialProducts, searchQuery, sortValue]);

  if (filteredProducts.length === 0) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center text-center space-y-6">
        <BodyText className="text-muted">No pieces found matching your criteria.</BodyText>
        <Button variant="outline" onClick={() => setSearchQuery(null)}>
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-12 pb-24">
      {filteredProducts.map((product, idx) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          variant="default"
          priority={idx < 6}
        />
      ))}
    </div>
  );
}
