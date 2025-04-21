import React from 'react';

export default function UserDetail({ user, onEdit, onDelete }) {
  if (!user) return null;
  
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-8 overflow-hidden shadow-sm min-h-[600px]">
      <div className="flex flex-col md:flex-row gap-8">
        {/* User Image and Basic Info */}
        <div className="w-full md:w-64 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-sm">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <h3 className="text-xl font-bold text-center">{user.name}</h3>
          <p className="text-gray-500 text-sm mb-2 text-center">{user.email}</p>
          <div className="mt-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
              {user.status.text}
            </span>
          </div>
          <p className="text-purple-600 font-medium text-center">{user.type}</p>
        </div>
        
        {/* User Details */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-lg">User Details</h4>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded transition-colors text-blue-600"
                onClick={() => onEdit(user.id)}
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded transition-colors text-red-600"
                onClick={() => onDelete(user.id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm text-gray-600 mb-1 font-medium">Location</label>
              <div className="text-sm font-medium text-gray-800">{user.location}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm text-gray-600 mb-1 font-medium">Member Since</label>
              <div className="text-sm font-medium text-gray-800">{user.joinDate || 'January 15, 2023'}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm text-gray-600 mb-1 font-medium">Last Active</label>
              <div className="text-sm font-medium text-gray-800">{user.lastActive || 'Today, 10:45 AM'}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm text-gray-600 mb-1 font-medium">Phone Number</label>
              <div className="text-sm font-medium text-gray-800">{user.phone || '+1 (555) 123-4567'}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{user.orders}</div>
              <div className="text-xs text-gray-600">Total Orders</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">${user.totalSpent}</div>
              <div className="text-xs text-gray-600">Total Spent</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{user.rating}</div>
              <div className="text-xs text-gray-600">Avg. Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-lg">Recent Orders & Activity</h4>
          <button className="text-sm text-purple-600 hover:text-purple-800 transition-colors">View All</button>
        </div>
        
        <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.recentActivity && user.recentActivity.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{activity.date}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      <span className={`material-symbols-outlined mr-2 ${
                        activity.color === 'blue' ? 'text-blue-500' : 
                        activity.color === 'green' ? 'text-green-500' : 
                        activity.color === 'purple' ? 'text-purple-500' : 
                        'text-gray-500'
                      }`}>
                        {activity.icon}
                      </span>
                      {activity.action}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{activity.details}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.statusColor === 'green' ? 'bg-green-100 text-green-800' : 
                      activity.statusColor === 'purple' ? 'bg-purple-100 text-purple-800' : 
                      activity.statusColor === 'blue' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}