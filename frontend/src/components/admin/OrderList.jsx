import React from 'react';

export default function OrderList({ orders, onView, totalOrders, currentPage, onPageChange }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 border-b text-gray-600 font-medium bg-gray-50">
        <div className="col-span-2">Order ID</div>
        <div className="col-span-2">Time</div>
        <div className="col-span-3">Customer</div>
        <div className="col-span-2">Total</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-center">Action</div>
      </div>
      
      <div className="divide-y">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onView(order.id)}
          >
            <div className="col-span-2 font-medium">#{order.id}</div>
            <div className="col-span-2 text-sm text-gray-500">{order.time}</div>
            <div className="col-span-3 flex items-center">
              <span className="material-symbols-outlined mr-2 text-gray-500">person</span>
              <span>{order.customer}</span>
            </div>
            <div className="col-span-2 font-medium">${order.total.toFixed(2)}</div>
            <div className="col-span-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${order.status.color}-100 text-${order.status.color}-800`}>
                <span className={`w-1.5 h-1.5 bg-${order.status.color}-500 rounded-full mr-1.5`}></span>
                {order.status.text}
              </span>
            </div>
            <div className="col-span-1 flex justify-center">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add dropdown menu functionality here
                }}
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 flex justify-between items-center border-t bg-gray-50">
        <div className="text-sm text-gray-500 font-medium">Showing {orders.length} of {totalOrders} orders</div>
        <div className="flex items-center gap-2">
          <button 
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          {[1, 2, 3].map((page) => (
            <button 
              key={page}
              className={`w-9 h-9 ${currentPage === page ? 'bg-purple-600 text-white' : 'border border-gray-300'} rounded-md flex items-center justify-center hover:${currentPage === page ? 'bg-purple-700' : 'bg-gray-100'} transition-colors`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          <button 
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => onPageChange(Math.min(3, currentPage + 1))}
            disabled={currentPage === 3}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}