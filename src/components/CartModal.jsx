import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import OrderSummaryModal from './OrderSummaryModal';

export default function CartModal() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    packagingFee,
    grandTotal,
    amountNeededForFreeDelivery,
    isFreeDeliveryEligible,
  } = useCart();

  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      <div
        id="cart-modal-backdrop"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCart();
        }}
      >
        <div
          id="cart-modal-container"
          className="relative w-full max-w-lg bg-white border border-stone-200 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden animate-slide-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-[#FAFAFA]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-stone-900 font-['Outfit']">
                  Your Order Cart
                </h2>
                <p className="text-xs text-red-600 font-medium font-hindi-body">
                  {cartItems.length} {cartItems.length === 1 ? 'व्यंजन' : 'व्यंजन'} चुने गए
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  id="cart-clear-btn"
                  className="text-xs text-stone-500 hover:text-red-600 font-bold transition px-2 py-1 cursor-pointer"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={closeCart}
                id="cart-modal-close-btn"
                aria-label="Close cart"
                className="w-8 h-8 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delivery Promo Notification */}
          {cartItems.length > 0 && (
            <div className="bg-amber-50 px-5 py-2 border-b border-amber-100 flex items-center gap-2 text-xs text-amber-900 font-semibold font-hindi-body">
              <Truck className="w-4 h-4 text-red-600 shrink-0" />
              {subtotal >= 300 ? (
                <span className="text-emerald-800 font-bold">
                  🎉 ₹300+ ऑर्डर: 2km तक मुफ्त होम डिलीवरी सक्रिय!
                </span>
              ) : (
                <span>
                  🚚 ₹{amountNeededForFreeDelivery} का और जोड़ें व 2km तक <strong>मुफ्त डिलीवरी</strong> पाएं!
                </span>
              )}
            </div>
          )}

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-600">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 font-hindi-body">
                    आपकी कार्ट खाली है
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 font-hindi-body">
                    मेन्यू से अपने पसंदीदा लस्सी, चाट, मोमोज, पिज्जा या डोसा चुनें!
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  मेन्यू देखें (Explore Menu)
                </button>
              </div>
            ) : (
              /* List of Selected Items */
              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-red-300 transition"
                  >
                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-sm text-stone-900 truncate font-hindi-body">
                          {item.hindiName || item.name}
                        </h4>
                        {item.variant && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200">
                            {item.variant}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 font-medium">
                        {item.name} • ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity Modifier Buttons (+ / -) */}
                    <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl p-1 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        id={`cart-minus-${item.id}`}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 rounded-lg bg-white hover:bg-stone-200 text-red-600 flex items-center justify-center transition active:scale-90 shadow-2xs font-bold cursor-pointer"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <span
                        id={`cart-qty-${item.id}`}
                        className="w-6 text-center font-black text-xs text-stone-900 font-['Outfit']"
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        id={`cart-plus-${item.id}`}
                        aria-label="Increase quantity"
                        className="w-6 h-6 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition active:scale-90 shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-right shrink-0 min-w-[50px]">
                      <span className="font-extrabold text-sm text-stone-900 font-['Outfit'] block">
                        ₹{item.price * item.quantity}
                      </span>
                      {/* Remove item button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        id={`cart-remove-${item.id}`}
                        aria-label="Remove item"
                        className="text-stone-400 hover:text-red-600 transition p-1 inline-flex items-center cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-100 bg-[#FAFAFA] space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span>व्यंजनों का योग (Subtotal):</span>
                <span className="font-bold text-stone-900 font-['Outfit']">₹{subtotal}</span>
              </div>

              <div className="flex items-center justify-between text-base font-extrabold text-stone-900 pt-1 border-t border-stone-200">
                <span>अनुमानित योग (Est. Total):</span>
                <span className="text-xl font-black text-red-600 font-['Outfit']">
                  ₹{grandTotal}
                </span>
              </div>

              {/* "Place Order" Button */}
              <button
                onClick={() => setIsOrderSummaryOpen(true)}
                id="cart-place-order-btn"
                className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-between cursor-pointer"
              >
                <span>ऑर्डर कन्फर्म करें (Checkout on WhatsApp)</span>
                <div className="flex items-center gap-1.5 font-black">
                  <span>₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary & WhatsApp Form Modal */}
      <OrderSummaryModal
        isOpen={isOrderSummaryOpen}
        onClose={() => setIsOrderSummaryOpen(false)}
      />
    </>
  );
}
