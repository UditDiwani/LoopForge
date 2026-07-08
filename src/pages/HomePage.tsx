import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthFlow';
import { AboutSection } from '../components/home/AboutSection';
import { FeaturedGameCard } from '../components/home/FeaturedGameCard';
import { FutureGamesSection } from '../components/home/FutureGamesSection';
import { HeroSection } from '../components/home/HeroSection';

// Home composes landing sections and acts as the central application hub.
export function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  function openAuthModal() {
    // TODO: Replace this placeholder check with real auth state when backend auth exists.
    setIsAuthModalOpen(true);
  }

  function continueAsGuest() {
    // TODO: Connect guest flow to future session/auth handling.
    navigate('/play?mode=guest');
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#09112f] text-white">
      <main className="loop-scene relative isolate min-h-screen">
        <HeroSection onPlayRequest={openAuthModal} />
        <FeaturedGameCard onPlayRequest={openAuthModal} />
        <FutureGamesSection />
        <AboutSection />
      </main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onContinueAsGuest={continueAsGuest}
      />
    </div>
  );
}
