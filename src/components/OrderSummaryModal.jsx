import React, { useState } from 'react';
import { X, CheckCircle, Phone, User, ShoppingBag, ArrowLeft, MessageSquare, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/menu';

export default function OrderSummaryModal({ isOpen, onClose }) {
  const { cartItems, grandTotal, subtotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [orderType, setOrderType] = useState('Dine-In / Takeaway'); // 'Dine-In / Takeaway' | 'Home Delivery'
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    const generatedId = 'RRC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsConfirmed(true);
    setErrorMsg('');
  };

  const handleWhatsAppSend = () => {
    const itemsList = cartItems
      .map((item) => `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`)
      .join('\n');

    const msg = `*NEW ORDER - Radhe Radhe Cafe*\n` +
      `*Order ID:* ${orderId}\n` +
      `*Customer Name:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Order Type:* ${orderType}\n` +
      (notes.trim() ? `*Notes:* ${notes}\n` : '') +
      `\n*ITEMS:*\n${itemsList}\n\n` +
      `*TOTAL AMOUNT:* ₹${grandTotal}\n` +
      `\nस्वादिष्ट खाने के लिए राधे राधे कैफे चुनने के लिए धन्यवाद!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${CAFE_INFO.phone}?text=${encoded}`, '_blank');
  };

  const handleFinish = () => {
    clearCart();
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div
      id="order-summary-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isConfirmed) onClose();
      }}
    >
      <div
        id="order-summary-container"
        className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#DC2626]/20 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DC2626]/10 bg-[#FAFAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center">
              {isConfirmed ? (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              ) : (
                <ShoppingBag className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-stone-900 font-['Outfit']">
                {isConfirmed ? 'Order Confirmed!' : 'Order Summary'}
              </h2>
              <p className="text-xs text-[#DC2626]/80 font-medium">
                {isConfirmed
                  ? `Order #${orderId} has been placed`
                  : 'Review details & confirm your order'}
              </p>
            </div>
          </div>

          <button
            onClick={isConfirmed ? handleFinish : onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white border border-[#DC2626]/15 hover:bg-stone-100 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-stone-800">
          {!isConfirmed ? (
            /* Step 1: Order Review & Customer Input Form */
            <form onSubmit={handleConfirmOrder} className="space-y-5">
              
              {/* Items Breakdown Card */}
              <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#DC2626]/15 space-y-3">
                <div className="flex items-center justify-between border-b border-[#DC2626]/10 pb-2">
                  <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">
                    Selected Items ({cartItems.length})
                  </span>
                  <span className="text-xs font-bold text-stone-600">Subtotal</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[#DC2626] min-w-[20px]">
                          {item.quantity}x
                        </span>
                        <div>
                          <p className="font-bold text-stone-900">{item.name}</p>
                          {item.hindiName && (
                            <p className="text-[10px] text-stone-500 font-hindi-body">
                              {item.hindiName}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-stone-900 font-['Outfit']">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Row */}
                <div className="border-t border-[#DC2626]/15 pt-2.5 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-stone-900">Total Amount:</span>
                  <span className="text-lg font-black text-[#DC2626] font-['Outfit']">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Customer Details
                </h3>

                {/* Name Input */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-4 h-4 text-[#DC2626]/60 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#DC2626]/25 focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 text-sm font-medium text-stone-900 placeholder-stone-400 outline-none"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3 w-4 h-4 text-[#DC2626]/60 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      maxLength={12}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#DC2626]/25 focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 text-sm font-medium text-stone-900 placeholder-stone-400 outline-none"
                    />
                  </div>
                </div>

                {/* Order Type Buttons */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Order Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Dine-In / Takeaway', 'Home Delivery'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                          orderType === type
                            ? 'bg-[#DC2626] text-white border-[#DC2626]'
                            : 'bg-white text-stone-700 border-[#DC2626]/20 hover:bg-[#FAFAFA]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Special Cooking Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Less spicy, extra butter, no onion"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DC2626]/25 focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 text-xs font-medium text-stone-900 placeholder-stone-400 outline-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-lg border border-rose-200">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-bold text-xs transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  id="confirm-order-submit-btn"
                  className="flex-1 py-3 px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:scale-95 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Order</span>
                  <span className="font-['Outfit'] font-black">₹{grandTotal}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: Order Confirmation Receipt */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-[#DC2626] text-xs font-black uppercase tracking-wider mb-2">
                  Order Placed Successfully
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 font-['Outfit']">
                  Thank You, {customerName}!
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Your order <span className="font-bold text-[#DC2626]">#{orderId}</span> has been received and is being freshly prepared.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#DC2626]/15 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Order ID:</span>
                  <span className="font-bold text-stone-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Phone:</span>
                  <span className="font-bold text-stone-900">{customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Total Paid:</span>
                  <span className="font-black text-[#DC2626] font-['Outfit'] text-sm">₹{grandTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Order Type:</span>
                  <span className="font-bold text-stone-900">{orderType}</span>
                </div>
              </div>

              {/* WhatsApp notification CTA */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order to Cafe WhatsApp</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
