import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [
    {
      id: 'TRX001',
      date: '2023-01-15',
      merchant: 'GlobalTech Solutions',
      amount: 150.75,
      status: 'Completed',
      type: 'Sale',
      currency: 'USD',
      paymentMethod: 'Credit Card',
      customerInfo: { name: 'Alice Smith', email: 'alice.s@example.com' },
      fees: 2.50,
      netAmount: 148.25,
      refunded: false,
      disputed: false,
      notes: 'Online purchase of software license.',
    },
    {
      id: 'TRX002',
      date: '2023-01-16',
      merchant: 'Innovate Payments Inc.',
      amount: 200.00,
      status: 'Pending',
      type: 'Refund',
      currency: 'USD',
      paymentMethod: 'Bank Transfer',
      customerInfo: { name: 'Bob Johnson', email: 'bob.j@example.com' },
      fees: 0.00,
      netAmount: 200.00,
      refunded: true,
      disputed: false,
      notes: 'Refund for returned merchandise.',
    },
    {
      id: 'TRX003',
      date: '2023-01-17',
      merchant: 'SecurePay Systems',
      amount: 50.20,
      status: 'Failed',
      type: 'Sale',
      currency: 'EUR',
      paymentMethod: 'Debit Card',
      customerInfo: { name: 'Charlie Brown', email: 'charlie.b@example.com' },
      fees: 1.00,
      netAmount: 49.20,
      refunded: false,
      disputed: false,
      notes: 'Payment gateway error.',
    },
    {
      id: 'TRX004',
      date: '2023-01-18',
      merchant: 'GlobalTech Solutions',
      amount: 300.00,
      status: 'Completed',
      type: 'Sale',
      currency: 'USD',
      paymentMethod: 'PayPal',
      customerInfo: { name: 'Diana Prince', email: 'diana.p@example.com' },
      fees: 5.00,
      netAmount: 295.00,
      refunded: false,
      disputed: false,
      notes: 'Subscription renewal.',
    },
    {
      id: 'TRX005',
      date: '2023-01-19',
      merchant: 'Innovate Payments Inc.',
      amount: 75.50,
      status: 'Completed',
      type: 'Sale',
      currency: 'GBP',
      paymentMethod: 'Credit Card',
      customerInfo: { name: 'Eve Adams', email: 'eve.a@example.com' },
      fees: 1.20,
      netAmount: 74.30,
      refunded: false,
      disputed: false,
      notes: 'Small online purchase.',
    },
  ],
  showDetailsModal: false,
  selectedTransaction: null,
  filterDateRange: '',
  filterMerchant: '',
  filterStatus: '',
  filterAmountRange: '',
  currentPage: 1,
  transactionsPerPage: 5,
};

const transactionManagementSlice = createSlice({
  name: 'transactionManagement',
  initialState,
  reducers: {
    setShowDetailsModal: (state, action) => {
      state.showDetailsModal = action.payload;
    },
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    setFilterDateRange: (state, action) => {
      state.filterDateRange = action.payload;
    },
    setFilterMerchant: (state, action) => {
      state.filterMerchant = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterAmountRange: (state, action) => {
      state.filterAmountRange = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Add more reducers as needed for transaction management actions
  },
});

export const { 
  setShowDetailsModal,
  setSelectedTransaction,
  setFilterDateRange,
  setFilterMerchant,
  setFilterStatus,
  setFilterAmountRange,
  setCurrentPage,
} = transactionManagementSlice.actions;

export default transactionManagementSlice.reducer;