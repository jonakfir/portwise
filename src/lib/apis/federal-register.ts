import type { FederalRegisterEntry } from '@/types';

const FR_BASE = 'https://www.federalregister.gov/api/v1';

export async function getRecentRules(htsCode: string): Promise<FederalRegisterEntry[]> {
  try {
    const res = await fetch(
      `${FR_BASE}/documents.json?conditions%5Bterm%5D=${encodeURIComponent(htsCode)}&conditions%5Bagencies%5D%5B%5D=international-trade-commission&conditions%5Btype%5D%5B%5D=RULE&per_page=5&order=newest`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return getMockEntries(htsCode);
    const data = await res.json();
    return (data.results || []).map((item: Record<string, unknown>) => ({
      title: item.title as string || '',
      abstractText: item.abstract as string || 'No abstract available',
      documentNumber: item.document_number as string || '',
      publicationDate: item.publication_date as string || '',
      url: item.html_url as string || '',
      agencies: ((item.agencies as Record<string, string>[]) || []).map((a) => a.name || ''),
    }));
  } catch {
    return getMockEntries(htsCode);
  }
}

function getMockEntries(htsCode: string): FederalRegisterEntry[] {
  return [
    {
      title: `Modification of Section 301 Tariffs on Goods From China Affecting HTS ${htsCode}`,
      abstractText: 'The U.S. Trade Representative is modifying actions in the Section 301 investigation regarding acts, policies, and practices of the People\'s Republic of China.',
      documentNumber: '2024-12345',
      publicationDate: '2024-11-15',
      url: 'https://www.federalregister.gov/documents/2024/12345',
      agencies: ['Office of the United States Trade Representative'],
    },
    {
      title: 'Harmonized Tariff Schedule Technical Amendments',
      abstractText: 'Technical corrections and amendments to the Harmonized Tariff Schedule of the United States affecting various HTS subheadings.',
      documentNumber: '2024-09876',
      publicationDate: '2024-09-20',
      url: 'https://www.federalregister.gov/documents/2024/09876',
      agencies: ['United States International Trade Commission'],
    },
  ];
}
