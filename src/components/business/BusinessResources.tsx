import React from 'react';
import { 
  FileText, 
  Book, 
  Users, 
  DollarSign,
  Building2,
  GraduationCap
} from 'lucide-react';

type Resource = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  category: string;
};

export function BusinessResources() {
  const resources: Resource[] = [
    {
      id: 'registration',
      title: 'Business Registration Guide',
      description: 'Step-by-step guide to registering your business in Canada',
      icon: <FileText className="h-6 w-6" />,
      url: '#',
      category: 'Legal'
    },
    {
      id: 'funding',
      title: 'Funding Programs',
      description: 'Government grants and funding opportunities for new businesses',
      icon: <DollarSign className="h-6 w-6" />,
      url: '#',
      category: 'Financial'
    },
    {
      id: 'mentorship',
      title: 'Mentorship Network',
      description: 'Connect with experienced business mentors',
      icon: <Users className="h-6 w-6" />,
      url: '#',
      category: 'Support'
    },
    {
      id: 'regulations',
      title: 'Industry Regulations',
      description: 'Compliance requirements for different business types',
      icon: <Book className="h-6 w-6" />,
      url: '#',
      category: 'Legal'
    },
    {
      id: 'training',
      title: 'Business Training',
      description: 'Free courses and workshops for entrepreneurs',
      icon: <GraduationCap className="h-6 w-6" />,
      url: '#',
      category: 'Education'
    },
    {
      id: 'networking',
      title: 'Business Networks',
      description: 'Local business associations and networking events',
      icon: <Building2 className="h-6 w-6" />,
      url: '#',
      category: 'Support'
    }
  ];

  const categories = Array.from(new Set(resources.map(r => r.category)));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Resources</h2>

      {categories.map(category => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{category}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {resources
              .filter(resource => resource.category === category)
              .map(resource => (
                <a
                  key={resource.id}
                  href={resource.url}
                  className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      ))}

      {/* Support Section */}
      <div className="mt-12 bg-red-50 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Users className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Need Additional Support?</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Our team of business advisors is here to help you navigate the Canadian business landscape.
          Get personalized guidance for your specific needs.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">One-on-One Consultation</h4>
            <p className="text-sm text-gray-600">Schedule a personal consultation with our business experts</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Document Review</h4>
            <p className="text-sm text-gray-600">Get your business documents reviewed by professionals</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Startup Checklist</h4>
            <p className="text-sm text-gray-600">Download our comprehensive startup checklist</p>
          </div>
        </div>
      </div>
    </div>
  );
}