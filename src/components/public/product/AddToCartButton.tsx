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
  categoryName?: string;
  className?: string;
}

export function AddToCartButton({ product, categoryName, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const isJersey = categoryName?.toLowerCase().includes('jersey');

  if (product.price === null || product.price === undefined) {
    return null; // Don't show add-to-cart if no price
  }

  const handleAdd = () => {
    if (isJersey && !selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: Math.round(product.price! * 100), // convert to cents
      qty: 1,
      image: product.image,
      size: selectedSize || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {isJersey && (
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs tracking-widest uppercase text-muted">Select Size</span>
          <div className="flex items-center gap-3">
            {['M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "w-12 h-12 flex items-center justify-center border transition-all duration-300 font-sans text-sm",
                  selectedSize === size 
                    ? "border-black bg-black text-white" 
                    : "border-border text-black hover:border-black"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
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
            {isJersey && !selectedSize ? 'Select Size to Add' : 'Add to Bag'}
          </>
        )}
      </Button>
    </div>
  );
}
