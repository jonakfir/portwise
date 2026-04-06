import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htsCode, scenarios } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your_anthropic_api_key') {
      return NextResponse.json({
        recommendation: generateFallbackRecommendation(htsCode, scenarios),
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        messages: [
          {
            role: 'user',
            content: `You are a sourcing strategy expert. Based on this sourcing scenario data for HTS ${htsCode}, provide a clear recommendation.

Scenarios: ${JSON.stringify(scenarios)}

Provide a recommendation covering:
1. Best value sourcing country and why
2. Risk-adjusted alternatives
3. FTA opportunities to explore
4. Key tradeoffs to consider

Be specific and actionable. Use numbers from the data.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        recommendation: generateFallbackRecommendation(htsCode, scenarios),
      });
    }

    const data = await response.json();
    return NextResponse.json({
      recommendation: data.content?.[0]?.text || generateFallbackRecommendation(htsCode, scenarios),
    });
  } catch {
    return NextResponse.json({
      recommendation: 'Unable to generate AI recommendation at this time.',
    });
  }
}

function generateFallbackRecommendation(
  htsCode: string,
  scenarios: Array<{ country: string; dutyRate: number; estimatedShippingDays: number; ftaBenefits: string[]; totalLandedCostIndex: number }>
): string {
  if (!scenarios?.length) return 'No scenario data available.';
  const sorted = [...scenarios].sort((a, b) => a.totalLandedCostIndex - b.totalLandedCostIndex);
  const best = sorted[0];
  const ftaCountries = sorted.filter(s => s.ftaBenefits?.length > 0);

  let text = `For HTS ${htsCode}, **${best.country}** offers the most competitive total landed cost (index: ${best.totalLandedCostIndex}) with a ${best.dutyRate.toFixed(1)}% duty rate and ${best.estimatedShippingDays}-day shipping estimate.`;
  if (ftaCountries.length > 0) {
    text += ` Countries with FTA benefits (${ftaCountries.map(c => c.country).join(', ')}) may offer additional savings for qualifying goods.`;
  }
  text += ' Consider diversifying across 2-3 countries to mitigate geopolitical and supply chain risks.';
  return text;
}
