import React, { useState } from 'react';

const UserManagement = () => {
  const [showAddMerchantModal, setShowAddMerchantModal] = useState(false);
  const [selectedMerchants, setSelectedMerchants] = useState([]);

  const merchants = [
    { id: 1, name: 'Merchant A', email: 'a@example.com', status: 'Active', role: 'Admin', registrationDate: '2023-01-15' },
    { id: 2, name: 'Merchant B', email: 'b@example.com', status: 'Suspended', role: 'User', registrationDate: '2023-02-20' },
    { id: 3, name: 'Merchant C', email: 'c@example.com', status: 'Active', role: 'User', registrationDate: '2023-03-10' },
  ];

  const toggleAddMerchantModal = () => {
    setShowAddMerchantModal(!showAddMerchantModal);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedMerchants(merchants.map(merchant => merchant.id));
    } else {
      setSelectedMerchants([]);
    }
  };

  const handleSelectMerchant = (id) => {
    setSelectedMerchants(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(merchantId => merchantId !== id)
        : [...prevSelected, id]
    );
  };

  const handleActivateSelected = () => {
    alert(`Activating merchants: ${selectedMerchants.join(', ')}`);
    // Implement actual activation logic here
    setSelectedMerchants([]);
  };

  const handleSuspendSelected = () => {
    alert(`Suspending merchants: ${selectedMerchants.join(', ')}`);
    // Implement actual suspension logic here
    setSelectedMerchants([]);
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete merchants: ${selectedMerchants.join(', ')}?`)) {
      alert(`Deleting merchants: ${selectedMerchants.join(', ')}`);
      // Implement actual deletion logic here
      setSelectedMerchants([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-purple-800 dark:text-white mb-4">User Management</h2>

      {/* Quick Actions for User Management */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button onClick={toggleAddMerchantModal} className="bg-purple-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add Merchant</button>
          <button onClick={handleActivateSelected} disabled={selectedMerchants.length === 0} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">Activate Selected</button>
          <button onClick={handleSuspendSelected} disabled={selectedMerchants.length === 0} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">Suspend Selected</button>
          <button onClick={handleDeleteSelected} disabled={selectedMerchants.length === 0} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">Delete Selected</button>
        </div>
      </div>

      {/* Merchant List View */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Merchant List</h3>
        {/* Filters */}
        <div className="flex space-x-4 mb-4">
          <input type="text" placeholder="Filter by Status" className="p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="Filter by Role" className="p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="Registration Date Range" className="p-2 border rounded dark:bg-gray-700 dark:text-white" />
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300"><input type="checkbox" onChange={handleSelectAll} checked={selectedMerchants.length === merchants.length && merchants.length > 0} /></th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Merchant Name</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Email</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Status</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Role</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Registration Date</th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map(merchant => (
                <tr key={merchant.id}>
                  <td className="py-2 px-4 border-b dark:text-gray-400"><input type="checkbox" checked={selectedMerchants.includes(merchant.id)} onChange={() => handleSelectMerchant(merchant.id)} /></td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{merchant.name}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{merchant.email}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{merchant.status}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{merchant.role}</td>
                  <td className="py-2 px-4 border-b dark:text-gray-400">{merchant.registrationDate}</td>
                  <td className="py-2 px-4 border-b flex">
                    <button className="text-blue-500 hover:underline mr-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    </button>
                    <button className="text-red-500 hover:underline flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.147-2.009-2.201a51.97 51.97 0 0 0-3.32 0c-1.098.054-2.009 1.022-2.009 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Merchant Modal */}
      {showAddMerchantModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add New Merchant</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="merchantName">Merchant Name</label>
                <input type="text" id="merchantName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="merchantEmail">Email</label>
                <input type="email" id="merchantEmail" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="merchantRole">Role</label>
                <select id="merchantRole" className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline">
                  <option>Admin</option>
                  <option>User</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={toggleAddMerchantModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add Merchant</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;