import React from 'react';
import { Cookie, Info, Settings, Shield } from 'lucide-react';

export function CookiePolicy() {
  const cookieTypes = [
    {
      title: 'Essential Cookies',
      description: 'Required for basic site functionality',
      examples: [
        'Authentication',
        'Security',
        'User preferences',
        'Session management'
      ]
    },
    {
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website',
      examples: [
        'Page views',
        'Navigation paths',
        'Time spent on pages',
        'Error encounters'
      ]
    },
    {
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization',
      examples: [
        'Language preferences',
        'Location settings',
        'Recently viewed items',
        'Saved searches'
      ]
    },
    {
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant content and advertisements',
      examples: [
        'Ad personalization',
        'Campaign effectiveness',
        'Referral tracking',
        'Partner integrations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-4">Cookie Policy</h1>
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
              <Info className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">About Our Cookies</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              CanStart uses cookies and similar technologies to provide, protect, and improve our services.
              This policy explains how and why we use these technologies and the choices you have.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {cookieTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.examples.map((example, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Cookie className="h-4 w-4 text-red-600" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Cookie Management */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Managing Your Cookie Preferences</h2>
            </div>
            <p className="text-gray-600 mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are
              already on your computer and you can set most browsers to prevent them from being placed.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Browser Settings</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Chrome: Settings → Privacy and Security → Cookies</li>
                <li>• Firefox: Options → Privacy & Security → Cookies</li>
                <li>• Safari: Preferences → Privacy → Cookies</li>
                <li>• Edge: Settings → Privacy & Security → Cookies</li>
              </ul>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Data Protection</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We are committed to protecting your privacy and ensuring you have control over your data.
              The information collected through cookies is handled in accordance with our Privacy Policy.
            </p>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Your Rights</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Access your cookie data</li>
                <li>• Withdraw consent at any time</li>
                <li>• Request data deletion</li>
                <li>• Object to processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}