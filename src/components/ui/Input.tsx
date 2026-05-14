import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={inputId} className="block font-sans text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'flex w-full rounded-none border border-border bg-transparent px-4 py-3',
            'font-sans text-base transition-colors duration-200',
            'placeholder:text-muted focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-600 focus:border-red-600',
            className
          )}
          {...props}
        />
        {error && <p className="font-sans text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
