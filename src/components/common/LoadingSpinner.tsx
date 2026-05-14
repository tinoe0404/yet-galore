import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 24, 
  className,
  ...props
}) => {
  return (
    <div
      role="status"
      className={cn(
        "inline-block animate-spin rounded-full border-[2px] border-current border-t-transparent text-black",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
