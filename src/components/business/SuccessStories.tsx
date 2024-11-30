import React from 'react';
import { Star, ThumbsUp, TrendingUp } from 'lucide-react';

type Story = {
  id: string;
  name: string;
  business: string;
  image: string;
  quote: string;
  metrics: {
    growth: string;
    revenue: string;
    employees: string;
  };
};

const stories: Story[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    business: 'TechInnovate Solutions',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    quote: "Starting a tech company in Canada was a dream come true. The support from local business networks and government programs was invaluable.",
    metrics: {
      growth: '300%',
      revenue: '$2.5M',
      employees: '25'
    }
  },
  {
    id: '2',
    name: 'Miguel Rodriguez',
    business: 'Sustainable Foods Co.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600',
    quote: "The Canadian market's enthusiasm for sustainable products helped us grow beyond our expectations.",
    metrics: {
      growth: '200%',
      revenue: '$1.8M',
      employees: '18'
    }
  },
  {
    id: '3',
    name: 'Aisha Patel',
    business: 'Global Connect Services',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600',
    quote: "Canada's diverse market and supportive business environment made scaling our consulting firm possible.",
    metrics: {
      growth: '250%',
      revenue: '$3.2M',
      employees: '30'
    }
  }
];

export function SuccessStories() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div key={story.id} className="bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={story.image}
              alt={story.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.business}</p>
                </div>
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-gray-600 text-sm mb-6">
                "{story.quote}"
              </blockquote>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-600">Growth</div>
                  <div className="font-semibold text-red-600">{story.metrics.growth}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Revenue</div>
                  <div className="font-semibold text-red-600">{story.metrics.revenue}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Team</div>
                  <div className="font-semibold text-red-600">{story.metrics.employees}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}