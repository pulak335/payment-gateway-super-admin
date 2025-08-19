import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDateRange, setMerchant, setPaymentGateway, applyFilters, fetchReportsData } from '../features/reportsAnalytics/reportsAnalyticsSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import '../index.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6F61', '#6B5B95', '#88B04B'];

const ReportsAnalytic = () => {
  const dispatch = useDispatch();
  const { dateRange, merchant, paymentGateway, filteredData, filteredPieData, lineChartData, status, error } = useSelector((state) => state.reportsAnalytics);



  useEffect(() => {
    dispatch(fetchReportsData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [dateRange, merchant, paymentGateway, dispatch, status]);

  const handleDownload = (type) => {
    alert(`Downloading ${type} report...`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports & Analytics</h1>

      {status === 'loading' && <div className="text-center text-blue-500 text-lg">Loading reports...</div>}
      {status === 'failed' && <div className="text-center text-red-500 text-lg">Error: {error}</div>}

      {/* Report Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Report Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Date Range</label>
            <input
              type="date"
              id="dateRange"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={dateRange}
              onChange={(e) => dispatch(setDateRange(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="merchant" className="block text-sm font-medium text-gray-700">Merchant</label>
            <select
              id="merchant"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={merchant}
              onChange={(e) => dispatch(setMerchant(e.target.value))}
            >
              <option value="">Select Merchant</option>
              <option value="Merchant A">Merchant A</option>
              <option value="Merchant B">Merchant B</option>
              <option value="Merchant C">Merchant C</option>
            </select>
          </div>
          <div>
            <label htmlFor="paymentGateway" className="block text-sm font-medium text-gray-700">Payment Gateway</label>
            <select
              id="paymentGateway"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={paymentGateway}
              onChange={(e) => dispatch(setPaymentGateway(e.target.value))}
            >
              <option value="">Select Gateway</option>
              <option value="Gateway A">Gateway A</option>
              <option value="Gateway B">Gateway B</option>
              <option value="Gateway C">Gateway C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction Trends (Line Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
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
                data={filteredPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {filteredPieData.map((entry, index) => (
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Gateway</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.merchant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.gateway}</td>
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
            className="px-4 py-2 !bg-blue-600 text-white rounded-md !hover:bg-blue-700 !focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Download CSV
          </button>
          <button
            onClick={() => handleDownload('Excel')}
            className="px-4 py-2 !bg-green-600 text-white rounded-md !hover:bg-green-700 !focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Download Excel
          </button>
          <button
            onClick={() => handleDownload('PDF')}
            className="px-4 py-2 !bg-red-600 text-white rounded-md !hover:bg-red-700 !focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytic;