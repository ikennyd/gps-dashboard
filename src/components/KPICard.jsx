/**
 * KPI Card Component
 * Display key metrics
 */

import React from 'react';

function KPICard({ title, value, format = 'number', trend, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200'
  };

  const textColorMap = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600'
  };

  const formatValue = () => {
    if (format === 'currency') {
      return `$${Number(value).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`;
    }
    return Number(value).toLocaleString('en-US');
  };

  const isTrendPositive = trend?.startsWith('+');

  return (
    <div className={`${colorMap[color]} border rounded-lg p-6 shadow-sm hover:shadow-md transition`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold ${textColorMap[color]} mt-2`}>
            {formatValue()}
          </p>
        </div>
        <div className={`text-3xl ${isTrendPositive ? '📈' : '📉'}`}></div>
      </div>

      {/* Trend */}
      {trend && (
        <div className="mt-4">
          <span
            className={`text-sm font-medium ${
              isTrendPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend} from last month
          </span>
        </div>
      )}
    </div>
  );
}

export default KPICard;
