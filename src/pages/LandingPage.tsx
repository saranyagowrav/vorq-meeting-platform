import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Privacy from '@/components/Privacy';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="theme-transition relative min-h-screen bg-midnight-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Privacy />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
