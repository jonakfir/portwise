import { NextRequest, NextResponse } from 'next/server';
import { getTariffData } from '@/lib/apis/usitc';
import { getSourcingScenario } from '@/lib/apis/trade-gov';

const DEFAULT_COUNTRIES = ['CN', 'VN', 'IN', 'MX', 'TH', 'BD', 'ID', 'MY', 'KR', 'TW'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htsCode, countries = DEFAULT_COUNTRIES } = body;

    if (!htsCode) {
      return NextResponse.json(
        { error: 'HTS code is required' },
        { status: 400 }
      );
    }

    const tariff = await getTariffData(htsCode);
    const baseRate = parseFloat(tariff.generalRate.replace('%', '')) || 5;

    const scenarios = countries.map((code: string) =>
      getSourcingScenario(code, baseRate)
    );

    // Sort by total landed cost index
    scenarios.sort(
      (a: { totalLandedCostIndex: number }, b: { totalLandedCostIndex: number }) =>
        a.totalLandedCostIndex - b.totalLandedCostIndex
    );

    const best = scenarios[0];
    const aiRecommendation = `Based on our analysis of HTS ${htsCode}, **${best.country}** offers the lowest total landed cost with a duty rate of ${best.dutyRate.toFixed(1)}% and estimated shipping of ${best.estimatedShippingDays} days.${
      best.ftaBenefits.length > 0
        ? ` This country benefits from ${best.ftaBenefits.join(', ')} trade agreement(s), providing preferential tariff treatment.`
        : ''
    } Consider diversifying sourcing across 2-3 countries to mitigate supply chain risk. Countries with FTA benefits like ${scenarios
      .filter((s: { ftaBenefits: string[] }) => s.ftaBenefits.length > 0)
      .map((s: { country: string }) => s.country)
      .slice(0, 3)
      .join(', ')} may offer additional savings for qualifying products.`;

    return NextResponse.json({
      htsCode,
      productDescription: tariff.description,
      scenarios,
      aiRecommendation,
    });
  } catch (error) {
    console.error('Scenario API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate sourcing scenarios' },
      { status: 500 }
    );
  }
}
