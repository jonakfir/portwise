'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: '',
    description: 'Get started with basic tariff lookups',
    features: [
      '5 lookups per day',
      'Current duty rates',
      'HTS code search',
      'Basic product descriptions',
    ],
    cta: 'Start free',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 49,
    period: '/mo',
    description: 'For importers and sourcing managers',
    features: [
      'Unlimited lookups',
      'Rate change email alerts',
      'Sourcing scenario tool',
      'AI-powered analysis',
      'Federal Register monitoring',
      'CBP ruling search',
      'Export reports',
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    href: '/auth/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: 199,
    period: '/mo',
    description: 'For trade teams and freight brokers',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'REST API access',
      'Custom watchlists',
      'Shared dashboards',
      'Dedicated account manager',
      'SSO integration',
      'Webhook alerts',
    ],
    cta: 'Contact sales',
    href: '/auth/signup?plan=team',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-grid relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-orange-500 font-mono text-sm font-semibold uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Intelligence at every scale
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Start free. Upgrade when your trade operations need more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card
                className={plan.highlighted
                  ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/5 to-transparent relative'
                  : ''
                }
                glow={plan.highlighted ? 'orange' : 'none'}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 rounded text-xs font-bold text-white uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-400">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.period && <span className="text-slate-400 ml-1">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <svg className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="block">
                  <Button
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
