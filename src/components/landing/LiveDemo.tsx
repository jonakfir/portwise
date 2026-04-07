'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce, formatHTS } from '@/lib/utils';
import type { HTSSearchResult } from '@/types';
import Card from '@/components/ui/Card';

export default function LiveDemo() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HTSSearchResult[]>([]);
  const [selected, setSelected] = useState<HTSSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [queriesUsed, setQueriesUsed] = useState(0);

  // Persist query counter in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('portwise_demo_queries');
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = new Date().toDateString();
      if (parsed.date === today) {
        setQueriesUsed(parsed.count);
      }
    }
  }, []);

  const persistQueries = (count: number) => {
    localStorage.setItem('portwise_demo_queries', JSON.stringify({
      date: new Date().toDateString(),
      count,
    }));
  };

  const doSearch = useCallback(
    debounce(async (q: string) => {
      if (q.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        // Use server-side API route to avoid CORS issues
        const res = await fetch(`/api/tariff/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSelected(null);
    doSearch(val);
  };

  const handleSelect = (item: HTSSearchResult) => {
    setSelected(item);
    setQuery(item.htsCode);
    setResults([]);
    const newCount = queriesUsed + 1;
    setQueriesUsed(newCount);
    persistQueries(newCount);
  };

  const remaining = Math.max(0, 3 - queriesUsed);

  return (
    <section id="demo" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-orange-500 font-mono text-sm font-semibold uppercase tracking-widest mb-3">
            Try it now
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Look up any HTS code
          </h2>
          <p className="text-slate-400">
            Search by product description or HTS code. {remaining} free lookup{remaining !== 1 ? 's' : ''} remaining.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={handleInput}
              placeholder='Try "laptop", "coffee", or "8471.30.01"...'
              disabled={queriesUsed >= 3}
              className="w-full bg-navy-100 border-2 border-navy-300 rounded pl-12 pr-4 py-4 text-white text-lg font-mono placeholder:text-slate-600 placeholder:font-sans focus:outline-none focus:border-orange-500/60 focus:ring-4 focus:ring-orange-500/10 transition-all disabled:opacity-50"
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* No results message */}
          <AnimatePresence>
            {results.length === 0 && query.length >= 2 && !loading && !selected && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 w-full mt-2 glass rounded border border-navy-300 p-4 text-center"
              >
                <p className="text-sm text-slate-400">No results found for &ldquo;{query}&rdquo;. Try a different search term.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dropdown results */}
          <AnimatePresence>
            {results.length > 0 && !selected && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 w-full mt-2 glass rounded border border-navy-300 max-h-72 overflow-y-auto"
              >
                {results.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-3 hover:bg-navy-200/50 transition flex items-start gap-4 border-b border-navy-300/50 last:border-b-0"
                  >
                    <span className="font-mono text-orange-400 text-sm whitespace-nowrap pt-0.5">
                      {formatHTS(item.htsCode)}
                    </span>
                    <span className="text-sm text-slate-300 flex-1 min-w-0">{item.description}</span>
                    <span className="ml-auto font-mono text-ice text-sm whitespace-nowrap pt-0.5">
                      {item.generalRate}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected result card */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <Card glow="orange" className="overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">HTS Classification</p>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-orange-400">{formatHTS(selected.htsCode)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">General Rate</p>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-ice">{selected.generalRate}</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 pb-6 border-b border-ice/10">{selected.description}</p>

                {/* Data grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-navy-100/50 rounded p-3">
                    <p className="text-xs text-slate-500 mb-1">General</p>
                    <p className="font-mono text-sm font-semibold text-white">{selected.generalRate}</p>
                  </div>
                  <div className="bg-navy-100/50 rounded p-3">
                    <p className="text-xs text-slate-500 mb-1">Special</p>
                    <p className="font-mono text-sm font-semibold text-green-400">See FTAs</p>
                  </div>
                  <div className="bg-navy-100/50 rounded p-3">
                    <p className="text-xs text-slate-500 mb-1">Column 2</p>
                    <p className="font-mono text-sm font-semibold text-red-400">50%</p>
                  </div>
                  <div className="bg-navy-100/50 rounded p-3">
                    <p className="text-xs text-slate-500 mb-1">Last Updated</p>
                    <p className="font-mono text-sm font-semibold text-slate-300">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-orange-500/10 to-transparent rounded p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-white font-semibold">Want full analysis?</p>
                    <p className="text-xs text-slate-400">AI summary, history, CBP rulings, scenario modeling</p>
                  </div>
                  <a
                    href="/auth/signup"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition whitespace-nowrap"
                  >
                    Sign up free
                  </a>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
