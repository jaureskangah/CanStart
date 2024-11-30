import React from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

type JobSearchBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onToggleFilters: () => void;
};

export function JobSearchBar({ 
  searchQuery, 
  onSearchChange, 
  onSearch,
  onToggleFilters 
}: JobSearchBarProps) {
  const { t } = useLanguage();

  return (
    <form onSubmit={onSearch} className="flex gap-4 max-w-4xl">
      <div className="flex-1 bg-white rounded-lg shadow-lg flex items-center p-2">
        <Search className="h-5 w-5 text-gray-400 mx-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('jobs.searchPlaceholder')}
          className="flex-1 border-none focus:ring-0 text-gray-800"
        />
        <button
          type="button"
          onClick={onToggleFilters}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
        >
          <span>⚙️</span>
          <span>{t('jobs.filters')}</span>
        </button>
      </div>
      <button 
        type="submit"
        className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
      >
        {t('jobs.search')}
      </button>
    </form>
  );
}