import React from 'react';
import { BarChart, LineChart, PieChart } from '../charts';
import { Download } from 'lucide-react';

export function AnalyticsPanel() {
  const pageViews = [
    { date: '2024-01', value: 5000 },
    { date: '2024-02', value: 7500 },
    { date: '2024-03', value: 10000 },
    { date: '2024-04', value: 12500 },
    { date: '2024-05', value: 15000 },
    { date: '2024-06', value: 17500 }
  ];

  const userSources = [
    { label: 'Direct', value: 40 },
    { label: 'Search', value: 30 },
    { label: 'Social', value: 20 },
    { label: 'Referral', value: 10 }
  ];

  const engagementData = [
    { category: 'Jobs', value: 45 },
    { category: 'Housing', value: 30 },
    { category: 'Support', value: 15 },
    { category: 'Business', value: 10 }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <select className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <select className="rounded-lg border-gray-300 text-sm focus:ring-red-500 focus:border-red-500">
              <option value="all">All Pages</option>
              <option value="jobs">Jobs</option>
              <option value="housing">Housing</option>
              <option value="support">Support</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900">
            <Download className="h-5 w-5" />
            Export Data
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Page Views</h3>
          <LineChart
            data={pageViews}
            xKey="date"
            yKey="value"
            height={300}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
          <PieChart
            data={userSources}
            height={300}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Content Engagement</h3>
          <BarChart
            data={engagementData}
            xKey="category"
            yKey="value"
            height={300}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg. Session Duration</div>
              <div className="text-2xl font-bold text-gray-900">3m 45s</div>
              <div className="text-sm text-green-600">+12% vs last period</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Bounce Rate</div>
              <div className="text-2xl font-bold text-gray-900">42.3%</div>
              <div className="text-sm text-red-600">+5% vs last period</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
              <div className="text-2xl font-bold text-gray-900">3.8%</div>
              <div className="text-sm text-green-600">+2% vs last period</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">New Users</div>
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-sm text-green-600">+18% vs last period</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}