'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white glow-orange',
    secondary: 'bg-navy-200 hover:bg-navy-300 text-white border border-ice/20',
    ghost: 'hover:bg-navy-100 text-slate-300 hover:text-white',
    outline: 'border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base font-semibold',
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-navy',
        'disabled:opacity-50 disabled:pointer-events-none',
        'hover:scale-[1.02] active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}
