'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/common/Logo';
import { MobileMenu } from './MobileMenu';
import { useCart } from '@/context/CartContext';

export function NavbarClient({ categories }: { categories: { name: string; slug: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled && !isOpen;

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:p-2 focus:bg-white focus:text-black">
        Skip to content
      </a>

      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isTransparent ? "bg-transparent text-white" : "bg-background/95 backdrop-blur-md text-black border-b border-border"
      )}>
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">

        {/* Left nav links (compact for large screens) - HOME removed to reduce clutter */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/catalogue" className={cn("font-sans text-sm tracking-wider uppercase transition-all", pathname?.startsWith('/catalogue') ? 'font-medium underline underline-offset-8' : 'hover:opacity-70')}>SHOP</Link>
          <Link href="/about" className={cn("font-sans text-sm tracking-wider uppercase transition-all", pathname === '/about' ? 'font-medium underline underline-offset-8' : 'hover:opacity-70')}>ABOUT</Link>
          <Link href="/collections" className={cn("font-sans text-sm tracking-wider uppercase transition-all", pathname?.startsWith('/collections') ? 'font-medium underline underline-offset-8' : 'hover:opacity-70')}>COLLECTIONS</Link>
        </nav>

        {/* Center logo */}
        <div className="flex-1 flex justify-center">
          <Logo variant={isTransparent ? "light" : "dark"} className="!w-[220px] !h-auto" />
        </div>

        {/* Right icons / Mobile hamburger */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/" aria-label="Home" className="opacity-90 hover:opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </Link>
            <Link href="/cart" aria-label="Cart" className="opacity-90 hover:opacity-70">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                { /* cart count badge */ }
                <CartCountBadge isTransparent={isTransparent} />
              </div>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 relative z-[60]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <div className="w-6 h-4 relative flex flex-col justify-center items-center">
              <span className={cn("absolute block h-[1px] w-full transition-all duration-300", 
                (isTransparent && !isOpen) ? "bg-white" : "bg-black",
                isOpen ? "rotate-45" : "-translate-y-1.5"
              )} />
              <span className={cn("absolute block h-[1px] w-full transition-all duration-300", 
                (isTransparent && !isOpen) ? "bg-white" : "bg-black",
                isOpen ? "opacity-0" : "opacity-100"
              )} />
              <span className={cn("absolute block h-[1px] w-full transition-all duration-300", 
                (isTransparent && !isOpen) ? "bg-white" : "bg-black",
                isOpen ? "-rotate-45" : "translate-y-1.5"
              )} />
            </div>
          </button>
        </div>

      </div>
      </header>

      <MobileMenu id="mobile-menu" isOpen={isOpen} categories={categories} onClose={() => setIsOpen(false)} />
    </>
  );
}

function CartCountBadge({ isTransparent }: { isTransparent: boolean }) {
  const { totalQty } = useCart();
  if (!totalQty) return null;
  return (
    <span className={cn(
      "absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium transition-colors duration-300",
      isTransparent ? "bg-cream text-black" : "bg-black text-white"
    )}>
      {totalQty}
    </span>
  );
}
