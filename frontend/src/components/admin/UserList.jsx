import React from 'react';

export default function UserList({ users, onView, onEdit, onDelete }) {
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
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50 transition-colors">
            <div className="col-span-1 flex justify-center">
              <input type="checkbox" className="w-4 h-4 accent-purple-600 cursor-pointer" />
            </div>
            <div className="col-span-5 flex gap-4 items-center">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 object-cover rounded-full shadow-sm" 
              />
              <div className="space-y-1">
                <h4 className="font-medium text-base">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="col-span-2 text-center">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${user.status.color}-100 text-${user.status.color}-800`}>
                <span className={`w-1.5 h-1.5 bg-${user.status.color}-600 rounded-full mr-1.5`} />
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
        ))}
      </div>
      
      <div className="p-5 flex justify-between items-center border-t bg-gray-50">
        <div className="text-sm text-gray-500 font-medium">Showing {users.length} of {users.length} users</div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-9 h-9 bg-purple-600 text-white rounded-md flex items-center justify-center hover:bg-purple-700 transition-colors">1</button>
          <button className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">2</button>
          <button className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">3</button>
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
} 