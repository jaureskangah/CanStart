import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

type Metric = {
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  type: 'currency' | 'percentage' | 'number';
};

type BusinessMetricsProps = {
  metrics: Metric[];
  className?: string;
};

export function BusinessMetrics({ metrics, className = '' }: BusinessMetricsProps) {
  const formatValue = (value: number, type: Metric['type']) => {
    switch (type) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  return (
    <div className={`grid grid-cols-3 gap-6 ${className}`}>
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{metric.label}</h3>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatValue(metric.value, metric.type)}
          </div>
          
          {metric.previousValue > 0 && (
            <div className="flex items-center gap-1">
              {metric.value >= metric.previousValue ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">
                    +{calculateChange(metric.value, metric.previousValue)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">
                    {calculateChange(metric.value, metric.previousValue)}%
                  </span>
                </>
              )}
              <span className="text-sm text-gray-500">vs previous {metric.unit}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}