import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartModal = ({ isOpen, onClose, item }) => {
  const navigate = useNavigate()
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative animate-fade-in">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="flex items-center mb-4">
          <span className="material-symbols-outlined text-green-500 text-2xl mr-2">check_circle</span>
          <h3 className="text-lg font-bold">Item Added to Cart</h3>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            {item?.images && (
              <img 
                src={`http://localhost:5000${item.images[0]}`} 
                alt={item?.name} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="font-medium">{item?.name}</p>
            <p className="text-gray-600 text-sm">${item?.price?.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => {
              onClose()
              navigate('/cart')
            }}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-black border border-black py-2 rounded-lg font-medium transition-colors"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartModal 