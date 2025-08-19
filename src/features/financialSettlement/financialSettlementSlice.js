import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settlements: [
    {
      id: 'FS001',
      merchantName: 'GlobalPay Inc.',
      amount: 15000.75,
      currency: 'USD',
      status: 'Pending',
      date: '2023-10-26',
      details: 'Batch settlement for October 25th transactions.',
      commissionRate: 2.5,
      netAmount: 14625.73,
    },
    {
      id: 'FS002',
      merchantName: 'E-Shop Solutions',
      amount: 8200.50,
      currency: 'USD',
      status: 'Completed',
      date: '2023-10-25',
      details: 'Weekly payout for sales.',
      commissionRate: 2.0,
      netAmount: 8036.49,
    },
    {
      id: 'FS003',
      merchantName: 'TravelNow LLC',
      amount: 23000.00,
      currency: 'EUR',
      status: 'Failed',
      date: '2023-10-24',
      details: 'Issue with bank transfer, re-attempt required.',
      commissionRate: 3.0,
      netAmount: 22310.00,
    },
    {
      id: 'FS004',
      merchantName: 'FashionHub Co.',
      amount: 12500.00,
      currency: 'GBP',
      status: 'Pending',
      date: '2023-10-26',
      details: 'Bi-weekly settlement.',
      commissionRate: 2.2,
      netAmount: 12225.00,
    },
    {
      id: 'FS005',
      merchantName: 'GadgetGeek Store',
      amount: 5000.00,
      currency: 'USD',
      status: 'Completed',
      date: '2023-10-24',
      details: 'Small ad-hoc settlement.',
      commissionRate: 2.8,
      netAmount: 4860.00,
    },
  ],
  showConfirmationModal: false,
  selectedSettlement: null,
  globalCommission: 2.5,
  merchantCommissionOverrides: {},
  searchTerm: '',
  filterStatus: 'All',
  filterMerchant: 'All',
  filterMinAmount: '',
  filterMaxAmount: '',
  selectedMerchantForCommission: '',
};

const financialSettlementSlice = createSlice({
  name: 'financialSettlement',
  initialState,
  reducers: {
    setSettlements: (state, action) => {
      state.settlements = action.payload;
    },
    setShowConfirmationModal: (state, action) => {
      state.showConfirmationModal = action.payload;
    },
    setSelectedSettlement: (state, action) => {
      state.selectedSettlement = action.payload;
    },
    setGlobalCommission: (state, action) => {
      state.globalCommission = action.payload;
    },
    setMerchantCommissionOverrides: (state, action) => {
      state.merchantCommissionOverrides = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterMerchant: (state, action) => {
      state.filterMerchant = action.payload;
    },
    setFilterMinAmount: (state, action) => {
      state.filterMinAmount = action.payload;
    },
    setFilterMaxAmount: (state, action) => {
      state.filterMaxAmount = action.payload;
    },
    setSelectedMerchantForCommission: (state, action) => {
      state.selectedMerchantForCommission = action.payload;
    },
    updateSettlementStatus: (state, action) => {
      const { id, status } = action.payload;
      const settlement = state.settlements.find(s => s.id === id);
      if (settlement) {
        settlement.status = status;
      }
    },
    updateMerchantCommission: (state, action) => {
      const { merchantName, rate } = action.payload;
      state.merchantCommissionOverrides[merchantName] = rate;
    },
  },
});

export const {
  setSettlements,
  setShowConfirmationModal,
  setSelectedSettlement,
  setGlobalCommission,
  setMerchantCommissionOverrides,
  setSearchTerm,
  setFilterStatus,
  setFilterMerchant,
  setFilterMinAmount,
  setFilterMaxAmount,
  setSelectedMerchantForCommission,
  updateSettlementStatus,
  updateMerchantCommission,
} = financialSettlementSlice.actions;

export default financialSettlementSlice.reducer;