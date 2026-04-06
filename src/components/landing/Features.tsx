'use client';

import Card from '@/components/ui/Card';

const features = [
  {
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Real-Time Tariff Rates',
    description: 'Instant access to current duty rates from the USITC Harmonized Tariff Schedule. General, special, and Column 2 rates for any HTS code.',
    stat: '17,000+',
    statLabel: 'HTS codes tracked',
  },
  {
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Policy Change Alerts',
    description: 'Monitor your HTS codes for tariff changes. Get notified when Federal Register rules, Section 301/232 modifications, or FTA updates affect your products.',
    stat: '24hr',
    statLabel: 'alert latency',
  },
  {
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Sourcing Scenario Modeling',
    description: 'Compare total landed cost across alternative sourcing countries. Factor in duty rates, FTA benefits, shipping estimates, and trade agreement status.',
    stat: '20+',
    statLabel: 'countries compared',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-grid relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-orange-500 font-mono text-sm font-semibold uppercase tracking-widest mb-3">
            Trade Intelligence Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Your war room for tariff decisions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Stop guessing at duty rates. Get the data, analysis, and alerts you need to make sourcing
            decisions with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} hover glow="orange" className="group">
              <div className="mb-4 p-3 inline-block rounded bg-orange-500/10 group-hover:bg-orange-500/20 transition">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{feature.description}</p>
              <div className="pt-4 border-t border-ice/10">
                <span className="font-mono text-2xl font-bold text-ice">{feature.stat}</span>
                <span className="text-xs text-slate-500 ml-2 uppercase tracking-wider">{feature.statLabel}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
