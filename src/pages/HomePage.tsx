import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthFlow';
import { AboutSection } from '../components/home/AboutSection';
import { FeaturedGameCard } from '../components/home/FeaturedGameCard';
import { FutureGamesSection } from '../components/home/FutureGamesSection';
import { HeroSection } from '../components/home/HeroSection';
import { createGuestSession } from '../services/authApi';
import { setAuthSession } from '../services/authSession';

// Home composes landing sections and acts as the central application hub.
export function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [guestError, setGuestError] = useState<string | undefined>();
  const navigate = useNavigate();

  function openAuthModal() {
    setGuestError(undefined);
    setIsAuthModalOpen(true);
  }

  async function continueAsGuest() {
    setIsGuestLoading(true);
    setGuestError(undefined);

    try {
      const session = await createGuestSession();
      setAuthSession(session);
      navigate('/play?mode=guest');
    } catch (error) {
      setGuestError(error instanceof Error ? error.message : 'Unable to start guest session.');
    } finally {
      setIsGuestLoading(false);
    }
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
        guestError={guestError}
        isGuestLoading={isGuestLoading}
      />
    </div>
  );
}
