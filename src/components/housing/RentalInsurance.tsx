import React from 'react';
import { Shield, DollarSign, FileText, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export function RentalInsurance() {
  const coverageTypes = [
    {
      title: 'Personal Property',
      icon: <Shield className="h-6 w-6 text-red-600" />,
      description: 'Protects your belongings from theft, damage, or loss',
      includes: [
        'Furniture and electronics',
        'Clothing and jewelry',
        'Kitchen appliances',
        'Sports equipment',
        'Other personal items'
      ]
    },
    {
      title: 'Liability Coverage',
      icon: <AlertCircle className="h-6 w-6 text-red-600" />,
      description: 'Protects you if someone is injured in your rental or you accidentally damage others\' property',
      includes: [
        'Visitor injuries',
        'Accidental damage to neighboring units',
        'Legal defense costs',
        'Medical payments for others',
        'Property damage to others'
      ]
    },
    {
      title: 'Additional Living Expenses',
      icon: <DollarSign className="h-6 w-6 text-red-600" />,
      description: 'Covers costs if you need temporary housing due to covered damage',
      includes: [
        'Hotel or temporary rental costs',
        'Additional food expenses',
        'Moving and storage costs',
        'Laundry expenses',
        'Pet boarding if needed'
      ]
    }
  ];

  const tips = [
    'Document all your belongings with photos and receipts',
    'Review your policy annually and update coverage as needed',
    'Consider additional coverage for high-value items',
    'Understand your deductible and coverage limits',
    'Bundle with other insurance for potential discounts'
  ];

  const commonQuestions = [
    {
      question: 'How much does rental insurance cost?',
      answer: 'Rental insurance typically costs between $15-30 per month in Canada, depending on your coverage needs and location.'
    },
    {
      question: 'Is rental insurance mandatory?',
      answer: 'While not legally required, many landlords require it. It\'s highly recommended for protecting your belongings and liability.'
    },
    {
      question: 'What affects my premium?',
      answer: 'Factors include location, coverage amount, deductible, credit score, and previous claims history.'
    },
    {
      question: 'How do I file a claim?',
      answer: 'Contact your insurance provider immediately, document the damage/loss with photos, and keep all relevant receipts.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-4">Rental Insurance Guide</h1>
          <p className="text-red-100 max-w-2xl">
            Protect your home and belongings with the right rental insurance coverage.
            Learn everything you need to know about tenant insurance in Canada.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Coverage Types */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {coverageTypes.map((type) => (
              <div key={type.title} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  {type.icon}
                  <h2 className="text-xl font-semibold text-gray-900">{type.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Pro Tips */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Insurance Tips</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-600">💡</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Common Questions</h2>
            </div>
            <div className="space-y-6">
              {commonQuestions.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-red-50 rounded-xl shadow-sm p-6 mt-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Get Protected?
              </h2>
              <p className="text-gray-600 mb-6">
                Compare quotes from top insurance providers in Canada and find the best coverage for your needs.
              </p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Get Insurance Quotes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}