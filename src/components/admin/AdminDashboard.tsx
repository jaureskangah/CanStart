import React, { useState } from 'react';
import { Users, Calendar, BarChart2, Settings, Bell } from 'lucide-react';
import { AdminStats } from './AdminStats';
import { AppointmentManager } from './AppointmentManager';
import { AnalyticsPanel } from './AnalyticsPanel';
import { UserManager } from './UserManager';
import { NotificationCenter } from './NotificationCenter';

type AdminSection = 'stats' | 'appointments' | 'analytics' | 'users' | 'notifications';

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>('stats');

  const sections = [
    { id: 'stats', name: 'Dashboard', icon: <BarChart2 className="h-5 w-5" /> },
    { id: 'appointments', name: 'Appointments', icon: <Calendar className="h-5 w-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart2 className="h-5 w-5" /> },
    { id: 'users', name: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="h-5 w-5" /> }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'stats':
        return <AdminStats />;
      case 'appointments':
        return <AppointmentManager />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'users':
        return <UserManager />;
      case 'notifications':
        return <NotificationCenter />;
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as AdminSection)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-red-600 text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {section.icon}
                    <span>{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}