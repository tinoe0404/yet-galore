'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';

export function NavbarClient({ categories }: { categories: { name: string; slug: string }[] }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent text-white">
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">

        {/* Left nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/catalogue" className="font-sans text-sm tracking-wider uppercase">SHOP</Link>
          <Link href="/about" className="font-sans text-sm tracking-wider uppercase">ABOUT</Link>
          <Link href="/collections" className="font-sans text-sm tracking-wider uppercase">COLLECTIONS</Link>
        </nav>

        {/* Center logo */}
        <div className="flex-1 flex justify-center">
          <Logo variant="light" className="!w-[220px] !h-auto" />
        </div>

        {/* Right icons */}
        <div className="hidden md:flex items-center gap-6">
          {/* profile */}
          <Link href="/account" aria-label="Account" className="opacity-90 hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          {/* search */}
          <Link href="/search" aria-label="Search" className="opacity-90 hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </Link>
          {/* cart */}
          <Link href="/cart" aria-label="Cart" className="opacity-90 hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </Link>
        </div>

      </div>
    </header>
  );
}
