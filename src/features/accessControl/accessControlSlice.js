import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roleName: '',
  permissions: {
    dashboard: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    userManagement: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    merchantManagement: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    transactionManagement: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    financialSettlement: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    reportsAnalytics: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    apiKeys: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    settings: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    accessControl: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    notifications: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    kycCompliance: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    paymentGatewayIntegration: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
    backOfficeUserManagement: { read: false, edit: false, create: false, archive: false, approve: false, export: false, delete: false },
  },
  allSelected: false,
  unsavedChanges: false,
};

const accessControlSlice = createSlice({
  name: 'accessControl',
  initialState,
  reducers: {
    setRoleName: (state, action) => {
      state.roleName = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    setAllSelected: (state, action) => {
      state.allSelected = action.payload;
    },
    setUnsavedChanges: (state, action) => {
      state.unsavedChanges = action.payload;
    },
    togglePermission: (state, action) => {
      const { module, permissionType } = action.payload;
      state.permissions[module][permissionType] = !state.permissions[module][permissionType];
      state.unsavedChanges = true;
    },
    toggleAllPermissions: (state, action) => {
      const isChecked = action.payload;
      for (const module in state.permissions) {
        for (const permissionType in state.permissions[module]) {
          state.permissions[module][permissionType] = isChecked;
        }
      }
      state.allSelected = isChecked;
      state.unsavedChanges = true;
    },
    resetAccessControlState: (state) => {
      state.roleName = '';
      state.permissions = initialState.permissions;
      state.allSelected = false;
      state.unsavedChanges = false;
    },
  },
});

export const {
  setRoleName,
  setPermissions,
  setAllSelected,
  setUnsavedChanges,
  togglePermission,
  toggleAllPermissions,
  resetAccessControlState,
} = accessControlSlice.actions;

export default accessControlSlice.reducer;