import React, { createContext, useContext, useState } from 'react';

type Language = 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.jobs': 'Jobs',
    'nav.housing': 'Housing',
    'nav.support': 'Support',
    'nav.business': 'Business',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',
    'nav.signOut': 'Sign Out',
    'nav.signIn': 'Sign In',

    // Hero Section
    'hero.title': 'Start Your New Life in Canada with Confidence',
    'hero.subtitle': 'Your all-in-one platform for finding jobs, housing, and guidance for a smooth transition to Canadian life',
    'hero.getStarted': 'Get Started',
    'hero.learnMore': 'Learn More',

    // Jobs Section
    'jobs.title': 'Find Your Dream Job',
    'jobs.subtitle': 'Discover opportunities across Canada',
    'jobs.searchPlaceholder': 'Search jobs by title, company, or keyword',
    'jobs.filters': 'Filters',
    'jobs.search': 'Search',
    'jobs.loading': 'Loading jobs...',
    'jobs.loadingMore': 'Loading more jobs...',
    'jobs.noResults': 'No jobs found',
    'jobs.savedSuccess': 'Job saved successfully',
    'jobs.saveError': 'Failed to save job',
    'jobs.savedJobs': 'Saved Jobs',
    'jobs.locationUnknown': 'Location not specified',
    'jobs.showingResults': 'Showing {shown} of {total} jobs',
    'jobs.loadMore': 'Load More Jobs',

    // Housing Section
    'housing.title': 'Find Your New Home',
    'housing.subtitle': 'Browse properties across Canada',
    'housing.searchPlaceholder': 'Search by city, neighborhood, or address',
    'housing.filters': 'Filters',
    'housing.search': 'Search',
    'housing.loading': 'Loading properties...',
    'housing.noResults': 'No properties found',

    // Features Section
    'features.title': 'Everything You Need',
    'features.jobSearch.title': 'Job Search',
    'features.jobSearch.description': 'Find opportunities matching your skills',
    'features.housing.title': 'Housing',
    'features.housing.description': 'Discover your perfect home',
    'features.admin.title': 'Immigration Guide',
    'features.admin.description': 'Step-by-step guidance for your journey',

    // Stats Section
    'stats.users': 'Active Users',
    'stats.successRate': 'Success Rate',
    'stats.support': '24/7 Support',
    'stats.companies': 'Partner Companies',

    // Footer Section
    'footer.tagline': 'Making your Canadian dream a reality',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.careers': 'Careers',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',

    // Auth & Profile
    'auth.signInRequired': 'Please sign in to continue',
    'profile.occupation': 'Occupation',
    'profile.education': 'Education',
    'profile.languages': 'Languages',

    // Home2 Section
    'home2.helpingNewcomers': 'Helping {count}+ newcomers start their Canadian journey',
    'home2.mainTitle': 'Your Gateway to a New Life in Canada',
    'home2.mainSubtitle': 'We provide comprehensive support for newcomers, from finding jobs and housing to navigating immigration processes and building community connections.',
    'home2.startJourney': 'Start Your Journey',
    'home2.learnMore': 'Learn More',
    'home2.featuresTitle': 'Everything You Need to Start Your New Life',
    'home2.featuresSubtitle': 'We provide comprehensive support and resources to help you successfully establish yourself in Canada.',
    'home2.careerSupport': 'Career Support',
    'home2.careerSupportDesc': 'Find your dream job with our comprehensive job search platform and career guidance.',
    'home2.housingSolutions': 'Housing Solutions',
    'home2.housingSolutionsDesc': 'Discover your perfect home with our curated housing listings and rental assistance.',
    'home2.documentation': 'Documentation',
    'home2.documentationDesc': 'Expert guidance through all necessary immigration and settlement paperwork.',
    'home2.community': 'Community',
    'home2.communityDesc': 'Connect with a supportive community of newcomers and local residents.',
    'home2.ctaTitle': 'Ready to Start Your Canadian Journey?',
    'home2.ctaSubtitle': 'Join thousands of successful newcomers who have made Canada their home.',
    'home2.getStartedToday': 'Get Started Today',

    // Other Sections
    'support.title': 'Immigration Support',
    'support.subtitle': 'Expert guidance for your immigration journey',
    'business.title': 'Business Solutions',
    'business.subtitle': 'Start and grow your business in Canada',
    'contact.title': 'Contact Us',
    'contact.subtitle': "We're here to help you succeed"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, params?: Record<string, any>): string => {
    try {
      const translation = translations[language]?.[key as keyof typeof translations['en']];
      
      if (!translation) {
        console.warn(`Missing translation for key: ${key}`);
        return key;
      }

      if (params) {
        return Object.entries(params).reduce(
          (str, [paramKey, value]) => str.replace(`{${paramKey}}`, String(value)),
          translation
        );
      }

      return translation;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}