/**
 * Sidebar Component
 * Left navigation menu
 */

import React from 'react';

function Sidebar({ isOpen, user, onLogout }) {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '#/' },
    { icon: '💰', label: 'Sales', href: '#/sales' },
    { icon: '👥', label: 'Customers', href: '#/customers' },
    { icon: '📦', label: 'Products', href: '#/products' },
    { icon: '🔍', label: 'Search', href: '#/search' },
    { icon: '⚙️', label: 'Settings', href: '#/settings' }
  ];

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gray-900 text-white transition-all duration-300 flex flex-col h-screen shadow-lg`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className={`text-2xl font-bold ${isOpen ? '' : 'text-center'}`}>
          {isOpen ? '🚀 GPS' : '🚀'}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition duration-200"
                title={item.label}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="font-medium">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer - User Info */}
      <div className="border-t border-gray-700 p-4">
        <div className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'}`}>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.[0] || 'U'}
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-400">{user?.role || 'user'}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
