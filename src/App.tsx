import React, { useState, lazy, Suspense } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import { AuthModal } from './components/AuthModal';
import { Header } from './components/layout/Header';
import { MainContent } from './components/layout/MainContent';
import { Footer } from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const HomePage2 = lazy(() => import('./components/HomePage2'));

function App() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navigationItems = [
    { id: 'home', label: t('nav.home'), onClick: () => setCurrentPage('home') },
    { id: 'jobs', label: t('nav.jobs'), onClick: () => setCurrentPage('jobs') },
    { id: 'housing', label: t('nav.housing'), onClick: () => setCurrentPage('housing') },
    { id: 'business', label: t('nav.business'), onClick: () => setCurrentPage('business') },
    { id: 'training', label: 'Training', onClick: () => setCurrentPage('training') },
    { id: 'contact', label: t('nav.contact'), onClick: () => setCurrentPage('contact') }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        navigationItems={navigationItems}
        currentPage={currentPage}
        onShowAuthModal={() => setShowAuthModal(true)}
      />
      <MainContent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onShowAuthModal={() => setShowAuthModal(true)}
      />
      <Footer />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;