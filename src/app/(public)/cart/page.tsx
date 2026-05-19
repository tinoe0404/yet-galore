'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function formatCents(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export default function CartPage() {
  const { items, updateQty, removeItem, totalPrice, totalQty, clearCart } = useCart();

  return (
    <div className="w-full bg-background min-h-screen pt-20">
      {/* Header */}
      <div className="container-wide px-6 lg:px-12 py-12 md:py-16">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div>
            <span className="font-sans text-xs tracking-widest uppercase text-muted block mb-2">Shopping</span>
            <h1 className="font-display font-light text-4xl md:text-5xl lg:text-6xl tracking-tight">Your Bag</h1>
          </div>
          <span className="font-sans text-sm text-muted tracking-wide">
            {totalQty} {totalQty === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide px-6 lg:px-12 pb-24">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <ShoppingBag className="w-12 h-12 mx-auto text-warm-gray-1 mb-6" />
            <p className="font-display text-2xl mb-2">Your bag is empty</p>
            <p className="font-sans text-sm text-muted mb-8">Explore our collection and find something you love.</p>
            <Link href="/catalogue">
              <Button variant="primary" size="lg" withArrow>
                Browse Collection
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Items List */}
            <div className="flex-1">
              <AnimatePresence mode="popLayout">
                {items.map((it) => (
                  <motion.div
                    key={`${it.productId}-${it.size || 'default'}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-6 py-8 border-b border-border"
                  >
                    {/* Image */}
                    <Link href={`/product/${it.slug}`} className="shrink-0">
                      <div className="w-24 h-28 md:w-32 md:h-36 bg-beige overflow-hidden border border-border/50">
                        {it.image && (
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        )}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link href={`/product/${it.slug}`}>
                            <h3 className="font-display text-lg md:text-xl hover:opacity-70 transition-opacity truncate">
                              {it.name}
                            </h3>
                          </Link>
                          {it.size && (
                            <p className="font-sans text-xs tracking-widest text-muted mt-1 uppercase">Size: {it.size}</p>
                          )}
                          <p className="font-mono text-sm text-muted mt-1">{formatCents(it.price)}</p>
                        </div>
                        <button
                          onClick={() => removeItem(`${it.productId}-${it.size || 'default'}`)}
                          className="p-1 text-muted hover:text-black transition-colors shrink-0"
                          aria-label={`Remove ${it.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Control */}
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQty(`${it.productId}-${it.size || 'default'}`, it.qty - 1)}
                            disabled={it.qty <= 1}
                            className="p-2 hover:bg-beige transition-colors disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center font-sans text-sm">{it.qty}</span>
                          <button
                            onClick={() => updateQty(`${it.productId}-${it.size || 'default'}`, it.qty + 1)}
                            className="p-2 hover:bg-beige transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <p className="font-mono text-sm tracking-wide">
                          {formatCents(it.price * it.qty)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Clear Cart */}
              <div className="pt-6">
                <button
                  onClick={clearCart}
                  className="font-sans text-xs tracking-widest uppercase text-muted hover:text-black transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-[340px] shrink-0">
              <div className="lg:sticky lg:top-32">
                <div className="bg-cream p-8">
                  <h2 className="font-sans text-xs tracking-widest uppercase text-muted mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-muted">Subtotal</span>
                      <span>{formatCents(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-muted">Shipping</span>
                      <span className="text-muted italic text-xs">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-8">
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-sm text-muted">Estimated Total</span>
                      <span className="font-display text-2xl">{formatCents(totalPrice)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button variant="primary" className="w-full py-5 text-sm tracking-widest group">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link
                    href="/catalogue"
                    className="block text-center mt-4 font-sans text-xs tracking-widest uppercase text-muted hover:text-black transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
