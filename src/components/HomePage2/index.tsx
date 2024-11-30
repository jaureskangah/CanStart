import React from 'react';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { FeaturesSection } from './FeaturesSection';
import { CTASection } from './CTASection';

type HomePage2Props = {
  onShowAuthModal: () => void;
  setCurrentPage: (page: string) => void;
};

function HomePage2({ onShowAuthModal, setCurrentPage }: HomePage2Props) {
  const handleLearnMore = () => {
    setCurrentPage('about');
  };

  return (
    <div className="min-h-screen">
      <HeroSection 
        onShowAuthModal={onShowAuthModal}
        onLearnMore={handleLearnMore}
      />
      <StatsSection />
      <FeaturesSection />
      <CTASection onShowAuthModal={onShowAuthModal} />
    </div>
  );
}

export default HomePage2;