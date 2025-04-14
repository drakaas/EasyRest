// components/DeliveryInfo.tsx
import { useState } from 'react';

export default function DeliveryInfo ()  {
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium mb-4">Delivery Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Delivery Address</label>
          <input 
            type="text" 
            name="address"
            value={deliveryInfo.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
            placeholder="Enter your address" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">City</label>
            <input 
              type="text" 
              name="city"
              value={deliveryInfo.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
              placeholder="City" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
            <input 
              type="text" 
              name="zipCode"
              value={deliveryInfo.zipCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
              placeholder="Zip Code" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={deliveryInfo.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
            placeholder="Enter your phone number" 
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Delivery Instructions (Optional)</label>
          <textarea 
            name="instructions"
            value={deliveryInfo.instructions}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
            placeholder="Special instructions for delivery"
          ></textarea>
        </div>
      </div>
    </div>
  );
};