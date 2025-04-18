// components/CartItems.tsx
import { useCart } from '../../context/CartContext';

export default function CartItems() {
  const { cartItems, removeFromCart, updateQuantity, loading } = useCart();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="animate-pulse">
          <div className="flex space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className="flex space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined">image_not_supported</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500 truncate max-w-xs">{item.description || 'No description available'}</p>
            </div>
          </div>
          <div className="col-span-2 text-center">${item.price?.toFixed(2) || '0.00'}</div>
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
          <div className="col-span-1 text-center">${((item.price || 0) * item.quantity).toFixed(2)}</div>
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