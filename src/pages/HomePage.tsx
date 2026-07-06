import { AboutSection } from '../components/home/AboutSection';
import { FeaturedGameCard } from '../components/home/FeaturedGameCard';
import { FutureGamesSection } from '../components/home/FutureGamesSection';
import { HeroSection } from '../components/home/HeroSection';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';

// Home composes landing sections and acts as the central application hub.
export function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f8f3]">
      <Header />
      <main>
        <HeroSection />
        <FeaturedGameCard />
        <FutureGamesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
