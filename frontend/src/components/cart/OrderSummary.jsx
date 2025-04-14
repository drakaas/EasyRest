// components/OrderSummary.tsx
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function OrderSummary () {
  const { cartTotal, cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const subtotal = cartTotal;
  const deliveryFee = cartItems.length > 0 ? 2.99 : 0;
  const tax = subtotal * 0.085; // 8.5% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h3 className="text-xl font-medium mb-4">Order Summary</h3>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 mt-3 flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Promo Code</label>
          <div className="flex">
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
              placeholder="Enter promo code" 
            />
            <button className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition-colors">
              Apply
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <button 
            className="w-full bg-primary-600 text-white py-3 rounded-md font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            disabled={cartItems.length === 0}
          >
            <span className="material-symbols-outlined">shopping_cart_checkout</span>
            Proceed to Checkout
          </button>
          <button 
            className="w-full border border-gray-300 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            onClick={() => navigate('/menu')}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Continue Shopping
          </button>
          {cartItems.length > 0 && (
            <button 
              className="w-full text-red-500 py-3 rounded-md font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              onClick={clearCart}
            >
              <span className="material-symbols-outlined">delete</span>
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};