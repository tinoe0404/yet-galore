import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export const DisplayText = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as: Component = 'h1', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-display font-light text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
DisplayText.displayName = 'DisplayText';

export const Heading = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as: Component = 'h2', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-display font-normal text-3xl md:text-4xl lg:text-5xl tracking-tight leading-snug', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = 'Heading';

export const Subheading = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as: Component = 'h3', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-display font-normal text-2xl md:text-3xl tracking-normal leading-snug', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Subheading.displayName = 'Subheading';

export const BodyText = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as: Component = 'p', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-sans font-normal text-base leading-relaxed', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
BodyText.displayName = 'BodyText';

export const Caption = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as: Component = 'p', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-sans font-normal text-sm text-muted leading-normal', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Caption.displayName = 'Caption';

export const Label = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as: Component = 'label', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-sans font-medium text-sm leading-none', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Label.displayName = 'Label';

export const Tag = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as: Component = 'span', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-sans uppercase tracking-[0.2em] text-xs text-muted', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Tag.displayName = 'Tag';
