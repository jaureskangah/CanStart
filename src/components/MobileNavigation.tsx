import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitch } from './LanguageSwitch';

type MobileNavigationProps = {
  items: {
    id: string;
    label: string;
    onClick: () => void;
  }[];
  className?: string;
};

export function MobileNavigation({ items, className = '' }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 space-y-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            >
              {item.label}
            </button>
          ))}

          <div className="border-t pt-4">
            <LanguageSwitch />
          </div>

          {user ? (
            <div className="space-y-2">
              <div className="px-4 text-sm text-gray-600">
                {user.displayName || user.email}
              </div>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                {t('nav.signOut')}
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                // TODO: Open auth modal
                setIsOpen(false);
              }}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              {t('nav.getStarted')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}