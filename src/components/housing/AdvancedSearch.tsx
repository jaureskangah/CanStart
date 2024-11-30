import React, { useState } from 'react';
import { Search, Sliders, X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

type AdvancedSearchProps = {
  onSearch: (filters: any) => void;
  className?: string;
};

export function AdvancedSearch({ onSearch, className = '' }: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: { min: '', max: '' },
    bedrooms: '',
    bathrooms: '',
    amenities: [] as string[],
    yearBuilt: { min: '', max: '' },
    squareFeet: { min: '', max: '' },
    petPolicy: '',
    parking: '',
    furnished: false
  });

  const amenitiesList = [
    'Air Conditioning',
    'Dishwasher',
    'In-unit Laundry',
    'Gym',
    'Pool',
    'Balcony',
    'Storage',
    'Security System'
  ];

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      propertyType: '',
      priceRange: { min: '', max: '' },
      bedrooms: '',
      bathrooms: '',
      amenities: [],
      yearBuilt: { min: '', max: '' },
      squareFeet: { min: '', max: '' },
      petPolicy: '',
      parking: '',
      furnished: false
    });
  };

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <Sliders className="h-5 w-5" />
        Advanced Search
      </button>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-900"
                  >
                    Advanced Search
                  </Dialog.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                      className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    >
                      <option value="">Any Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          priceRange: { ...prev.priceRange, min: e.target.value }
                        }))}
                        className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          priceRange: { ...prev.priceRange, max: e.target.value }
                        }))}
                        className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Bedrooms & Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                      className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <select
                      value={filters.bathrooms}
                      onChange={(e) => setFilters(prev => ({ ...prev, bathrooms: e.target.value }))}
                      className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                    </select>
                  </div>

                  {/* Square Feet */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Square Feet
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.squareFeet.min}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          squareFeet: { ...prev.squareFeet, min: e.target.value }
                        }))}
                        className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.squareFeet.max}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          squareFeet: { ...prev.squareFeet, max: e.target.value }
                        }))}
                        className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pet Policy
                    </label>
                    <select
                      value={filters.petPolicy}
                      onChange={(e) => setFilters(prev => ({ ...prev, petPolicy: e.target.value }))}
                      className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    >
                      <option value="">Any</option>
                      <option value="cats">Cats Allowed</option>
                      <option value="dogs">Dogs Allowed</option>
                      <option value="both">Both Allowed</option>
                      <option value="none">No Pets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parking
                    </label>
                    <select
                      value={filters.parking}
                      onChange={(e) => setFilters(prev => ({ ...prev, parking: e.target.value }))}
                      className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    >
                      <option value="">Any</option>
                      <option value="garage">Garage</option>
                      <option value="street">Street</option>
                      <option value="none">None</option>
                    </select>
                  </div>

                  {/* Amenities */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {amenitiesList.map((amenity) => (
                        <label
                          key={amenity}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          {amenity}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Reset Filters
                  </button>
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}