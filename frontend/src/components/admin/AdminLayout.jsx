import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/admin" className="text-purple-600 flex items-center">
                  <span className="material-symbols-outlined text-2xl">restaurant</span>
                  <span className="text-xl font-bold ml-2">FoodBay Admin</span>
                </Link>
              </div>
              <nav className="ml-8 flex space-x-8">
                <Link to="/admin/products" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Products
                </Link>
                <Link to="/admin/users" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Users
                </Link>
                <Link to="/admin/orders" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Orders
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 