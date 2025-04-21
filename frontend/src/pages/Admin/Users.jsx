import React, { useState } from 'react';
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
        details: 'Order #45982 - $32.50',
        status: 'Delivered',
        statusColor: 'green'
      },
      {
        date: 'May 12, 2023',
        action: 'Left review',
        icon: 'rate_review',
        color: 'purple',
        details: '"Great food, fast delivery!" (5★)',
        status: 'Published',
        statusColor: 'purple'
      },
      {
        date: 'May 5, 2023',
        action: 'Placed order',
        icon: 'shopping_cart',
        color: 'green',
        details: 'Order #45768 - $28.99',
        status: 'Delivered',
        statusColor: 'green'
      }
    ]
  },
  // Other users...
];

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    console.log('Edit user:', userId);
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user:', userId);
  };

  const handleAddUser = () => {
    console.log('Add new user');
  };

  const handleRefresh = () => {
    console.log('Refresh user list');
  };

  const handleUserCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="px-14 py-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-gray-700">User Management</h2>
        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
          <button 
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            onClick={handleAddUser}
          >
            <span className="material-symbols-outlined">person_add</span>
            Add New User
          </button>
          <button 
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            onClick={handleRefresh}
          >
            <span className="material-symbols-outlined">refresh</span>
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10">
        {/* User Statistics - Now on the left side */}
        <div className="lg:col-span-4 bg-white rounded-lg shadow-md p-6">
          <UserStats stats={mockStats} />
        </div>
        
        {/* User Management - Now on the right side */}
        <div className="lg:col-span-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium mb-4">User List</h3>
          
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap sm:flex-nowrap">
              <div className="relative w-full sm:w-auto">
                <input 
                  placeholder="Search users..." 
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all w-full sm:w-72 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
              </div>
              <select 
                className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Users</option>
                <option value="active">Active Users</option>
                <option value="away">Away Users</option>
                <option value="inactive">Inactive Users</option>
              </select>
              <div className="flex-1"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all w-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="lastActive">Last Active</option>
                  <option value="totalSpent">Total Spent</option>
                  <option value="joinDate">Join Date</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* User Detail Panel */}
          {selectedUser && (
            <UserDetail 
              user={selectedUser} 
              onEdit={handleEditUser} 
              onDelete={handleDeleteUser} 
            />
          )}
          
          {/* User List */}
          <UserList 
            users={filteredUsers}
            selectedUsers={selectedUsers}
            onCheckboxChange={handleUserCheckboxChange}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            totalUsers={mockStats.totalUsers}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}