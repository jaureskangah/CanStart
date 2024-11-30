import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { WhyChooseUs } from './WhyChooseUs';
import { ProcessSection } from './ProcessSection';
import { TrustIndicators } from './TrustIndicators';
import { SuccessMetrics } from './SuccessMetrics';
import { StatsSection } from './StatsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { CTASection } from './CTASection';

type HomePageProps = {
  onShowAuthModal: () => void;
};

function HomePage({ onShowAuthModal }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <HeroSection onShowAuthModal={onShowAuthModal} />
      <TrustIndicators />
      <FeaturesSection />
      <WhyChooseUs />
      <SuccessMetrics />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection onShowAuthModal={onShowAuthModal} />
    </div>
  );
}

export default HomePage;