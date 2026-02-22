/**
 * Recent Sales Component
 * Display list of recent transactions
 */

import React from 'react';

function RecentSales({ sales = [] }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (sales.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Sales</h3>
        <p className="text-gray-500 text-center py-8">No sales data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">Recent Sales</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Product</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.slice(0, 10).map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-600">{sale.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {sale.customerName || 'Customer ' + sale.customerId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {sale.productName || 'Product ' + sale.productId}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">
                  ${Number(sale.amount).toLocaleString('en-US')}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      sale.status
                    )}`}
                  >
                    {sale.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(sale.date || sale.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sales.length > 10 && (
        <div className="px-6 py-4 border-t border-gray-200 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View all sales →
          </button>
        </div>
      )}
    </div>
  );
}

export default RecentSales;
