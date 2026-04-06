import type { TradeAgreement, SourcingScenario } from '@/types';

const TRADE_GOV_BASE = 'https://api.trade.gov/gateway/v1';

export async function getTradeAgreements(htsCode: string): Promise<TradeAgreement[]> {
  // Trade.gov API requires API key — return comprehensive mock data
  return [
    {
      name: 'USMCA (United States-Mexico-Canada Agreement)',
      countries: ['Mexico', 'Canada'],
      preferentialRate: 'Free',
      status: 'active',
    },
    {
      name: 'CAFTA-DR (Central America-Dominican Republic FTA)',
      countries: ['Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Dominican Republic'],
      preferentialRate: 'Free or reduced',
      status: 'active',
    },
    {
      name: 'KORUS (US-Korea FTA)',
      countries: ['South Korea'],
      preferentialRate: 'Free or reduced',
      status: 'active',
    },
    {
      name: 'US-Australia FTA',
      countries: ['Australia'],
      preferentialRate: 'Free',
      status: 'active',
    },
    {
      name: 'US-Singapore FTA',
      countries: ['Singapore'],
      preferentialRate: 'Free',
      status: 'active',
    },
  ];
}

const SHIPPING_ESTIMATES: Record<string, { days: number; cost: number; risk: 'low' | 'medium' | 'high' }> = {
  CN: { days: 25, cost: 3500, risk: 'high' },
  VN: { days: 28, cost: 3200, risk: 'medium' },
  IN: { days: 30, cost: 3800, risk: 'medium' },
  MX: { days: 5, cost: 1200, risk: 'low' },
  TH: { days: 27, cost: 3300, risk: 'medium' },
  BD: { days: 32, cost: 3600, risk: 'high' },
  ID: { days: 29, cost: 3400, risk: 'medium' },
  MY: { days: 26, cost: 3100, risk: 'low' },
  KR: { days: 18, cost: 2800, risk: 'low' },
  TW: { days: 20, cost: 2900, risk: 'low' },
  PH: { days: 28, cost: 3200, risk: 'medium' },
  KH: { days: 33, cost: 3700, risk: 'high' },
  PK: { days: 31, cost: 3500, risk: 'high' },
  TR: { days: 22, cost: 3000, risk: 'medium' },
  BR: { days: 20, cost: 2500, risk: 'medium' },
  CA: { days: 3, cost: 800, risk: 'low' },
  DE: { days: 15, cost: 2200, risk: 'low' },
  JP: { days: 16, cost: 2600, risk: 'low' },
  IT: { days: 18, cost: 2400, risk: 'low' },
  GB: { days: 14, cost: 2100, risk: 'low' },
};

const COUNTRY_NAMES: Record<string, string> = {
  CN: 'China', VN: 'Vietnam', IN: 'India', MX: 'Mexico', TH: 'Thailand',
  BD: 'Bangladesh', ID: 'Indonesia', MY: 'Malaysia', KR: 'South Korea',
  TW: 'Taiwan', PH: 'Philippines', KH: 'Cambodia', PK: 'Pakistan',
  TR: 'Turkey', BR: 'Brazil', CA: 'Canada', DE: 'Germany', JP: 'Japan',
  IT: 'Italy', GB: 'United Kingdom',
};

const FTA_MAP: Record<string, string[]> = {
  MX: ['USMCA'],
  CA: ['USMCA'],
  KR: ['KORUS FTA'],
  AU: ['US-Australia FTA'],
  SG: ['US-Singapore FTA'],
  GT: ['CAFTA-DR'],
  SV: ['CAFTA-DR'],
  HN: ['CAFTA-DR'],
  NI: ['CAFTA-DR'],
  CR: ['CAFTA-DR'],
  DO: ['CAFTA-DR'],
  IL: ['US-Israel FTA'],
  JO: ['US-Jordan FTA'],
  CL: ['US-Chile FTA'],
  CO: ['US-Colombia TPA'],
  PE: ['US-Peru TPA'],
  PA: ['US-Panama TPA'],
};

export function getSourcingScenario(
  countryCode: string,
  baseDutyRate: number
): SourcingScenario {
  const shipping = SHIPPING_ESTIMATES[countryCode] || { days: 25, cost: 3000, risk: 'medium' as const };
  const ftas = FTA_MAP[countryCode] || [];
  const hasFTA = ftas.length > 0;
  const effectiveRate = hasFTA ? Math.max(0, baseDutyRate * 0.2) : baseDutyRate;
  const is301Country = ['CN'].includes(countryCode);
  const additionalDuty = is301Country ? 25 : 0;
  const totalRate = effectiveRate + additionalDuty;
  const landedCostIndex = totalRate + shipping.cost / 100 + shipping.days * 0.5;

  return {
    country: COUNTRY_NAMES[countryCode] || countryCode,
    countryCode,
    dutyRate: totalRate,
    ftaBenefits: ftas,
    estimatedShippingDays: shipping.days,
    estimatedShippingCost: shipping.cost,
    tradeAgreements: ftas,
    totalLandedCostIndex: Math.round(landedCostIndex * 100) / 100,
    riskLevel: shipping.risk,
  };
}
