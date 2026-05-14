import React from 'react';
import { auth, signOut } from '@/features/auth/config';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export async function AdminHeader() {
  const session = await auth();

  return (
    <header className="w-full bg-white border-b border-border px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo className="text-xl" />
        <span className="font-sans text-xs tracking-widest uppercase text-muted border-l border-border pl-4 hidden md:inline">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-6">
        <span className="font-sans text-sm text-black/70">
          {session?.user?.name || 'Administrator'}
        </span>
        <form action={async () => {
          'use server';
          await signOut({ redirectTo: '/admin/login' });
        }}>
          <Button type="submit" variant="outline" size="sm" className="text-xs">
            Sign Out
          </Button>
        </form>
      </div>
    </header>
  );
}
