import { createSlice } from '@reduxjs/toolkit';

const initialMerchants = [
  { id: 1, name: 'GlobalPay', email: 'contact@globalpay.com', status: 'Active', role: 'Admin', lastLogin: '2023-10-26' },
  { id: 2, name: 'PaySecure', email: 'info@paysecure.com', status: 'Inactive', role: 'Viewer', lastLogin: '2023-10-25' },
  { id: 3, name: 'QuickTransact', email: 'support@quicktransact.com', status: 'Active', role: 'Editor', lastLogin: '2023-10-26' },
  { id: 4, name: 'WalletFlow', email: 'help@walletflow.com', status: 'Active', role: 'Admin', lastLogin: '2023-10-24' },
  { id: 5, name: 'SecurePay', email: 'admin@securepay.com', status: 'Inactive', role: 'Viewer', lastLogin: '2023-10-23' },
];

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState: {
    showAddMerchantModal: false,
    selectedMerchants: [],
    filterStatus: '',
    filterRole: '',
    filterDateRange: '',
    searchQuery: '',
    currentPage: 1,
    merchantsPerPage: 5,
    newMerchant: { name: '', email: '', role: '', status: 'Active' },
    merchants: initialMerchants,
  },
  reducers: {
    setShowAddMerchantModal: (state, action) => {
      state.showAddMerchantModal = action.payload;
    },
    setSelectedMerchants: (state, action) => {
      state.selectedMerchants = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterRole: (state, action) => {
      state.filterRole = action.payload;
    },
    setFilterDateRange: (state, action) => {
      state.filterDateRange = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNewMerchant: (state, action) => {
      state.newMerchant = action.payload;
    },
    addMerchant: (state) => {
      const newId = state.merchants.length > 0 ? Math.max(...state.merchants.map(m => m.id)) + 1 : 1;
      state.merchants.push({ ...state.newMerchant, id: newId, lastLogin: new Date().toISOString().slice(0, 10) });
      state.newMerchant = { name: '', email: '', role: '', status: 'Active' };
      state.showAddMerchantModal = false;
    },
    deleteSelectedMerchants: (state) => {
      state.merchants = state.merchants.filter(merchant => !state.selectedMerchants.includes(merchant.id));
      state.selectedMerchants = [];
    },
    toggleMerchantSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedMerchants.includes(id)) {
        state.selectedMerchants = state.selectedMerchants.filter(merchantId => merchantId !== id);
      } else {
        state.selectedMerchants.push(id);
      }
    },
    toggleAllMerchantsSelection: (state, action) => {
      if (action.payload) {
        state.selectedMerchants = state.merchants.map(merchant => merchant.id);
      } else {
        state.selectedMerchants = [];
      }
    },
    activateSelectedMerchants: (state) => {
      state.merchants = state.merchants.map(merchant =>
        state.selectedMerchants.includes(merchant.id)
          ? { ...merchant, status: 'Active' }
          : merchant
      );
      state.selectedMerchants = [];
    },
    suspendSelectedMerchants: (state) => {
      state.merchants = state.merchants.map(merchant =>
        state.selectedMerchants.includes(merchant.id)
          ? { ...merchant, status: 'Inactive' }
          : merchant
      );
      state.selectedMerchants = [];
    },
  },
});

export const { 
  setShowAddMerchantModal,
  setSelectedMerchants,
  setFilterStatus,
  setFilterRole,
  setFilterDateRange,
  setSearchQuery,
  setCurrentPage,
  setNewMerchant,
  addMerchant,
  deleteSelectedMerchants,
  toggleMerchantSelection,
  toggleAllMerchantsSelection,
  activateSelectedMerchants,
  suspendSelectedMerchants,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;