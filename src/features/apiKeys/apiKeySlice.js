import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  merchants: [
    {
      id: '1',
      name: 'Merchant A',
      apiKey: 'sk_live_xxxxxxxxxxxxxxxxxxxx',
      secretKey: 'sk_test_****************',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Merchant B',
      apiKey: 'sk_live_yyyyyyyyyyyyyyyyyyyy',
      secretKey: 'sk_test_****************',
      status: 'Inactive',
    },
    {
      id: '3',
      name: 'Merchant C',
      apiKey: 'sk_live_zzzzzzzzzzzzzzzzzzzz',
      secretKey: 'sk_test_****************',
      status: 'Active',
    },
  ],
  searchQuery: '',
};

const apiKeySlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    regenerateApiKey: (state, action) => {
      const { id } = action.payload;
      const merchant = state.merchants.find((m) => m.id === id);
      if (merchant) {
        merchant.apiKey = `sp_live_${Math.random().toString(36).substring(2, 15)}`;
        merchant.secretKey = `sp_live_${Math.random().toString(36).substring(2, 32)}_sort_key_${Math.random().toString(36)}`;
      }
    },
    toggleApiKeyStatus: (state, action) => {
      const { id } = action.payload;
      const merchant = state.merchants.find((m) => m.id === id);
      if (merchant) {
        merchant.status = merchant.status === 'Active' ? 'Inactive' : 'Active';
      }
    },
  },
});

export const { setSearchQuery, regenerateApiKey, toggleApiKeyStatus } = apiKeySlice.actions;

export default apiKeySlice.reducer;