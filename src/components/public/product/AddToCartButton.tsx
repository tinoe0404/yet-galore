'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number | null; // raw decimal value (e.g. 299.99)
    image?: string;
  };
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (product.price === null || product.price === undefined) {
    return null; // Don't show add-to-cart if no price
  }

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: Math.round(product.price! * 100), // convert to cents
      qty: 1,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      variant="outline"
      onClick={handleAdd}
      className={cn(
        'w-full py-6 text-sm gap-2 transition-all duration-300',
        added && 'bg-black text-white border-black',
        className
      )}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          Added to Bag
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4" />
          Add to Bag
        </>
      )}
    </Button>
  );
}
