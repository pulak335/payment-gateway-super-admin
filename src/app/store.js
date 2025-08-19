import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import apiKeyReducer from '../features/apiKeys/apiKeySlice';
import settingsReducer from '../features/settings/settingsSlice';
import financialSettlementReducer from '../features/financialSettlement/financialSettlementSlice';
import transactionManagementReducer from '../features/transactionManagement/transactionManagementSlice';
import reportsAnalyticsReducer from '../features/reportsAnalytics/reportsAnalyticsSlice';
import userManagementReducer from '../features/userManagement/userManagementSlice';
import backOfficeUserManagementReducer from '../features/backOfficeUserManagement/backOfficeUserManagementSlice';
import viewAllMerchantsReducer from '../features/viewAllMerchants/viewAllMerchantsSlice';
import paymentGatewayIntegrationReducer from '../features/paymentGatewayIntegration/paymentGatewayIntegrationSlice';
import kycComplianceReducer from '../features/kycCompliance/kycComplianceSlice';
import accessControlReducer from '../features/accessControl/accessControlSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    apiKeys: apiKeyReducer,
    settings: settingsReducer,
    financialSettlement: financialSettlementReducer,
    transactionManagement: transactionManagementReducer,
    reportsAnalytics: reportsAnalyticsReducer,
    userManagement: userManagementReducer,
    backOfficeUserManagement: backOfficeUserManagementReducer,
    viewAllMerchants: viewAllMerchantsReducer,
    accessControl: accessControlReducer,
    paymentGatewayIntegration: paymentGatewayIntegrationReducer,
    kycCompliance: kycComplianceReducer,
  },
});