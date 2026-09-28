import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartBar() {
  const { totalItems, subtotal, openCart, isCartOpen } = useCart();

  // If cart is empty or the full modal is already open, do not show sticky bar
  if (totalItems === 0 || isCartOpen) {
    return null;
  }

  return (
    <div
      id="sticky-cart-bar"
      className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 pointer-events-none animate-slide-up"
    >
      <div className="max-w-md sm:max-w-2xl mx-auto pointer-events-auto">
        <div
          onClick={openCart}
          className="cursor-pointer group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-2xl shadow-red-600/40 border border-white/30 transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
        >
          {/* Left: Cart Info & Price */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs uppercase font-extrabold tracking-wider text-red-100">
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Selected
              </p>
              <p className="text-lg sm:text-xl font-black text-white font-['Outfit'] leading-none mt-0.5">
                ₹{subtotal}
              </p>
            </div>
          </div>

          {/* Right: Call to action */}
          <div className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-xl font-bold text-sm shadow-md group-hover:bg-red-50 transition-colors">
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
