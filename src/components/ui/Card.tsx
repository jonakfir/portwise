'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'glass rounded-sm p-6 transition-all duration-300',
        hover && 'glass-hover cursor-pointer',
        glowStyles[glow],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
