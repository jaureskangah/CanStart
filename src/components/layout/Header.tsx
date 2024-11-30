import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LogOut, Menu, X } from 'lucide-react';

type HeaderProps = {
  navigationItems: {
    id: string;
    label: string;
    onClick: () => void;
  }[];
  currentPage: string;
  onShowAuthModal: () => void;
};

export function Header({ navigationItems, currentPage, onShowAuthModal }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogoClick = () => {
    const homeItem = navigationItems.find(item => item.id === 'home');
    if (homeItem) {
      homeItem.onClick();
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <span className="text-xl sm:text-2xl text-red-600">🧭</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-800">CanStart</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems
              .filter(item => item.id !== 'home')
              .map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`text-gray-600 hover:text-gray-900 ${
                    currentPage === item.id ? 'text-red-600' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600 hidden lg:block">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  title={t('nav.signOut')}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav.signOut')}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onShowAuthModal}
                className="bg-red-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                {t('nav.getStarted')}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[73px] bg-white z-50">
            <div className="p-4 space-y-4">
              {navigationItems
                .filter(item => item.id !== 'home')
                .map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.onClick();
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg ${
                      currentPage === item.id
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              {user ? (
                <div className="space-y-4 border-t pt-4">
                  <div className="px-4 text-sm text-gray-600">
                    {user.displayName || user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('nav.signOut')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onShowAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mt-4"
                >
                  {t('nav.getStarted')}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}