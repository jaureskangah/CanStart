import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  date: string;
  tags: string[];
};

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Software Developer',
    location: 'Toronto, ON',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    quote: 'CanStart a transformé mon rêve canadien en réalité. Leur accompagnement personnalisé et leur expertise m\'ont permis de trouver un emploi en moins de 2 mois après mon arrivée.',
    rating: 5,
    date: '2024-01-15',
    tags: ['Emploi', 'Immigration', 'Installation']
  },
  {
    id: '2',
    name: 'Miguel Rodriguez',
    role: 'Business Owner',
    location: 'Vancouver, BC',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600',
    quote: 'Grâce à leur réseau et leurs conseils, j\'ai pu ouvrir mon entreprise et obtenir tous les permis nécessaires. Leur support continu est inestimable.',
    rating: 5,
    date: '2024-01-20',
    tags: ['Entreprise', 'Réseau', 'Administration']
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Healthcare Professional',
    location: 'Montreal, QC',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    quote: 'Le processus d\'immigration peut être stressant, mais CanStart a rendu chaque étape claire et gérable. Leur équipe est vraiment dévouée.',
    rating: 5,
    date: '2024-01-25',
    tags: ['Santé', 'Logement', 'Intégration']
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Histoires de Réussite
          </h2>
          <p className="text-gray-600 text-lg">
            Découvrez comment nous avons aidé des milliers d'immigrants à réaliser leur rêve canadien.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          <p className="text-gray-600">{testimonial.role}</p>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <blockquote className="text-gray-600 italic mb-6">
                        "{testimonial.quote}"
                      </blockquote>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {testimonial.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="text-sm text-gray-500">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}