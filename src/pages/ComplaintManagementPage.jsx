import React, { useState } from 'react';

const ComplaintManagementPage = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 'C001',
      type: 'Merchant',
      source: 'Merchant A',
      subject: 'Payment processing delay',
      status: 'Open',
      date: '2023-10-26',
      description: 'Merchant A reported a delay in payment processing for transactions made on 2023-10-25.',
    },
    {
      id: 'C002',
      type: 'User',
      source: 'User B',
      subject: 'Login issue',
      status: 'In Progress',
      date: '2023-10-25',
      description: 'User B is unable to log in to their account since yesterday.',
    },
    {
      id: 'C003',
      type: 'Merchant',
      source: 'Merchant C',
      subject: 'API integration error',
      status: 'Closed',
      date: '2023-10-24',
      description: 'Merchant C reported an error when trying to integrate with the new API endpoint.',
    },
    {
      id: 'C004',
      type: 'User',
      source: 'User D',
      subject: 'Transaction dispute',
      status: 'Open',
      date: '2023-10-26',
      description: 'User D disputes a transaction of $50 on 2023-10-24, claiming it was unauthorized.',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = filterStatus === 'All' || complaint.status === filterStatus;
    const matchesSearch = complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Complaint Management</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Complaint Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-blue-700">Total Complaints</p>
            <p className="text-3xl font-bold text-blue-900">{complaints.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-yellow-700">Open Complaints</p>
            <p className="text-3xl font-bold text-yellow-900">{complaints.filter(c => c.status === 'Open').length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-green-700">Closed Complaints</p>
            <p className="text-3xl font-bold text-green-900">{complaints.filter(c => c.status === 'Closed').length}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              id="filterStatus"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">Search Complaints:</label>
            <input
              type="text"
              id="searchTerm"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              placeholder="Search by ID, Source, Subject, or Type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        complaint.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                        complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No complaints found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintManagementPage;