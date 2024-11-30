import React from 'react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  className?: string;
};

function FeatureCard({ title, description, icon, image, className = '' }: FeatureCardProps) {
  return (
    <div className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <img
          src={image}
          alt={title}
          className="rounded-lg object-cover w-full h-48"
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;