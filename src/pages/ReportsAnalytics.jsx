import React, { useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', transactions: 4000, revenue: 2400, amt: 2400 },
  { name: 'Feb', transactions: 3000, revenue: 1398, amt: 2210 },
  { name: 'Mar', transactions: 2000, revenue: 9800, amt: 2290 },
  { name: 'Apr', transactions: 2780, revenue: 3908, amt: 2000 },
  { name: 'May', transactions: 1890, revenue: 4800, amt: 2181 },
  { name: 'Jun', transactions: 2390, revenue: 3800, amt: 2500 },
  { name: 'Jul', transactions: 3490, revenue: 4300, amt: 2100 },
];

const pieData = [
  { name: 'Gateway A', value: 400 },
  { name: 'Gateway B', value: 300 },
  { name: 'Gateway C', value: 300 },
  { name: 'Gateway D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState('');
  const [merchant, setMerchant] = useState('');
  const [paymentGateway, setPaymentGateway] = useState('');

  const handleDownload = (type) => {
    alert(`Downloading ${type} report...`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports & Analytics</h1>

      {/* Report Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Report Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Date Range</label>
            <input
              type="text"
              id="dateRange"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g., Last 30 days"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="merchant" className="block text-sm font-medium text-gray-700">Merchant</label>
            <input
              type="text"
              id="merchant"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Select Merchant"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="paymentGateway" className="block text-sm font-medium text-gray-700">Payment Gateway</label>
            <input
              type="text"
              id="paymentGateway"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Select Gateway"
              value={paymentGateway}
              onChange={(e) => setPaymentGateway(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction Trends (Line Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="transactions" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Gateway Breakdown (Pie Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Data Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Detailed Report Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Gateway</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`2023-${index + 1 < 10 ? '0' + (index + 1) : index + 1}-01`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Merchant {index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.transactions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.revenue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gateway {['A', 'B', 'C', 'D'][index % 4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Download Reports</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => handleDownload('CSV')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Download CSV
          </button>
          <button
            onClick={() => handleDownload('Excel')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Download Excel
          </button>
          <button
            onClick={() => handleDownload('PDF')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;