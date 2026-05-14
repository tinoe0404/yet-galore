'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Folders, Inbox, Settings, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: ShoppingBag },
  { label: 'Categories', href: '/admin/categories', icon: Folders },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar({ session }: { session: any }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navContent = (
    <>
      <div className="p-8 pb-12">
        <Link href="/admin/dashboard" className="inline-block">
          <img 
            src="/images/logo-light.png" 
            alt="Yet Galore" 
            className="h-8 w-auto" 
            decoding="async"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-4 px-8 py-3.5 font-sans text-sm tracking-wide transition-colors",
                isActive 
                  ? "bg-white/10 text-cream border-l-2 border-cream" 
                  : "text-cream/60 hover:bg-white/5 hover:text-cream border-l-2 border-transparent"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/10">
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-xs text-cream/50 uppercase tracking-widest">Logged In</span>
          <span className="text-sm">{session?.user?.name || 'Administrator'}</span>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-charcoal text-cream p-4 shadow-lg rounded-full"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-charcoal text-cream h-full border-r border-border z-30">
        {navContent}
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)}>
          <aside 
            className="w-72 h-full bg-charcoal text-cream flex flex-col shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
