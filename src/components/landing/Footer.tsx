import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-ice/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none">
                <circle cx="24" cy="24" r="18" stroke="#FF5C1A" strokeWidth="2" fill="none" />
                <polygon points="24,2 21,10 24,7 27,10" fill="#FF5C1A" />
                <path d="M20,26 L24,18 L28,26 Q24,30 20,26Z" fill="#FF5C1A" opacity="0.9" />
              </svg>
              <span className="text-lg font-bold text-white">Portwise</span>
            </div>
            <p className="text-sm text-slate-500">
              Tariff intelligence for global trade. Powered by official US government data.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/#features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/#demo" className="hover:text-white transition">Live Demo</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Data Sources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>USITC Tariff Database</li>
              <li>Federal Register</li>
              <li>CBP Rulings</li>
              <li>Trade.gov</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/legal/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/legal/api-terms" className="hover:text-white transition">API Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-ice/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">&copy; 2026 Portwise. All rights reserved.</p>
          <p className="text-xs text-slate-600">
            Data provided for informational purposes. Consult a licensed customs broker for binding rulings.
          </p>
        </div>
      </div>
    </footer>
  );
}
