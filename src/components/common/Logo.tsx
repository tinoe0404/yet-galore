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
    <div className={cn("relative flex items-center justify-center", className)}>
      <span className={cn(
        "font-display font-light tracking-tight",
        "text-2xl md:text-4xl lg:text-5xl",
        variant === 'light' ? 'text-white' : 'text-black'
      )}>
        YETGALORE
      </span>
    </div>
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
