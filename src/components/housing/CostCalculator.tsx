import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, PlusCircle, MinusCircle, Save, Download } from 'lucide-react';
import toast from 'react-hot-toast';

type Expense = {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly' | 'one-time';
};

export function CostCalculator() {
  const [rent, setRent] = useState<number>(0);
  const [utilities, setUtilities] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Expense>({
    id: '',
    name: '',
    amount: 0,
    frequency: 'monthly'
  });

  const calculateMonthlyTotal = () => {
    const monthlyRent = rent;
    const monthlyUtilities = utilities;
    const monthlyInsurance = insurance;
    
    const monthlyExpenses = expenses.reduce((total, expense) => {
      switch (expense.frequency) {
        case 'yearly':
          return total + (expense.amount / 12);
        case 'one-time':
          return total + (expense.amount / 12);
        default:
          return total + expense.amount;
      }
    }, 0);

    return monthlyRent + monthlyUtilities + monthlyInsurance + monthlyExpenses;
  };

  const calculateYearlyTotal = () => {
    return calculateMonthlyTotal() * 12;
  };

  const addExpense = () => {
    if (!newExpense.name || newExpense.amount <= 0) {
      toast.error('Please enter a valid expense name and amount');
      return;
    }

    setExpenses([...expenses, { ...newExpense, id: Date.now().toString() }]);
    setNewExpense({
      id: '',
      name: '',
      amount: 0,
      frequency: 'monthly'
    });
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSave = () => {
    const data = {
      rent,
      utilities,
      insurance,
      expenses,
      monthlyTotal: calculateMonthlyTotal(),
      yearlyTotal: calculateYearlyTotal(),
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('housing-calculator', JSON.stringify(data));
    toast.success('Calculation saved successfully');
  };

  const handleExport = () => {
    const data = {
      rent,
      utilities,
      insurance,
      expenses,
      monthlyTotal: calculateMonthlyTotal(),
      yearlyTotal: calculateYearlyTotal(),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'housing-costs.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-4">Housing Cost Calculator</h1>
          <p className="text-red-100 max-w-2xl">
            Plan your budget by calculating your total housing costs, including rent, utilities, and additional expenses.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Main Costs */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(Number(e.target.value))}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Utilities
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={utilities}
                    onChange={(e) => setUtilities(Number(e.target.value))}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Insurance
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={insurance}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Additional Expenses */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Expenses</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  placeholder="Expense name"
                  className="rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={newExpense.amount || ''}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                    placeholder="0.00"
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={newExpense.frequency}
                    onChange={(e) => setNewExpense({ ...newExpense, frequency: e.target.value as 'monthly' | 'yearly' | 'one-time' })}
                    className="flex-1 rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="one-time">One-time</option>
                  </select>
                  <button
                    onClick={addExpense}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {expenses.length > 0 && (
                <div className="space-y-2">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{expense.name}</span>
                        <span className="text-gray-500 ml-2">
                          (${expense.amount} - {expense.frequency})
                        </span>
                      </div>
                      <button
                        onClick={() => removeExpense(expense.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="border-t pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Monthly Total</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${calculateMonthlyTotal().toFixed(2)}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Yearly Total</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${calculateYearlyTotal().toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <Save className="h-5 w-5" />
                Save
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <Download className="h-5 w-5" />
                Export
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-red-50 rounded-xl shadow-sm p-6 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Housing Cost Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <span>💡</span>
                <p className="text-sm text-gray-600">
                  Aim to spend no more than 30% of your monthly income on rent
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span>💡</span>
                <p className="text-sm text-gray-600">
                  Budget extra for seasonal utility fluctuations
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span>💡</span>
                <p className="text-sm text-gray-600">
                  Consider getting rental insurance for protection
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span>💡</span>
                <p className="text-sm text-gray-600">
                  Save for unexpected maintenance and repairs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}