import React from 'react';
import { Loader } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { JobCard } from '../JobCard';
import type { JobResponse } from '../../services/jobsApi';

type JobListProps = {
  jobs: JobResponse[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  totalJobs: number;
  searchQuery: string;
  showSaveButton: boolean;
  onSaveJob: (job: JobResponse) => void;
  onLoadMore: () => void;
  loadingRef: (node?: Element | null) => void;
};

export function JobList({
  jobs,
  loading,
  loadingMore,
  error,
  hasMore,
  totalJobs,
  searchQuery,
  showSaveButton,
  onSaveJob,
  onLoadMore,
  loadingRef
}: JobListProps) {
  const { t } = useLanguage();

  const generateJobId = (job: JobResponse): string => {
    const timestamp = new Date(job.job_posted_at_datetime_utc).getTime();
    return [job.employer_name, job.job_title, timestamp]
      .filter(Boolean)
      .join('-')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const formatLocation = (job: JobResponse): string => {
    const city = job.job_city || '';
    
    if (city) {
      return `${city}, Canada`;
    }
    
    return 'Canada';
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">{t('jobs.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('jobs.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard 
            key={generateJobId(job)}
            job={{
              id: generateJobId(job),
              title: job.job_title,
              company: job.employer_name,
              location: formatLocation(job),
              type: job.job_employment_type,
              description: job.job_description,
              url: job.job_apply_link,
              posted_at: new Date(job.job_posted_at_datetime_utc).toLocaleDateString()
            }}
            onSave={() => onSaveJob(job)}
            showSaveButton={showSaveButton}
          />
        ))}
      </div>

      {loadingMore && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader className="h-5 w-5 animate-spin" />
            <span>{t('jobs.loadingMore')}</span>
          </div>
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-8 border-t">
          <p className="text-gray-600">
            {t('jobs.showingResults', { 
              shown: jobs.length, 
              total: totalJobs,
              query: searchQuery 
            })}
          </p>
        </div>
      )}

      {hasMore && !loadingMore && (
        <div className="text-center pt-4">
          <button
            onClick={onLoadMore}
            className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            {t('jobs.loadMore')}
          </button>
        </div>
      )}

      <div ref={loadingRef} className="h-10" />
    </div>
  );
}