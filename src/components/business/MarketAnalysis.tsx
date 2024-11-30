import React, { useState } from 'react';
import { 
  LineChart, 
  BarChart, 
  PieChart 
} from '../charts';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Building2
} from 'lucide-react';

type Industry = 'retail' | 'technology' | 'food' | 'services';
type Region = 'ontario' | 'quebec' | 'bc' | 'alberta';

export function MarketAnalysis() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('retail');
  const [selectedRegion, setSelectedRegion] = useState<Region>('ontario');

  const industries = [
    { id: 'retail', name: 'Retail' },
    { id: 'technology', name: 'Technology' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'services', name: 'Professional Services' }
  ];

  const regions = [
    { id: 'ontario', name: 'Ontario' },
    { id: 'quebec', name: 'Quebec' },
    { id: 'bc', name: 'British Columbia' },
    { id: 'alberta', name: 'Alberta' }
  ];

  // Mock data - In production, this would come from an API
  const marketData = {
    growthTrend: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 120 },
      { date: '2023-03', value: 115 },
      { date: '2023-04', value: 140 },
      { date: '2023-05', value: 160 },
      { date: '2023-06', value: 180 }
    ],
    competitorShare: [
      { name: 'Large Enterprises', share: 45 },
      { name: 'Medium Business', share: 30 },
      { name: 'Small Business', share: 20 },
      { name: 'Startups', share: 5 }
    ],
    demographics: [
      { age: '18-24', value: 15 },
      { age: '25-34', value: 30 },
      { age: '35-44', value: 25 },
      { age: '45-54', value: 20 },
      { age: '55+', value: 10 }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Market Analysis</h2>
        <div className="flex gap-4">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value as Industry)}
            className="rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
          >
            {industries.map(industry => (
              <option key={industry.id} value={industry.id}>{industry.name}</option>
            ))}
          </select>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as Region)}
            className="rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <h3 className="font-medium text-gray-900">Growth Rate</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">+15.8%</div>
          <p className="text-sm text-gray-600">Year over year</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-red-600" />
            <h3 className="font-medium text-gray-900">Market Size</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">2.5M</div>
          <p className="text-sm text-gray-600">Potential customers</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-red-600" />
            <h3 className="font-medium text-gray-900">Average Revenue</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">$250K</div>
          <p className="text-sm text-gray-600">Per business</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-5 w-5 text-red-600" />
            <h3 className="font-medium text-gray-900">Competitors</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">156</div>
          <p className="text-sm text-gray-600">Active businesses</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Market Growth Trend</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <LineChart
              data={marketData.growthTrend}
              xKey="date"
              yKey="value"
              color="#dc2626"
              height={300}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Market Share Distribution</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <PieChart
              data={marketData.competitorShare.map(item => ({
                label: item.name,
                value: item.share
              }))}
              colors={['#dc2626', '#ef4444', '#f87171', '#fca5a5']}
              height={300}
            />
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Demographics</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <BarChart
              data={marketData.demographics}
              xKey="age"
              yKey="value"
              color="#dc2626"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}