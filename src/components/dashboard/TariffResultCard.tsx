'use client';

import { motion } from 'framer-motion';
import { formatHTS, formatDate } from '@/lib/utils';
import type { TariffResult } from '@/types';

interface TariffResultCardProps {
  data: TariffResult;
}

export default function TariffResultCard({ data }: TariffResultCardProps) {
  const { tariff, history, federalRegister, cbpRulings, aiSummary } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main tariff card */}
      <div className="glass rounded-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">HTS Code</p>
            <p className="font-mono text-3xl font-bold text-orange-400">{formatHTS(tariff.htsCode)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">General Rate</p>
            <p className="font-mono text-3xl font-bold text-ice">{tariff.generalRate}</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm mb-6">{tariff.description}</p>

        {/* Rate grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
          <div className="bg-navy-100/50 rounded p-3">
            <p className="text-xs text-slate-500 mb-1">General</p>
            <p className="font-mono text-sm font-bold text-white">{tariff.generalRate}</p>
          </div>
          <div className="bg-navy-100/50 rounded p-3">
            <p className="text-xs text-slate-500 mb-1">Special</p>
            <p className="font-mono text-sm font-bold text-green-400">{tariff.specialRate}</p>
          </div>
          <div className="bg-navy-100/50 rounded p-3">
            <p className="text-xs text-slate-500 mb-1">Column 2</p>
            <p className="font-mono text-sm font-bold text-red-400">{tariff.column2Rate}</p>
          </div>
          <div className="bg-navy-100/50 rounded p-3">
            <p className="text-xs text-slate-500 mb-1">Unit</p>
            <p className="font-mono text-sm font-bold text-slate-300">{tariff.unit}</p>
          </div>
        </div>

        {/* Section flags */}
        <div className="flex flex-wrap gap-2">
          {tariff.section301 && (
            <span className="px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-semibold">
              Section 301 Active
            </span>
          )}
          {tariff.section232 && (
            <span className="px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-semibold">
              Section 232 Active
            </span>
          )}
          {tariff.section201 && (
            <span className="px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold">
              Section 201 Active
            </span>
          )}
          {tariff.additionalDuties.map((duty, i) => (
            <span key={i} className="px-3 py-1 rounded bg-navy-200 border border-navy-300 text-slate-300 text-xs font-mono">
              {duty}
            </span>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <div className="glass rounded-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-6 rounded bg-orange-500/20 flex items-center justify-center">
            <svg className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">AI Analysis</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{aiSummary}</p>
      </div>

      {/* Rate history chart */}
      <div className="glass rounded-sm p-6">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Rate History (24 months)</h3>
        <div className="h-48 flex items-end gap-1 bg-navy-100/30 rounded p-2">
          {history.map((h, i) => {
            const maxRate = Math.max(...history.map((x) => x.rate), 1);
            const height = Math.max(4, (h.rate / maxRate) * 100); // minimum 4% height for visibility
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                  className={`w-full rounded-t min-h-[3px] ${
                    h.changeType === 'increase'
                      ? 'bg-red-400'
                      : h.changeType === 'decrease'
                      ? 'bg-green-400'
                      : 'bg-ice/60'
                  }`}
                />
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-1 hidden group-hover:block z-10">
                  <div className="bg-navy-100 border border-navy-300 rounded px-2 py-1 text-xs font-mono text-white whitespace-nowrap shadow-lg">
                    {h.date}: {h.rate}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
          <span>{history[0]?.date}</span>
          <span>{history[history.length - 1]?.date}</span>
        </div>
      </div>

      {/* Federal Register */}
      {federalRegister.length > 0 && (
        <div className="glass rounded-sm p-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Federal Register ({federalRegister.length})
          </h3>
          <div className="space-y-3">
            {federalRegister.map((entry, i) => (
              <div key={i} className="p-3 bg-navy-100/50 rounded border-l-2 border-orange-500/50">
                <p className="text-sm font-medium text-white mb-1">{entry.title}</p>
                <p className="text-xs text-slate-400 mb-2">{entry.abstractText}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-mono">{entry.documentNumber}</span>
                  <span>{formatDate(entry.publicationDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CBP Rulings */}
      {cbpRulings.length > 0 && (
        <div className="glass rounded-sm p-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            CBP Rulings ({cbpRulings.length})
          </h3>
          <div className="space-y-3">
            {cbpRulings.map((ruling, i) => (
              <div key={i} className="p-3 bg-navy-100/50 rounded">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs text-orange-400">{ruling.rulingNumber}</span>
                  <span className="text-xs text-slate-500">{formatDate(ruling.date)}</span>
                </div>
                <p className="text-sm text-slate-300">{ruling.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
