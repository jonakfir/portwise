'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const TradeGlobe = dynamic(() => import('@/components/globe/TradeGlobe'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-radial from-navy-200/20 to-transparent" />
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Globe background */}
      <TradeGlobe />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm text-orange-300 font-medium">Live tariff data updated daily</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Tariffs changed again.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Do you know what you&apos;re
            </span>
            <br />
            actually paying?
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Real-time tariff intelligence for importers, sourcing teams, and freight brokers.
            Powered by official US government data and AI analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="#demo">
              <Button variant="primary" size="lg">
                Look up your HTS code free
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">See how it works</Button>
            </Link>
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded px-6 py-4 max-w-3xl mx-auto"
        >
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Powered by official data</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              USITC
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Federal Register
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              CBP Rulings
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Trade.gov
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
