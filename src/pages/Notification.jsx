import React, { useState } from 'react';

const Notification = () => {
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementAttachments, setAnnouncementAttachments] = useState(null);
  const [targetAudience, setTargetAudience] = useState('all'); // 'all' or 'specific'
  const [specificMerchants, setSpecificMerchants] = useState('');

  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New feature: Reports & Analytics is now live!', read: false, timestamp: '2023-10-26 10:00 AM' },
    { id: 2, message: 'System maintenance scheduled for 2023-11-01.', read: true, timestamp: '2023-10-25 03:00 PM' },
    { id: 3, message: 'Security update applied successfully.', read: false, timestamp: '2023-10-24 09:00 AM' },
  ]);

  const toggleNotificationsDropdown = () => {
    setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
  };

  const handleSendAnnouncement = () => {
    alert('Announcement Sent!');
    // Logic to send announcement
    setAnnouncementTitle('');
    setAnnouncementMessage('');
    setAnnouncementAttachments(null);
    setTargetAudience('all');
    setSpecificMerchants('');
  };

  const handleAttachmentChange = (e) => {
    setAnnouncementAttachments(e.target.files[0]);
  };

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: !notif.read } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* Announcement Composer */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Announcement Composer</h2>
        <div className="mb-4">
          <label htmlFor="announcementTitle" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="announcementTitle"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="announcementMessage" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="announcementMessage"
            rows="5"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={announcementMessage}
            onChange={(e) => setAnnouncementMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="announcementAttachments" className="block text-sm font-medium text-gray-700">Attachments</label>
          <input
            type="file"
            id="announcementAttachments"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleAttachmentChange}
          />
          {announcementAttachments && <p className="mt-2 text-sm text-gray-500">Selected file: {announcementAttachments.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Target Audience</label>
          <div className="mt-1 flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="targetAudience"
                value="all"
                checked={targetAudience === 'all'}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
              <span className="ml-2">All Merchants</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="targetAudience"
                value="specific"
                checked={targetAudience === 'specific'}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
              <span className="ml-2">Specific Merchants</span>
            </label>
          </div>
          {targetAudience === 'specific' && (
            <input
              type="text"
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter merchant IDs, comma-separated"
              value={specificMerchants}
              onChange={(e) => setSpecificMerchants(e.target.value)}
            />
          )}
        </div>
        <button
          onClick={handleSendAnnouncement}
          className="px-4 py-2 !bg-blue-600 text-white rounded-md !hover:bg-blue-700 !focus:outline-none !focus:ring-2 !focus:ring-blue-500 1focus:ring-offset-2"
        >
          Send Announcement
        </button>
      </div>

      {/* Notifications Panel */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications Panel</h2>
        <div className="relative inline-block text-left mb-4">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded={isNotificationsDropdownOpen}
            aria-haspopup="true"
            onClick={toggleNotificationsDropdown}
          >
            <svg
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6 6 0 0110.917-2.757 1.5 1.5 0 00-2.606-.858C12.93 6.32 12 7.25 12 7.25S11.07 6.32 9.439 5.385A1.5 1.5 0 006.833 6.143 6 6 0 015.25 9zm0 0v.008H4.5A2.25 2.25 0 002.25 11.25v2.5A2.25 2.25 0 004.5 16h.75v.008c0 .714.486 1.37 1.21 1.589A6.75 6.75 0 0012 20.25a6.75 6.75 0 005.54-2.653c.724-.219 1.21-.875 1.21-1.589V16h.75a2.25 2.25 0 002.25-2.25v-2.5A2.25 2.25 0 0019.5 9h-.75v-.008A6 6 0 015.25 9zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                clipRule="evenodd"
              />
            </svg>
            Notifications ({unreadCount})
          </button>

          {isNotificationsDropdownOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                {notifications.length === 0 ? (
                  <p className="px-4 py-2 text-sm text-gray-500">No new notifications.</p>
                ) : (
                  <>
                    {notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`flex justify-between items-start px-4 py-2 text-sm ${notif.read ? 'text-gray-500 bg-gray-50' : 'text-gray-900 font-semibold bg-white'} hover:bg-gray-100`}
                        role="menuitem"
                        tabIndex="-1"
                        id={`menu-item-${notif.id}`}
                      >
                        <div className="flex-1 pr-2">
                          <p>{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.timestamp}</p>
                        </div>
                        <button
                          onClick={() => toggleReadStatus(notif.id)}
                          className="flex-shrink-0 ml-2 text-blue-500 hover:text-blue-700 text-xs"
                        >
                          {notif.read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 mt-1 pt-1">
                      <button
                        onClick={markAllAsRead}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                      >
                        Mark All as Read
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Notification;