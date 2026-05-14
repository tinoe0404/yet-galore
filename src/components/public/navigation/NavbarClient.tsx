'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/common/Logo';
import { MobileMenu } from './MobileMenu';

export function NavbarClient({ categories }: { categories: { name: string; slug: string }[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navClasses = cn(
    "fixed top-0 inset-x-0 z-50 transition-all duration-300",
    isScrolled || isMobileMenuOpen 
      ? "bg-cream border-b border-border text-black" 
      : "bg-transparent text-black"
  );

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-white focus:text-black">
        Skip to content
      </a>
      
      <header className={navClasses}>
        <div className="container-wide h-20 flex items-center justify-between">
          
          {/* Desktop Left: Categories */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {categories.map(cat => (
              <Link 
                key={cat.slug} 
                href={`/catalogue/${cat.slug}`}
                className={cn(
                  "font-sans text-sm tracking-wider uppercase transition-colors hover:text-black/70",
                  pathname === `/catalogue/${cat.slug}` && "underline underline-offset-4"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Center: Logo */}
          <div className="flex-shrink-0 relative z-50 flex items-center justify-center">
            <Logo variant="dark" />
          </div>

          {/* Desktop Right: Social & Enquire */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <Link 
              href="/contact" 
              className="font-sans text-sm tracking-wider uppercase hover:text-black/70 transition-colors"
            >
              Enquire
            </Link>
          </div>

          {/* Mobile Right: Hamburger */}
          <div className="flex md:hidden flex-1 justify-end relative z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-2 -mr-2"
            >
              <div className="w-6 h-3 relative flex flex-col justify-between">
                <span className={cn("block h-[1px] w-full bg-black transition-transform duration-300 origin-center", isMobileMenuOpen && "translate-y-[5px] rotate-45")} />
                <span className={cn("block h-[1px] w-full bg-black transition-transform duration-300 origin-center", isMobileMenuOpen && "-translate-y-[6px] -rotate-45")} />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        categories={categories}
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
