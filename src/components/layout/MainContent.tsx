import React, { lazy, Suspense } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { JobsPage } from '../JobsPage';
import { HousingPage } from '../HousingPage';
import { AdminGuide } from '../AdminGuide';
import { BusinessGuide } from '../business/BusinessGuide';
import { ContactPage } from '../ContactPage';
import { AboutPage } from '../AboutPage';
import { CareersPage } from '../CareersPage';
import { PostJobForm } from '../PostJobForm';
import { PostPropertyForm } from '../PostPropertyForm';
import { TrainingPage } from '../training/TrainingPage';

const HomePage2 = lazy(() => import('../HomePage2'));

type Page = 'home' | 'jobs' | 'housing' | 'support' | 'business' | 'contact' | 'about' | 'careers' | 'post-job' | 'post-property' | 'training';

type MainContentProps = {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onShowAuthModal: () => void;
};

export function MainContent({ currentPage, setCurrentPage, onShowAuthModal }: MainContentProps) {
  const { user } = useAuth();

  const renderContent = () => {
    switch (currentPage) {
      case 'jobs':
        return (
          <div>
            {user && (
              <div className="container mx-auto px-6 py-4">
                <button
                  onClick={() => setCurrentPage('post-job')}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Post a Job
                </button>
              </div>
            )}
            <JobsPage />
          </div>
        );
      case 'housing':
        return (
          <div>
            {user && (
              <div className="container mx-auto px-6 py-4">
                <button
                  onClick={() => setCurrentPage('post-property')}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Post a Property
                </button>
              </div>
            )}
            <HousingPage />
          </div>
        );
      case 'training':
        return <TrainingPage />;
      case 'support':
        return <AdminGuide />;
      case 'business':
        return <BusinessGuide />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'careers':
        return <CareersPage />;
      case 'post-job':
        return <PostJobForm />;
      case 'post-property':
        return <PostPropertyForm />;
      default:
        return (
          <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
            </div>
          }>
            <HomePage2 onShowAuthModal={onShowAuthModal} setCurrentPage={setCurrentPage} />
          </Suspense>
        );
    }
  };

  return (
    <main className="min-h-screen">
      {renderContent()}
    </main>
  );
}