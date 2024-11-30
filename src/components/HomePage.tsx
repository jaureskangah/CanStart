import React, { lazy, Suspense } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, Users, MapPin, Briefcase } from 'lucide-react';
import { withPerformanceTracking } from '../utils/performance';

// Lazy load components
const FeatureCard = lazy(() => import('./FeatureCard'));
const StatCard = lazy(() => import('./StatCard'));
const TestimonialCard = lazy(() => import('./TestimonialCard'));

function HomePage() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const features = [
    {
      title: t('features.jobSearch.title'),
      description: t('features.jobSearch.description'),
      icon: <Briefcase className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: t('features.housing.title'),
      description: t('features.housing.description'),
      icon: <MapPin className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: t('features.admin.title'),
      description: t('features.admin.description'),
      icon: <Users className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const stats = [
    { number: '10,000+', label: t('stats.users') },
    { number: '500+', label: t('stats.companies') },
    { number: '20+', label: t('stats.cities') }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Developer',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
      quote: 'CanStart helped me find my dream job and settle in Canada smoothly.'
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600',
      quote: 'The business resources and guidance were invaluable for starting my company.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 py-24">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            {t('hero.subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {}} // Add auth modal open
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors animate-fade-in-up"
            >
              {t('hero.getStarted')}
            </button>
            <button
              onClick={() => {}} // Add navigation
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors animate-fade-in-up"
            >
              {t('hero.learnMore')}
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('features.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Suspense fallback={<div className="animate-pulse h-64 bg-gray-200 rounded-lg" />}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  {...feature}
                  className="transform hover:scale-105 transition-transform"
                />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Suspense fallback={<div className="animate-pulse h-24 bg-gray-200 rounded-lg" />}>
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Suspense fallback={<div className="animate-pulse h-48 bg-gray-200 rounded-lg" />}>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-red-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful immigrants who have made Canada their home.
          </p>
          <button
            onClick={() => {}} // Add auth modal open
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}

export default withPerformanceTracking(HomePage);