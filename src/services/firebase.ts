import { initializeApp, getApps, getApp } from '@firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  browserLocalPersistence,
  setPersistence,
  signInWithRedirect,
  getRedirectResult
} from '@firebase/auth';
import { 
  getFirestore, 
  enableMultiTabIndexedDbPersistence,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED
} from '@firebase/firestore';
import { getAnalytics, isSupported } from '@firebase/analytics';
import toast from 'react-hot-toast';

// Ensure all environment variables are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID'
] as const;

// Validate environment variables
for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if we're in a development/preview environment
const isDevelopment = 
  window.location.hostname === 'localhost' || 
  window.location.hostname.includes('webcontainer.io') ||
  window.location.hostname.includes('stackblitz.io');

// Initialize Firebase with error handling
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error('Error initializing Firebase:', error);
  toast.error('Failed to initialize application. Please refresh the page.');
  throw error;
}

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence for Firestore
const initializeFirestorePersistence = async () => {
  if (!isDevelopment) {
    try {
      if (typeof window !== 'undefined') {
        try {
          await enableMultiTabIndexedDbPersistence(db, {
            cacheSizeBytes: CACHE_SIZE_UNLIMITED
          });
        } catch (err: any) {
          if (err.code === 'failed-precondition') {
            await enableIndexedDbPersistence(db, {
              cacheSizeBytes: CACHE_SIZE_UNLIMITED
            });
          } else if (err.code === 'unimplemented') {
            console.warn('Firestore persistence not supported');
          }
        }
      }
    } catch (error) {
      console.warn('Failed to enable Firestore persistence:', error);
    }
  }
};

// Initialize persistence
initializeFirestorePersistence();

// Set persistence to LOCAL for Auth
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting auth persistence:', error);
  toast.error('Error setting up authentication. Some features may be limited.');
});

// Initialize analytics only if supported and not in development
export const analytics = !isDevelopment ? 
  await isSupported().then(yes => yes ? getAnalytics(app) : null) : 
  null;

// Configure Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Custom parameters for different environments
if (isDevelopment) {
  googleProvider.setCustomParameters({
    prompt: 'select_account',
    login_hint: 'test@example.com'
  });
} else {
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
}

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  SAVED_JOBS: 'savedJobs',
  SAVED_PROPERTIES: 'savedProperties',
  SEARCH_HISTORY: 'searchHistory',
  USER_PREFERENCES: 'userPreferences',
  RESUMES: 'resumes',
  COVER_LETTERS: 'coverLetters',
  NOTIFICATIONS: 'notifications'
} as const;

// Error handling utilities
export const handleFirebaseError = (error: any) => {
  console.error('Firebase operation failed:', error);
  
  switch (error.code) {
    case 'auth/unauthorized-domain':
      if (isDevelopment) {
        toast.error('Please use email/password sign-in in development mode.');
      } else {
        toast.error('Authentication is not configured for this domain.');
      }
      return;
    
    case 'auth/popup-blocked':
      toast.error('Pop-up was blocked. Trying redirect sign-in...');
      // Automatically switch to redirect method
      if (error.customData?.provider) {
        signInWithRedirect(auth, error.customData.provider).catch(redirectError => {
          console.error('Redirect sign-in failed:', redirectError);
          toast.error('Failed to start redirect sign-in. Please try again.');
        });
      }
      return;
    
    case 'auth/invalid-credential':
      toast.error('Invalid credentials. Please check your email and password.');
      return;

    case 'auth/user-disabled':
      toast.error('This account has been disabled. Please contact support.');
      return;

    case 'auth/account-exists-with-different-credential':
      toast.error('An account already exists with the same email but different sign-in method.');
      return;

    case 'auth/cancelled-popup-request':
    case 'auth/popup-closed-by-user':
      // Silent handling for user-initiated cancellations
      return;
    
    case 'unavailable':
      toast.error('You appear to be offline. Some features may be limited.');
      return;
    
    case 'permission-denied':
      toast.error('You don\'t have permission to perform this action.');
      return;
    
    case 'unauthenticated':
      toast.error('Please sign in to continue.');
      return;
    
    default:
      toast.error('An error occurred. Please try again later.');
  }
};

// Handle redirect result
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      toast.success('Signed in successfully!');
      return result;
    }
  } catch (error) {
    handleFirebaseError(error);
  }
  return null;
};