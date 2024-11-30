import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Briefcase, MapPin, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      title: t('features.jobSearch.title'),
      description: t('features.jobSearch.description'),
      icon: <Briefcase className="h-6 w-6 text-white" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      stats: [
        { value: '5K+', label: 'Offres d\'emploi' },
        { value: '92%', label: 'Taux de placement' }
      ],
      testimonial: {
        quote: "J'ai trouvé mon emploi en moins de 2 mois",
        author: "Marie L.",
        role: "Développeuse Web"
      }
    },
    {
      title: t('features.housing.title'),
      description: t('features.housing.description'),
      icon: <MapPin className="h-6 w-6 text-white" />,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
      stats: [
        { value: '3K+', label: 'Logements' },
        { value: '48h', label: 'Délai moyen' }
      ],
      testimonial: {
        quote: "Un accompagnement précieux pour trouver mon appartement",
        author: "Thomas R.",
        role: "Nouvel arrivant"
      }
    },
    {
      title: t('features.admin.title'),
      description: t('features.admin.description'),
      icon: <Users className="h-6 w-6 text-white" />,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
      stats: [
        { value: '24/7', label: 'Support' },
        { value: '15K+', label: 'Membres' }
      ],
      testimonial: {
        quote: "Un support constant tout au long du processus",
        author: "Sophie M.",
        role: "Entrepreneure"
      }
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des solutions complètes pour faciliter votre installation au Canada
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              className="transform hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
    </section>
  );
}