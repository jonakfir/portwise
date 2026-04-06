import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: '',
    lookupLimit: 5,
    features: ['5 lookups per day', 'Basic tariff data', 'HTS code search'],
  },
  pro: {
    name: 'Pro',
    price: 49,
    priceId: 'price_pro_monthly',
    lookupLimit: -1,
    features: [
      'Unlimited lookups',
      'Rate change alerts',
      'Sourcing scenario tool',
      'AI-powered analysis',
      'Export reports',
      'Priority support',
    ],
  },
  team: {
    name: 'Team',
    price: 199,
    priceId: 'price_team_monthly',
    lookupLimit: -1,
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'API access',
      'Custom watchlists',
      'Dedicated account manager',
      'SSO integration',
    ],
  },
} as const;
