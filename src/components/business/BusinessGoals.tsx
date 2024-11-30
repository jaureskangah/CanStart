import React from 'react';
import { Target, Check, Clock } from 'lucide-react';

type Goal = {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  dueDate: string;
  status: 'on-track' | 'at-risk' | 'behind';
};

type BusinessGoalsProps = {
  goals: Goal[];
  className?: string;
};

export function BusinessGoals({ goals, className = '' }: BusinessGoalsProps) {
  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600 bg-green-50';
      case 'at-risk':
        return 'text-yellow-600 bg-yellow-50';
      case 'behind':
        return 'text-red-600 bg-red-50';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Business Goals</h2>
        <button className="text-red-600 hover:text-red-700 font-medium">
          Add Goal
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{goal.title}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Target className="h-4 w-4" />
                    <span>{goal.target} {goal.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Due {new Date(goal.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(goal.status)}`}>
                {goal.status}
              </span>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    {calculateProgress(goal.current, goal.target)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                <div
                  style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}