'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { formatHTS } from '@/lib/utils';
import type { WatchlistItem } from '@/types';

interface WatchlistProps {
  htsCode?: string;
}

export default function Watchlist({ htsCode }: WatchlistProps) {
  const [items, setItems] = useState<WatchlistItem[]>([
    {
      id: '1',
      htsCode: '8471.30.01',
      productDescription: 'Portable computers',
      originCountry: 'CN',
      lastKnownRate: 0,
      alertOnChange: true,
      createdAt: '2024-11-01',
    },
    {
      id: '2',
      htsCode: '6110.20.20',
      productDescription: 'Cotton sweaters',
      originCountry: 'VN',
      lastKnownRate: 16.5,
      alertOnChange: true,
      createdAt: '2024-10-15',
    },
  ]);

  const addToWatchlist = () => {
    if (!htsCode) return;
    const exists = items.find((i) => i.htsCode === htsCode);
    if (exists) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        htsCode,
        productDescription: 'Added from search',
        originCountry: 'CN',
        lastKnownRate: 0,
        alertOnChange: true,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleAlert = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, alertOnChange: !i.alertOnChange } : i))
    );
  };

  return (
    <div className="glass rounded-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Watchlist</h3>
        {htsCode && (
          <Button onClick={addToWatchlist} size="sm" variant="outline">
            + Add Current
          </Button>
        )}
      </div>

      <AnimatePresence>
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">No items in watchlist</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 p-3 bg-navy-100/50 rounded group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-orange-400">{formatHTS(item.htsCode)}</span>
                    <span className="text-xs text-slate-500">{item.originCountry}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{item.productDescription}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAlert(item.id)}
                    className={`p-1.5 rounded transition ${
                      item.alertOnChange ? 'text-orange-400 bg-orange-500/10' : 'text-slate-600'
                    }`}
                    title={item.alertOnChange ? 'Alerts on' : 'Alerts off'}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded text-slate-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
