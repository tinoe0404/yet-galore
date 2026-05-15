'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function formatCents(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export default function CheckoutPage() {
  const { items, totalPrice, totalQty, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', notes: '' });
  const [error, setError] = useState<string | null>(null);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim()) {
      setError('Please provide your name and email address.');
      return;
    }

    if (items.length === 0) {
      setError('Your bag is empty.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: form, items, totalPrice }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }
      const data = await res.json();
      clearCart();
      router.push(`/order-confirmation?orderId=${data.orderId}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if cart is empty (but only if not mid-submission)
  if (items.length === 0 && !loading) {
    return (
      <div className="w-full bg-background min-h-screen pt-20">
        <div className="container-narrow py-24 text-center">
          <p className="font-display text-2xl mb-4">Nothing to check out</p>
          <p className="font-sans text-sm text-muted mb-8">Add some items to your bag first.</p>
          <Link href="/catalogue">
            <Button variant="primary" withArrow>Browse Collection</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen pt-20">
      {/* Header */}
      <div className="container-wide px-6 lg:px-12 py-12 md:py-16">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted hover:text-black transition-colors mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Bag
        </Link>
        <div className="border-b border-border pb-6">
          <h1 className="font-display font-light text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Checkout
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide px-6 lg:px-12 pb-24">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Form Fields */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 space-y-8"
            >
              <div>
                <h2 className="font-sans text-xs tracking-widest uppercase text-muted mb-6">
                  Contact Information
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block font-sans text-sm mb-2" htmlFor="checkout-name">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-transparent border border-border font-sans text-sm placeholder:text-warm-gray-1 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm mb-2" htmlFor="checkout-email">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-transparent border border-border font-sans text-sm placeholder:text-warm-gray-1 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm mb-2" htmlFor="checkout-phone">
                      Phone <span className="text-muted text-xs">(optional)</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-transparent border border-border font-sans text-sm placeholder:text-warm-gray-1 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-border" />

              <div>
                <h2 className="font-sans text-xs tracking-widest uppercase text-muted mb-6">
                  Shipping Details
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block font-sans text-sm mb-2" htmlFor="checkout-address">
                      Shipping Address <span className="text-muted text-xs">(optional)</span>
                    </label>
                    <textarea
                      id="checkout-address"
                      value={form.address}
                      onChange={update('address')}
                      rows={3}
                      placeholder="Street, City, Country, Postal Code"
                      className="w-full px-4 py-3 bg-transparent border border-border font-sans text-sm placeholder:text-warm-gray-1 focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm mb-2" htmlFor="checkout-notes">
                      Order Notes <span className="text-muted text-xs">(optional)</span>
                    </label>
                    <textarea
                      id="checkout-notes"
                      value={form.notes}
                      onChange={update('notes')}
                      rows={2}
                      placeholder="Special requests, gift wrapping, etc."
                      className="w-full px-4 py-3 bg-transparent border border-border font-sans text-sm placeholder:text-warm-gray-1 focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <div className="lg:w-[380px] shrink-0">
              <div className="lg:sticky lg:top-32">
                <div className="bg-cream p-8">
                  <h2 className="font-sans text-xs tracking-widest uppercase text-muted mb-6">
                    Your Order
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((it) => (
                      <div key={it.productId} className="flex gap-4">
                        {it.image && (
                          <div className="w-14 h-16 bg-beige overflow-hidden shrink-0">
                            <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm truncate">{it.name}</p>
                          <p className="font-sans text-xs text-muted mt-0.5">Qty: {it.qty}</p>
                        </div>
                        <p className="font-mono text-sm shrink-0">{formatCents(it.price * it.qty)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3 mb-6">
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-muted">Subtotal ({totalQty} items)</span>
                      <span>{formatCents(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-muted">Shipping</span>
                      <span className="text-muted italic text-xs">To be confirmed</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-8">
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-sm">Total</span>
                      <span className="font-display text-2xl">{formatCents(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 font-sans text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-5 text-sm tracking-widest"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Placing Order…
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 mr-2" />
                        Place Order
                      </>
                    )}
                  </Button>

                  <p className="font-sans text-xs text-muted text-center mt-4 leading-relaxed">
                    You&apos;ll receive an email confirmation with payment details and next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
