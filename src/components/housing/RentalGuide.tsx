import React from 'react';
import { Book, Shield, FileText, DollarSign, Home, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export function RentalGuide() {
  const sections = [
    {
      title: 'Tenant Rights',
      icon: <Shield className="h-6 w-6 text-red-600" />,
      content: [
        'Right to quiet enjoyment of your home',
        'Right to a safe and well-maintained property',
        'Protection against unfair rent increases',
        'Privacy and notice before landlord entry',
        'Protection against discrimination'
      ]
    },
    {
      title: 'Required Documents',
      icon: <FileText className="h-6 w-6 text-red-600" />,
      content: [
        'Government-issued ID',
        'Proof of income or employment',
        'Bank statements',
        'References from previous landlords',
        'Credit report'
      ]
    },
    {
      title: 'Financial Considerations',
      icon: <DollarSign className="h-6 w-6 text-red-600" />,
      content: [
        'First and last month\'s rent',
        'Security deposit regulations',
        'Utility costs and responsibilities',
        'Renter\'s insurance',
        'Additional fees and charges'
      ]
    },
    {
      title: 'Lease Agreement',
      icon: <Book className="h-6 w-6 text-red-600" />,
      content: [
        'Lease term and renewal options',
        'Rent payment terms',
        'Maintenance responsibilities',
        'Pet policies',
        'Subletting and guest policies'
      ]
    }
  ];

  const redFlags = [
    'Landlord refuses to provide a written lease',
    'Requests for cash-only payments',
    'Pressure to sign without proper inspection',
    'Unwillingness to make repairs',
    'Excessive or unusual fees'
  ];

  const tips = [
    'Document the condition of the property before moving in',
    'Read the lease agreement carefully before signing',
    'Get all promises and agreements in writing',
    'Keep copies of all communications and payments',
    'Know your rights and responsibilities as a tenant'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-4">Rental Guide</h1>
          <p className="text-red-100 max-w-2xl">
            Everything you need to know about renting a property in Canada. 
            Understand your rights, responsibilities, and the rental process.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Key Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {sections.map((section) => (
              <div key={section.title} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Red Flags */}
          <div className="bg-red-50 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Warning Signs</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {redFlags.map((flag, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-600">
                  <span className="text-red-600">⚠️</span>
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Pro Tips</h2>
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

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Book className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Additional Resources</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="#"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-1">Tenant Rights Guide</h3>
                <p className="text-sm text-gray-600">
                  Detailed information about your rights as a tenant in Canada
                </p>
              </a>
              <a
                href="#"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-1">Legal Resources</h3>
                <p className="text-sm text-gray-600">
                  Access legal information and support services
                </p>
              </a>
              <a
                href="#"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-1">Rental Checklist</h3>
                <p className="text-sm text-gray-600">
                  Complete checklist for viewing and renting properties
                </p>
              </a>
              <a
                href="#"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-1">Dispute Resolution</h3>
                <p className="text-sm text-gray-600">
                  How to handle conflicts with your landlord
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}