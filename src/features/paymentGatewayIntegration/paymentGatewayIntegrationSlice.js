import { createSlice } from '@reduxjs/toolkit';

const initialGateways = [
  { id: 1, name: 'Stripe', type: 'Credit Card', status: 'Active', lastUpdated: '2023-10-26', limit: 100000, config: { apiKey: 'sk_test_********************', publishableKey: 'pk_test_********************' } },
  { id: 2, name: 'PayPal', type: 'E-wallet', status: 'Inactive', lastUpdated: '2023-10-25', limit: 50000, config: { clientId: 'sb-********************', clientSecret: '********************' } },
  { id: 3, name: 'Square', type: 'POS', status: 'Active', lastUpdated: '2023-10-24', limit: 75000, config: { accessToken: 'sq0csb-********************' } },
  { id: 4, name: 'Authorize.Net', type: 'Credit Card', status: 'Active', lastUpdated: '2023-10-23', limit: 120000, config: { apiLoginId: '********************', transactionKey: '********************' } },
];

const paymentGatewayIntegrationSlice = createSlice({
  name: 'paymentGatewayIntegration',
  initialState: {
    gateways: initialGateways,
    selectedGateway: null,
    apiLogs: [],
  },
  reducers: {
    setGateways: (state, action) => {
      state.gateways = action.payload;
    },
    setSelectedGateway: (state, action) => {
      state.selectedGateway = action.payload;
    },
    setApiLogs: (state, action) => {
      state.apiLogs = action.payload;
    },
    addGateway: (state, action) => {
      state.gateways.push(action.payload);
    },
    updateGateway: (state, action) => {
      const index = state.gateways.findIndex(gateway => gateway.id === action.payload.id);
      if (index !== -1) {
        state.gateways[index] = action.payload;
      }
    },
    deleteGateway: (state, action) => {
      state.gateways = state.gateways.filter(gateway => gateway.id !== action.payload);
    },
    toggleGatewayStatus: (state, action) => {
      const index = state.gateways.findIndex(gateway => gateway.id === action.payload);
      if (index !== -1) {
        state.gateways[index].status = !state.gateways[index].status;
      }
    },
  },
});

export const { setGateways, setSelectedGateway, setApiLogs, addGateway, updateGateway, deleteGateway, toggleGatewayStatus } = paymentGatewayIntegrationSlice.actions;
export default paymentGatewayIntegrationSlice.reducer;