// components/OrderSummary.tsx
import React from "react";

export const OrderSummary = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium mb-4">Order Summary</h3>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>$26.47</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>$2.99</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>$2.25</span>
        </div>
        <div className="border-t pt-3 mt-3 flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>$31.71</span>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Promo Code</label>
          <div className="flex">
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
              placeholder="Enter promo code" 
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors">
              Apply
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <button className="w-full bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">shopping_cart_checkout</span>
            Proceed to Checkout
          </button>
          <button className="w-full border border-gray-300 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">arrow_back</span>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};