export async function generateTariffSummary(
  htsCode: string,
  tariffData: Record<string, unknown>,
  federalRegister: Record<string, unknown>[],
  cbpRulings: Record<string, unknown>[],
  tradeAgreements: Record<string, unknown>[]
): Promise<string> {
  try {
    const response = await fetch('/api/ai/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htsCode,
        tariffData,
        federalRegister,
        cbpRulings,
        tradeAgreements,
      }),
    });
    if (!response.ok) throw new Error('AI summary failed');
    const data = await response.json();
    return data.summary;
  } catch {
    return generateFallbackSummary(htsCode, tariffData);
  }
}

function generateFallbackSummary(
  htsCode: string,
  tariffData: Record<string, unknown>
): string {
  const rate = tariffData.generalRate || 'N/A';
  const section301 = tariffData.section301 ? ' This product is currently subject to Section 301 tariffs on goods from China, adding an additional 25% duty.' : '';
  return `HTS ${htsCode} currently carries a general duty rate of ${rate}.${section301} Importers should verify the specific classification with a licensed customs broker and check for any recent modifications through the Federal Register. Trade agreement benefits may apply depending on the country of origin.`;
}

export async function generateSourcingRecommendation(
  htsCode: string,
  scenarios: Record<string, unknown>[]
): Promise<string> {
  try {
    const response = await fetch('/api/ai/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ htsCode, scenarios }),
    });
    if (!response.ok) throw new Error('AI recommendation failed');
    const data = await response.json();
    return data.recommendation;
  } catch {
    return 'Unable to generate AI recommendation at this time. Please review the scenario comparison data above to evaluate sourcing options based on duty rates, shipping costs, and trade agreement benefits.';
  }
}
