'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Check, ShoppingBag, Minus, Plus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClientEnquiryTrigger } from './ClientEnquiryTrigger';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number | null;
    image?: string;
  };
  categoryName?: string;
}

export function ProductActions({ product, categoryName }: ProductActionsProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const isJersey = categoryName?.toLowerCase().includes('jersey');

  const handleAdd = () => {
    if (isJersey && !selectedSize) {
      alert("Please select a size first.");
      return;
    }

    if (product.price !== null && product.price !== undefined) {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: Math.round(product.price * 100),
        qty,
        image: product.image,
        size: selectedSize || undefined,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const whatsappMessage = qty > 1 
    ? `Hi, I am interested in purchasing ${qty}x ${product.name}`
    : `Hi, I am interested in the ${product.name}`;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Options: Size and Qty */}
      <div className="flex flex-col gap-4 mb-2">
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

        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs tracking-widest uppercase text-muted">Quantity</span>
          <div className="flex items-center border border-border w-fit">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={qty <= 1}
              className="p-3 hover:bg-beige transition-colors disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-sans text-sm">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="p-3 hover:bg-beige transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {product.price !== null && product.price !== undefined && (
        <Button
          variant="outline"
          onClick={handleAdd}
          className={cn(
            'w-full py-6 text-sm gap-2 transition-all duration-300',
            added && 'bg-black text-white border-black'
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
      )}

      <ClientEnquiryTrigger product={{ id: product.id, name: product.name }} />
      
      <a 
        href={`https://wa.me/263788346205?text=${encodeURIComponent(whatsappMessage)}`} 
        target="_blank" 
        rel="noreferrer"
        className="group flex items-center justify-center gap-2 font-sans text-sm uppercase tracking-widest hover:text-black/70 transition-colors py-4"
      >
        Ask via WhatsApp
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}
