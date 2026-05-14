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
    <img 
      src={variant === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'}
      alt="Yet Galore"
      className={cn("h-8 md:h-10 w-auto", className)}
      decoding="async"
    />
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
