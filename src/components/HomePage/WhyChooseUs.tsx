import React from 'react';
import { Shield, Users, Clock, Globe, Award, Heart } from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: 'Expertise Reconnue',
      description: 'Plus de 10 ans d\'expérience dans l\'accompagnement des immigrants',
      stat: '15K+ immigrants accompagnés'
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: 'Équipe Multilingue',
      description: 'Support disponible en français, anglais, espagnol et mandarin',
      stat: '4 langues principales'
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: 'Support 24/7',
      description: 'Une équipe disponible à tout moment pour vous accompagner',
      stat: '< 1h temps de réponse'
    },
    {
      icon: <Globe className="h-8 w-8 text-red-600" />,
      title: 'Réseau National',
      description: 'Des partenaires dans toutes les grandes villes canadiennes',
      stat: '20+ villes couvertes'
    },
    {
      icon: <Award className="h-8 w-8 text-red-600" />,
      title: 'Taux de Réussite',
      description: 'Un des meilleurs taux de réussite du secteur',
      stat: '97% de satisfaction'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: 'Approche Personnalisée',
      description: 'Chaque parcours est unique, notre accompagnement aussi',
      stat: '100% personnalisé'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pourquoi Choisir CanStart ?
          </h2>
          <p className="text-gray-600 text-lg">
            Nous combinons expertise, technologie et accompagnement personnalisé pour faciliter
            votre installation au Canada.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-xl border border-gray-100 hover:border-red-100 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-red-50 rounded-lg group-hover:bg-white transition-colors">
                  {reason.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {reason.description}
                </p>
                
                <div className="text-sm font-medium text-red-600">
                  {reason.stat}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Commencer Votre Voyage
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}