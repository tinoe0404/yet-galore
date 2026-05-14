import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  asLink?: boolean;
}

export function Logo({ className, asLink = false }: LogoProps) {
  const content = (
    <span className={cn('font-display font-light tracking-wider', className)}>
      YET GALORE
    </span>
  );

  if (asLink) {
    return <Link href="/">{content}</Link>;
  }

  return content;
}
