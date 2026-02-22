/**
 * Header Component
 * Top navigation bar
 */

import React, { useState } from 'react';

function Header({ user, onMenuClick, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">

        {/* Left Side - Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Toggle sidebar"
          >
            ☰
          </button>
          <div className="text-xl font-bold text-blue-600">GPS</div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search sales, customers..."
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right Side - User Menu */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-gray-100 rounded-lg transition"
            title="Notifications"
          >
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.[0] || 'U'}
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    // Navigate to settings
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
                >
                  ⚙️ Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    // Navigate to profile
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  👤 Profile
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 last:rounded-b-lg"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
