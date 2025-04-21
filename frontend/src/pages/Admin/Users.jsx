import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import UserStats from '../../components/admin/UserStats';
import UserList from '../../components/admin/UserList';
import UserDetail from '../../components/admin/UserDetail';

// Mock data - replace with actual API calls
const mockStats = {
  totalUsers: 256,
  newThisMonth: 35,
  activeUsers: 128,
  totalRevenue: '9.8k',
  activityData: [30, 70, 45, 80, 65, 50, 90],
  userDistribution: [
    { type: 'Regular Users', percentage: 65, color: 'purple' },
    { type: 'Premium Users', percentage: 25, color: 'blue' },
    { type: 'Business Users', percentage: 10, color: 'yellow' }
  ]
};

const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    status: { text: 'Active', color: 'green' },
    orders: 23,
    type: 'Premium User',
    location: 'New York, NY, United States',
    totalSpent: 458,
    rating: 4.8,
    recentActivity: [
      {
        date: 'Today, 10:45 AM',
        action: 'Logged in',
        icon: 'login',
        color: 'blue',
        details: 'Mobile App (iOS)',
        status: 'Completed',
        statusColor: 'green'
      },
      {
        date: 'Yesterday, 7:30 PM',
        action: 'Placed order',
        icon: 'shopping_cart',
        color: 'green',
        details: 'Order #38291',
        status: 'Completed',
        statusColor: 'green'
      }
    ]
  },
  // Add more mock users here
];

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filter users based on search term and status
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || 
      user.status.text.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleViewUser = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    setSelectedUser(user);
  };

  const handleEditUser = (userId) => {
    // Implement edit functionality
    console.log('Edit user:', userId);
  };

  const handleDeleteUser = (userId) => {
    // Implement delete functionality
    console.log('Delete user:', userId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Management</h2>
      
      {/* User Stats */}
      <UserStats stats={mockStats} />
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search by name, email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
            <option value="orders">Most Orders</option>
          </select>
        </div>
      </div>
      
      {/* User List */}
      <UserList 
        users={filteredUsers} 
        onView={handleViewUser} 
        onEdit={handleEditUser} 
        onDelete={handleDeleteUser} 
      />
      
      {/* Selected User Detail */}
      {selectedUser && (
        <UserDetail 
          user={selectedUser} 
          onEdit={handleEditUser} 
          onDelete={handleDeleteUser} 
        />
      )}
    </div>
  );
}