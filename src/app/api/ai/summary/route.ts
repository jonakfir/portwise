import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htsCode, tariffData, federalRegister, cbpRulings, tradeAgreements } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your_anthropic_api_key') {
      // Return a generated summary without AI
      return NextResponse.json({
        summary: generateFallbackSummary(htsCode, tariffData, federalRegister),
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
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are a trade compliance expert. Analyze this tariff data and provide a clear, actionable summary for an importer.

HTS Code: ${htsCode}
Tariff Data: ${JSON.stringify(tariffData)}
Recent Federal Register Entries: ${JSON.stringify(federalRegister)}
CBP Rulings: ${JSON.stringify(cbpRulings)}
Trade Agreements: ${JSON.stringify(tradeAgreements)}

Provide a 2-3 paragraph summary covering:
1. Current duty rate and any additional tariffs (Section 301/232)
2. Recent regulatory changes or pending modifications
3. Key risks and opportunities for the importer`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        summary: generateFallbackSummary(htsCode, tariffData, federalRegister),
      });
    }

    const data = await response.json();
    const summary = data.content?.[0]?.text || generateFallbackSummary(htsCode, tariffData, federalRegister);

    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json({
      summary: 'Unable to generate AI summary at this time. Please review the tariff data above.',
    });
  }
}

function generateFallbackSummary(
  htsCode: string,
  tariffData: Record<string, unknown>,
  federalRegister: Record<string, unknown>[]
): string {
  const rate = tariffData?.generalRate || 'N/A';
  const s301 = tariffData?.section301;
  let text = `HTS ${htsCode} carries a general duty rate of ${rate}.`;
  if (s301) text += ' This product is subject to Section 301 tariffs on Chinese imports (additional 25%).';
  if (federalRegister?.length > 0) text += ` ${federalRegister.length} recent Federal Register entry(ies) may affect this classification — review the details below.`;
  text += ' Always verify classification with a licensed customs broker.';
  return text;
}
