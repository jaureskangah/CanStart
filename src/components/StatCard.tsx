import React from 'react';

type StatCardProps = {
  number: string;
  label: string;
};

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="transform hover:scale-105 transition-transform">
      <div className="text-4xl font-bold text-red-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

export default StatCard;