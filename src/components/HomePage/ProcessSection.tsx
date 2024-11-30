import React from 'react';
import { FileCheck, Users, Home, Briefcase, ArrowRight } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      icon: <FileCheck className="h-8 w-8 text-red-600" />,
      title: 'Évaluation Initiale',
      description: 'Analyse complète de votre profil et de vos objectifs d\'immigration',
      duration: '1-2 jours'
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: 'Plan Personnalisé',
      description: 'Création de votre feuille de route détaillée pour le Canada',
      duration: '3-5 jours'
    },
    {
      icon: <Home className="h-8 w-8 text-red-600" />,
      title: 'Installation',
      description: 'Accompagnement pour le logement et les démarches administratives',
      duration: '2-4 semaines'
    },
    {
      icon: <Briefcase className="h-8 w-8 text-red-600" />,
      title: 'Intégration',
      description: 'Support pour l\'emploi et l\'intégration sociale',
      duration: '1-3 mois'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Notre Processus d'Accompagnement
          </h2>
          <p className="text-gray-600 text-lg">
            Un parcours structuré et efficace pour réussir votre installation au Canada
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                    <div className="text-sm font-medium text-red-600">
                      {step.duration}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-20">
                    <div className="bg-white rounded-full p-2 shadow-sm">
                      <ArrowRight className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                )}

                {/* Step Number */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center">
              <p className="text-gray-600 mb-4">
                Prêt à commencer votre voyage vers le Canada ?
              </p>
              <button className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors">
                Évaluer Mon Profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}