// components/CartPage.tsx
// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CartItems } from "../../components/cart/CartItems";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { DeliveryInfo } from "../../components/cart/DeliveryInfo";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { useAuth } from "../../context/AuthContext";

export const CartPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user ) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div id="webcrumbs"> 
      <div className="w-[1000px] bg-gray-50 font-sans">
        <Header />
        
        {/* Shopping Cart Section */}
        <div className="px-14 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-700">Shopping Cart</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span>3 Items</span>
            </div>
          </div>

          <CartItems />
          
          {/* Order Summary and Delivery Info */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <DeliveryInfo />
            <OrderSummary />
          </div>
        </div>
        
        <Footer />
      </div> 
    </div>
  );
};