import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  asLink?: boolean;
}

export function Logo({ className, variant = 'dark', asLink = false }: LogoProps) {
  const content = (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image 
        src="/logo.jpg" 
        alt="Yet Galore" 
        width={120} 
        height={40} 
        className={cn(
          "object-contain mix-blend-multiply", 
          variant === 'light' && "invert"
        )}
        priority
      />
    </div>
  );

  if (asLink) {
    return <Link href="/" className="inline-block transition-opacity hover:opacity-80">{content}</Link>;
  }

  return content;
}
