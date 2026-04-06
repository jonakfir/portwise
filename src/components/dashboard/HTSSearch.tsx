'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce, formatHTS } from '@/lib/utils';
import type { HTSSearchResult } from '@/types';

interface HTSSearchProps {
  onSelect: (htsCode: string) => void;
}

export default function HTSSearch({ onSelect }: HTSSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HTSSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(
    debounce(async (q: string) => {
      if (q.length < 2) { setResults([]); return; }
      setLoading(true);
      try {
        const res = await fetch(`/api/tariff/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 300),
    []
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    doSearch(e.target.value);
  };

  const handleSelect = (item: HTSSearchResult) => {
    setQuery(formatHTS(item.htsCode));
    setResults([]);
    onSelect(item.htsCode);
  };

  return (
    <div className="relative">
      <div className="relative">
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder='Search HTS code or product description...'
          className="w-full bg-navy-100 border-2 border-navy-300 rounded-sm pl-14 pr-6 py-5 text-white text-lg font-mono placeholder:text-slate-600 placeholder:font-sans focus:outline-none focus:border-orange-500/60 focus:ring-4 focus:ring-orange-500/10 transition-all"
        />
        {loading && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-30 w-full mt-2 glass rounded border border-navy-300 max-h-80 overflow-y-auto"
          >
            {results.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-5 py-3 hover:bg-navy-200/50 transition flex items-start gap-4 border-b border-navy-300/50 last:border-b-0"
              >
                <span className="font-mono text-orange-400 text-sm whitespace-nowrap pt-0.5">{formatHTS(item.htsCode)}</span>
                <span className="text-sm text-slate-300 flex-1">{item.description}</span>
                <span className="font-mono text-ice text-sm whitespace-nowrap pt-0.5">{item.generalRate}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
