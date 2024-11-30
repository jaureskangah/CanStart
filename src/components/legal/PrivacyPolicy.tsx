import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

export function PrivacyPolicy() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: <Eye className="h-6 w-6 text-red-600" />,
      content: [
        'Personal information (name, email, phone number)',
        'Professional information (work history, education)',
        'Usage data and preferences',
        'Device and browser information'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: <Shield className="h-6 w-6 text-red-600" />,
      content: [
        'Provide and improve our services',
        'Personalize your experience',
        'Process job and housing applications',
        'Send relevant notifications and updates',
        'Analyze and enhance platform security'
      ]
    },
    {
      title: 'Data Protection',
      icon: <Lock className="h-6 w-6 text-red-600" />,
      content: [
        'Industry-standard encryption',
        'Regular security audits',
        'Secure data storage practices',
        'Limited employee access'
      ]
    },
    {
      title: 'Your Rights',
      icon: <UserCheck className="h-6 w-6 text-red-600" />,
      content: [
        'Access your personal data',
        'Request data correction',
        'Delete your account',
        'Opt-out of communications',
        'Data portability'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
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
            <p className="text-gray-600 leading-relaxed">
              At CanStart, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, and protect your personal information when you use our platform. By using our services,
              you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>Email: privacy@canstart.ca</li>
              <li>Phone: 1-800-123-4567</li>
              <li>Address: 123 Privacy Street, Toronto, ON M5V 2T6</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}