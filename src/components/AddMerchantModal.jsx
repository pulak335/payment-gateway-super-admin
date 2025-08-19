import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setNewMerchant,
  addMerchant,
  setShowAddMerchantModal,
} from '../features/userManagement/userManagementSlice';

const AddMerchantModal = () => {
  const dispatch = useDispatch();
  const { newMerchant, showAddMerchantModal } = useSelector((state) => state.userManagement);

  const handleAddMerchant = (e) => {
    e.preventDefault();
    dispatch(addMerchant(newMerchant));
    dispatch(setShowAddMerchantModal(false)); // Close modal after adding
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewMerchant({ ...newMerchant, [name]: value }));
  };

  if (!showAddMerchantModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Merchant</h2>
        <form onSubmit={handleAddMerchant}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Merchant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newMerchant.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newMerchant.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={newMerchant.role}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Merchant">Merchant</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="!bg-purple-600 !hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Merchant
            </button>
            <button
              type="button"
              onClick={() => dispatch(setShowAddMerchantModal(false))}
              className="!bg-red-500 !hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMerchantModal;