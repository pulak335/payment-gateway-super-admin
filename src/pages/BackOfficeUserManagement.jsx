import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaToggleOn, FaToggleOff, FaTrash, FaPlus } from 'react-icons/fa';
import {
  setUsers,
  setCurrentPage,
  setUsersPerPage,
  setShowModal,
  setCurrentUser,
  setFormData,
  setErrors,
  resetFormData,
  addUser,
  updateUser,
  deleteUser,
} from '../features/backOfficeUserManagement/backOfficeUserManagementSlice';

const BackOfficeUserManagement = () => {
  const dispatch = useDispatch();
  const { users, currentPage, usersPerPage, showModal, currentUser, formData, errors } = useSelector(
    (state) => state.backOfficeUserManagement
  );

  useEffect(() => {
    // Initial sample data load, replace with API call in a real application
    dispatch(setUsers([
      { id: 1, name: 'Admin User 1', email: 'admin1@example.com', role: 'Super Admin', status: 'Active' },
      { id: 2, name: 'Support User 1', email: 'support1@example.com', role: 'Support', status: 'Active' },
      { id: 3, name: 'Finance User 1', email: 'finance1@example.com', role: 'Finance', status: 'Inactive' },
      { id: 4, name: 'Admin User 2', email: 'admin2@example.com', role: 'Super Admin', status: 'Active' },
      { id: 5, name: 'Support User 2', email: 'support2@example.com', role: 'Support', status: 'Active' },
      { id: 6, name: 'Finance User 2', email: 'finance2@example.com', role: 'Finance', status: 'Inactive' },
      { id: 7, name: 'Admin User 3', email: 'admin3@example.com', role: 'Super Admin', status: 'Active' },
      { id: 8, name: 'Support User 3', email: 'support3@example.com', role: 'Support', status: 'Active' },
      { id: 9, name: 'Finance User 3', email: 'finance3@example.com', role: 'Finance', status: 'Inactive' },
      { id: 10, name: 'Admin User 4', email: 'admin4@example.com', role: 'Super Admin', status: 'Active' },
      { id: 11, name: 'Support User 4', email: 'support4@example.com', role: 'Support', status: 'Active' },
      { id: 12, name: 'Finance User 4', email: 'finance4@example.com', role: 'Finance', status: 'Inactive' },
    ]));
  }, [dispatch]);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleEdit = (user) => {
    dispatch(setCurrentUser(user));
    dispatch(setShowModal(true));
    dispatch(setFormData(user));
  };

  const handleToggleStatus = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    );
    dispatch(setUsers(updatedUsers));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleAddUser = () => {
    dispatch(setCurrentUser(null));
    dispatch(resetFormData());
    dispatch(setErrors({}));
    dispatch(setShowModal(true));
  };

  const handleSaveUser = (userData) => {
    if (userData.id) {
      dispatch(updateUser(userData));
    } else {
      dispatch(addUser({ ...userData, id: users.length + 1 }));
    }
    dispatch(setShowModal(false));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Back Office User Management</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddUser}
          className="!bg-purple-800 !hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Add New User
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.name}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.role}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.status}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleToggleStatus(user.id)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                    {user.status === 'Active' ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === number ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : ''}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>

      {showModal && (
        <UserModal
          user={currentUser}
          onSave={handleSaveUser}
          onClose={() => dispatch(setShowModal(false))}
        />
      )}
    </div>
  );
};

const UserModal = ({ user, onSave, onClose }) => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector((state) => state.backOfficeUserManagement);

  useEffect(() => {
    dispatch(setFormData(user || { name: '', email: '', role: '', password: '' }));
    dispatch(setErrors({}));
  }, [user, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.role) newErrors.role = 'Role is required';
    if (!user && !formData.password) newErrors.password = 'Password is required for new users';
    dispatch(setErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{user ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Support">Support</option>
              <option value="Finance">Finance</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs italic">{errors.role}</p>}
          </div>
          {!user && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
          )}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="!bg-purple-800 !hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BackOfficeUserManagement;