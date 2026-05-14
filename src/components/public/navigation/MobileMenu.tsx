'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';

interface MobileMenuProps {
  isOpen: boolean;
  categories: { name: string; slug: string }[];
  onClose: () => void;
}

export function MobileMenu({ isOpen, categories, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Basic Focus Trap
    const focusableElements = menuRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Delay focus to allow animation to start
    setTimeout(() => firstElement?.focus(), 100);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-cream pt-24 px-6 flex flex-col"
        >
          <motion.nav 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="initial"
            className="flex flex-col gap-6 mt-12"
          >
            {categories.map((cat) => (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link 
                  href={`/catalogue/${cat.slug}`}
                  className="font-display text-4xl tracking-tight text-black"
                  onClick={onClose}
                >
                  {cat.name}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={fadeUp} className="mt-8 pt-8 border-t border-border">
              <Link 
                href="/contact" 
                className="font-display text-4xl tracking-tight text-black"
                onClick={onClose}
              >
                Enquire
              </Link>
            </motion.div>
          </motion.nav>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="mt-auto pb-12"
          >
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="font-sans text-sm tracking-wider uppercase text-black">
              Instagram
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
