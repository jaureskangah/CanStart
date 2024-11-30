import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const handleNavigation = (page: string) => {
    document.dispatchEvent(new CustomEvent('navigate', { 
      detail: { page }
    }));
  };

  const sections = [
    {
      title: t('footer.services'),
      links: [
        { label: t('nav.jobs'), onClick: () => handleNavigation('jobs') },
        { label: t('nav.housing'), onClick: () => handleNavigation('housing') },
        { label: t('nav.support'), onClick: () => handleNavigation('support') }
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), onClick: () => handleNavigation('about') },
        { label: t('footer.contact'), onClick: () => handleNavigation('contact') },
        { label: t('footer.careers'), onClick: () => handleNavigation('careers') }
      ]
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), onClick: () => handleNavigation('privacy') },
        { label: t('footer.terms'), onClick: () => handleNavigation('terms') },
        { label: t('footer.cookies'), onClick: () => handleNavigation('cookies') }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl sm:text-2xl text-red-500">🧭</span>
              <span className="text-xl sm:text-2xl font-bold">CanStart</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400">{t('footer.tagline')}</p>
          </div>
          
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.onClick}
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            &copy; {new Date().getFullYear()} CanStart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}