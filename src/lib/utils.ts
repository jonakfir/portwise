// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cn(...classes: any[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatHTS(code: string): string {
  const clean = code.replace(/[^0-9]/g, '');
  if (clean.length <= 4) return clean;
  if (clean.length <= 6) return `${clean.slice(0, 4)}.${clean.slice(4)}`;
  if (clean.length <= 8) return `${clean.slice(0, 4)}.${clean.slice(4, 6)}.${clean.slice(6)}`;
  return `${clean.slice(0, 4)}.${clean.slice(4, 6)}.${clean.slice(6, 8)}.${clean.slice(8)}`;
}

export function formatRate(rate: string | number): string {
  if (typeof rate === 'number') return `${rate.toFixed(1)}%`;
  if (typeof rate === 'string') {
    if (rate.toLowerCase() === 'free') return 'Free';
    return rate;
  }
  return 'N/A';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function getRiskColor(risk: 'low' | 'medium' | 'high'): string {
  switch (risk) {
    case 'low': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'high': return 'text-red-400';
  }
}
