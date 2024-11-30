import React, { useState } from 'react';
import { Building2, FileText, Calculator, PieChart, Briefcase } from 'lucide-react';
import { BusinessPlanBuilder } from './BusinessPlanBuilder';
import { TaxCalculator } from './TaxCalculator';
import { MarketAnalysis } from './MarketAnalysis';
import { BusinessResources } from './BusinessResources';
import { SuccessStories } from './SuccessStories';
import { FAQ } from './FAQ';
import { CommercialSection } from './CommercialSection';

type BusinessSection = 'plan' | 'tax' | 'market' | 'resources' | 'stories' | 'faq' | 'services';

export function BusinessGuide() {
  const [activeSection, setActiveSection] = useState<BusinessSection>('plan');

  const sections = [
    {
      id: 'plan',
      title: 'Business Plan',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'tax',
      title: 'Tax Calculator',
      icon: <Calculator className="h-6 w-6" />
    },
    {
      id: 'market',
      title: 'Market Analysis',
      icon: <PieChart className="h-6 w-6" />
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: <Briefcase className="h-6 w-6" />
    },
    {
      id: 'stories',
      title: 'Success Stories',
      icon: <Building2 className="h-6 w-6" />
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'services',
      title: 'Premium Services',
      icon: <Building2 className="h-6 w-6" />
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
      case 'stories':
        return <SuccessStories />;
      case 'faq':
        return <FAQ />;
      case 'services':
        return <CommercialSection />;
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

      {/* Navigation */}
      <div className="flex overflow-x-auto gap-4 mb-8 pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as BusinessSection)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeSection === section.id
                ? 'bg-red-600 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            {section.icon}
            <span>{section.title}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      {renderSection()}
    </div>
  );
}