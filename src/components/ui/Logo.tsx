import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  asLink?: boolean;
}

export function Logo({ className, variant = 'dark', asLink = false }: LogoProps) {
  const content = (
    <span
      className={cn(
        "font-serif text-xl tracking-[0.15em] uppercase select-none",
        variant === 'dark' ? 'text-black' : 'text-white',
        className
      )}
    >
      Yet Galore
    </span>
  );

  if (asLink) {
    return <Link href="/" className="inline-block transition-opacity hover:opacity-80">{content}</Link>;
  }

  return content;
}
