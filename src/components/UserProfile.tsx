import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { updateUserPreferences } from '../services/userService';
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Languages,
  Bell,
  Settings,
  FileText,
  Building2
} from 'lucide-react';
import toast from 'react-hot-toast';

type PreferenceSection = 'notifications' | 'job' | 'housing' | 'business';

export function UserProfile() {
  const { user, userData } = useAuth();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<PreferenceSection>('notifications');
  const [preferences, setPreferences] = useState({
    jobAlerts: false,
    propertyAlerts: false,
    businessAlerts: false,
    emailNotifications: true,
    pushNotifications: true,
    preferredJobTypes: [] as string[],
    preferredLocations: [] as string[],
    preferredIndustries: [] as string[],
    language: 'en'
  });

  useEffect(() => {
    if (userData?.preferences) {
      setPreferences(prev => ({
        ...prev,
        ...userData.preferences
      }));
    }
  }, [userData]);

  const handlePreferenceChange = async (key: string, value: any) => {
    if (!user) return;

    try {
      const updatedPreferences = {
        ...preferences,
        [key]: value
      };
      
      setPreferences(updatedPreferences);
      await updateUserPreferences(user.uid, updatedPreferences);
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  const jobTypes = [
    'Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'
  ];

  const locations = [
    'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail'
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="bg-white p-4 rounded-full">
            <User className="h-12 w-12 text-red-600" />
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold">{user.displayName || user.email}</h1>
            <p className="text-red-100">Member since {new Date(user.metadata.creationTime || '').toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="col-span-3 space-y-2">
          <button
            onClick={() => setActiveSection('notifications')}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${
              activeSection === 'notifications'
                ? 'bg-red-600 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveSection('job')}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${
              activeSection === 'job'
                ? 'bg-red-600 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Briefcase className="h-5 w-5" />
            <span>Job Preferences</span>
          </button>

          <button
            onClick={() => setActiveSection('housing')}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${
              activeSection === 'housing'
                ? 'bg-red-600 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span>Housing Preferences</span>
          </button>

          <button
            onClick={() => setActiveSection('business')}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${
              activeSection === 'business'
                ? 'bg-red-600 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span>Business Preferences</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {activeSection === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Job Alerts</h3>
                      <p className="text-sm text-gray-600">Get notified about new job opportunities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.jobAlerts}
                        onChange={(e) => handlePreferenceChange('jobAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Property Alerts</h3>
                      <p className="text-sm text-gray-600">Get notified about new properties</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.propertyAlerts}
                        onChange={(e) => handlePreferenceChange('propertyAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Business Alerts</h3>
                      <p className="text-sm text-gray-600">Get notified about business opportunities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.businessAlerts}
                        onChange={(e) => handlePreferenceChange('businessAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'job' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Job Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Job Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {jobTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => {
                            const current = preferences.preferredJobTypes;
                            const updated = current.includes(type)
                              ? current.filter(t => t !== type)
                              : [...current, type];
                            handlePreferenceChange('preferredJobTypes', updated);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            preferences.preferredJobTypes.includes(type)
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Preferred Locations</h3>
                    <div className="flex flex-wrap gap-2">
                      {locations.map(location => (
                        <button
                          key={location}
                          onClick={() => {
                            const current = preferences.preferredLocations;
                            const updated = current.includes(location)
                              ? current.filter(l => l !== location)
                              : [...current, location];
                            handlePreferenceChange('preferredLocations', updated);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            preferences.preferredLocations.includes(location)
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'business' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Business Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Industries of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {industries.map(industry => (
                        <button
                          key={industry}
                          onClick={() => {
                            const current = preferences.preferredIndustries;
                            const updated = current.includes(industry)
                              ? current.filter(i => i !== industry)
                              : [...current, industry];
                            handlePreferenceChange('preferredIndustries', updated);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            preferences.preferredIndustries.includes(industry)
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}