import Navbar from '@/components/Navbar';
import Footer from '@/components/landing/Footer';

export default function APITermsPage() {
  return (
    <div className="min-h-screen bg-navy bg-grid">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl font-bold text-white mb-8">API Terms of Use</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-slate-300">
          <p>Last updated: April 7, 2026</p>
          <h2 className="text-lg font-semibold text-white">1. API Access</h2>
          <p>API access is available on the Team plan ($199/mo). Each API key is tied to a single organization account.</p>
          <h2 className="text-lg font-semibold text-white">2. Rate Limits</h2>
          <p>API requests are limited to 1,000 requests per hour per API key. Exceeding this limit will result in 429 responses. Contact us for higher limits.</p>
          <h2 className="text-lg font-semibold text-white">3. Permitted Use</h2>
          <p>You may use the API to integrate tariff data into your own internal tools and applications. Redistribution of raw API data to third parties is prohibited.</p>
          <h2 className="text-lg font-semibold text-white">4. Data Accuracy</h2>
          <p>API responses are sourced from official US government databases and are cached for up to 24 hours. We do not guarantee real-time accuracy. Always verify critical data with official sources.</p>
          <h2 className="text-lg font-semibold text-white">5. Availability</h2>
          <p>We target 99.9% uptime but do not guarantee it. Scheduled maintenance windows will be communicated via email.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
