// components/CartItems.tsx
import { useCart } from '../../context/CartContext';

export default function CartItems() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">shopping_cart</span>
        <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Start adding some delicious items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b text-gray-600 font-medium hidden md:grid">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-1 text-center">Total</div>
        <div className="col-span-1 text-center">Actions</div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b hover:bg-gray-50 transition-colors">
          <div className="col-span-6 flex gap-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-16 h-16 object-cover rounded-md" 
            />
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
          <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
          <div className="col-span-2 flex justify-center items-center">
            <button 
              className="w-8 h-8 bg-gray-200 rounded-l-md hover:bg-gray-300 transition-colors flex items-center justify-center"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <input 
              type="text" 
              value={item.quantity} 
              className="w-8 h-8 text-center border-t border-b" 
              readOnly 
            />
            <button 
              className="w-8 h-8 bg-gray-200 rounded-r-md hover:bg-gray-300 transition-colors flex items-center justify-center"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          <div className="col-span-1 text-center">${(item.price * item.quantity).toFixed(2)}</div>
          <div className="col-span-1 text-center">
            <button 
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => removeFromCart(item.id)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};