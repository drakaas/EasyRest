import React from 'react';

export default function OrderFilters({ onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search Orders</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search by ID, customer..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          onChange={(e) => onFilterChange('dateRange', e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="total_high">Total (High to Low)</option>
          <option value="total_low">Total (Low to High)</option>
        </select>
      </div>
    </div>
  );
} 