// components/CartPage.tsx
// import { useSession } from "next-auth/react";
import { CartItems } from "../../components/cart/CartItems";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { DeliveryInfo } from "../../components/cart/DeliveryInfo";

import { Footer } from "../../components/layout/Footer";
import  Header  from "../../components/layout/Header";
import { useAuth } from "../../context/AuthContext";

// components/CartPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';


export const CartPage = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span>{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>

        <div className="mt-12">
          <DeliveryInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
};