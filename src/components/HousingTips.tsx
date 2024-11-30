import React from 'react';

export function HousingTips({ className = '' }: { className?: string }) {
  const handleNavigation = (page: string) => {
    document.dispatchEvent(new CustomEvent('navigate', { 
      detail: { page }
    }));
  };

  const resources = [
    {
      icon: '📄',
      title: 'Rental Guide',
      description: 'Learn about tenant rights and responsibilities in Canada',
      onClick: () => handleNavigation('rental-guide')
    },
    {
      icon: '🛡️',
      title: 'Rental Insurance',
      description: 'Why you need it and how to get it',
      onClick: () => handleNavigation('insurance')
    },
    {
      icon: '🧮',
      title: 'Cost Calculator',
      description: 'Estimate your total housing costs',
      onClick: () => handleNavigation('calculator')
    }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-4">Housing Resources</h3>

      <div className="space-y-4">
        {resources.map((resource) => (
          <button
            key={resource.title}
            onClick={resource.onClick}
            className="block w-full p-4 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{resource.icon}</span>
              <div>
                <h4 className="font-medium text-gray-900">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}