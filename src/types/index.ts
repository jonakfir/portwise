export interface TariffData {
  htsCode: string;
  description: string;
  generalRate: string;
  specialRate: string;
  column2Rate: string;
  unit: string;
  section301: boolean;
  section232: boolean;
  section201: boolean;
  additionalDuties: string[];
  lastUpdated: string;
}

export interface TariffHistory {
  date: string;
  rate: number;
  changeType: 'increase' | 'decrease' | 'unchanged';
  source: string;
}

export interface FederalRegisterEntry {
  title: string;
  abstractText: string;
  documentNumber: string;
  publicationDate: string;
  url: string;
  agencies: string[];
}

export interface CBPRuling {
  rulingNumber: string;
  date: string;
  htsCode: string;
  summary: string;
  url: string;
}

export interface TradeAgreement {
  name: string;
  countries: string[];
  preferentialRate: string;
  status: 'active' | 'pending' | 'expired';
}

export interface SourcingScenario {
  country: string;
  countryCode: string;
  dutyRate: number;
  ftaBenefits: string[];
  estimatedShippingDays: number;
  estimatedShippingCost: number;
  tradeAgreements: string[];
  totalLandedCostIndex: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface TariffResult {
  tariff: TariffData;
  history: TariffHistory[];
  federalRegister: FederalRegisterEntry[];
  cbpRulings: CBPRuling[];
  tradeAgreements: TradeAgreement[];
  aiSummary: string;
  cachedAt: string;
}

export interface ScenarioResult {
  htsCode: string;
  productDescription: string;
  scenarios: SourcingScenario[];
  aiRecommendation: string;
}

export interface WatchlistItem {
  id: string;
  htsCode: string;
  productDescription: string;
  originCountry: string;
  lastKnownRate: number;
  alertOnChange: boolean;
  createdAt: string;
}

export interface AlertLogEntry {
  id: string;
  htsCode: string;
  oldRate: number;
  newRate: number;
  triggeredAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'team';
  lookupsToday: number;
  lookupsResetAt: string;
  stripeCustomerId: string | null;
}

export interface HTSSearchResult {
  htsCode: string;
  description: string;
  generalRate: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  priceId: string;
  features: string[];
  lookupLimit: string;
  highlighted?: boolean;
}
