import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBrandingLogo, setContactEmail, setSupportPhone, setTermsAndConditions, setSearchQuerySettings, setTwoFactorAuthEnabled, setIpWhitelist, setNewIp, addIpToWhitelist, removeIpFromWhitelist, regenerateApiKeySettings, toggleApiKeyStatusSettings } from '../features/settings/settingsSlice';

const SettingsAndConfiguration = () => {
  const dispatch = useDispatch();
  const { brandingLogo, contactEmail, supportPhone, termsAndConditions, searchQuery, merchants, twoFactorAuthEnabled, ipWhitelist, newIp } = useSelector((state) => state.settings);

  useEffect(() => {
    // This useEffect can be used for initial data loading or other side effects if needed
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setBrandingLogo(URL.createObjectURL(file)));
    }
  };

  const handleAddIp = () => {
    dispatch(addIpToWhitelist());
  };

  const handleRemoveIp = (ipToRemove) => {
    dispatch(removeIpFromWhitelist(ipToRemove));
  };

  const handleRegenerateKey = (id) => {
    dispatch(regenerateApiKeySettings({ id }));
  };

  const handleToggleStatus = (id) => {
    dispatch(toggleApiKeyStatusSettings({ id }));
  };

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            value={contactEmail}
            onChange={(e) => dispatch(setContactEmail(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="supportPhone">
            Support Phone
          </label>
          <input
            type="tel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            value={supportPhone}
            onChange={(e) => dispatch(setSupportPhone(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="termsAndConditions">
            Terms & Conditions Editor
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline h-32"
            value={termsAndConditions}
            onChange={(e) => dispatch(setTermsAndConditions(e.target.value))}
          ></textarea>
        </div>
      </div>

      {/* API Key Management */}
      {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">API Key Management</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search merchants..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuerySettings(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
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
              {filteredMerchants.map((merchant) => (
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
                      className="!bg-blue-500 !hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm mr-2"
                    >
                      Regenerate
                    </button>
                    <button
                      onClick={() => handleToggleKeyStatus(merchant.id)}
                      className={`${merchant.status === 'active' ? '!bg-red-500 !hover:bg-red-700' : '!bg-green-500 !hover:bg-green-700'} text-white font-bold py-1 px-2 rounded text-sm`}
                    >
                      {merchant.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Security Settings</h3>
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="twoFactorAuth" className="text-gray-700 dark:text-gray-300 font-bold mr-2">2FA (Two-Factor Authentication)</label>
          <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={twoFactorAuthEnabled}
            onChange={(e) => dispatch(setTwoFactorAuthEnabled(e.target.checked))}
            className="mr-2 leading-tight"
          />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">IP Whitelist</label>
          <div className="flex mb-2">
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter new IP address"
            value={newIp}
            onChange={(e) => dispatch(setNewIp(e.target.value))}
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