'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'orange' | 'ice' | 'none';
}

export default function Card({ children, className, hover = false, glow = 'none' }: CardProps) {
  const glowStyles = {
    orange: 'hover:shadow-[0_0_30px_rgba(255,92,26,0.15)]',
    ice: 'hover:shadow-[0_0_30px_rgba(168,216,234,0.1)]',
    none: '',
  };

  return (
    <div
      className={cn(
        'glass rounded-sm p-6 transition-all duration-300 animate-slide-up',
        hover && 'glass-hover cursor-pointer',
        glowStyles[glow],
        className
      )}
    >
      {children}
    </div>
  );
}
