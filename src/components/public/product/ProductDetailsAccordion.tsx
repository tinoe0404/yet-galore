'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { BodyText } from '@/components/ui/Typography';

export function ProductDetailsAccordion({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-border">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between font-sans text-sm tracking-widest uppercase hover:text-black/70 transition-colors"
      >
        <span>Product Details</span>
        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-8">
              <BodyText className="whitespace-pre-wrap text-black/80 text-sm">
                {content}
              </BodyText>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
