import React, { useState } from 'react';
import { Calculator, DollarSign, PieChart, Download } from 'lucide-react';

type TaxCategory = {
  name: string;
  rate: number;
  description: string;
};

export function TaxCalculator() {
  const [revenue, setRevenue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [businessType, setBusinessType] = useState('sole_proprietorship');
  const [province, setProvince] = useState('ON');

  const businessTypes = [
    { id: 'sole_proprietorship', name: 'Sole Proprietorship' },
    { id: 'corporation', name: 'Corporation' },
    { id: 'partnership', name: 'Partnership' }
  ];

  const provinces = [
    { id: 'ON', name: 'Ontario' },
    { id: 'BC', name: 'British Columbia' },
    { id: 'QC', name: 'Quebec' },
    { id: 'AB', name: 'Alberta' }
  ];

  const taxCategories: TaxCategory[] = [
    {
      name: 'Federal Income Tax',
      rate: 15,
      description: 'Basic rate for small businesses'
    },
    {
      name: 'Provincial Tax',
      rate: 3.2,
      description: 'Varies by province'
    },
    {
      name: 'CPP Contributions',
      rate: 5.7,
      description: 'Canada Pension Plan'
    },
    {
      name: 'EI Premiums',
      rate: 2.21,
      description: 'Employment Insurance'
    }
  ];

  const calculateTaxes = () => {
    const revenueNum = parseFloat(revenue) || 0;
    const expensesNum = parseFloat(expenses) || 0;
    const income = revenueNum - expensesNum;
    
    return taxCategories.map(category => ({
      ...category,
      amount: (income * category.rate) / 100
    }));
  };

  const totalTaxes = calculateTaxes().reduce((sum, tax) => sum + tax.amount, 0);
  const netIncome = (parseFloat(revenue) || 0) - (parseFloat(expenses) || 0) - totalTaxes;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Business Tax Calculator</h2>
        <button
          onClick={() => {}} // TODO: Implement report download
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Download className="h-5 w-5" />
          Download Report
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
            >
              {businessTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Province
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
            >
              {provinces.map(prov => (
                <option key={prov.id} value={prov.id}>{prov.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Revenue
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Expenses
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Breakdown</h3>
          
          <div className="space-y-4">
            {calculateTaxes().map((tax) => (
              <div key={tax.name} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{tax.name}</span>
                  <span className="text-red-600 font-medium">
                    ${tax.amount.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{tax.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Total Taxes</span>
                <div className="text-xl font-bold text-red-600">
                  ${totalTaxes.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Net Income</span>
                <div className="text-xl font-bold text-gray-900">
                  ${netIncome.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}