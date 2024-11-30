import React, { useState, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';

type HeroSectionProps = {
  onShowAuthModal: () => void;
  onLearnMore: () => void;
};

export function HeroSection({ onShowAuthModal, onLearnMore }: HeroSectionProps) {
  const [count, setCount] = useState(0);
  const targetCount = 15420;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (count < targetCount) {
      const increment = Math.ceil(targetCount / 100);
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + increment, targetCount));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [count]);

  // Preload hero image
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&q=80&w=2400";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className={`transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&q=80&w=2400"
            alt="Toronto Skyline"
            className="w-full h-full object-cover"
            loading="eager"
            importance="high"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-900" />
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block bg-black/30 text-white px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            Over <span className="font-bold text-xl">{count.toLocaleString()}</span> newcomers supported
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
            Your Gateway to a New Life in Canada
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-8 animate-fade-in-up max-w-2xl">
            We provide comprehensive support for newcomers, from finding jobs and housing 
            to navigating immigration processes and building community connections.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={onShowAuthModal}
              className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors animate-fade-in-up flex items-center justify-center gap-2"
            >
              Get Started
              <ChevronRight className="h-5 w-5" />
            </button>

            <button
              onClick={onLearnMore}
              className="w-full sm:w-auto flex items-center justify-center gap-3 text-white hover:text-gray-200 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-sm">
                <Play className="h-5 w-5" />
              </div>
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}