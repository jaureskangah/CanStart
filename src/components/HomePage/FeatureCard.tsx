import React from 'react';
import { ArrowUpRight } from 'lucide-react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  stats?: {
    value: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  onClick?: () => void;
  className?: string;
};

function FeatureCard({
  title,
  description,
  icon,
  image,
  stats,
  testimonial,
  onClick,
  className = ''
}: FeatureCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          {icon}
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{description}</p>

      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-semibold text-red-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {testimonial && (
        <blockquote className="border-l-4 border-red-600 pl-4 mb-6">
          <p className="text-gray-600 italic mb-2">{testimonial.quote}</p>
          <footer className="text-sm">
            <strong className="text-gray-900">{testimonial.author}</strong>
            <span className="text-gray-500"> — {testimonial.role}</span>
          </footer>
        </blockquote>
      )}

      <button className="flex items-center gap-2 text-red-600 hover:gap-3 transition-all">
        En savoir plus
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default FeatureCard;