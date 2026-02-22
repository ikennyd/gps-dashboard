/**
 * Sales Chart Component
 * Display sales trends (placeholder for Chart.js/Recharts)
 */

import React from 'react';

function SalesChart() {
  // Sample data for chart
  const chartData = [
    { date: 'Mon', sales: 2000 },
    { date: 'Tue', sales: 1500 },
    { date: 'Wed', sales: 2500 },
    { date: 'Thu', sales: 3000 },
    { date: 'Fri', sales: 2200 },
    { date: 'Sat', sales: 2800 },
    { date: 'Sun', sales: 1800 }
  ];

  const maxSales = Math.max(...chartData.map(d => d.sales));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Trend</h3>

      {/* Simple Bar Chart (ASCII style) */}
      <div className="space-y-4">
        {chartData.map((item) => (
          <div key={item.date} className="flex items-center gap-4">
            <div className="w-12 text-sm font-medium text-gray-600">{item.date}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-full flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-300"
                style={{ width: `${(item.sales / maxSales) * 100}%` }}
              >
                ${item.sales}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          📊 Total Sales: $
          {chartData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
        </p>
      </div>

      {/* Note */}
      <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
        💡 Replace this with Chart.js or Recharts for advanced visualizations
      </div>
    </div>
  );
}

export default SalesChart;
