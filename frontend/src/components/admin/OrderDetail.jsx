import React from 'react';

export default function OrderDetail({ order, onComplete, onCancel, onPrint }) {
  if (!order) return null;
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Order Info */}
        <div className="w-full lg:w-48 mb-4 lg:mb-0">
          <div className="rounded-lg h-auto flex flex-col items-center justify-center p-4 relative bg-gray-100">
            <span className="material-symbols-outlined text-5xl text-purple-600 mb-2">receipt_long</span>
            <div className="mt-2 text-center font-medium text-xl">#{order.id}</div>
            <div className="text-sm text-gray-500 text-center mt-1">{order.date}, {order.time}</div>
            <div className="mt-3 w-full">
              <span className={`inline-flex items-center justify-center w-full px-2.5 py-1 rounded-full text-xs font-medium bg-${order.status.color}-100 text-${order.status.color}-800`}>
                {order.status.text}
              </span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2 text-center">
            <div className="text-base font-medium">Order #{order.id.split('-')[1]}</div>
            <div className="text-sm text-gray-500">{order.deliveryMethod || 'Standard Delivery'}</div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="flex-1 space-y-4 overflow-hidden md:overflow-visible">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-lg">Order Details</h4>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded transition-colors text-green-600"
                onClick={() => onComplete(order.id)}
              >
                <span className="material-symbols-outlined">done</span>
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded transition-colors text-red-600"
                onClick={() => onCancel(order.id)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-600"
                onClick={() => onPrint(order.id)}
              >
                <span className="material-symbols-outlined">print</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <label className="block text-sm text-gray-600 mb-2 font-medium">Customer</label>
            <div className="text-sm font-medium text-gray-800 flex items-center">
              <span className="material-symbols-outlined mr-2 text-gray-500">person</span>
              {order.customer}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-600 text-sm mb-1">Delivery Instructions:</div>
              <div className="text-sm font-medium text-gray-800">{order.deliveryInstructions || 'No special instructions'}</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-600 text-sm mb-1">Delivery Method:</div>
              <div className="text-sm font-medium text-gray-800 flex items-center">
                <span className="material-symbols-outlined mr-2 text-blue-500">local_shipping</span>
                {order.deliveryMethod || 'Standard Delivery (30-45 min)'}
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 border-b">
              <h5 className="font-medium">Order Items</h5>
            </div>
            
            <div className="divide-y divide-gray-100">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-4 bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between mb-1">
                <div className="text-gray-600">Subtotal</div>
                <div className="font-medium">${order.subtotal?.toFixed(2) || '0.00'}</div>
              </div>
              <div className="flex justify-between mb-1">
                <div className="text-gray-600">Tax (8.5%)</div>
                <div className="font-medium">${order.tax?.toFixed(2) || '0.00'}</div>
              </div>
              <div className="flex justify-between mb-1">
                <div className="text-gray-600">Delivery Fee</div>
                <div className="font-medium">${order.deliveryFee?.toFixed(2) || '0.00'}</div>
              </div>
              <div className="flex justify-between pt-2 border-t mt-2">
                <div className="text-gray-800 font-medium">Total</div>
                <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Order Timeline</h4>
        </div>
        
        <div className="space-y-4 max-h-[200px] overflow-auto pr-2">
          {order.timeline && order.timeline.map((event, index) => (
            <div key={index} className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className={`w-3 h-3 ${event.completed ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}></div>
                {index < order.timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
              </div>
              <div className="flex-1 pb-4">
                <div className={`text-sm font-medium ${!event.completed ? 'text-gray-500' : ''}`}>{event.status}</div>
                <div className="text-xs text-gray-500">{event.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}