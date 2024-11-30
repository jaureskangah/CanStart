import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { PropertyCard } from './PropertyCard';
import { HousingTips } from './HousingTips';
import { AdvancedSearch } from './housing/AdvancedSearch';
import { searchProperties, type PropertyResponse, type HousingSearchParams } from '../services/housingApi';
import { saveProperty, updateSearchHistory } from '../services/userService';
import { SavedPropertiesDrawer } from './SavedPropertiesDrawer';
import { PropertyAlerts } from './PropertyAlerts';
import { NeighborhoodGuide } from './NeighborhoodGuide';
import toast from 'react-hot-toast';

export function HousingPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSavedProperties, setShowSavedProperties] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<HousingSearchParams>({
    location: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    propertyType: ''
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const propertiesData = await searchProperties({
        location: searchQuery || filters.location,
        ...filters
      });
      setProperties(propertiesData);

      if (user?.uid && searchQuery) {
        await updateSearchHistory(user.uid, searchQuery, 'property');
      }
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  const handleAdvancedSearch = (advancedFilters: any) => {
    setFilters({
      ...filters,
      propertyType: advancedFilters.propertyType,
      minPrice: advancedFilters.priceRange.min,
      maxPrice: advancedFilters.priceRange.max,
      beds: advancedFilters.bedrooms,
      baths: advancedFilters.bathrooms
    });
    fetchProperties();
  };

  const handleSaveProperty = async (property: PropertyResponse) => {
    if (!user) {
      toast.error('Please sign in to save properties');
      return;
    }

    try {
      await saveProperty(user.uid, property);
      toast.success('Property saved successfully!');
    } catch (error) {
      toast.error('Failed to save property');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-12">
        <div className="container px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {t('housing.title')}
              </h1>
              <p className="text-red-100 text-lg">
                {t('housing.subtitle')}
              </p>
            </div>
            {user && (
              <button
                onClick={() => setShowSavedProperties(true)}
                className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
              >
                <span>🏠</span>
                Saved Properties
              </button>
            )}
          </div>
          
          <div className="flex gap-4 max-w-4xl">
            <div className="flex-1 bg-white rounded-lg shadow-lg flex items-center p-2">
              <span className="text-gray-400 mx-2">📍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('housing.searchPlaceholder')}
                className="flex-1 border-none focus:ring-0 text-gray-800"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              {t('housing.search')}
            </button>
            <AdvancedSearch 
              onSearch={handleAdvancedSearch}
              className="ml-2"
            />
          </div>
        </div>
      </div>

      <div className="container px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            {user && <PropertyAlerts className="mb-6" />}
            <NeighborhoodGuide />
            <HousingTips className="mt-6" />
          </div>

          <div className="lg:col-span-9">
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">{t('housing.loading')}</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">{t('housing.noResults')}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {properties.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property}
                      onSave={() => handleSaveProperty(property)}
                      showSaveButton={!!user}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <SavedPropertiesDrawer
        isOpen={showSavedProperties}
        onClose={() => setShowSavedProperties(false)}
      />
    </div>
  );
}