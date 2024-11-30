import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';
import { JobTrends } from './JobTrends';
import { JobResources } from './JobResources';
import { searchJobs } from '../services/jobsApi';
import type { JobResponse, JobSearchParams } from '../services/jobsApi';
import { saveJob, updateSearchHistory } from '../services/userService';
import toast from 'react-hot-toast';
import { SavedJobsDrawer } from './SavedJobsDrawer';
import { RecommendedJobs } from './RecommendedJobs';
import { JobAlerts } from './JobAlerts';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { JobCategories } from './JobCategories';
import { PopularCities } from './PopularCities';

// Helper function to generate unique job ID
const generateJobId = (job: JobResponse): string => {
  const timestamp = new Date(job.job_posted_at_datetime_utc).getTime();
  const uniqueStr = [
    job.employer_name,
    job.job_title,
    job.job_city,
    timestamp
  ].filter(Boolean).join('-');
  
  return uniqueStr
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

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
      toast.error('Please sign in to save jobs');
      return;
    }

    try {
      const jobId = generateJobId(job);
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
      toast.success('Job saved successfully!');
    } catch (error) {
      toast.error('Failed to save job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-12">
        <div className="container px-6">
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
                onClick={() => setShowSavedJobs(true)}
                className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
              >
                <span className="text-xl">❤️</span>
                Saved Jobs
              </button>
            )}
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-4 max-w-4xl">
            <div className="flex-1 bg-white rounded-lg shadow-lg flex items-center p-2">
              <span className="text-gray-400 mx-2">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('jobs.searchPlaceholder')}
                className="flex-1 border-none focus:ring-0 text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
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
            {/* Categories and Cities */}
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
            
            <div className="space-y-6">
              {loading && page === 1 ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">{t('jobs.loading')}</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">{t('jobs.noResults')}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <JobCard 
                        key={generateJobId(job)}
                        job={{
                          id: generateJobId(job),
                          title: job.job_title,
                          company: job.employer_name,
                          location: `${job.job_city}, ${job.job_country}`,
                          type: job.job_employment_type,
                          description: job.job_description,
                          url: job.job_apply_link,
                          posted_at: new Date(job.job_posted_at_datetime_utc).toLocaleDateString()
                        }}
                        onSave={() => handleSaveJob(job)}
                        showSaveButton={!!user}
                      />
                    ))}
                  </div>

                  {loadingMore && (
                    <div className="flex items-center justify-center py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>Loading more jobs...</span>
                      </div>
                    </div>
                  )}

                  {!hasMore && (
                    <div className="text-center py-8 border-t">
                      <p className="text-gray-600">
                        Showing all {jobs.length} of {totalJobs} jobs
                        {searchQuery && ` for "${searchQuery}"`}
                      </p>
                    </div>
                  )}

                  {hasMore && !loadingMore && (
                    <div className="text-center pt-4">
                      <button
                        onClick={handleLoadMore}
                        className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Load More Jobs
                      </button>
                    </div>
                  )}

                  <div ref={loadingRef} className="h-10" />
                </>
              )}
            </div>
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