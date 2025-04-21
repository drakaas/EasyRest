// components/CartPage.tsx
// import { useSession } from "next-auth/react";
import  CartItems  from "../../components/cart/CartItems";
import  OrderSummary  from "../../components/cart/OrderSummary";
import  DeliveryInfo  from "../../components/cart/DeliveryInfo";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import  Footer  from "../../components/layout/Footer";
import  Header  from "../../components/layout/Header";

// components/CartPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';


export default function CartPage () {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (user==null) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span>{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</span>
            </div>
            {user.isAdmin && (
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors"
              >
                <span className="material-symbols-outlined">admin_panel_settings</span>
                <span>Admin Panel</span>
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <CartItems />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DeliveryInfo />
            <OrderSummary />
          </div>
        </div>
      </main>

    </div>
  );
};


