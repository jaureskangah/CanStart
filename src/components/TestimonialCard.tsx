import React from 'react';

type TestimonialCardProps = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

function TestimonialCard({ name, role, image, quote }: TestimonialCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 transform hover:scale-105 transition-transform">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
      <blockquote className="text-gray-600 italic">"{quote}"</blockquote>
    </div>
  );
}

export default TestimonialCard;