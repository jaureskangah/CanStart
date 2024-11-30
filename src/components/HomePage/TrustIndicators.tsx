import React from 'react';
import { Shield, Award, CheckCircle } from 'lucide-react';

export function TrustIndicators() {
  const partners = [
    { name: 'Immigration Canada', logo: 'https://images.unsplash.com/photo-1535356795203-50b2eb73f96d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Canadian Chamber of Commerce', logo: 'https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?auto=format&fit=crop&q=80&w=200' },
    { name: 'Service Canada', logo: 'https://images.unsplash.com/photo-1552664688-cf412ec27db2?auto=format&fit=crop&q=80&w=200' }
  ];

  const certifications = [
    { icon: <Shield className="h-6 w-6" />, label: 'Certifié ICCRC' },
    { icon: <Award className="h-6 w-6" />, label: 'Top Immigration Agency 2024' },
    { icon: <CheckCircle className="h-6 w-6" />, label: 'ISO 9001:2015' }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-lg font-medium text-gray-900">
            Ils nous font confiance
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-8 items-center mb-12">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-8">
          {certifications.map((cert) => (
            <div key={cert.label} className="flex items-center gap-2 text-gray-600">
              {cert.icon}
              <span className="text-sm font-medium">{cert.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}