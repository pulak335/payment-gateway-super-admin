import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FaSave, FaTimes, FaRegEdit, FaEye, FaPlus, FaTrashAlt, FaFileExport, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineArchive } from 'react-icons/md';
import {
  setRoleName,
  setPermissions,
  setAllSelected,
  setUnsavedChanges,
  togglePermission,
  toggleAllPermissions,
  resetAccessControlState,
} from '../features/accessControl/accessControlSlice';

const AccessControl = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { roleName, permissions, allSelected, unsavedChanges } = useSelector(
    (state) => state.accessControl
  );



  const handleRoleNameChange = (e) => {
    const { value } = e.target;
    dispatch(setRoleName(value));
    dispatch(setUnsavedChanges(true));
  };

  const handlePermissionChange = (module, permissionType) => {
    dispatch(togglePermission({ module, permissionType }));
  };

  const handleSelectAll = () => {
    const newAllSelected = !allSelected;
    dispatch(toggleAllPermissions(newAllSelected));
  };

  const handleRowSelectAll = (module) => {
    // This logic needs to be handled within the slice if it's to be Redux-managed
    // For now, keeping it as is or simplifying if not directly used.
    // If this is meant to toggle all permissions for a specific module, 
    // you'd need a specific action for it in the slice.
    console.log(`Row select all for module: ${module}`);
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
    dispatch(setUnsavedChanges(false));
  };

  const handleCancel = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        dispatch(resetAccessControlState());
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

  const moduleDisplayNames = {
    dashboard: 'Dashboard',
    userManagement: 'User Management',
    merchantManagement: 'Merchant Management',
    transactionManagement: 'Transaction Management',
    financialSettlement: 'Financial Settlement Management',
    reportsAnalytics: 'Reports & Analytics',
    apiKeys: 'API Keys',
    settings: 'Settings & Configuration',
    accessControl: 'Access Control',
    notifications: 'Notifications',
    kycCompliance: 'KYC & Compliance',
    paymentGatewayIntegration: 'Payment Gateway Integration',
    backOfficeUserManagement: 'Back Office User Management',
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
        </label>
      </td>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Access Control</h1>
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
          />
          {!roleName.trim() && (
            <p className="mt-1 text-sm text-red-600">Role Name is required.</p>
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
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center">
                    {permissionIcons['read']}
                    <span className="ml-1">READ</span>
                  </div>
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center">
                    {permissionIcons['edit']}
                    <span className="ml-1">EDIT</span>
                  </div>
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center">
                    {permissionIcons['create']}
                    <span className="ml-1">+ CREATE</span>
                  </div>
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center">
                    {permissionIcons['archive']}
                    <span className="ml-1">ARCHIVE</span>
                  </div>
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center">
                    {permissionIcons['approve']}
                    <span className="ml-1">APPROVE</span>
                  </div>
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center">
                    {permissionIcons['export']}
                    <span className="ml-1">EXPORT</span>
                  </div>
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center">
                    {permissionIcons['delete']}
                    <span className="ml-1">DELETE</span>
                  </div>
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all permissions"
                    />
                    <span className="ml-2">SELECT ALL</span>
                  </label>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(permissions).map(module => (
                <tr key={module} className="hover:bg-gray-50 group">
                  <td className="p-3 border-b border-gray-200 font-semibold text-gray-800">
                    {moduleDisplayNames[module] || module}
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
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FaTimes className="inline-block mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 rounded-md text-sm font-medium text-white !bg-indigo-800 cursor-not-allowed"
            disabled
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;