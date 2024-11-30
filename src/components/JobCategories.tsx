import React from 'react';
import { 
  Code, 
  Building2, 
  Briefcase, 
  Stethoscope,
  GraduationCap,
  Wrench,
  ChefHat,
  Truck,
  PenTool,
  HeartPulse
} from 'lucide-react';

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
};

const categories: Category[] = [
  { id: 'tech', name: 'Technology', icon: <Code />, count: 1250 },
  { id: 'business', name: 'Business', icon: <Building2 />, count: 980 },
  { id: 'admin', name: 'Administrative', icon: <Briefcase />, count: 750 },
  { id: 'healthcare', name: 'Healthcare', icon: <Stethoscope />, count: 620 },
  { id: 'education', name: 'Education', icon: <GraduationCap />, count: 540 },
  { id: 'trades', name: 'Skilled Trades', icon: <Wrench />, count: 480 },
  { id: 'hospitality', name: 'Hospitality', icon: <ChefHat />, count: 420 },
  { id: 'logistics', name: 'Logistics', icon: <Truck />, count: 380 },
  { id: 'creative', name: 'Creative', icon: <PenTool />, count: 320 },
  { id: 'healthcare-support', name: 'Healthcare Support', icon: <HeartPulse />, count: 290 }
];

type JobCategoriesProps = {
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
  className?: string;
};

export function JobCategories({ selectedCategory, onSelectCategory, className = '' }: JobCategoriesProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-4">Popular Categories</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-red-50 text-red-600'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              selectedCategory === category.id
                ? 'bg-red-100'
                : 'bg-gray-100'
            }`}>
              {React.cloneElement(category.icon as React.ReactElement, {
                className: 'h-5 w-5'
              })}
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count} jobs</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}