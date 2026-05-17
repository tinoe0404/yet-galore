import React from 'react';
import Link from 'next/link';
import { ArrowRight, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import siteProfile from '@/data/siteProfile.json';

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-20 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Trust Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 mb-16 border-b border-cream/10 text-cream/90 font-sans text-sm tracking-wide text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <RefreshCw className="w-5 h-5 text-cream/60" />
            <span>Free returns within 14 days</span>
          </div>
          <div className="flex items-center justify-center md:justify-center gap-4">
            <Truck className="w-5 h-5 text-cream/60" />
            <span>Worldwide shipping</span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-4">
            <ShieldCheck className="w-5 h-5 text-cream/60" />
            <span>Secure checkout</span>
          </div>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <Logo variant="light" asLink={true} />
            <p className="font-display italic text-xl tracking-wide max-w-xs text-cream/90">
              Curated luxury essentials for the modern aesthetic.
            </p>
            <p className="font-sans text-sm text-cream/60">
              Victoria Falls, Zimbabwe
            </p>
          </div>

          {/* Column 2 - Catalogue */}
          <div className="space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-widest text-cream/60">Catalogue</h4>
            <ul className="space-y-4 font-sans">
              <li>
                <Link href="/catalogue/handbags" className="text-cream hover:text-white transition-colors duration-200">
                  Handbags
                </Link>
              </li>
              <li>
                <Link href="/catalogue/jerseys" className="text-cream hover:text-white transition-colors duration-200">
                  Jerseys
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-cream hover:text-white transition-colors duration-200">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Information */}
          <div className="space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-widest text-cream/60">Information</h4>
            <ul className="space-y-4 font-sans">
              <li>
                <Link href="/about" className="text-cream hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="text-cream hover:text-white transition-colors duration-200">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div className="space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-widest text-cream/60">Connect</h4>
            <ul className="space-y-4 font-sans">
                <li>
                  <a href={siteProfile.instagram} target="_blank" rel="noreferrer" className="text-cream hover:text-white transition-colors duration-200">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={siteProfile.tiktok} target="_blank" rel="noreferrer" className="text-cream hover:text-white transition-colors duration-200">
                    TikTok
                  </a>
                </li>
              <li className="pt-2">
                <a href={siteProfile.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-cream hover:text-white transition-colors duration-200">
                  <span>Chat with us</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </li>
              <li>
                <a href={`mailto:${siteProfile.email}`} className="text-cream hover:text-white transition-colors duration-200">
                  {siteProfile.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-cream/50 border-t border-cream/10">
          <p>© {new Date().getFullYear()} {siteProfile.copyrightName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
