import React from 'react';
import { Book, GraduationCap, Globe, Award, Users, Video } from 'lucide-react';

export function TrainingPage() {
  const courses = [
    {
      title: "Canadian Workplace Culture",
      description: "Learn about workplace norms, communication styles, and professional expectations in Canada.",
      duration: "4 weeks",
      level: "Beginner",
      icon: <Users className="h-6 w-6 text-red-600" />,
      topics: [
        "Professional Communication",
        "Workplace Etiquette",
        "Team Collaboration",
        "Work-Life Balance"
      ]
    },
    {
      title: "English for Professionals",
      description: "Enhance your business English skills for the Canadian workplace.",
      duration: "8 weeks",
      level: "Intermediate",
      icon: <Globe className="h-6 w-6 text-red-600" />,
      topics: [
        "Business Writing",
        "Presentation Skills",
        "Email Communication",
        "Meeting Participation"
      ]
    },
    {
      title: "Canadian Business Certifications",
      description: "Prepare for essential Canadian business certifications and qualifications.",
      duration: "12 weeks",
      level: "Advanced",
      icon: <Award className="h-6 w-6 text-red-600" />,
      topics: [
        "Industry Standards",
        "Certification Requirements",
        "Exam Preparation",
        "Continuing Education"
      ]
    },
    {
      title: "Digital Skills for Canada",
      description: "Master essential digital tools used in Canadian workplaces.",
      duration: "6 weeks",
      level: "Intermediate",
      icon: <Book className="h-6 w-6 text-red-600" />,
      topics: [
        "Microsoft Office Suite",
        "Digital Communication Tools",
        "Project Management Software",
        "Cloud Computing"
      ]
    }
  ];

  const upcomingWebinars = [
    {
      title: "Navigating the Canadian Job Market",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      speaker: "Sarah Thompson",
      role: "Career Coach"
    },
    {
      title: "Professional Networking in Canada",
      date: "March 22, 2024",
      time: "1:00 PM EST",
      speaker: "Michael Chen",
      role: "Business Consultant"
    },
    {
      title: "Understanding Canadian Workplace Rights",
      date: "March 29, 2024",
      time: "3:00 PM EST",
      speaker: "Lisa Patel",
      role: "HR Specialist"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Professional Training & Development
            </h1>
            <p className="text-xl text-red-100">
              Enhance your skills and qualifications for the Canadian job market with our specialized courses and workshops.
            </p>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Courses</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  {course.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="space-y-2">
                {course.topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Webinars</h2>
            <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
              <Video className="h-5 w-5" />
              View All Webinars
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingWebinars.map((webinar, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4" />
                    <span>{webinar.speaker}</span>
                  </div>
                  <div className="text-sm text-gray-500">{webinar.role}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <div>{webinar.date}</div>
                    <div>{webinar.time}</div>
                  </div>
                  <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-red-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Personalized Training?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our career advisors can help create a customized learning path based on your experience, goals, and industry.
          </p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}