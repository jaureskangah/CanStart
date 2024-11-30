import React from 'react';
import { Briefcase, Users, Heart, Star, Coffee, MapPin } from 'lucide-react';

export function CareersPage() {
  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-red-600" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health coverage and wellness programs'
    },
    {
      icon: <Star className="h-6 w-6 text-red-600" />,
      title: 'Growth',
      description: 'Professional development and learning opportunities'
    },
    {
      icon: <Coffee className="h-6 w-6 text-red-600" />,
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote work options'
    },
    {
      icon: <Users className="h-6 w-6 text-red-600" />,
      title: 'Team Culture',
      description: 'Inclusive and collaborative work environment'
    }
  ];

  const openings = [
    {
      title: 'Immigration Specialist',
      department: 'Support',
      location: 'Toronto, ON',
      type: 'Full-time',
      description: 'Help newcomers navigate the immigration process with expertise and empathy.'
    },
    {
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote, Canada',
      type: 'Full-time',
      description: 'Build and maintain features that help thousands of newcomers succeed in Canada.'
    },
    {
      title: 'Community Manager',
      department: 'Community',
      location: 'Vancouver, BC',
      type: 'Full-time',
      description: 'Foster and grow our vibrant community of newcomers and partners.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Join Our Mission</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Help us empower newcomers to Canada while building a meaningful career with impact.
          </p>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Join CanStart?</h2>
          <p className="text-xl text-gray-600">
            Join a team passionate about making a difference in the lives of newcomers to Canada. 
            We offer meaningful work, great benefits, and opportunities for growth.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Open Positions</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {openings.map((job, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-red-600">{job.department}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                    {job.type}
                  </span>
                  <button className="text-red-600 hover:text-red-700 font-medium">
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Hiring Process</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              { step: 1, title: 'Application Review', description: 'We review your application and resume' },
              { step: 2, title: 'Initial Interview', description: 'Get to know you and your experience' },
              { step: 3, title: 'Technical/Skills Assessment', description: 'Demonstrate your expertise' },
              { step: 4, title: 'Team Interview', description: 'Meet your potential teammates' },
              { step: 5, title: 'Offer', description: 'Welcome to the team!' }
            ].map((phase, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  {phase.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{phase.title}</h3>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}