import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  asLink?: boolean;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  variant = 'dark', 
  asLink = true,
  href = '/'
}) => {
  const content = (
    <span
      className={cn(
        "font-serif text-2xl md:text-3xl tracking-[0.15em] uppercase select-none",
        variant === 'dark' ? 'text-black' : 'text-white',
        className
      )}
    >
      Yet Galore
    </span>
  );

  if (asLink) {
    return (
      <Link href={href} className="inline-block transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
};
