import React from 'react';
import { MapPin } from 'lucide-react';

type City = {
  id: string;
  name: string;
  province: string;
  jobCount: number;
  image: string;
};

const cities: City[] = [
  {
    id: 'toronto',
    name: 'Toronto',
    province: 'ON',
    jobCount: 2500,
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    province: 'BC',
    jobCount: 1800,
    image: 'https://images.unsplash.com/photo-1560814304-4f05b62af116?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'montreal',
    name: 'Montreal',
    province: 'QC',
    jobCount: 1600,
    image: 'https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'calgary',
    name: 'Calgary',
    province: 'AB',
    jobCount: 1200,
    image: 'https://images.unsplash.com/photo-1600786288830-9f5d4bf1d516?auto=format&fit=crop&q=80&w=1200'
  }
];

type PopularCitiesProps = {
  selectedCity?: string;
  onSelectCity: (city: string) => void;
  className?: string;
};

export function PopularCities({ selectedCity, onSelectCity, className = '' }: PopularCitiesProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-4">Popular Cities</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelectCity(city.id)}
            className={`group relative overflow-hidden rounded-lg aspect-[4/3] ${
              selectedCity === city.id ? 'ring-2 ring-red-600' : ''
            }`}
          >
            <img
              src={city.image}
              alt={city.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 group-hover:from-black/70 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-1 mb-1">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{city.name}, {city.province}</span>
              </div>
              <div className="text-sm text-gray-200">{city.jobCount} jobs</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}