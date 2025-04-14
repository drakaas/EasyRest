// components/CartItems.tsx
import React from "react";

const cartItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: 12.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
  },
  {
    id: 2,
    name: "Classic Burger",
    description: "Beef patty, lettuce, tomato, cheese, and our special sauce",
    price: 9.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },
  {
    id: 3,
    name: "Iced Tea",
    description: "Sweet or unsweetened",
    price: 3.49,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1556679343-c1917e0ada6d"
  }
];

export const CartItems = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b text-gray-600 font-medium">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-1 text-center">Total</div>
        <div className="col-span-1 text-center">Actions</div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b hover:bg-gray-50 transition-colors">
          <div className="col-span-6 flex gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
          <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
          <div className="col-span-2 flex justify-center items-center">
            <button className="w-8 h-8 bg-gray-200 rounded-l-md hover:bg-gray-300 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <input type="text" value={item.quantity} className="w-8 h-8 text-center border-t border-b" readOnly />
            <button className="w-8 h-8 bg-gray-200 rounded-r-md hover:bg-gray-300 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          <div className="col-span-1 text-center">${(item.price * item.quantity).toFixed(2)}</div>
          <div className="col-span-1 text-center">
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};