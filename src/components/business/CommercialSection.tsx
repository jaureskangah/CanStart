import React from 'react';
import { Shield, Award, Clock, Users } from 'lucide-react';

export function CommercialSection() {
  const services = [
    {
      id: '1',
      title: 'Premium Business Plan Review',
      price: 299,
      features: [
        'Detailed analysis by industry experts',
        'Financial projections review',
        'Market strategy consultation',
        'Risk assessment',
        '60-minute consultation call'
      ],
      popular: true
    },
    {
      id: '2',
      title: 'Legal Document Package',
      price: 499,
      features: [
        'Complete incorporation documents',
        'Business agreements templates',
        'Compliance checklist',
        'Legal consultation (2 hours)',
        'Annual review service'
      ],
      popular: false
    },
    {
      id: '3',
      title: 'Growth Accelerator Program',
      price: 999,
      features: [
        '12-week mentorship program',
        'Weekly strategy sessions',
        'Network access',
        'Marketing toolkit',
        'Funding preparation support'
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Expert Guidance',
      description: 'Get advice from experienced business professionals'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Proven Success',
      description: '90% success rate for our supported businesses'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Time Savings',
      description: 'Launch your business 3x faster with our support'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Network Access',
      description: 'Connect with successful entrepreneurs'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Premium Business Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take your business to the next level with our premium services designed
          specifically for immigrant entrepreneurs in Canada.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="text-center p-6 bg-gray-50 rounded-xl"
          >
            <div className="inline-flex p-3 bg-red-100 rounded-lg text-red-600 mb-4">
              {benefit.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Service Plans */}
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`relative rounded-xl border ${
              service.popular ? 'border-red-600' : 'border-gray-200'
            } p-6`}
          >
            {service.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <div className="text-3xl font-bold text-gray-900">
                ${service.price}
                <span className="text-sm font-normal text-gray-600">/one-time</span>
              </div>
            </div>

            <ul className="space-y-4 mb-6">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="mr-2 text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              service.popular
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}>
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* Guarantee */}
      <div className="mt-12 text-center bg-red-50 rounded-xl p-6">
        <div className="inline-flex p-3 bg-red-100 rounded-lg text-red-600 mb-4">
          <Shield className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          100% Satisfaction Guarantee
        </h3>
        <p className="text-gray-600">
          If you're not completely satisfied with our services within 30 days,
          we'll provide a full refund. No questions asked.
        </p>
      </div>
    </div>
  );
}