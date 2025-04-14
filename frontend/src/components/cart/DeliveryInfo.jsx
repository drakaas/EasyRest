// components/DeliveryInfo.tsx
import React from "react";

export const DeliveryInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium mb-4">Delivery Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Delivery Address</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
            placeholder="Enter your address" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">City</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
              placeholder="City" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
              placeholder="Zip Code" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
          <input 
            type="tel" 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
            placeholder="Enter your phone number" 
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Delivery Instructions (Optional)</label>
          <textarea 
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
            placeholder="Special instructions for delivery"
          ></textarea>
        </div>
      </div>
    </div>
  );
};