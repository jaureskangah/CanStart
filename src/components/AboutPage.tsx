import React from 'react';
import { Building2, Users, Globe, Award, Heart, Rocket } from 'lucide-react';

export function AboutPage() {
  const stats = [
    { number: '5+', label: 'Years of Service' },
    { number: '10K+', label: 'Newcomers Helped' },
    { number: '500+', label: 'Partner Companies' },
    { number: '20+', label: 'Cities Covered' }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6 text-red-600" />,
      title: 'Empathy',
      description: 'We understand the challenges of starting a new life in Canada.'
    },
    {
      icon: <Award className="h-6 w-6 text-red-600" />,
      title: 'Excellence',
      description: 'We strive to provide the best possible support and resources.'
    },
    {
      icon: <Globe className="h-6 w-6 text-red-600" />,
      title: 'Diversity',
      description: 'We celebrate and embrace different cultures and backgrounds.'
    },
    {
      icon: <Rocket className="h-6 w-6 text-red-600" />,
      title: 'Innovation',
      description: 'We continuously improve our services to better serve you.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
      bio: 'Former immigrant turned entrepreneur, passionate about helping others succeed in Canada.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
      bio: 'Expert in immigration processes with 10+ years of experience.'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Community',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
      bio: 'Dedicated to building strong immigrant communities across Canada.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">About CanStart</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Empowering newcomers to build successful lives in Canada through comprehensive support and resources.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 -mt-24">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              At CanStart, we're dedicated to making the transition to Canadian life smoother for newcomers. 
              We believe that everyone deserves the opportunity to thrive in their new home, and we're here 
              to provide the tools, resources, and support needed to make that happen.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-red-600 mb-2">{member.role}</div>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}