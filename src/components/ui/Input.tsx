'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-navy-100 border border-navy-300 rounded px-4 py-3 text-white',
            'placeholder:text-slate-500 focus:outline-none focus:border-orange-500/50',
            'focus:ring-2 focus:ring-orange-500/20 transition-all duration-200',
            icon && 'pl-12',
            error && 'border-red-500/50',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
