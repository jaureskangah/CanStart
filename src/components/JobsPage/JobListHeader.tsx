import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

type JobListHeaderProps = {
  onShowSavedJobs: () => void;
};

export function JobListHeader({ onShowSavedJobs }: JobListHeaderProps) {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">
          {t('jobs.title')}
        </h1>
        <p className="text-red-100 text-lg">
          {t('jobs.subtitle')}
        </p>
      </div>
      {user && (
        <button
          onClick={onShowSavedJobs}
          className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
        >
          <span className="text-xl">❤️</span>
          {t('jobs.savedJobs')}
        </button>
      )}
    </div>
  );
}