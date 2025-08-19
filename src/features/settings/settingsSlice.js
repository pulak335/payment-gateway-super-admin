import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brandingLogo: null,
  contactEmail: '',
  supportPhone: '',
  termsAndConditions: '',
  searchQuery: '',
  merchants: [
    { id: '1', name: 'Merchant A', apiKey: 'sk_live_xxxxxxxxxxxxxx', status: 'Active' },
    { id: '2', name: 'Merchant B', apiKey: 'sk_live_yyyyyyyyyyyyyy', status: 'Inactive' },
    { id: '3', name: 'Merchant C', apiKey: 'sk_live_zzzzzzzzzzzzzz', status: 'Active' },
  ],
  twoFactorAuthEnabled: false,
  ipWhitelist: ['192.168.1.1', '10.0.0.5'],
  newIp: '',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setBrandingLogo: (state, action) => {
      state.brandingLogo = action.payload;
    },
    setContactEmail: (state, action) => {
      state.contactEmail = action.payload;
    },
    setSupportPhone: (state, action) => {
      state.supportPhone = action.payload;
    },
    setTermsAndConditions: (state, action) => {
      state.termsAndConditions = action.payload;
    },
    setSearchQuerySettings: (state, action) => {
      state.searchQuery = action.payload;
    },
    setTwoFactorAuthEnabled: (state, action) => {
      state.twoFactorAuthEnabled = action.payload;
    },
    setIpWhitelist: (state, action) => {
      state.ipWhitelist = action.payload;
    },
    setNewIp: (state, action) => {
      state.newIp = action.payload;
    },
    addIpToWhitelist: (state) => {
      if (state.newIp && !state.ipWhitelist.includes(state.newIp)) {
        state.ipWhitelist.push(state.newIp);
        state.newIp = '';
      }
    },
    removeIpFromWhitelist: (state, action) => {
      state.ipWhitelist = state.ipWhitelist.filter((ip) => ip !== action.payload);
    },
    regenerateApiKeySettings: (state, action) => {
      const { id } = action.payload;
      const merchant = state.merchants.find((m) => m.id === id);
      if (merchant) {
        merchant.apiKey = `sk_live_${Math.random().toString(36).substring(2, 15)}`;
      }
    },
    toggleApiKeyStatusSettings: (state, action) => {
      const { id } = action.payload;
      const merchant = state.merchants.find((m) => m.id === id);
      if (merchant) {
        merchant.status = merchant.status === 'Active' ? 'Inactive' : 'Active';
      }
    },
  },
});

export const {
  setBrandingLogo,
  setContactEmail,
  setSupportPhone,
  setTermsAndConditions,
  setSearchQuerySettings,
  setTwoFactorAuthEnabled,
  setIpWhitelist,
  setNewIp,
  addIpToWhitelist,
  removeIpFromWhitelist,
  regenerateApiKeySettings,
  toggleApiKeyStatusSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;