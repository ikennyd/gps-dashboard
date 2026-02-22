/**
 * Dashboard Page
 * Main sales analytics view
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import KPICard from '../components/KPICard';
import SalesChart from '../components/SalesChart';
import RecentSales from '../components/RecentSales';

function DashboardPage({ user, onLogout }) {
  const [metrics, setMetrics] = useState(null);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch metrics
      const metricsRes = await axios.get(`${API_URL}/api/sales/metrics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMetrics(metricsRes.data.data);

      // Fetch sales
      const salesRes = await axios.get(`${API_URL}/api/sales`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSales(salesRes.data.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-bold text-gray-700">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} user={user} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'User'}!</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Total Sales"
              value={metrics?.totalSales || 0}
              format="currency"
              trend="+12.5%"
              color="blue"
            />
            <KPICard
              title="Sales Count"
              value={metrics?.salesCount || 0}
              format="number"
              trend="+5"
              color="green"
            />
            <KPICard
              title="Average Order"
              value={metrics?.averageOrder || 0}
              format="currency"
              trend="+2.3%"
              color="purple"
            />
            <KPICard
              title="This Month"
              value={metrics?.thisMonthSales || 0}
              format="currency"
              trend="+18%"
              color="orange"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Today's Sales</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${metrics?.todaySales || 0}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-gray-600 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold text-green-600">4.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <RecentSales sales={sales} />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
