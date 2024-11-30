import React from 'react';
import { Users, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { LineChart } from '../charts/LineChart';

export function AdminStats() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: <Users className="h-6 w-6 text-blue-600" />
    },
    {
      title: 'Appointments',
      value: '156',
      change: '+8%',
      icon: <Calendar className="h-6 w-6 text-green-600" />
    },
    {
      title: 'Page Views',
      value: '45.2K',
      change: '+24%',
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />
    },
    {
      title: 'Revenue',
      value: '$12.4K',
      change: '+18%',
      icon: <DollarSign className="h-6 w-6 text-red-600" />
    }
  ];

  const visitorData = [
    { date: '2024-01', value: 1200 },
    { date: '2024-02', value: 1800 },
    { date: '2024-03', value: 2400 },
    { date: '2024-04', value: 3200 },
    { date: '2024-05', value: 4000 },
    { date: '2024-06', value: 4800 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Visitor Trends</h3>
          <LineChart
            data={visitorData}
            xKey="date"
            yKey="value"
            height={300}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registration', time: '5 minutes ago' },
              { action: 'Appointment scheduled', time: '15 minutes ago' },
              { action: 'Support ticket created', time: '1 hour ago' },
              { action: 'Payment received', time: '2 hours ago' }
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{activity.action}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}