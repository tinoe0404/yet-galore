'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { useCart } from '@/context/CartContext';

export function NavbarClient({ categories }: { categories: { name: string; slug: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isDarkText = isOpen || (!isHome && !isScrolled);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:p-2 focus:bg-white focus:text-black">
        Skip to content
      </a>

      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 w-full",
        (isScrolled && !isOpen)
          ? "bg-black/60 backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.08)]" 
          : "bg-transparent border-transparent"
      )}>
        <div className={cn(
          "w-full py-4 px-6 md:py-5 md:px-10 flex items-center justify-between transition-colors duration-300",
          isDarkText ? "text-black" : "text-white"
        )}>
          
          {/* LEFT: Menu / Navigation */}
          <div className="flex-1 flex justify-start items-center gap-8">
            {/* Hamburger (Mobile) */}
            <button
              className="p-1 relative z-[60] md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className="w-[22px] h-[14px] relative flex flex-col justify-between">
                <span className={cn("block h-[1.5px] w-full transition-all duration-300", isDarkText ? "bg-black" : "bg-white", isOpen ? "rotate-45 translate-y-[6.25px]" : "")} />
                <span className={cn("block h-[1.5px] w-full transition-all duration-300", isDarkText ? "bg-black" : "bg-white", isOpen ? "opacity-0" : "opacity-100")} />
                <span className={cn("block h-[1.5px] w-full transition-all duration-300", isDarkText ? "bg-black" : "bg-white", isOpen ? "-rotate-45 -translate-y-[6.25px]" : "")} />
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/catalogue" className="font-sans text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">Shop</Link>
              <Link href="/about" className="font-sans text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">About</Link>
              <Link href="/collections" className="font-sans text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">Collections</Link>
            </nav>
          </div>

          {/* CENTRE: Brand Name */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center whitespace-nowrap">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="font-display tracking-[0.25em] text-[0.9rem] md:text-[1rem] font-normal uppercase hover:opacity-80 transition-opacity"
            >
              YETGALORE
            </Link>
          </div>

          {/* RIGHT: Cart */}
          <div className="flex-1 flex justify-end">
            <Link href="/cart" aria-label="Cart" onClick={() => setIsOpen(false)} className="relative p-1 hover:opacity-70 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="20" r="1"/>
                <circle cx="20" cy="20" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <CartCountBadge isDarkText={isDarkText} />
            </Link>
          </div>

        </div>
      </header>

      <MobileMenu id="mobile-menu" isOpen={isOpen} categories={categories} onClose={() => setIsOpen(false)} />
    </>
  );
}

function CartCountBadge({ isDarkText }: { isDarkText: boolean }) {
  const { totalQty } = useCart();
  if (!totalQty) return null;
  return (
    <span 
      className={cn(
        "absolute -top-1 -right-1 inline-flex items-center justify-center font-semibold rounded-full",
        isDarkText ? "bg-black text-white" : "bg-white text-black"
      )}
      style={{ width: '16px', height: '16px', fontSize: '10px' }}
    >
      {totalQty}
    </span>
  );
}
