import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMerchants,
  setSearchTerm,
  setFilteredMerchants,
} from '../features/viewAllMerchants/viewAllMerchantsSlice';

const ViewAllMerchants = () => {
  const dispatch = useDispatch();
  const { merchants, searchTerm, filteredMerchants } = useSelector(
    (state) => state.viewAllMerchants
  );

  // Initial data load (simulated)
  useEffect(() => {
    dispatch(setMerchants([
      { id: 1, name: 'Merchant A', email: 'a@example.com', status: 'Active', registeredDate: '2023-01-15' },
      { id: 2, name: 'Merchant B', email: 'b@example.com', status: 'Inactive', registeredDate: '2023-02-20' },
      { id: 3, name: 'Merchant C', email: 'c@example.com', status: 'Active', registeredDate: '2023-03-10' },
      { id: 4, name: 'Merchant D', email: 'd@example.com', status: 'Pending', registeredDate: '2023-04-01' },
    ]));
  }, [dispatch]);

  const handleSearchTermChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleFilterStatusChange = (e) => {
    const status = e.target.value;
    const newFilteredMerchants = merchants.filter(merchant => {
      const matchesSearchTerm = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = status === 'All' || merchant.status === status;
      return matchesSearchTerm && matchesStatus;
    });
    dispatch(setFilteredMerchants(newFilteredMerchants));
  };

  useEffect(() => {
    const newFilteredMerchants = merchants.filter(merchant => {
      const matchesSearchTerm = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
      // Assuming filterStatus is managed locally or derived from another Redux state if needed
      // For now, let's assume it's 'All' or handled by the slice if it were part of it.
      return matchesSearchTerm;
    });
    dispatch(setFilteredMerchants(newFilteredMerchants));
  }, [merchants, searchTerm, dispatch]);

  // const filteredMerchant = merchants.filter(merchant => {
  //   const matchesSearchTerm = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                             merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = filterStatus === 'All' || merchant.status === filterStatus;
  //   return matchesSearchTerm && matchesStatus;
  // });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Merchants</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Merchant Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">Search</label>
            <input
              type="text"
              id="searchTerm"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div>
            <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="filterStatus"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              onChange={handleFilterStatusChange}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Merchant List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMerchants.map(merchant => (
                <tr key={merchant.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{merchant.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{merchant.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{merchant.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      merchant.status === 'Active' ? 'bg-green-100 text-green-800' :
                      merchant.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {merchant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{merchant.registeredDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMerchants.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No merchants found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAllMerchants;