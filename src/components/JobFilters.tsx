import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, DollarSign, GraduationCap, Clock } from 'lucide-react';

type FiltersType = {
  location: string;
  jobType: string;
  experience: string;
  salary: string;
  remote: boolean;
  postedWithin: string;
  sortBy: string;
};

type JobFiltersProps = {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
  className?: string;
  onApply?: () => void;
};

export function JobFilters({ filters, setFilters, className = '', onApply }: JobFiltersProps) {
  const { t } = useLanguage();

  const handleChange = (key: keyof FiltersType, value: string | boolean) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">{t('jobs.filters')}</h3>
        <button
          onClick={() => setFilters({
            location: '',
            jobType: '',
            experience: '',
            salary: '',
            remote: false,
            postedWithin: '',
            sortBy: 'relevance'
          })}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Reset All
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Job Type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="h-4 w-4" />
            Job Type
          </label>
          <select
            value={filters.jobType}
            onChange={(e) => handleChange('jobType', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="h-4 w-4" />
            Experience Level
          </label>
          <select
            value={filters.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="">Any Level</option>
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="mid">Mid Level (3-5 years)</option>
            <option value="senior">Senior Level (5+ years)</option>
            <option value="executive">Executive Level</option>
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="h-4 w-4" />
            Salary Range
          </label>
          <select
            value={filters.salary}
            onChange={(e) => handleChange('salary', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="">Any Salary</option>
            <option value="0-40k">Under $40,000</option>
            <option value="40k-60k">$40,000 - $60,000</option>
            <option value="60k-80k">$60,000 - $80,000</option>
            <option value="80k-100k">$80,000 - $100,000</option>
            <option value="100k-150k">$100,000 - $150,000</option>
            <option value="150k+">$150,000+</option>
          </select>
        </div>

        {/* Posted Within */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Clock className="h-4 w-4" />
            Posted Within
          </label>
          <select
            value={filters.postedWithin}
            onChange={(e) => handleChange('postedWithin', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="">Any Time</option>
            <option value="24h">Last 24 hours</option>
            <option value="3d">Last 3 days</option>
            <option value="7d">Last 7 days</option>
            <option value="14d">Last 14 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>

        {/* Remote Option */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.remote}
              onChange={(e) => handleChange('remote', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm text-gray-700">Remote Only</span>
          </label>
        </div>

        {/* Sort By */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="relevance">Most Relevant</option>
            <option value="recent">Most Recent</option>
            <option value="salary-high">Highest Salary</option>
            <option value="salary-low">Lowest Salary</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={onApply}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}