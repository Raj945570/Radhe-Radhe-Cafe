import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { totalItems, subtotal, openCart } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed top-22 sm:top-24 right-4 sm:right-6 z-40 animate-slide-down">
      <button
        onClick={openCart}
        id="floating-cart-btn"
        aria-label={`View cart with ${totalItems} items`}
        className="group flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-full shadow-[0_10px_25px_rgba(220,38,38,0.35)] border-2 border-white transition-all duration-300 active:scale-95 cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-white stroke-[2.2]" />
          <span className="absolute -top-1.5 -right-2 bg-yellow-400 text-stone-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
            {totalItems}
          </span>
        </div>

        <div className="flex flex-col text-left pl-0.5">
          <span className="text-[10px] font-bold text-red-100 uppercase tracking-wider leading-none">
            Your Cart
          </span>
          <span className="text-xs sm:text-sm font-black font-['Outfit'] leading-tight">
            ₹{subtotal}
          </span>
        </div>

        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
}
