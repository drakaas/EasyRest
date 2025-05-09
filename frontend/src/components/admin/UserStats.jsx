import React from 'react';

export default function UserStats({ stats }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium mb-4 text-gray-800 tracking-tight">User Statistics</h3>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-purple-600 text-3xl font-bold">{stats.totalUsers}</div>
          <div className="text-gray-600 text-xs sm:text-sm font-medium">Total Users</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-600 text-3xl font-bold">{stats.newThisMonth}</div>
          <div className="text-gray-600 text-xs sm:text-sm font-medium">New This Month</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-blue-600 text-2xl md:text-3xl font-bold leading-tight">{stats.activeUsers}</div>
          <div className="text-gray-600 text-xs sm:text-sm font-medium">Active Users</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-yellow-600 text-2xl md:text-3xl font-bold leading-tight">${stats.totalRevenue}</div>
          <div className="text-gray-600 text-xs sm:text-sm font-medium">Total Revenue</div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-5">
        <h4 className="font-medium text-base mb-3">Recent Activity</h4>
        <div className="h-[200px] relative overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {stats.activityData.map((height, index) => (
              <div 
                key={index}
                className="w-[30px] bg-purple-400 hover:bg-purple-500 transition-all rounded-t-md"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 pt-2 flex items-center justify-between px-2 text-xs text-gray-500">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-500 text-center mt-2">User Logins - Last 7 Days</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-base mb-3">User Distribution</h4>
        {stats.userDistribution.map(({ type, percentage, color }) => (
          <div key={type} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`bg-${color}-500 h-2.5 rounded-full`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{percentage}%</span>
            </div>
            <div className="text-xs text-gray-500">{type}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 