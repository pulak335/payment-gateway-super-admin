import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FinancialSettlementManagement from './pages/FinancialSettlementManagement';
import KYCCompliance from './pages/KYCCompliance';
import ReportsAnalytic from './pages/ReportsAnalytic';
import PaymentGatewayIntegration from './pages/PaymentGatewayIntegration';
import ApiKeyManagement from './pages/ApiKeyManagement';
import AccessControl from './pages/AccessControl';
import BackOfficeUserManagement from './pages/BackOfficeUserManagement';
import SettingsAndConfiguration from './pages/SettingsAndConfiguration';
import TransactionManagement from './pages/TransactionManagement';
import UserManagement from './pages/UserManagement';
import CMSPage from './pages/CMSPage';
import ViewAllMerchants from './pages/ViewAllMerchants';
import Notification from './pages/Notification';
import SupportPage from './pages/SupportPage';
import ComplaintManagementPage from './pages/ComplaintManagementPage';
import LiveChatSupportPage from './pages/LiveChatSupportPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/content-management" element={<CMSPage />} />
          <Route path="/payment-gateways" element={<PaymentGatewayIntegration />} />
          <Route path="/settlements" element={<FinancialSettlementManagement />} />
          <Route path="/kyc" element={<KYCCompliance />} />
          <Route path="/reports" element={<ReportsAnalytic />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/settings-configuration" element={<SettingsAndConfiguration />} />
          <Route path="/api-key-management" element={<ApiKeyManagement />} />
          <Route path="/access-control" element={<AccessControl />} />
          <Route path="/back-office-users" element={<BackOfficeUserManagement />} />
          <Route path="/merchants" element={<ViewAllMerchants />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/complaint-management" element={<ComplaintManagementPage />} />
          <Route path="/live-chat-support" element={<LiveChatSupportPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
