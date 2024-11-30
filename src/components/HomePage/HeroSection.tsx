import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Play, ChevronRight } from 'lucide-react';

type HeroSectionProps = {
  onShowAuthModal: () => void;
};

type BackgroundImage = {
  url: string;
  caption: string;
};

const backgroundImages: BackgroundImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&q=80',
    caption: 'Toronto Skyline'
  },
  {
    url: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&q=80',
    caption: 'Vancouver Harbor'
  },
  {
    url: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80',
    caption: 'Montreal City'
  }
];

export function HeroSection({ onShowAuthModal }: HeroSectionProps) {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [count, setCount] = useState(0);
  const targetCount = 15420; // Nombre d'immigrants aidés

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count < targetCount) {
      const increment = Math.ceil(targetCount / 100);
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + increment, targetCount));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const handleLearnMore = () => {
    document.dispatchEvent(new CustomEvent('navigate', { 
      detail: { page: 'about' }
    }));
  };

  const handleLogoClick = () => {
    document.dispatchEvent(new CustomEvent('navigate', { 
      detail: { page: 'home' }
    }));
  };

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((image, index) => (
          <div
            key={image.url}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-700/90" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            Plus de <span className="font-bold text-xl">{count.toLocaleString()}</span> immigrants accompagnés
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl text-red-100 mb-8 animate-fade-in-up max-w-2xl">
            {t('hero.subtitle')}
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={onShowAuthModal}
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-medium hover:bg-red-50 transition-colors animate-fade-in-up flex items-center gap-2"
            >
              {t('hero.getStarted')}
              <ChevronRight className="h-5 w-5" />
            </button>

            <button
              onClick={handleLearnMore}
              className="flex items-center gap-3 text-white hover:text-red-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Play className="h-5 w-5" />
              </div>
              <span>Learn More</span>
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl font-bold mb-1">97%</div>
              <div className="text-sm text-red-100">Taux de satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm text-red-100">Support disponible</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl font-bold mb-1">10+</div>
              <div className="text-sm text-red-100">Années d'expérience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full">
            <div className="relative pt-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/your-video-id"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}