import React, { useState } from 'react';

const PaymentGatewayIntegration = () => {
  const [gateways, setGateways] = useState([
    {
      id: 1,
      name: 'Stripe',
      status: true,
      fee: 2.9,
      limit: 100000,
      apiKey: 'sk_test_stripe_123',
      secretKey: 'sec_test_stripe_abc',
    },
    {
      id: 2,
      name: 'PayPal',
      status: false,
      fee: 3.5,
      limit: 50000,
      apiKey: 'sb-paypal_test_456',
      secretKey: 'sec_paypal_test_def',
    },
    {
      id: 3,
      name: 'Square',
      status: true,
      fee: 2.6,
      limit: 75000,
      apiKey: 'sq0cs_test_789',
      secretKey: 'sec_square_test_ghi',
    },
    {
      id: 4,
      name: 'Bkash',
      status: true,
      fee: 2.6,
      limit: 75000,
      apiKey: 'sq0cs_test_789',
      secretKey: 'sec_square_test_ghi',
    },
    {
      id: 5,
      name: 'Nagad',
      status: true,
      fee: 2.6,
      limit: 75000,
      apiKey: 'sq0cs_test_789',
      secretKey: 'sec_square_test_ghi',
    },
    {
      id: 6,
      name: 'Visa',
      status: true,
      fee: 2.6,
      limit: 75000,
      apiKey: 'sq0cs_test_789',
      secretKey: 'sec_square_test_ghi',
    }
  ]);

  const [selectedGateway, setSelectedGateway] = useState(null);
  const [apiLogs, setApiLogs] = useState([
    {
      id: 1,
      date: '2023-10-26 10:00:00',
      endpoint: '/api/payments/charge',
      merchant: 'Merchant A',
      status: 'Success',
      responseTime: '150ms',
    },
    {
      id: 2,
      date: '2023-10-26 10:05:00',
      endpoint: '/api/refunds',
      merchant: 'Merchant B',
      status: 'Failed',
      responseTime: '200ms',
    },
    {
      id: 3,
      date: '2023-10-26 10:10:00',
      endpoint: '/api/webhooks',
      merchant: 'Merchant C',
      status: 'Success',
      responseTime: '100ms',
    },
    {
      id: 4,
      date: '2023-10-26 10:10:00',
      endpoint: '/api/webhooks',
      merchant: 'Merchant C',
      status: 'Success',
      responseTime: '100ms',
    },
    {
      id: 5,
      date: '2023-10-26 10:10:00',
      endpoint: '/api/webhooks',
      merchant: 'Merchant C',
      status: 'Failed',
      responseTime: '100ms',
    },
  ]);

  const handleToggleStatus = (id) => {
    setGateways(gateways.map((g) => (g.id === id ? { ...g, status: !g.status } : g)));
  };

  const handleEditGateway = (gateway) => {
    setSelectedGateway(gateway);
  };

  const handleSaveConfiguration = (e) => {
    e.preventDefault();
    // Logic to save configuration
    console.log('Saving configuration for:', selectedGateway);
    setSelectedGateway(null); // Close form after saving
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Gateway & Integration</h1>

      {/* Gateway List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gateway List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gateways.map((gateway) => (
            <div key={gateway.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium text-gray-800">{gateway.name}</h3>
                <label htmlFor={`toggle-${gateway.id}`} className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={`toggle-${gateway.id}`}
                      className="sr-only"
                      checked={gateway.status}
                      onChange={() => handleToggleStatus(gateway.id)}
                    />
                    <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                        gateway.status ? 'translate-x-full bg-blue-600' : ''
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 text-gray-700 font-medium">
                    {gateway.status ? 'Enabled' : 'Disabled'}
                  </div>
                </label>
              </div>
              <p className="text-gray-600">Status: {gateway.status ? 'Active' : 'Inactive'}</p>
              <p className="text-gray-600">Fee: {gateway.fee}%</p>
              <p className="text-gray-600">Limit: ${gateway.limit.toLocaleString()}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleEditGateway(gateway)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm"
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gateway Configuration Form */}
      {selectedGateway && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Configure {selectedGateway.name}</h2>
          <form onSubmit={handleSaveConfiguration}>
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-gray-700 text-sm font-bold mb-2">
                API Key:
              </label>
              <input
                type="text"
                id="apiKey"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedGateway.apiKey}
                onChange={(e) => setSelectedGateway({ ...selectedGateway, apiKey: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="secretKey" className="block text-gray-700 text-sm font-bold mb-2">
                Secret Key:
              </label>
              <input
                type="text"
                id="secretKey"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedGateway.secretKey}
                onChange={(e) => setSelectedGateway({ ...selectedGateway, secretKey: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fee" className="block text-gray-700 text-sm font-bold mb-2">
                Fee (%):
              </label>
              <input
                type="number"
                id="fee"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedGateway.fee}
                onChange={(e) => setSelectedGateway({ ...selectedGateway, fee: parseFloat(e.target.value) })}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="limit" className="block text-gray-700 text-sm font-bold mb-2">
                Limit:
              </label>
              <input
                type="number"
                id="limit"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedGateway.limit}
                onChange={(e) => setSelectedGateway({ ...selectedGateway, limit: parseFloat(e.target.value) })}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
              >
                Save Configuration
              </button>
              <button
                type="button"
                onClick={() => setSelectedGateway(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* API Logs Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">API Logs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Response Time
                </th>
              </tr>
            </thead>
            <tbody>
              {apiLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{log.date}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{log.endpoint}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{log.merchant}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        log.status === 'Success' ? 'text-green-900' : 'text-red-900'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 opacity-50 rounded-full ${
                          log.status === 'Success' ? 'bg-green-200' : 'bg-red-200'
                        }`}
                      ></span>
                      <span className="relative">{log.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{log.responseTime}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayIntegration;