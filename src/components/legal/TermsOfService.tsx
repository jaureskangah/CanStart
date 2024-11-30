import React from 'react';
import { FileText, AlertCircle, Scale, HelpCircle } from 'lucide-react';

export function TermsOfService() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using CanStart's services, you agree to be bound by these Terms of Service. 
      If you disagree with any part of the terms, you may not access the service.`
    },
    {
      title: 'User Accounts',
      content: [
        'You are responsible for maintaining the confidentiality of your account',
        'You must provide accurate and complete information',
        'You must notify us of any unauthorized account access',
        'We reserve the right to terminate accounts that violate our terms'
      ]
    },
    {
      title: 'Service Rules',
      content: [
        'Do not post false or misleading information',
        'Respect the intellectual property rights of others',
        'Do not engage in discriminatory practices',
        'Do not use the service for illegal activities',
        'Do not attempt to manipulate or abuse the platform'
      ]
    },
    {
      title: 'Content Guidelines',
      content: [
        'Job postings must be legitimate and accurate',
        'Housing listings must comply with local laws',
        'Profile information must be truthful',
        'Prohibited content will be removed',
        'We reserve the right to moderate all content'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-red-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Introduction</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Welcome to CanStart. These Terms of Service govern your use of our website, 
              mobile applications, and services. Please read these terms carefully before 
              using our platform.
            </p>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{section.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Disclaimers */}
          <div className="bg-yellow-50 rounded-xl shadow-sm p-8 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-900">Disclaimers</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our services are provided "as is" without any warranties, expressed or implied.
              CanStart is not responsible for the accuracy of information posted by users
              or third parties.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Questions?</h2>
            </div>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>Email: legal@canstart.ca</li>
              <li>Phone: 1-800-123-4567</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}