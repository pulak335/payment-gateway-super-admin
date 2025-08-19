import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaKey, FaUserShield, FaUser, FaUserCog , FaUsers, FaLifeRing, FaClipboardList, FaComments  } from 'react-icons/fa';
import { MdSpaceDashboard , MdOutlinePayment, MdJoinFull } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { SiDocsdotrs, SiPayloadcms } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";



const Layout = ({ children }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
          <NavLink to="/" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <MdSpaceDashboard className= "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></MdSpaceDashboard>
            <span className="ml-3">Dashboard</span>
          </NavLink>
          <NavLink to="/user-management" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <FaUser className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ml-3 whitespace-nowrap">User Management</span>
          </NavLink>
          <NavLink to="/back-office-users" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <FaUserCog  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ml-3 whitespace-nowrap">Back Office Users</span>
          </NavLink>
          <NavLink to="/merchants" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <FaUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ml-3 whitespace-nowrap">Merchants</span>
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <FaMoneyBillTransfer className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ml-3 whitespace-nowrap">Transactions</span>
          </NavLink>
          <NavLink to="/payment-gateways" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <MdOutlinePayment className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
            <span className="flex-1 ml-3 whitespace-nowrap">Payment Gateway</span>
          </NavLink>
          <NavLink to="/settlements" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <MdJoinFull className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ml-3 whitespace-nowrap">settlements</span>
          </NavLink>
          <NavLink to="/kyc" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <SiDocsdotrs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ml-3 whitespace-nowrap">KYC & Compliance</span>
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <TbReport className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ml-3 whitespace-nowrap">Reports & Analytics</span>
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Notifications</span>
          </NavLink>
          <NavLink to="/settings-configuration" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <IoIosSettings className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ms-3 whitespace-nowrap">Settings & Configuration</span>
          </NavLink>
            <NavLink to="/api-key-management" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
              <FaKey className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">API Key Management</span>
            </NavLink>
            <NavLink to="/access-control" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
              <FaUserShield className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Access Control</span>
            </NavLink>
            <NavLink to="/content-management" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
              <SiPayloadcms className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">CMS</span>
            </NavLink>
            <NavLink to="/support" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
              <FaLifeRing className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Support</span>
            </NavLink>
            <NavLink to="/complaint-management" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
              <FaClipboardList className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Complaint Management</span>
            </NavLink>
            <NavLink to="/live-chat-support" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
              <FaComments className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Live Chat Support</span>
            </NavLink>
            
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center space-x-4">
            <h1 className="!text-xl font-semibold text-gray-800 dark:text-white">
              Dashboard {'| Welcome, '}
              {currentDateTime.getHours() >= 0 && currentDateTime.getHours() < 12 
                ? '🌄 Good Morning'
                : currentDateTime.getHours() >= 12 && currentDateTime.getHours() < 13
                ? '☀️ Good Noon' 
                : currentDateTime.getHours() >= 13 && currentDateTime.getHours() < 17
                ? '🌞 Good Afternoon'
                : currentDateTime.getHours() >= 17 && currentDateTime.getHours() < 21
                ? '🌇 Good Evening'
                : '🌃 Good Mid Night'}
            </h1>
            <span className="text-purple-600 font-bold dark:text-gray-400 text-xm">
              {currentDateTime.toLocaleString()}
            </span>
          </div>
          {/* Quick Actions, Notifications, Profile Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-10 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 z-50">
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
              )}
            </div>
            
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