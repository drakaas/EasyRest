import React from 'react';

export default function UserList({ 
  users, 
  selectedUsers = [], // Provide default value
  onCheckboxChange, 
  onView, 
  onEdit, 
  onDelete, 
  totalUsers = 0,  // Provide default value
  currentPage = 1,  // Provide default value
  onPageChange = () => {}  // Provide default function
}) {
  console.log('UserList rendering with props:', { 
    usersLength: users?.length, 
    selectedUsers, 
    totalUsers, 
    currentPage 
  });

  // Define all possible status color classes upfront
  const statusColorMap = {
    green: {
      bgClass: 'bg-green-100',
      textClass: 'text-green-800',
      dotClass: 'bg-green-600'
    },
    yellow: {
      bgClass: 'bg-yellow-100',
      textClass: 'text-yellow-800',
      dotClass: 'bg-yellow-600'
    },
    red: {
      bgClass: 'bg-red-100',
      textClass: 'text-red-800',
      dotClass: 'bg-red-600'
    },
    gray: {
      bgClass: 'bg-gray-100',
      textClass: 'text-gray-800',
      dotClass: 'bg-gray-500'
    },
    blue: {
      bgClass: 'bg-blue-100',
      textClass: 'text-blue-800',
      dotClass: 'bg-blue-600'
    },
    purple: {
      bgClass: 'bg-purple-100',
      textClass: 'text-purple-800',
      dotClass: 'bg-purple-600'
    }
  };

  // Helper function to get the correct status color classes
  const getStatusClasses = (color) => {
    console.log('Getting status classes for color:', color);
    // Return the predefined classes or default to gray if color not found
    return statusColorMap[color] || statusColorMap.gray;
  };

  // Define pagination button classes upfront
  const activePageClass = "w-9 h-9 bg-purple-600 text-white rounded-md flex items-center justify-center hover:bg-purple-700 transition-colors";
  const inactivePageClass = "w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors";

  // Helper function for pagination button classes
  const getPaginationButtonClasses = (pageNum) => {
    return currentPage === pageNum ? activePageClass : inactivePageClass;
  };

  if (!users) {
    console.error('Users array is undefined');
    return <div>No users data available</div>;
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-5 border-b text-gray-600 font-medium bg-gray-50">
        <div className="col-span-1"></div>
        <div className="col-span-5">User</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-center">Orders</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>
      
      <div className="divide-y">
        {users.map(user => {
          console.log('Rendering user:', user);
          
          if (!user.status || !user.status.color) {
            console.error('User status or color is missing:', user);
            user.status = user.status || { text: 'Unknown', color: 'gray' };
          }
          
          const { bgClass, textClass, dotClass } = getStatusClasses(user.status.color);
          
          return (
            <div key={user.id} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-1 flex justify-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-purple-600 cursor-pointer" 
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onCheckboxChange(user.id)}
                />
              </div>
              <div className="col-span-5 flex gap-4 items-center">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 object-cover rounded-full shadow-sm" 
                />
                <div className="space-y-1">
                  <h4 className="font-medium text-base">{user.name}</h4>
                  <p className="text-sm text-gray-500 truncate max-w-[180px]">{user.email}</p>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bgClass} ${textClass}`}>
                  <span className={`w-1.5 h-1.5 ${dotClass} rounded-full mr-1.5`}></span>
                  {user.status.text}
                </span>
              </div>
              <div className="col-span-2 text-center font-medium">{user.orders}</div>
              <div className="col-span-2 flex justify-center gap-3">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => onView(user.id)}
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => onEdit(user.id)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 hover:text-red-500 rounded-full transition-colors"
                  onClick={() => onDelete(user.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-5 flex justify-between items-center border-t bg-gray-50">
        <div className="text-sm text-gray-500 font-medium">Showing {users.length} of {totalUsers} users</div>
        <div className="flex items-center gap-2">
          <button 
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button 
            className={getPaginationButtonClasses(1)}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          <button 
            className={getPaginationButtonClasses(2)}
            onClick={() => onPageChange(2)}
          >
            2
          </button>
          <button 
            className={getPaginationButtonClasses(3)}
            onClick={() => onPageChange(3)}
          >
            3
          </button>
          <button 
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => onPageChange(Math.min(3, currentPage + 1))}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}