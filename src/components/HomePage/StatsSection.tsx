import React, { Suspense, useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MapPin } from 'lucide-react';
import StatCard from './StatCard';

type ProvinceStat = {
  name: string;
  value: number;
  coordinates: [number, number];
};

const provinceStats: ProvinceStat[] = [
  { name: 'Ontario', value: 45, coordinates: [51.2538, -85.3232] },
  { name: 'Québec', value: 25, coordinates: [52.4760, -71.8258] },
  { name: 'British Columbia', value: 15, coordinates: [53.7267, -127.6476] },
  { name: 'Alberta', value: 10, coordinates: [53.9333, -116.5765] },
  { name: 'Other', value: 5, coordinates: [56.1304, -106.3468] }
];

export function StatsSection() {
  const { t } = useLanguage();
  const [animatedStats, setAnimatedStats] = useState<{ [key: string]: number }>({});

  const stats = [
    { id: 'users', number: 10000, label: t('stats.users') },
    { id: 'companies', number: 500, label: t('stats.companies') },
    { id: 'cities', number: 20, label: t('stats.cities') }
  ];

  useEffect(() => {
    stats.forEach(stat => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.number / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        if (current < stat.number) {
          current = Math.min(current + increment, stat.number);
          setAnimatedStats(prev => ({
            ...prev,
            [stat.id]: Math.round(current)
          }));
        } else {
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    });
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre Impact à Travers le Canada</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <Suspense fallback={<div className="animate-pulse h-24 bg-gray-200 rounded-lg" />}>
                {stats.map((stat) => (
                  <StatCard
                    key={stat.id}
                    number={`${(animatedStats[stat.id] || 0).toLocaleString()}+`}
                    label={stat.label}
                  />
                ))}
              </Suspense>
            </div>

            <div className="mt-8 space-y-4">
              {provinceStats.map((province) => (
                <div key={province.name} className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900">{province.name}</span>
                      <span className="text-gray-600">{province.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-1000"
                        style={{ width: `${province.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-xl" />
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80"
              alt="Canada Map"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}