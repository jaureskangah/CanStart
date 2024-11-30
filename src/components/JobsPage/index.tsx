import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useInView } from 'react-intersection-observer';
import { searchJobs } from '../../services/jobsApi';
import type { JobResponse, JobSearchParams } from '../../services/jobsApi';
import { saveJob, updateSearchHistory } from '../../services/userService';
import toast from 'react-hot-toast';

import { JobSearchBar } from './JobSearchBar';
import { JobListHeader } from './JobListHeader';
import { JobList } from './JobList';
import { JobFilters } from '../JobFilters';
import { JobTrends } from '../JobTrends';
import { JobResources } from '../JobResources';
import { SavedJobsDrawer } from '../SavedJobsDrawer';
import { RecommendedJobs } from '../RecommendedJobs';
import { JobAlerts } from '../JobAlerts';
import { JobCategories } from '../JobCategories';
import { PopularCities } from '../PopularCities';

export function JobsPage() {
  const { t } = useLanguage();
  const { user, userData } = useAuth();
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [filters, setFilters] = useState<JobSearchParams>({
    location: '',
    employment_type: '',
    experience: '',
    salary_min: ''
  });

  const [loadingRef, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && !loading && hasMore) {
      handleLoadMore();
    }
  }, [inView]);

  const fetchJobs = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }
      
      const newPage = reset ? 1 : page;
      const jobsData = await searchJobs({
        query: searchQuery,
        category: selectedCategory,
        city: selectedCity,
        page: newPage,
        ...filters
      });

      if (reset) {
        setJobs(jobsData.jobs);
        setTotalJobs(jobsData.total);
      } else {
        setJobs(prev => [...prev, ...jobsData.jobs]);
      }

      setHasMore(jobsData.hasMore);
      setPage(newPage + 1);

      if (user?.uid && searchQuery) {
        await updateSearchHistory(user.uid, searchQuery, 'job');
      }
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchJobs(true);
  }, [selectedCategory, selectedCity]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    await fetchJobs(true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchJobs();
    }
  };

  const handleSaveJob = async (job: JobResponse) => {
    if (!user) {
      toast.error(t('auth.signInRequired'));
      return;
    }

    try {
      const jobId = [
        job.employer_name,
        job.job_title,
        new Date(job.job_posted_at_datetime_utc).getTime()
      ]
        .filter(Boolean)
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      await saveJob(user.uid, {
        id: jobId,
        title: job.job_title,
        company: job.employer_name,
        location: `${job.job_city}, ${job.job_country}`,
        type: job.job_employment_type,
        description: job.job_description,
        url: job.job_apply_link,
        posted_at: new Date(job.job_posted_at_datetime_utc).toLocaleDateString()
      });
      toast.success(t('jobs.savedSuccess'));
    } catch (error) {
      toast.error(t('jobs.saveError'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-12">
        <div className="container px-6">
          <JobListHeader onShowSavedJobs={() => setShowSavedJobs(true)} />
          <JobSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        </div>
      </div>

      <div className="container px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <JobFilters
              filters={filters}
              setFilters={setFilters}
              onApply={() => fetchJobs(true)}
              className={showFilters ? 'block' : 'hidden lg:block'}
            />
            {user && <JobAlerts className="mt-6" />}
          </div>

          <div className="lg:col-span-6">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <JobCategories
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <PopularCities
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
              />
            </div>

            {user && userData?.preferences && (
              <RecommendedJobs 
                preferences={userData.preferences}
                className="mb-8"
              />
            )}
            
            <JobList
              jobs={jobs}
              loading={loading}
              loadingMore={loadingMore}
              error={error}
              hasMore={hasMore}
              totalJobs={totalJobs}
              searchQuery={searchQuery}
              showSaveButton={!!user}
              onSaveJob={handleSaveJob}
              onLoadMore={handleLoadMore}
              loadingRef={loadingRef}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <JobTrends />
            <JobResources />
          </div>
        </div>
      </div>

      <SavedJobsDrawer
        isOpen={showSavedJobs}
        onClose={() => setShowSavedJobs(false)}
      />
    </div>
  );
}