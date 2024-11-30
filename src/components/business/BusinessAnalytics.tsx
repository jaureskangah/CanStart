import React from 'react';
import { 
  LineChart, 
  BarChart, 
  PieChart 
} from '../charts';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Building2,
  Download
} from 'lucide-react';
import { VirtualList } from '../PerformanceOptimizer';
import toast from 'react-hot-toast';

type AnalyticsPeriod = '7d' | '30d' | '90d' | '1y';
type MetricType = 'revenue' | 'customers' | 'transactions' | 'growth';

export function BusinessAnalytics() {
  const [period, setPeriod] = React.useState<AnalyticsPeriod>('30d');
  const [selectedMetric, setSelectedMetric] = React.useState<MetricType>('revenue');

  const metrics = {
    revenue: {
      current: 125000,
      previous: 100000,
      trend: '+25%',
      data: [
        { date: '2024-01', value: 100000 },
        { date: '2024-02', value: 110000 },
        { date: '2024-03', value: 125000 }
      ]
    },
    customers: {
      current: 250,
      previous: 200,
      trend: '+25%',
      data: [
        { date: '2024-01', value: 200 },
        { date: '2024-02', value: 225 },
        { date: '2024-03', value: 250 }
      ]
    },
    transactions: {
      current: 1500,
      previous: 1200,
      trend: '+25%',
      data: [
        { date: '2024-01', value: 1200 },
        { date: '2024-02', value: 1350 },
        { date: '2024-03', value: 1500 }
      ]
    },
    growth: {
      current: 25,
      previous: 20,
      trend: '+5%',
      data: [
        { date: '2024-01', value: 20 },
        { date: '2024-02', value: 22 },
        { date: '2024-03', value: 25 }
      ]
    }
  };

  const revenueByChannel = [
    { channel: 'Direct Sales', value: 45 },
    { channel: 'Online', value: 30 },
    { channel: 'Partners', value: 15 },
    { channel: 'Other', value: 10 }
  ];

  const customerSegments = [
    { segment: 'Enterprise', value: 40 },
    { segment: 'SMB', value: 35 },
    { segment: 'Consumer', value: 25 }
  ];

  const transactions = Array.from({ length: 100 }, (_, i) => ({
    id: `tr-${i}`,
    date: new Date(2024, 0, i + 1).toLocaleDateString(),
    amount: Math.floor(Math.random() * 10000),
    type: Math.random() > 0.5 ? 'sale' : 'refund'
  }));

  const downloadReport = () => {
    toast.success('Report downloaded successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Business Analytics</h2>
        <div className="flex gap-4">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as AnalyticsPeriod)}
            className="rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Download className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-6 w-6 text-red-600" />
            <h3 className="font-semibold text-gray-900">Revenue</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${metrics.revenue.current.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">{metrics.revenue.trend}</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-6 w-6 text-red-600" />
            <h3 className="font-semibold text-gray-900">Customers</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {metrics.customers.current.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">{metrics.customers.trend}</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-6 w-6 text-red-600" />
            <h3 className="font-semibold text-gray-900">Transactions</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {metrics.transactions.current.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">{metrics.transactions.trend}</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-6 w-6 text-red-600" />
            <h3 className="font-semibold text-gray-900">Growth</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {metrics.growth.current}%
          </div>
          <div className="text-sm text-green-600">{metrics.growth.trend}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <LineChart
            data={metrics[selectedMetric].data}
            xKey="date"
            yKey="value"
            height={300}
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue by Channel</h3>
          <PieChart
            data={revenueByChannel.map(item => ({
              label: item.channel,
              value: item.value
            }))}
            height={300}
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Customer Segments</h3>
          <BarChart
            data={customerSegments}
            xKey="segment"
            yKey="value"
            height={300}
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <VirtualList
            items={transactions}
            height={300}
            rowHeight={50}
            renderItem={(transaction) => (
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <div className="font-medium text-gray-900">${transaction.amount}</div>
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  transaction.type === 'sale'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.type}
                </span>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}