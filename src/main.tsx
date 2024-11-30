import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { logPerformanceMetrics } from './utils/performance';
import './index.css';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
      </div>}>
        <AuthProvider>
          <LanguageProvider>
            <App />
            <Toaster position="top-right" />
          </LanguageProvider>
        </AuthProvider>
      </Suspense>
    </React.StrictMode>
  );
}

// Log performance metrics in development
if (process.env.NODE_ENV === 'development') {
  logPerformanceMetrics();
}