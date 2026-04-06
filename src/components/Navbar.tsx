'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Navbar({ isAuth = false }: { isAuth?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-ice/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
              <circle cx="24" cy="24" r="18" stroke="#FF5C1A" strokeWidth="2" fill="none" />
              <circle cx="24" cy="24" r="7" stroke="#FF5C1A" strokeWidth="1.5" fill="none" />
              <line x1="24" y1="2" x2="24" y2="12" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="24" y1="36" x2="24" y2="46" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="2" y1="24" x2="12" y2="24" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="36" y1="24" x2="46" y2="24" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="24,2 21,10 24,7 27,10" fill="#FF5C1A" />
              <path d="M20,26 L24,18 L28,26 Q24,30 20,26Z" fill="#FF5C1A" opacity="0.9" />
            </svg>
            <span className="text-xl font-bold text-white tracking-tight">Portwise</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm text-slate-400 hover:text-white transition animated-underline">
              Features
            </Link>
            <Link href="/#pricing" className="text-sm text-slate-400 hover:text-white transition animated-underline">
              Pricing
            </Link>
            <Link href="/#demo" className="text-sm text-slate-400 hover:text-white transition animated-underline">
              Live Demo
            </Link>
            {isAuth ? (
              <Link href="/dashboard">
                <Button variant="primary" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-ice/5"
          >
            <div className="px-4 py-4 space-y-3">
              <Link href="/#features" className="block text-slate-400 hover:text-white transition">Features</Link>
              <Link href="/#pricing" className="block text-slate-400 hover:text-white transition">Pricing</Link>
              <Link href="/#demo" className="block text-slate-400 hover:text-white transition">Live Demo</Link>
              <div className="pt-3 border-t border-ice/10 flex gap-3">
                <Link href="/auth/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
                <Link href="/auth/signup"><Button variant="primary" size="sm">Get Started</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
