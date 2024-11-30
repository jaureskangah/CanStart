import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsearch.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'a9f0778b1cmshc343c764ac997c8p1aa701jsn52a949d7d714',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
});

export type JobSearchParams = {
  query?: string;
  page?: string;
  category?: string;
  city?: string;
  location?: string;
  employment_type?: string;
  experience?: string;
  salary_min?: string;
};

export type JobResponse = {
  employer_name: string;
  employer_logo: string | null;
  job_title: string;
  job_description: string;
  job_country: string;
  job_city: string;
  job_employment_type: string;
  job_apply_link: string;
  job_posted_at_datetime_utc: string;
};

export type JobsResponse = {
  jobs: JobResponse[];
  total: number;
  page: number;
  hasMore: boolean;
};

// Mock data for development
const MOCK_JOBS: JobResponse[] = [
  {
    employer_name: 'Tech Solutions Inc',
    employer_logo: null,
    job_title: 'Senior Software Developer',
    job_description: 'Looking for an experienced developer to join our team...',
    job_country: 'Canada',
    job_city: 'Toronto',
    job_employment_type: 'Full-time',
    job_apply_link: 'https://example.com/apply',
    job_posted_at_datetime_utc: new Date().toISOString()
  },
  {
    employer_name: 'Digital Innovations',
    employer_logo: null,
    job_title: 'Frontend Developer',
    job_description: 'Join our dynamic team building modern web applications...',
    job_country: 'Canada',
    job_city: 'Vancouver',
    job_employment_type: 'Full-time',
    job_apply_link: 'https://example.com/apply',
    job_posted_at_datetime_utc: new Date().toISOString()
  },
  {
    employer_name: 'Data Systems Ltd',
    employer_logo: null,
    job_title: 'Data Analyst',
    job_description: 'Seeking a data analyst to help drive business insights...',
    job_country: 'Canada',
    job_city: 'Montreal',
    job_employment_type: 'Full-time',
    job_apply_link: 'https://example.com/apply',
    job_posted_at_datetime_utc: new Date().toISOString()
  }
];

export const searchJobs = async (params: JobSearchParams): Promise<JobsResponse> => {
  try {
    // Use mock data in development
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Filter mock data based on search params
      let filteredJobs = [...MOCK_JOBS];

      if (params.query) {
        const searchQuery = params.query.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.job_title.toLowerCase().includes(searchQuery) ||
          job.job_description.toLowerCase().includes(searchQuery) ||
          job.employer_name.toLowerCase().includes(searchQuery)
        );
      }

      if (params.city) {
        filteredJobs = filteredJobs.filter(job => 
          job.job_city.toLowerCase() === params.city?.toLowerCase()
        );
      }

      if (params.employment_type) {
        filteredJobs = filteredJobs.filter(job => 
          job.job_employment_type.toLowerCase() === params.employment_type?.toLowerCase()
        );
      }

      return {
        jobs: filteredJobs,
        total: filteredJobs.length,
        page: parseInt(params.page || '1'),
        hasMore: false
      };
    }

    // In production, use real API
    const response = await api.get('/search', {
      params: {
        query: params.query || 'jobs in Canada',
        page: params.page || '1',
        num_pages: '1',
        ...(params.employment_type && { employment_type: params.employment_type }),
        ...(params.city && { location: params.city })
      }
    });

    if (!response.data?.data) {
      throw new Error('Invalid API response');
    }

    const jobs = response.data.data;
    return {
      jobs,
      total: response.data.total || jobs.length,
      page: parseInt(params.page || '1'),
      hasMore: jobs.length === 10 // Assuming 10 is the page size
    };

  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Return mock data as fallback
    return {
      jobs: MOCK_JOBS,
      total: MOCK_JOBS.length,
      page: parseInt(params.page || '1'),
      hasMore: false
    };
  }
};