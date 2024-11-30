import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

type CTASectionProps = {
  onShowAuthModal: () => void;
};

export function CTASection({ onShowAuthModal }: CTASectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-red-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
          Join thousands of successful immigrants who have made Canada their home.
        </p>
        <button
          onClick={onShowAuthModal}
          className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
        >
          Get Started Today
        </button>
      </div>
    </section>
  );
}