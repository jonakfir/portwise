import Navbar from '@/components/Navbar';
import Footer from '@/components/landing/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy bg-grid">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-slate-300">
          <p>Last updated: April 7, 2026</p>
          <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
          <p>We collect information you provide when creating an account (email address), HTS codes you search, and standard web analytics data (page views, device type).</p>
          <h2 className="text-lg font-semibold text-white">2. How We Use Your Information</h2>
          <p>We use your data to provide tariff intelligence services, send rate change alerts you opt into, improve our platform, and process payments via Stripe.</p>
          <h2 className="text-lg font-semibold text-white">3. Data Sources</h2>
          <p>Tariff data comes from public US government APIs (USITC, Federal Register, CBP, Trade.gov). We do not sell or share your personal data with third parties.</p>
          <h2 className="text-lg font-semibold text-white">4. Data Retention</h2>
          <p>Account data is retained while your account is active. Cached tariff data is refreshed every 24 hours. You can request deletion of your account and data at any time.</p>
          <h2 className="text-lg font-semibold text-white">5. Contact</h2>
          <p>For privacy questions, contact us at privacy@portwise.app.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
