import React, { useState } from 'react';

const ApiKeyManagement = () => {
  const [merchants, setMerchants] = useState([
    { id: 1, name: 'Merchant A', apiKey: 'sk_live_xxxxxxxxxxxxxx', status: 'active' },
    { id: 2, name: 'Merchant B', apiKey: 'sk_live_yyyyyyyyyyyyyy', status: 'inactive' },
    { id: 3, name: 'Merchant C', apiKey: 'sk_live_zzzzzzzzzzzzzz', status: 'active' },
  ]);

  const handleRegenerateKey = (id) => {
    setMerchants(merchants.map(merchant =>
      merchant.id === id ? { ...merchant, apiKey: `sk_live_${Math.random().toString(36).substring(2, 15)}` } : merchant
    ));
  };

  const handleToggleKeyStatus = (id) => {
    setMerchants(merchants.map(merchant =>
      merchant.id === id ? { ...merchant, status: merchant.status === 'active' ? 'inactive' : 'active' } : merchant
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">API Key Management</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Merchant API Keys</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-600">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200 font-semibold">Merchant Name</th>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200 font-semibold">API Key</th>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200 font-semibold">Status</th>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant) => (
                <tr key={merchant.id} className="border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                  <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{merchant.name}</td>
                  <td className="py-2 px-4 text-gray-800 dark:text-gray-200 font-mono text-sm">{merchant.apiKey}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${merchant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {merchant.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleRegenerateKey(merchant.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm mr-2"
                    >
                      Regenerate
                    </button>
                    <button
                      onClick={() => handleToggleKeyStatus(merchant.id)}
                      className={`${merchant.status === 'active' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-1 px-2 rounded text-sm`}
                    >
                      {merchant.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
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

export default ApiKeyManagement;