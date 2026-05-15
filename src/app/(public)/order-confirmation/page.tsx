'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <CheckCircle className="w-16 h-16 mx-auto text-black" strokeWidth={1} />
      </motion.div>

      {/* Heading */}
      <h1 className="font-display font-light text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
        Thank You
      </h1>
      <p className="font-sans text-muted text-base md:text-lg max-w-md mx-auto leading-relaxed mb-2">
        Your order has been received. We&apos;ll be in touch shortly with payment details and delivery arrangements.
      </p>

      {/* Order ID */}
      {orderId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-block mt-8 mb-12"
        >
          <div className="bg-cream px-8 py-5 border border-border">
            <span className="block font-sans text-xs tracking-widest uppercase text-muted mb-1">
              Order Reference
            </span>
            <span className="font-mono text-lg tracking-wide">{orderId}</span>
          </div>
        </motion.div>
      )}

      {/* Email Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-3 text-muted mb-12"
      >
        <Mail className="w-4 h-4" />
        <span className="font-sans text-sm">
          A confirmation email has been sent to your inbox.
        </span>
      </motion.div>

      {/* Divider */}
      <div className="w-16 h-[1px] bg-border mx-auto mb-12" />

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link href="/catalogue">
          <Button variant="primary" size="lg" className="group">
            Continue Shopping
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="lg">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="w-full bg-background min-h-screen pt-20">
      <div className="container-narrow py-24 md:py-32">
        <Suspense
          fallback={
            <div className="text-center py-24">
              <div className="w-8 h-8 border-2 border-border border-t-black rounded-full animate-spin mx-auto" />
            </div>
          }
        >
          <OrderConfirmationContent />
        </Suspense>
      </div>
    </div>
  );
}
