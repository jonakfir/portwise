import Navbar from '@/components/Navbar';
import Footer from '@/components/landing/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy bg-grid">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-slate-300">
          <p>Last updated: April 7, 2026</p>
          <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
          <p>By using Portwise, you agree to these terms. If you do not agree, do not use the service.</p>
          <h2 className="text-lg font-semibold text-white">2. Service Description</h2>
          <p>Portwise provides tariff rate lookups, trade policy alerts, and sourcing scenario analysis using publicly available US government data and AI analysis. Data is provided for informational purposes only.</p>
          <h2 className="text-lg font-semibold text-white">3. Disclaimer</h2>
          <p>Portwise is not a licensed customs broker. Tariff classifications and duty rates should be verified with a licensed customs broker or the US Customs and Border Protection before making import decisions. We are not liable for decisions made based on our data.</p>
          <h2 className="text-lg font-semibold text-white">4. Subscriptions</h2>
          <p>Paid plans are billed monthly via Stripe. You may cancel at any time. Refunds are handled on a case-by-case basis.</p>
          <h2 className="text-lg font-semibold text-white">5. Fair Use</h2>
          <p>API access is subject to reasonable rate limits. Automated scraping or redistribution of our data is prohibited.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
