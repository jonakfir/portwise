'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ───────────────────────────────────────────── helpers ── */

function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  useEffect(() => {
    if (!startOnView || !inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, end, duration, startOnView]);
  return { count, ref };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─────────── SVG logo ── */
function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="18" stroke="#FF5C1A" strokeWidth="2" />
      <circle cx="24" cy="24" r="7" stroke="#FF5C1A" strokeWidth="1.5" />
      <line x1="24" y1="2" x2="24" y2="12" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="36" x2="24" y2="46" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="2" y1="24" x2="12" y2="24" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="24" x2="46" y2="24" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="24,2 21,10 24,7 27,10" fill="#FF5C1A" />
      <path d="M20,26 L24,18 L28,26 Q24,30 20,26Z" fill="#FF5C1A" opacity="0.9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ───────────────────────────────── NAVBAR ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
        ${scrolled
          ? 'bg-[#0a0e1a]/80 backdrop-blur-xl border-white/5 shadow-2xl shadow-black/20'
          : 'bg-transparent border-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo />
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">Portwise</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Live Demo'].map((t) => (
              <a key={t} href={`/#${t === 'Live Demo' ? 'demo' : t.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-white transition-colors relative after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all hover:after:w-full">
                {t}
              </a>
            ))}
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <button className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">Sign In</button>
              </Link>
              <Link href="/auth/signup">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.03] active:scale-[0.98]">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {['Features', 'Pricing', 'Live Demo'].map((t) => (
                <a key={t} href={`/#${t === 'Live Demo' ? 'demo' : t.toLowerCase()}`}
                  className="text-slate-300 py-2" onClick={() => setMenuOpen(false)}>{t}</a>
              ))}
              <Link href="/auth/signup" className="mt-2 px-5 py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ───────────────────────────────── HERO ── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/[0.06] blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-600/[0.04] blur-[100px]" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-900/10 blur-[150px]" />
        </motion.div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,92,26,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,92,26,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/60 via-transparent to-[#0a0e1a]" />

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/[0.06] backdrop-blur-sm mb-8">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm text-orange-300 font-medium">Live tariff data updated daily</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} custom={1}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.02] tracking-tight mb-8">
            Tariffs changed again.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
              Do you know what you&apos;re
            </span>
            <br />
            actually paying?
          </motion.h1>

          {/* Sub */}
          <motion.p variants={fadeUp} custom={2}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Real-time tariff intelligence for importers, sourcing teams, and freight brokers. Powered by official US government data and AI analysis.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="#demo">
              <button className="group relative px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-[1.03] active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-2">
                  Look up your HTS code free
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
            <Link href="#features">
              <button className="px-8 py-4 text-base font-semibold text-orange-400 border border-orange-500/30 rounded-xl hover:bg-orange-500/10 hover:border-orange-500/60 transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm">
                See how it works
              </button>
            </Link>
          </motion.div>

          {/* Data sources */}
          <motion.div variants={fadeUp} custom={4}
            className="relative rounded-2xl px-8 py-5 max-w-3xl mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/[0.04] via-transparent to-orange-500/[0.04]" />
            <p className="relative text-xs text-slate-500 uppercase tracking-[0.2em] mb-3 font-semibold">Powered by official data</p>
            <div className="relative flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
              {['USITC', 'Federal Register', 'CBP Rulings', 'Trade.gov'].map((s) => (
                <span key={s} className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-600/50 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-orange-500/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────────────── FEATURES ── */
const features = [
  {
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Real-Time Tariff Rates',
    desc: 'Instant access to current duty rates from the USITC Harmonized Tariff Schedule. General, special, and Column 2 rates for any HTS code.',
    stat: 17000,
    statSuffix: '+',
    statLabel: 'HTS codes tracked',
  },
  {
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Policy Change Alerts',
    desc: 'Monitor your HTS codes for tariff changes. Get notified when Federal Register rules, Section 301/232 modifications, or FTA updates affect your products.',
    stat: 24,
    statSuffix: 'hr',
    statLabel: 'alert latency',
  },
  {
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Sourcing Scenario Modeling',
    desc: 'Compare total landed cost across alternative sourcing countries. Factor in duty rates, FTA benefits, shipping estimates, and trade agreement status.',
    stat: 20,
    statSuffix: '+',
    statLabel: 'countries compared',
  },
];

function FeatureCard({ f, i, inView }: { f: typeof features[0]; i: number; inView: boolean }) {
  const counter = useCountUp(f.stat);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group relative h-full rounded-2xl p-8 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] transition-all duration-500 hover:bg-white/[0.06] hover:border-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/[0.06] group-hover:to-transparent transition-all duration-500" />
        <div className="relative">
          <div className="mb-6 p-3 inline-block rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
            {f.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">{f.desc}</p>
          <div className="pt-6 border-t border-white/[0.06]">
            <span ref={counter.ref} className="font-mono text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
              {counter.count.toLocaleString()}{f.statSuffix}
            </span>
            <span className="text-xs text-slate-500 ml-3 uppercase tracking-wider">{f.statLabel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,92,26,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,92,26,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-transparent to-[#0a0e1a]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-orange-500 font-mono text-sm font-semibold uppercase tracking-[0.2em] mb-4">Trade Intelligence Platform</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Your war room for tariff decisions</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Stop guessing at duty rates. Get the data, analysis, and alerts you need to make sourcing decisions with confidence.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────── LIVE DEMO ── */
function LiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [query, setQuery] = useState('');
  const lookups = 3;

  return (
    <section id="demo" className="py-32 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[120px]" />
      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-orange-500 font-mono text-sm font-semibold uppercase tracking-[0.2em] mb-4">Try it now</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Look up any HTS code</h2>
          <p className="text-slate-400 text-lg">Search by product description or HTS code. {lookups} free lookups remaining.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-orange-600/10 to-orange-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try "laptop", "coffee", or "8471.30.01"...'
              className="w-full bg-white/[0.04] border-2 border-white/[0.08] rounded-xl pl-14 pr-6 py-5 text-white text-lg font-mono placeholder:text-slate-600 placeholder:font-sans focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all backdrop-blur-sm"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────── PRICING ── */
const plans = [
  {
    name: 'Free', desc: 'Get started with basic tariff lookups', price: 'Free', period: '',
    features: ['5 lookups per day', 'Current duty rates', 'HTS code search', 'Basic product descriptions'],
    cta: 'Start free', href: '/auth/signup', popular: false, variant: 'outline' as const,
  },
  {
    name: 'Pro', desc: 'For importers and sourcing managers', price: '$49', period: '/mo',
    features: ['Unlimited lookups', 'Rate change email alerts', 'Sourcing scenario tool', 'AI-powered analysis', 'Federal Register monitoring', 'CBP ruling search', 'Export reports', 'Priority support'],
    cta: 'Start 14-day trial', href: '/auth/signup?plan=pro', popular: true, variant: 'solid' as const,
  },
  {
    name: 'Team', desc: 'For trade teams and freight brokers', price: '$199', period: '/mo',
    features: ['Everything in Pro', 'Up to 10 team members', 'REST API access', 'Custom watchlists', 'Shared dashboards', 'Dedicated account manager', 'SSO integration', 'Webhook alerts'],
    cta: 'Contact sales', href: '/auth/signup?plan=team', popular: false, variant: 'outline' as const,
  },
];

function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,92,26,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,92,26,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-transparent to-[#0a0e1a]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-orange-500 font-mono text-sm font-semibold uppercase tracking-[0.2em] mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Intelligence at every scale</h2>
          <p className="text-slate-400 max-w-lg mx-auto text-lg">Start free. Upgrade when your trade operations need more.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm
                ${p.popular
                  ? 'bg-gradient-to-b from-orange-500/10 to-white/[0.03] border-2 border-orange-500/30 shadow-2xl shadow-orange-500/10'
                  : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]'}`}
              >
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg shadow-orange-500/30">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-sm text-slate-400">{p.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-white font-mono">{p.price}</span>
                  {p.period && <span className="text-slate-400 ml-1 text-lg">{p.period}</span>}
                </div>
                <ul className="space-y-3 mb-10">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300"><CheckIcon />{f}</li>
                  ))}
                </ul>
                <Link href={p.href} className="block">
                  <button className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]
                    ${p.variant === 'solid'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40'
                      : 'border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/60'}`}>
                    {p.cta}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────── FOOTER ── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo className="h-7 w-7" />
              <span className="text-lg font-bold text-white">Portwise</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">Tariff intelligence for global trade. Powered by official US government data.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[['Features', '/#features'], ['Pricing', '/#pricing'], ['Live Demo', '/#demo'], ['Dashboard', '/dashboard']].map(([t, h]) => (
                <li key={t}><a className="hover:text-white transition-colors" href={h}>{t}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Data Sources</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {['USITC Tariff Database', 'Federal Register', 'CBP Rulings', 'Trade.gov'].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[['Privacy Policy', '/legal/privacy'], ['Terms of Service', '/legal/terms'], ['API Terms', '/legal/api-terms']].map(([t, h]) => (
                <li key={t}><a className="hover:text-white transition-colors" href={h}>{t}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">&copy; 2026 Portwise. All rights reserved.</p>
          <p className="text-xs text-slate-600">Data provided for informational purposes. Consult a licensed customs broker for binding rulings.</p>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────────── PAGE ── */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0e1a]">
      <Navbar />
      <Hero />
      <Features />
      <LiveDemo />
      <Pricing />
      <Footer />
    </main>
  );
}
