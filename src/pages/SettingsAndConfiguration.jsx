import React, { useState } from 'react';

const SettingsAndConfiguration = () => {
  const [brandingLogo, setBrandingLogo] = useState(null);
  const [contactEmail, setContactEmail] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [merchants, setMerchants] = useState([
    { id: 1, name: 'Merchant A', apiKey: 'sk_live_xxxxxxxxxxxxxx', status: 'active' },
    { id: 2, name: 'Merchant B', apiKey: 'sk_live_yyyyyyyyyyyyyy', status: 'inactive' },
  ]);
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [ipWhitelist, setIpWhitelist] = useState(['192.168.1.1', '10.0.0.5']);
  const [newIp, setNewIp] = useState('');

  const handleLogoUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setBrandingLogo(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleAddIp = () => {
    if (newIp && !ipWhitelist.includes(newIp)) {
      setIpWhitelist([...ipWhitelist, newIp]);
      setNewIp('');
    }
  };

  const handleRemoveIp = (ipToRemove) => {
    setIpWhitelist(ipWhitelist.filter(ip => ip !== ipToRemove));
  };

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
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Settings & Configuration</h2>

      {/* General Settings Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">General Settings</h3>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="brandingLogo">
            Branding Logo
          </label>
          <input
            type="file"
            id="brandingLogo"
            accept="image/*"
            onChange={handleLogoUpload}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
          {brandingLogo && <img src={brandingLogo} alt="Branding Logo Preview" className="mt-2 h-20" />}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="contactEmail">
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="support@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="supportPhone">
            Support Phone
          </label>
          <input
            type="tel"
            id="supportPhone"
            value={supportPhone}
            onChange={(e) => setSupportPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="+1-XXX-XXX-XXXX"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="termsAndConditions">
            Terms & Conditions Editor
          </label>
          <textarea
            id="termsAndConditions"
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline h-48"
            placeholder="Enter your terms and conditions here..."
          ></textarea>
        </div>
      </div>

      {/* API Key Management */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">API Key Management</h3>
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

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Security Settings</h3>
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="twoFactorAuth" className="text-gray-700 dark:text-gray-300 font-bold mr-2">2FA (Two-Factor Authentication)</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="twoFactorAuth"
              className="sr-only peer"
              checked={twoFactorAuthEnabled}
              onChange={() => setTwoFactorAuthEnabled(!twoFactorAuthEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">IP Whitelist</label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2"
              placeholder="Add new IP address"
            />
            <button
              onClick={handleAddIp}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {ipWhitelist.map((ip, index) => (
              <li key={index} className="flex justify-between items-center py-1">
                {ip}
                <button
                  onClick={() => handleRemoveIp(ip)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsAndConfiguration;