'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { formatHTS, getRiskColor, formatCurrency } from '@/lib/utils';
import type { ScenarioResult, SourcingScenario } from '@/types';

interface ScenarioToolProps {
  htsCode: string;
}

const COUNTRIES = [
  { code: 'CN', name: 'China' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'IN', name: 'India' },
  { code: 'MX', name: 'Mexico' },
  { code: 'TH', name: 'Thailand' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'KR', name: 'South Korea' },
  { code: 'TW', name: 'Taiwan' },
];

export default function ScenarioTool({ htsCode }: ScenarioToolProps) {
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    COUNTRIES.map((c) => c.code)
  );

  const toggleCountry = (code: string) => {
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const runScenario = async () => {
    if (!htsCode || selectedCountries.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ htsCode, countries: selectedCountries }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-sm p-6">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
        Sourcing Scenario Tool
      </h3>

      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2">Compare sourcing for: <span className="font-mono text-orange-400">{formatHTS(htsCode)}</span></p>
        <div className="flex flex-wrap gap-2 mb-4">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => toggleCountry(c.code)}
              className={`px-3 py-1.5 text-xs rounded border transition ${
                selectedCountries.includes(c.code)
                  ? 'bg-orange-500/10 border-orange-500/50 text-orange-300'
                  : 'bg-navy-100/50 border-navy-300 text-slate-500 hover:text-slate-300'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <Button onClick={runScenario} loading={loading} size="sm">
          Run Comparison
        </Button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-300 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="text-left py-3 pr-4">Country</th>
                  <th className="text-right py-3 px-3">Duty Rate</th>
                  <th className="text-right py-3 px-3">Shipping</th>
                  <th className="text-right py-3 px-3">Transit</th>
                  <th className="text-right py-3 px-3">FTAs</th>
                  <th className="text-right py-3 px-3">Risk</th>
                  <th className="text-right py-3 pl-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {result.scenarios.map((s: SourcingScenario, i: number) => (
                  <tr key={i} className={`border-b border-navy-300/50 ${i === 0 ? 'bg-orange-500/5' : ''}`}>
                    <td className="py-3 pr-4 font-medium text-white">
                      {i === 0 && <span className="text-orange-500 mr-1">*</span>}
                      {s.country}
                    </td>
                    <td className="text-right py-3 px-3 font-mono text-ice">{s.dutyRate.toFixed(1)}%</td>
                    <td className="text-right py-3 px-3 font-mono text-slate-300">{formatCurrency(s.estimatedShippingCost)}</td>
                    <td className="text-right py-3 px-3 font-mono text-slate-300">{s.estimatedShippingDays}d</td>
                    <td className="text-right py-3 px-3">
                      {s.ftaBenefits.length > 0 ? (
                        <span className="text-green-400 text-xs">{s.ftaBenefits.join(', ')}</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className={`text-right py-3 px-3 font-mono text-xs font-semibold ${getRiskColor(s.riskLevel)}`}>
                      {s.riskLevel.toUpperCase()}
                    </td>
                    <td className="text-right py-3 pl-3 font-mono font-bold text-white">{s.totalLandedCostIndex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Recommendation */}
          <div className="bg-gradient-to-r from-orange-500/10 to-transparent rounded p-4 border-l-2 border-orange-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-xs font-semibold text-white uppercase tracking-wider">AI Recommendation</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{result.aiRecommendation}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
