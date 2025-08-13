import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { FaSave, FaTimes, FaRegEdit, FaEye, FaPlus, FaTrashAlt, FaFileExport, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineArchive } from 'react-icons/md';

const AccessControl = () => {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    'Merchant Management': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'Transaction Management': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'User Management': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'Payment Gateway Integration': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'Financial Settlement Management': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'KYC & Compliance': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'Reports & Analytics': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'Notifications': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'Settings & Configuration': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'API Key Management': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    'Access Control': { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
  });
  const [allSelected, setAllSelected] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleRoleNameChange = (e) => {
    const { value } = e.target;
    if (/^[a-zA-Z0-9_-]*$/.test(value) || value === '') {
      setRoleName(value);
      setUnsavedChanges(true);
    }
  };

  const handlePermissionChange = (module, permissionType) => {
    setPermissions(prevPermissions => {
      const newPermissions = {
        ...prevPermissions,
        [module]: {
          ...prevPermissions[module],
          [permissionType]: !prevPermissions[module][permissionType]
        }
      };

      // If any permission other than 'read' is checked, 'read' must be checked
      if (permissionType !== 'read' && newPermissions[module][permissionType]) {
        newPermissions[module].read = true;
      }

      setUnsavedChanges(true);
      return newPermissions;
    });
  };

  const handleSelectAll = () => {
    const newAllSelected = !allSelected;
    setAllSelected(newAllSelected);
    setUnsavedChanges(true);

    const updatedPermissions = {};
    for (const module in permissions) {
      updatedPermissions[module] = {};
      for (const permType in permissions[module]) {
        updatedPermissions[module][permType] = newAllSelected;
      }
    }
    setPermissions(updatedPermissions);
  };

  const handleRowSelectAll = (module) => {
    setPermissions(prevPermissions => {
      const allModulePermissionsSelected = Object.values(prevPermissions[module]).every(p => p);
      const newModulePermissions = {};
      for (const permType in prevPermissions[module]) {
        newModulePermissions[permType] = !allModulePermissionsSelected;
      }
      setUnsavedChanges(true);
      return {
        ...prevPermissions,
        [module]: newModulePermissions
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roleName.trim()) {
      alert('Role Name is required.');
      return;
    }
    // Simulate save operation
    console.log('Saving Role:', roleName, 'Permissions:', permissions);
    alert('Role permissions updated successfully!'); // Replace with toast notification
    setUnsavedChanges(false);
  };

  const handleCancel = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const permissionIcons = {
    read: <FaEye className="text-blue-500" />,
    edit: <FaRegEdit className="text-yellow-500" />,
    create: <FaPlus className="text-green-500" />,
    archive: <MdOutlineArchive className="text-purple-500" />,
    approve: <FaCheckCircle className="text-indigo-500" />,
    export: <FaFileExport className="text-gray-500" />,
    delete: <FaTrashAlt className="text-red-500" />,
  };

  const permissionTooltips = {
    read: 'Allows viewing data',
    edit: 'Allows modifying existing data',
    create: 'Allows adding new data',
    archive: 'Allows archiving records',
    approve: 'Allows approving actions or data',
    export: 'Allows downloading data',
    delete: 'Allows permanently deleting data',
  };

  const renderPermissionCheckbox = (module, permissionType) => {
    const isReadRequired = permissions[module][permissionType] && permissionType !== 'read';
    const isDisabled = (permissionType !== 'read' && !permissions[module].read && permissions[module][permissionType]);

    return (
      <td key={permissionType} className="p-2 border-b border-gray-200 text-center">
        <label className="inline-flex items-center cursor-pointer group">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
            checked={permissions[module][permissionType] || isReadRequired}
            onChange={() => handlePermissionChange(module, permissionType)}
            disabled={isDisabled}
            aria-label={`${permissionType} permission for ${module}`}
          />
          <span className="ml-2 text-gray-700 hidden group-hover:inline-block text-sm">
            {permissionTooltips[permissionType]}
          </span>
        </label>
      </td>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500 mb-2">
            <Link to="/" className="hover:underline">Home</Link> &gt; <Link to="/roles" className="hover:underline">Roles</Link> &gt; Edit Role
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Edit Role</h1>
          <p className="text-gray-600">Set Role Permissions</p>
        </div>

        {/* Role Name Input */}
        <div className="mb-6">
          <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-2">
            Role Name
          </label>
          <input
            type="text"
            id="roleName"
            name="roleName"
            value={roleName}
            onChange={handleRoleNameChange}
            placeholder="Enter role name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          {!roleName.trim() && (
            <p className="mt-1 text-sm text-red-600">Role Name is required.</p>
          )}
          {roleName && !/^[a-zA-Z0-9_-]*$/.test(roleName) && (
            <p className="mt-1 text-sm text-red-600">No special characters except underscore or dash.</p>
          )}
        </div>

        {/* Role Permissions Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Module Access
                </th>
                {Object.keys(permissions['Merchant Management']).map(permType => (
                  <th key={permType} className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      {permissionIcons[permType]}
                      <span className="ml-1">{permType.charAt(0).toUpperCase() + permType.slice(1)}</span>
                    </div>
                  </th>
                ))}
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all permissions"
                    />
                    <span className="ml-2">Select All</span>
                  </label>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(permissions).map(module => (
                <tr key={module} className="hover:bg-gray-50 group">
                  <td className="p-3 border-b border-gray-200 font-semibold text-gray-800">
                    {module}
                  </td>
                  {Object.keys(permissions[module]).map(permType => (
                    renderPermissionCheckbox(module, permType)
                  ))}
                  <td className="p-2 border-b border-gray-200 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                        checked={Object.values(permissions[module]).every(p => p)}
                        onChange={() => handleRowSelectAll(module)}
                        aria-label={`Select all permissions for ${module}`}
                      />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaTimes className="inline-block mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaSave className="inline-block mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;