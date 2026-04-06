'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HTSSearch from '@/components/dashboard/HTSSearch';
import TariffResultCard from '@/components/dashboard/TariffResultCard';
import ScenarioTool from '@/components/dashboard/ScenarioTool';
import Watchlist from '@/components/dashboard/Watchlist';
import type { TariffResult } from '@/types';

export default function DashboardPage() {
  const [selectedHTS, setSelectedHTS] = useState<string>('');
  const [tariffResult, setTariffResult] = useState<TariffResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (htsCode: string) => {
    setSelectedHTS(htsCode);
    setLoading(true);
    try {
      const res = await fetch(`/api/tariff/${htsCode}`);
      const data = await res.json();
      setTariffResult(data);
    } catch {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy bg-grid">
      <Navbar isAuth />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Trade Intelligence Dashboard</h1>
          <p className="text-sm text-slate-400">Search, analyze, and monitor tariff rates across the Harmonized Tariff Schedule.</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <HTSSearch onSelect={handleSelect} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-400">Fetching tariff intelligence...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {tariffResult && !loading && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <TariffResultCard data={tariffResult} />
              <ScenarioTool htsCode={selectedHTS} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Watchlist htsCode={selectedHTS} />

              {/* Quick stats */}
              <div className="glass rounded-sm p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Lookups today</span>
                    <span className="font-mono text-sm text-white">3 / unlimited</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Watchlist items</span>
                    <span className="font-mono text-sm text-white">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Alerts triggered</span>
                    <span className="font-mono text-sm text-orange-400">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Plan</span>
                    <span className="font-mono text-sm text-green-400">Pro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!tariffResult && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-navy-200 mb-6">
              <svg className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Search for an HTS code</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Enter a product description or HTS code above to see current duty rates,
              recent changes, AI analysis, and sourcing scenarios.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
