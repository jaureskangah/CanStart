import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Users } from 'lucide-react';

export function SuccessMetrics() {
  const [metrics, setMetrics] = useState({
    placementRate: 0,
    avgTime: 0,
    satisfactionRate: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        placementRate: Math.min(prev.placementRate + 1, 92),
        avgTime: Math.min(prev.avgTime + 0.5, 45),
        satisfactionRate: Math.min(prev.satisfactionRate + 1, 97)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-red-600 to-red-700">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {metrics.placementRate}%
            </div>
            <div className="text-red-100">
              Taux de placement professionnel
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {metrics.avgTime} jours
            </div>
            <div className="text-red-100">
              Temps moyen d'installation
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {metrics.satisfactionRate}%
            </div>
            <div className="text-red-100">
              Taux de satisfaction client
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}