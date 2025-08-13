import React, { useState } from 'react';

const FinancialSettlementManagement = () => {
  const [settlements, setSettlements] = useState([
    {
      id: 1,
      merchant: 'Merchant A',
      amount: 1500.75,
      requestedDate: '2023-10-20',
      status: 'Pending',
    },
    {
      id: 2,
      merchant: 'Merchant B',
      amount: 2300.00,
      requestedDate: '2023-10-18',
      status: 'Approved',
    },
    {
      id: 3,
      merchant: 'Merchant C',
      amount: 800.50,
      requestedDate: '2023-10-22',
      status: 'Pending',
    },
    {
      id: 4,
      merchant: 'Merchant D',
      amount: 800.50,
      requestedDate: '2023-10-22',
      status: 'Pending',
    },
  ]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [globalCommission, setGlobalCommission] = useState(2.5);
  const [merchantCommissionOverrides, setMerchantCommissionOverrides] = useState({
    'Merchant B': 2.0,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleApproveReject = (settlement, action) => {
    setSelectedSettlement({ ...settlement, action });
    setShowConfirmationModal(true);
  };

  const confirmAction = () => {
    if (selectedSettlement) {
      setSettlements(settlements.map((s) =>
        s.id === selectedSettlement.id
          ? { ...s, status: selectedSettlement.action === 'approve' ? 'Approved' : 'Rejected' }
          : s
      ));
      setShowConfirmationModal(false);
      setSelectedSettlement(null);
    }
  };

  const cancelAction = () => {
    setShowConfirmationModal(false);
    setSelectedSettlement(null);
  };

  const handleGlobalCommissionChange = (e) => {
    setGlobalCommission(parseFloat(e.target.value));
  };

  const handleMerchantCommissionOverrideChange = (merchant, value) => {
    setMerchantCommissionOverrides({
      ...merchantCommissionOverrides,
      [merchant]: parseFloat(value),
    });
  };

  const filteredSettlements = settlements.filter((s) =>
    s.merchant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Financial & Settlement Management</h1>

      {/* Settlements Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Settlements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Requested Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((settlement) => (
                <tr key={settlement.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{settlement.merchant}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${settlement.amount.toFixed(2)}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{settlement.requestedDate}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        settlement.status === 'Approved' ? 'text-green-900' :
                        settlement.status === 'Pending' ? 'text-yellow-900' :
                        'text-red-900'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 opacity-50 rounded-full ${
                          settlement.status === 'Approved' ? 'bg-green-200' :
                          settlement.status === 'Pending' ? 'bg-yellow-200' :
                          'bg-red-200'
                        }`}
                      ></span>
                      <span className="relative">{settlement.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {settlement.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveReject(settlement, 'approve')}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-md text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproveReject(settlement, 'reject')}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Merchant Balance Overview */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Merchant Balance Overview</h2>
        <div className="mb-4">
          <label htmlFor="merchantSearch" className="block text-gray-700 text-sm font-bold mb-2">
            Search Merchant:
          </label>
          <input
            type="text"
            id="merchantSearch"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter merchant name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Current Balance
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Settlement Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSettlements.map((settlement) => (
                <tr key={settlement.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{settlement.merchant}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">$0.00</p> {/* Placeholder */}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">N/A</p> {/* Placeholder */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission Rate Settings */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Commission Rate Settings</h2>
        <div className="mb-4">
          <label htmlFor="globalCommission" className="block text-gray-700 text-sm font-bold mb-2">
            Global Commission (%):
          </label>
          <input
            type="number"
            id="globalCommission"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={globalCommission}
            onChange={handleGlobalCommissionChange}
            step="0.1"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2"></h3>
        {Object.keys(merchantCommissionOverrides).map((merchant) => (
          <div key={merchant} className="mb-2 flex items-center">
            <label htmlFor={`commission-${merchant}`} className="block text-gray-700 text-sm font-bold w-32">
              {merchant}:
            </label>
            <input
              type="number"
              id={`commission-${merchant}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={merchantCommissionOverrides[merchant]}
              onChange={(e) => handleMerchantCommissionOverrideChange(merchant, e.target.value)}
              step="0.1"
            />
          </div>
        ))}
        {/* Add button to add new merchant override */}
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && selectedSettlement && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4">Confirm Action</h3>
            <p className="mb-4">
              Are you sure you want to {selectedSettlement.action} settlement for{' '}
              <span className="font-semibold">{selectedSettlement.merchant}</span> with amount{' '}
              <span className="font-semibold">${selectedSettlement.amount.toFixed(2)}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelAction}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`font-bold text-white py-2 px-4 rounded-md ${
                  selectedSettlement.action === 'approve' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {selectedSettlement.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialSettlementManagement;