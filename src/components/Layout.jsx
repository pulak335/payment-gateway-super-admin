import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaKey, FaUserShield, FaUser } from 'react-icons/fa';

const Layout = ({ children }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <div className="flex h-screen w-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 text-xl font-semibold text-gray-800 dark:text-white">Shortlypay Admin</div>
        <nav className="mt-4">
          {/* Navigation Items */}
          <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.293 3.293a1 1 0 011.414 0l6 6a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 00-1 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2a1 1 0 00-1-1H5a1 1 0 01-1-1v-6a1 1 0 01.293-.707l6-6z" clipRule="evenodd" />
            </svg>
            <span className="ml-3">Dashboard</span>
          </Link>
              <Link to="/user-management" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaUser className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">User Management</span>
              </Link>
              <ul className="py-2 space-y-2">
                <li>
                  <Link to="/user-management/back-office-users" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    Back Office Users
                  </Link>
                </li>
              </ul>
          <Link to="/merchants" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 4a4 4 0 100 8 4 4 0 000-8zm-2 9a4 4 0 00-4 4v1a2 2 0 002 2h8a2 2 0 002-2v-1a4 4 0 00-4-4h-4z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Merchants</span>
          </Link>
          <Link to="/transactions" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 7a2 2 0 012 2v5a2 2 0 01-2 2h-2a2 2 0 01-2-2V9a2 2 0 012-2h2zm0-5a2 2 0 012 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2V4a2 2 0 012-2h2zm-4 9a2 2 0 012 2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8 0a2 2 0 012 2v5a2 2 0 01-2 2h-2a2 2 0 01-2-2v-5a2 2 0 012-2h2z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Transactions</span>
          </Link>
          <Link to="/payment-gateways" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h16v3H4V6zm0 5h16v7H4v-7z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Payment Gateways</span>
          </Link>
          <Link to="/settlements" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Settlements</span>
          </Link>
          <Link to="/kyc" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">KYC & Compliance</span>
          </Link>
          <Link to="/reports" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Reports & Analytics</span>
          </Link>
          <Link to="/notifications" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Notifications</span>
          </Link>
          <NavLink to="/settings-configuration" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm-1-7H9a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2h-2Z"/>
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Settings & Configuration</span>
          </NavLink>
            <NavLink to="/api-key-management" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
              <FaKey className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">API Key Management</span>
            </NavLink>
            <NavLink to="/access-control" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
              <FaUserShield className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Access Control</span>
            </NavLink>
            
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {currentDateTime.toLocaleString()}
            </span>
          </div>
          {/* Quick Actions, Notifications, Profile Menu */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleNotifications} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
{
        showNotifications && 
            <div className="absolute right-20 top-16 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">New user registration</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">System update completed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div> 
              
}
                
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;