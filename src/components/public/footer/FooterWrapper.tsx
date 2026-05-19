'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

/**
 * Client wrapper for the footer.
 *
 * Hides the footer entirely on the homepage ('/') to allow the cinematic
 * fullscreen snap-scroll experience to occupy the entire viewport
 * without the user scrolling past it into the footer.
 */
export function FooterWrapper() {
  const pathname = usePathname();
  
  if (pathname === '/') {
    return null;
  }
  
  return <Footer />;
}
