import React from 'react';
import { Briefcase, Home, Users, Book } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Briefcase className="h-8 w-8 text-red-600" />,
      title: "Career Support",
      description: "Find your dream job with our comprehensive job search platform and career guidance",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Home className="h-8 w-8 text-red-600" />,
      title: "Housing Solutions",
      description: "Discover your perfect home with our curated housing listings and rental assistance",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Book className="h-8 w-8 text-red-600" />,
      title: "Immigration Guide",
      description: "Expert guidance through all necessary immigration and settlement paperwork",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Community Network",
      description: "Connect with a supportive community of newcomers and local residents",
      image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-32 mt-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Start Your New Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive support and resources to help you successfully 
            establish yourself in Canada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    {feature.icon}
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}