import React from 'react';

export default function UserDetail({ user, onEdit, onDelete }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {/* User Image */}
        <div className="w-full lg:w-48 mb-4 lg:mb-0">
          <div className="rounded-lg h-48 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gray-100">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover rounded-full" 
            />
            <div className={`absolute bottom-2 right-2 bg-${user.status.color}-500 w-4 h-4 rounded-full border-2 border-white`} />
          </div>
          <div className="mt-3 text-center font-medium">{user.name}</div>
          <div className="text-xs text-gray-500 text-center">{user.type}</div>
        </div>
        
        {/* User Details */}
        <div className="flex-1 space-y-4 overflow-hidden md:overflow-visible">
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
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <label className="block text-sm text-gray-600 mb-2 font-medium">Location</label>
            <div className="text-sm font-medium text-gray-800">{user.location}</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">{user.orders}</div>
              <div className="text-xs text-gray-600">Orders</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">${user.totalSpent}</div>
              <div className="text-xs text-gray-600">Total Spent</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{user.rating}</div>
              <div className="text-xs text-gray-600">Avg. Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Recent Orders & Activity</h4>
          <button className="text-sm text-purple-600 hover:text-purple-800 transition-colors">View All</button>
        </div>
        
        <div className="overflow-x-auto max-h-[300px] md:max-h-none">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.recentActivity.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-sm">{activity.date}</td>
                  <td className="px-3 py-2 text-sm flex items-center">
                    <span className={`material-symbols-outlined text-${activity.color}-500 mr-2`}>
                      {activity.icon}
                    </span>
                    {activity.action}
                  </td>
                  <td className="px-3 py-2 text-sm">{activity.details}</td>
                  <td className="px-3 py-2 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${activity.statusColor}-100 text-${activity.statusColor}-800`}>
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