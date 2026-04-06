import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import LiveDemo from '@/components/landing/LiveDemo';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <Hero />
      <Features />
      <LiveDemo />
      <Pricing />
      <Footer />
    </main>
  );
}
