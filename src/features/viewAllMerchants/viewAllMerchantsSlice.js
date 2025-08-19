import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  merchants: [],
  filteredMerchants: [],
  searchTerm: '',
  currentPage: 1,
  merchantsPerPage: 10,
  selectedMerchant: null,
  isModalOpen: false,
  modalType: '', // 'view', 'edit', 'add'
  newMerchantData: {
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
  },
  errors: {},
};

const viewAllMerchantsSlice = createSlice({
  name: 'viewAllMerchants',
  initialState,
  reducers: {
    setMerchants: (state, action) => {
      state.merchants = action.payload;
      state.filteredMerchants = action.payload;
    },
    setFilteredMerchants: (state, action) => {
      state.filteredMerchants = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedMerchant: (state, action) => {
      state.selectedMerchant = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    setNewMerchantData: (state, action) => {
      state.newMerchantData = { ...state.newMerchantData, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    addMerchant: (state, action) => {
      state.merchants.push(action.payload);
      state.filteredMerchants.push(action.payload);
    },
    updateMerchant: (state, action) => {
      const index = state.merchants.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.merchants[index] = action.payload;
        state.filteredMerchants[index] = action.payload;
      }
    },
    deleteMerchant: (state, action) => {
      state.merchants = state.merchants.filter(m => m.id !== action.payload);
      state.filteredMerchants = state.filteredMerchants.filter(m => m.id !== action.payload);
    },
    resetNewMerchantData: (state) => {
      state.newMerchantData = initialState.newMerchantData;
    },
  },
});

export const {
  setMerchants,
  setFilteredMerchants,
  setSearchTerm,
  setCurrentPage,
  setSelectedMerchant,
  setIsModalOpen,
  setModalType,
  setNewMerchantData,
  setErrors,
  addMerchant,
  updateMerchant,
  deleteMerchant,
  resetNewMerchantData,
} = viewAllMerchantsSlice.actions;

export default viewAllMerchantsSlice.reducer;