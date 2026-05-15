"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { mobileMenuOverlay, mobileMenuStagger, mobileMenuItem } from '@/lib/animations';
import { Logo } from '@/components/common/Logo';
import { useRouter } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  categories: { name: string; slug: string }[];
  onClose: () => void;
}

export function MobileMenu({ isOpen, categories, onClose }: MobileMenuProps) {
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
          ref={menuRef}
          variants={mobileMenuOverlay}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-40 bg-cream pt-24 px-6 flex flex-col"
        >
          {/* Top header with back button */}
          <div className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between">
            <button
              onClick={() => {
                // Prefer navigating back if there's history, otherwise just close the menu
                try {
                  if (window.history.length > 1) {
                    router.back();
                  } else {
                    onClose();
                  }
                } catch (e) {
                  onClose();
                }
              }}
              aria-label="Back"
              className="p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div className="flex-1 flex justify-center">
              <Logo variant="dark" asLink={false} className="!w-[160px]" />
            </div>

            <div className="w-8" />
          </div>
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

            <motion.div variants={mobileMenuItem} className="mt-8">
              <div className="flex items-center gap-6">
                <Link href="/account" aria-label="Account" className="opacity-90 hover:opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </Link>
                <Link href="/search" aria-label="Search" className="opacity-90 hover:opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </Link>
                <Link href="/cart" aria-label="Cart" className="opacity-90 hover:opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </Link>
              </div>
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
