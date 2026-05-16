"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { mobileMenuOverlay, mobileMenuStagger, mobileMenuItem } from '@/lib/animations';
import { Logo } from '@/components/common/Logo';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface MobileMenuProps {
  id?: string;
  isOpen: boolean;
  categories: { name: string; slug: string }[];
  onClose: () => void;
}

function CartLinkMobile() {
  const { totalQty } = useCart();
  return (
    <Link href="/cart" aria-label="Cart" className="opacity-90 hover:opacity-70 relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      {totalQty ? <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-cream text-black text-xs font-medium">{totalQty}</span> : null}
    </Link>
  );
}

export function MobileMenu({ id, isOpen, categories, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
          id={id}
          ref={menuRef}
          variants={mobileMenuOverlay}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-40 bg-cream pt-24 px-6 flex flex-col"
        >

          <motion.nav 
            variants={mobileMenuStagger}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-6 mt-12"
          >


            <motion.div variants={mobileMenuItem}>
              <Link href="/catalogue" className="font-display text-4xl tracking-tight text-black" onClick={onClose}>
                SHOP
              </Link>
            </motion.div>



            <motion.div variants={mobileMenuItem}>
              <Link href="/about" className="font-display text-4xl tracking-tight text-black" onClick={onClose}>
                ABOUT
              </Link>
            </motion.div>

            <motion.div variants={mobileMenuItem}>
              <Link href="/collections" className="font-display text-4xl tracking-tight text-black" onClick={onClose}>
                COLLECTIONS
              </Link>
            </motion.div>

            <motion.div variants={mobileMenuItem} className="mt-8 pt-8 border-t border-border">
              <Link href="/contact" className="font-display text-4xl tracking-tight text-black" onClick={onClose}>
                ENQUIRE
              </Link>
            </motion.div>


          </motion.nav>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="mt-auto pb-12"
          >
            <a href="https://www.instagram.com/yet.galore?igsh=MWl4bTFoMTdwbDA4bw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="font-sans text-sm tracking-wider uppercase text-black">
              Instagram
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
