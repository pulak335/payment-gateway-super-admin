import React from 'react';

import { Link } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Dashboard Overview</h2>

      {/* KPIs Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 [&>*:nth-child(1)]:bg-blue-100 [&>*:nth-child(2)]:bg-green-100 [&>*:nth-child(3)]:bg-yellow-100 [&>*:nth-child(4)]:bg-purple-100 [&>*:nth-child(5)]:bg-pink-100 dark:[&>*:nth-child(1)]:bg-blue-900 dark:[&>*:nth-child(2)]:bg-green-900 dark:[&>*:nth-child(3)]:bg-yellow-900 dark:[&>*:nth-child(4)]:bg-purple-900 dark:[&>*:nth-child(5)]:bg-pink-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Merchants</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
          <Link to="/merchants" className="text-blue-500 hover:underline">View all merchants</Link>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Transactions Today</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">5,678</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">$123,456.78</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Pending KYC Requests</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">45</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Settlement Requests Pending</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
        </div>
      </div>

      {/* Graphs & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Transaction Volume</h3>
          {/* Line Chart */}
          <div className="h-64">
            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Transaction Volume',
                    data: [65, 59, 80, 81, 56, 55],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Revenue Breakdown</h3>
          {/* Pie Chart */}
          <div className="h-64">
            <Pie
              data={{
                labels: ['Card', 'Bank Transfer', 'E-Wallet'],
                datasets: [
                  {
                    label: 'Revenue Breakdown',
                    data: [300, 50, 100],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-purple-700 dark:text-gray-300 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="!bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Add Merchant</button>
          <button className="!bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Approve KYC</button>
          <button className="!bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">View Settlements</button>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Activity Feed</h3>
        <ul className="space-y-2">
          <li className="text-gray-700 dark:text-gray-300">New merchant "ABC Corp" registered. (2 mins ago)</li>
          <li className="text-gray-700 dark:text-gray-300">KYC approved for "John Doe". (1 hour ago)</li>
          <li className="text-gray-700 dark:text-gray-300">Large transaction of $5,000 from "XYZ Store". (3 hours ago)</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;