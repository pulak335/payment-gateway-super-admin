import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FinancialSettlementManagement from './pages/FinancialSettlementManagement';
import KYCCompliance from './pages/KYCCompliance';
import ReportsAnalytics from './pages/ReportsAnalytics';
import PaymentGatewayIntegration from './pages/PaymentGatewayIntegration';
import ApiKeyManagement from './pages/ApiKeyManagement';
import AccessControl from './pages/AccessControl';
import BackOfficeUserManagement from './pages/BackOfficeUserManagement';
import SettingsAndConfiguration from './pages/SettingsAndConfiguration';
import TransactionManagement from './pages/TransactionManagement';
import UserManagement from './pages/UserManagement';
import ViewAllMerchants from './pages/ViewAllMerchants';
import Notification from './pages/Notification';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/payment-gateways" element={<PaymentGatewayIntegration />} />
          <Route path="/settlements" element={<FinancialSettlementManagement />} />
          <Route path="/kyc" element={<KYCCompliance />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/settings-configuration" element={<SettingsAndConfiguration />} />
          <Route path="/api-key-management" element={<ApiKeyManagement />} />
          <Route path="/access-control" element={<AccessControl />} />
          <Route path="/user-management/back-office-users" element={<BackOfficeUserManagement />} />
          <Route path="/merchants" element={<ViewAllMerchants />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
