import { AboutSection } from '../components/home/AboutSection';
import { FeaturedGameCard } from '../components/home/FeaturedGameCard';
import { FutureGamesSection } from '../components/home/FutureGamesSection';
import { HeroSection } from '../components/home/HeroSection';

// Home composes landing sections and acts as the central application hub.
export function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#09112f] text-white">
      <main className="loop-scene relative isolate min-h-screen">
        <HeroSection />
        <FeaturedGameCard />
        <FutureGamesSection />
        <AboutSection />
      </main>
    </div>
  );
}
