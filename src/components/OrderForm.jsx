import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  User,
  Phone,
  MapPin,
  Compass,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Truck,
  Store,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/menu';

export default function OrderForm({ onBack }) {
  const {
    cartItems,
    subtotal,
    deliveryDistance,
    setDeliveryDistance,
    deliveryFee,
    packagingFee,
    grandTotal,
    clearCart,
    closeCart,
  } = useCart();

  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'takeaway'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (orderType === 'delivery' && !formData.address.trim()) {
      newErrors.address = 'Please enter complete delivery address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate actual applied delivery fee depending on orderType
  const currentDeliveryFee = orderType === 'delivery' ? deliveryFee : 0;
  const currentTotal = subtotal + currentDeliveryFee;

  // WhatsApp Order Submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // 🛒 Items format matching rules:
    // - Item Name (Half/Full) × Quantity = ₹Price
    // - Item Name × Quantity = ₹Price
    const orderItemsText = cartItems
      .map((item) => {
        const rawName = (item.baseName || item.name.replace(/\s*\((Half|Full)\)$/i, '')).trim();
        const lineTotal = item.price * item.quantity;
        if (item.variant) {
          return `- ${rawName} (${item.variant}) × ${item.quantity} = ₹${lineTotal}`;
        }
        return `- ${rawName} × ${item.quantity} = ₹${lineTotal}`;
      })
      .join('\n');

    const whatsappMessage = `🧾 New Order - Radhe Radhe Cafe

📍 Outlet: ${CAFE_INFO.name}

🛒 Items:
${orderItemsText}

🚚 Delivery Charge: ₹${currentDeliveryFee}
💰 Total Amount: ₹${currentTotal}

📍 Address: ${formData.address.trim()}
📞 Contact: ${formData.phone.trim()}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${CAFE_INFO.phone}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="py-12 px-4 text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-[#fdfbf7] font-['Outfit']">
            Order Sent to WhatsApp!
          </h3>
          <p className="text-sm text-[#b0a597] max-w-sm mx-auto mt-2 leading-relaxed">
            We have redirected you to WhatsApp to confirm your order with Radhe Radhe Cafe. 
            Our team will start preparing your fresh food immediately!
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={closeCart}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg transition-transform active:scale-95"
          >
            Done & Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header with back button */}
      <div className="flex items-center justify-between pb-3 border-b border-[#29221c]">
        <button
          type="button"
          onClick={onBack}
          id="order-form-back-btn"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#a89d91] hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-['Outfit']">
          Step 2 of 2: Checkout
        </span>
      </div>

      <form onSubmit={handlePlaceOrder} className="space-y-4">
        {/* Order Type Toggle (Delivery vs Pickup) */}
        <div>
          <label className="block text-xs font-bold uppercase text-[#a89d91] mb-2 tracking-wider">
            Order Preference
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              id="order-type-delivery"
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-bold transition-all ${
                orderType === 'delivery'
                  ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-inner'
                  : 'bg-[#171412] border-[#2b241e] text-[#a89d91] hover:text-white'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Door Delivery</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('takeaway')}
              id="order-type-takeaway"
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-bold transition-all ${
                orderType === 'takeaway'
                  ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-inner'
                  : 'bg-[#171412] border-[#2b241e] text-[#a89d91] hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Takeaway / Dine-in</span>
            </button>
          </div>
        </div>

        {/* Customer Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#c7beaf] mb-1.5">
            Your Name <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 w-4 h-4 text-[#756a5e]" />
            <input
              type="text"
              name="name"
              id="order-input-name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Radhika Sharma"
              className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#171412] text-[#fdfbf7] placeholder-[#665c52] border text-sm focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-[#2e2620] focus:border-amber-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-[#c7beaf] mb-1.5">
            Phone Number (for WhatsApp order updates) <span className="text-amber-500">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-xs font-bold text-[#8d8071] flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#756a5e]" /> +91
            </span>
            <input
              type="tel"
              name="phone"
              id="order-input-phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className={`w-full pl-16 pr-3 py-2.5 rounded-xl bg-[#171412] text-[#fdfbf7] placeholder-[#665c52] border text-sm focus:outline-none transition-all ${
                errors.phone
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-[#2e2620] focus:border-amber-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Address and Distance Fields (Only for Delivery) */}
        {orderType === 'delivery' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-[#c7beaf] mb-1.5">
                Complete Delivery Address <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#756a5e]" />
                <textarea
                  name="address"
                  id="order-input-address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House/Flat No., Street, Landmark, Area..."
                  className={`w-full pl-10 pr-3 py-2 rounded-xl bg-[#171412] text-[#fdfbf7] placeholder-[#665c52] border text-sm focus:outline-none transition-all resize-none ${
                    errors.address
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-[#2e2620] focus:border-amber-500'
                  }`}
                />
              </div>
              {errors.address && (
                <p className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.address}</span>
                </p>
              )}
            </div>

            {/* Distance Selector with Dynamic Delivery Fee Display */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1 text-xs font-semibold text-[#c7beaf]">
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  <span>Approx Distance from Cafe:</span>
                </label>
                <span className="text-xs font-bold text-amber-400 font-['Outfit']">
                  {deliveryDistance} KM {currentDeliveryFee === 0 ? '(Free Delivery 🎉)' : `(+₹${currentDeliveryFee})`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                id="order-input-distance"
                value={deliveryDistance}
                onChange={(e) => setDeliveryDistance(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#2a231d] rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-[#807466] mt-1 font-medium">
                <span>Nearby (&lt;3km)</span>
                <span>Medium (3-6km)</span>
                <span>Far (&gt;6km)</span>
              </div>
            </div>
          </>
        )}

        {/* Special Instructions */}
        <div>
          <label className="block text-xs font-semibold text-[#c7beaf] mb-1.5">
            Special Instructions / Cooking Notes (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-[#756a5e]" />
            <input
              type="text"
              name="notes"
              id="order-input-notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Extra spicy, less cheese, call on arrival"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#171412] text-[#fdfbf7] placeholder-[#665c52] border border-[#2e2620] focus:border-amber-500 text-sm focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Order Price Summary Recap */}
        <div className="p-3.5 rounded-xl bg-[#181412] border border-[#2c241e] space-y-1.5 text-xs">
          <div className="flex justify-between text-[#a39789]">
            <span>Items Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          {orderType === 'delivery' && (
            <div className="flex justify-between text-[#a39789]">
              <span>Delivery Charge ({deliveryDistance} km):</span>
              <span className="font-bold text-amber-400">
                ₹{currentDeliveryFee}
              </span>
            </div>
          )}
          <div className="flex justify-between font-extrabold text-sm text-[#fdfbf7] pt-2 border-t border-[#2d251f]">
            <span>Grand Total:</span>
            <span className="text-amber-400 font-['Outfit'] text-base">₹{currentTotal}</span>
          </div>
        </div>

        {/* Submit to WhatsApp Button */}
        <button
          type="submit"
          id="order-form-submit-whatsapp-btn"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/25 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Place Order on WhatsApp</span>
        </button>

        <p className="text-[11px] text-center text-[#827668]">
          🔒 No pre-payment required. Pay via UPI or Cash on delivery/pickup.
        </p>
      </form>
    </div>
  );
}
