import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
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
} from '../features/financialSettlement/financialSettlementSlice';
import { jsPDF } from 'jspdf';

const FinancialSettlementManagement = () => {
  const dispatch = useDispatch();
  const {
    settlements,
    showConfirmationModal,
    selectedSettlement,
    globalCommission,
    merchantCommissionOverrides,
    searchTerm,
    filterStatus,
    filterMerchant,
    filterMinAmount,
    filterMaxAmount,
    selectedMerchantForCommission,
  } = useSelector((state) => state.financialSettlement);

  // Initial data (can be fetched from an API in a real application)
  useEffect(() => {
    dispatch(setSettlements([
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
    ]));
  }, [dispatch]);

  const handleApprove = (settlement) => {
    dispatch(setSelectedSettlement(settlement));
    dispatch(setShowConfirmationModal(true));
  };

  const confirmApprove = () => {
    if (selectedSettlement) {
      dispatch(updateSettlementStatus({ id: selectedSettlement.id, status: 'Completed' }));
      dispatch(setShowConfirmationModal(false));
      dispatch(setSelectedSettlement(null));
    }
  };

  const handleReject = (settlement) => {
    dispatch(setSelectedSettlement(settlement));
    dispatch(setShowConfirmationModal(true));
  };

  const confirmReject = () => {
    if (selectedSettlement) {
      dispatch(updateSettlementStatus({ id: selectedSettlement.id, status: 'Rejected' }));
      dispatch(setShowConfirmationModal(false));
      dispatch(setSelectedSettlement(null));
    }
  };

  const handleCommissionChange = (e) => {
    dispatch(setGlobalCommission(parseFloat(e.target.value)));
  };

  const handleMerchantCommissionChange = (e) => {
    dispatch(updateMerchantCommission({ merchantName: selectedMerchantForCommission, rate: parseFloat(e.target.value) }));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleFilterStatusChange = (e) => {
    dispatch(setFilterStatus(e.target.value));
  };

  const handleFilterMerchantChange = (e) => {
    dispatch(setFilterMerchant(e.target.value));
  };

  const handleFilterMinAmountChange = (e) => {
    dispatch(setFilterMinAmount(e.target.value));
  };

  const handleFilterMaxAmountChange = (e) => {
    dispatch(setFilterMaxAmount(e.target.value));
  };

  const handleSelectedMerchantForCommissionChange = (e) => {
    dispatch(setSelectedMerchantForCommission(e.target.value));
  };

  const filteredSettlements = settlements.filter((settlement) => {
    const matchesSearch = settlement.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          settlement.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || settlement.status === filterStatus;
    const matchesMerchant = filterMerchant === 'All' || settlement.merchantName === filterMerchant;
    const matchesMinAmount = filterMinAmount === '' || settlement.amount >= parseFloat(filterMinAmount);
    const matchesMaxAmount = filterMaxAmount === '' || settlement.amount <= parseFloat(filterMaxAmount);
    return matchesSearch && matchesStatus && matchesMerchant && matchesMinAmount && matchesMaxAmount;
  });

  const uniqueMerchants = [...new Set(settlements.map(s => s.merchantName))];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Financial Settlement Management</h1>

      {/* Global Commission Settings */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Commission Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="globalCommission" className="block text-sm font-medium text-gray-700">Global Commission Rate (%)</label>
            <input
              type="number"
              id="globalCommission"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={globalCommission}
              onChange={handleCommissionChange}
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="merchantCommissionOverride" className="block text-sm font-medium text-gray-700">Merchant Specific Commission Override (%)</label>
            <select
              id="merchantCommissionOverride"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedMerchantForCommission}
              onChange={handleSelectedMerchantForCommissionChange}
            >
              <option value="">Select Merchant</option>
              {uniqueMerchants.map(merchant => (
                <option key={merchant} value={merchant}>{merchant}</option>
              ))}
            </select>
            {selectedMerchantForCommission && (
              <input
                type="number"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={merchantCommissionOverrides[selectedMerchantForCommission] || globalCommission}
                onChange={handleMerchantCommissionChange}
                step="0.1"
                min="0"
              />
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
            <input
              type="text"
              id="search"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by ID or Merchant Name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="statusFilter"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={handleFilterStatusChange}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label htmlFor="merchantFilter" className="block text-sm font-medium text-gray-700">Merchant</label>
            <select
              id="merchantFilter"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterMerchant}
              onChange={handleFilterMerchantChange}
            >
              <option value="All">All</option>
              {uniqueMerchants.map(merchant => (
                <option key={merchant} value={merchant}>{merchant}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700">Min Amount</label>
            <input
              type="number"
              id="minAmount"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterMinAmount}
              onChange={handleFilterMinAmountChange}
            />
          </div>
          <div>
            <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700">Max Amount</label>
            <input
              type="number"
              id="maxAmount"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterMaxAmount}
              onChange={handleFilterMaxAmountChange}
            />
          </div>
        </div>
      </div>

      {/* Settlement List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Settlement List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Settlement ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSettlements.length > 0 ? (
                filteredSettlements.map((settlement) => (
                  <tr key={settlement.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{settlement.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{settlement.merchantName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{settlement.amount.toFixed(2)} {settlement.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{settlement.netAmount.toFixed(2)} {settlement.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(merchantCommissionOverrides[settlement.merchantName] || globalCommission).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        settlement.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        settlement.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {settlement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{settlement.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {settlement.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(settlement)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(settlement)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          dispatch(setSelectedSettlement(settlement));
                          dispatch(setShowConfirmationModal(true));
                        }}
                        className="text-blue-600 hover:text-blue-900 ml-3"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No settlements found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && selectedSettlement && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Action</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to {selectedSettlement.status === 'Pending' ? 'approve' : 'reject'} settlement ID: <strong>{selectedSettlement.id}</strong> for merchant <strong>{selectedSettlement.merchantName}</strong> with amount <strong>{selectedSettlement.amount.toFixed(2)} {selectedSettlement.currency}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => dispatch(setShowConfirmationModal(false))}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={selectedSettlement.status === 'Pending' ? confirmApprove : confirmReject}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedSettlement.status === 'Pending' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialSettlementManagement;