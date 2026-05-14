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
        "font-display font-light tracking-[0.2em] text-xl md:text-2xl uppercase",
        variant === 'dark' ? "text-black" : "text-cream",
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
