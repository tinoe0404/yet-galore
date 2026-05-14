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
    <img 
      src={variant === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'}
      alt="Yet Galore"
      className={cn("h-6 w-auto", className)}
      decoding="async"
    />
  );

  if (asLink) {
    return <Link href="/">{content}</Link>;
  }

  return content;
}
