import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', withArrow = false, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-black text-white hover:bg-charcoal active:scale-[0.98]',
      outline: 'bg-transparent text-black border border-black hover:bg-black hover:text-white active:scale-[0.98]',
      ghost: 'bg-transparent text-black hover:bg-black/5 active:scale-[0.98]',
      link: 'bg-transparent text-black p-0 hover:underline underline-offset-4',
    };

    const sizes = {
      sm: variant === 'link' ? '' : 'px-4 py-2 text-sm',
      md: variant === 'link' ? '' : 'px-6 py-3 text-base',
      lg: variant === 'link' ? '' : 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center font-sans tracking-wide transition-all duration-300',
          'rounded-none disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
        {withArrow && <ArrowRight className={cn("ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1")} />}
      </button>
    );
  }
);

Button.displayName = 'Button';
