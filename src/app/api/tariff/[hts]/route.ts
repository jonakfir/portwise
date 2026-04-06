import { NextRequest, NextResponse } from 'next/server';
import { getTariffData, getTariffHistory } from '@/lib/apis/usitc';
import { getRecentRules } from '@/lib/apis/federal-register';
import { getCBPRulings } from '@/lib/apis/cbp';
import { getTradeAgreements } from '@/lib/apis/trade-gov';
import type { TariffData, FederalRegisterEntry } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { hts: string } }
) {
  try {
    const htsCode = params.hts;

    if (!htsCode || htsCode.length < 4) {
      return NextResponse.json(
        { error: 'Invalid HTS code. Must be at least 4 digits.' },
        { status: 400 }
      );
    }

    // Fetch all data in parallel
    const [tariff, history, federalRegister, cbpRulings, tradeAgreements] =
      await Promise.all([
        getTariffData(htsCode),
        getTariffHistory(htsCode),
        getRecentRules(htsCode),
        getCBPRulings(htsCode),
        getTradeAgreements(htsCode),
      ]);

    // Generate AI summary
    const aiSummary = generateSummary(tariff, federalRegister);

    const result = {
      tariff,
      history,
      federalRegister,
      cbpRulings,
      tradeAgreements,
      aiSummary,
      cachedAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Tariff API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tariff data' },
      { status: 500 }
    );
  }
}

function generateSummary(
  tariff: TariffData,
  fedReg: FederalRegisterEntry[]
): string {
  const hts = tariff.htsCode;
  const rate = tariff.generalRate;
  const s301 = tariff.section301;
  const s232 = tariff.section232;

  let summary = `HTS ${hts} carries a general duty rate of ${rate}.`;

  if (s301) {
    summary += ' This product is subject to Section 301 tariffs on goods from China, with an additional 25% duty.';
  }
  if (s232) {
    summary += ' Section 232 tariffs (steel/aluminum) may also apply.';
  }

  if (fedReg.length > 0) {
    summary += ` There are ${fedReg.length} recent Federal Register entries that may affect this classification.`;
  }

  summary += ' Importers should verify classification with a licensed customs broker and check for applicable FTA benefits.';

  return summary;
}
