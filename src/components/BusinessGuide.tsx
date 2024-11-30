import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Building2, 
  Calculator, 
  FileText, 
  DollarSign,
  Briefcase,
  Users,
  PieChart,
  Target
} from 'lucide-react';
import { BusinessPlanBuilder } from './business/BusinessPlanBuilder';
import { TaxCalculator } from './business/TaxCalculator';
import { MarketAnalysis } from './business/MarketAnalysis';
import { BusinessResources } from './business/BusinessResources';
import toast from 'react-hot-toast';

type BusinessSection = 'plan' | 'tax' | 'market' | 'resources';

export function BusinessGuide() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<BusinessSection>('plan');

  const sections = [
    {
      id: 'plan',
      title: 'Business Plan Builder',
      description: 'Create a professional business plan with our step-by-step guide',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'tax',
      title: 'Tax Assistant',
      description: 'Calculate taxes and understand Canadian tax regulations',
      icon: <Calculator className="h-6 w-6" />
    },
    {
      id: 'market',
      title: 'Market Analysis',
      description: 'Research market opportunities and competition',
      icon: <PieChart className="h-6 w-6" />
    },
    {
      id: 'resources',
      title: 'Business Resources',
      description: 'Access guides, templates, and support services',
      icon: <Briefcase className="h-6 w-6" />
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'plan':
        return <BusinessPlanBuilder />;
      case 'tax':
        return <TaxCalculator />;
      case 'market':
        return <MarketAnalysis />;
      case 'resources':
        return <BusinessResources />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Business in Canada</h1>
        </div>
        <p className="text-red-100 text-lg max-w-2xl">
          Start and grow your business in Canada with our comprehensive tools and resources.
          Get guidance on business planning, tax regulations, market analysis, and more.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-gray-900">Success Rate</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">85%</div>
          <p className="text-sm text-gray-600">of immigrant businesses</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-gray-900">Average Revenue</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">$250K</div>
          <p className="text-sm text-gray-600">first year revenue</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-gray-900">Job Creation</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">4.5</div>
          <p className="text-sm text-gray-600">jobs per business</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-gray-900">Active Businesses</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">50K+</div>
          <p className="text-sm text-gray-600">immigrant-owned</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as BusinessSection)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-900'
              }`}
            >
              {section.icon}
              <div className="text-left">
                <h3 className="font-medium">{section.title}</h3>
                <p className={`text-sm ${
                  activeSection === section.id ? 'text-red-100' : 'text-gray-500'
                }`}>
                  {section.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}