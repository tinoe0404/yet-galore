'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export function AdminHeader({ session }: { session: any }) {
  const pathname = usePathname();

  // Convert /admin/dashboard -> Dashboard
  const segments = pathname.split('/').filter(Boolean);
  let title = segments[segments.length - 1] || 'Dashboard';
  
  if (segments.includes('enquiries') && title !== 'enquiries') {
    title = 'Enquiry Details';
  }
  
  const displayTitle = title.charAt(0).toUpperCase() + title.slice(1).replace('-', ' ');

  return (
    <header className="w-full bg-white border-b border-border px-6 lg:px-10 h-20 flex items-center justify-between sticky top-0 z-20">
      <h1 className="font-display text-2xl md:text-3xl">{displayTitle}</h1>

      <div className="flex items-center gap-6">
        <span className="font-sans text-sm text-black/70 hidden md:block">
          {session?.user?.name || 'Administrator'}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="text-xs hidden md:flex"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
