import React, { useState, useMemo } from 'react';
import {
  X,
  Phone,
  User,
  ShoppingBag,
  MapPin,
  Store,
  AlertCircle,
  Send,
  CheckCircle2,
  Plus,
  Minus,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  OUTLET_CONTACTS,
  OUTLETS,
  DELIVERY_AREAS,
  calculateDeliveryFee,
  isOutletOpen,
  getOutletTimingText,
} from '../data/menu';

export default function OrderSummaryModal({ isOpen, onClose }) {
  const {
    cartItems,
    subtotal,
    deliveryDistance,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Auto-detect current time & sort outlets: Open outlets first, Closed outlets below (PRO LEVEL)
  const sortedOutlets = useMemo(() => {
    return [...OUTLETS].sort((a, b) => {
      const aOpen = isOutletOpen(a);
      const bOpen = isOutletOpen(b);
      if (aOpen && !bOpen) return -1;
      if (!aOpen && bOpen) return 1;
      return 0;
    });
  }, []);

  // Pre-select first open outlet by default
  const defaultOutletTitle = sortedOutlets[0]?.title || 'Thekma 1.0';

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState(defaultOutletTitle);
  const [notes, setNotes] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Selected outlet metadata & dynamic open/closed status
  const activeOutletObj =
    OUTLETS.find((o) => o.title.toLowerCase() === selectedOutlet.toLowerCase()) || OUTLETS[0];
  const targetManagerWhatsApp = OUTLET_CONTACTS[selectedOutlet] || '918097799506';
  const isSelectedOutletOpen = isOutletOpen(activeOutletObj);
  const activeOutletTiming = activeOutletObj?.timing || getOutletTimingText(activeOutletObj);

  // Delivery calculation based on rule:
  // - Free delivery above ₹300 (within 2km)
  // - ₹20/km extra beyond 2km
  const currentDeliveryFee = calculateDeliveryFee(subtotal, deliveryDistance);
  const packagingFee = subtotal > 0 ? 10 : 0;
  const grandTotal = subtotal + currentDeliveryFee + packagingFee;

  // Field Validation
  const cleanPhone = customerPhone.replace(/\D/g, '');
  const isPhoneValid = cleanPhone.length === 10;
  const isNameValid = customerName.trim().length >= 2;
  const isAddressValid = customerAddress.trim().length >= 3;
  // Order only allowed if all fields valid AND outlet is open!
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isAddressValid &&
    cartItems.length > 0 &&
    isSelectedOutletOpen;

  // Append clicked delivery area to address
  const handleQuickAddArea = (area) => {
    if (!customerAddress.includes(area)) {
      setCustomerAddress((prev) => (prev ? `${prev.trim()}, ${area}` : area));
    }
  };

  // WhatsApp Order Submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // 1. Check Outlet Timing Validation (CRITICAL REQUIREMENT)
    if (!isSelectedOutletOpen) {
      setErrorMsg(
        'Selected outlet is currently closed. Please choose another outlet or try later.'
      );
      return;
    }

    if (!isNameValid) {
      setErrorMsg('कृपया अपना पूरा नाम दर्ज करें (Please enter your full name)');
      return;
    }
    if (!isPhoneValid) {
      setErrorMsg(
        'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें (Please enter a valid 10-digit phone number)'
      );
      return;
    }
    if (!isAddressValid) {
      setErrorMsg('कृपया पूरा डिलीवरी पता दर्ज करें (Please enter full delivery address)');
      return;
    }
    if (cartItems.length === 0) {
      setErrorMsg(
        'आपकी कार्ट खाली है! कृपया मेन्यू से कुछ व्यंजन चुनें (Your cart is empty)'
      );
      return;
    }

    setErrorMsg('');
    setIsRedirecting(true);
    setToastMessage(`Redirecting to WhatsApp (${selectedOutlet} Manager)...`);

    // 🍽️ Order Details lines:
    // Format: - Item Name (Full/Half) x Quantity
    const orderDetailsList = cartItems
      .map((item) => {
        const variantText = item.variant ? `(${item.variant})` : '';
        const namePart = `${item.name} ${variantText}`.trim();
        return `- ${namePart} x ${item.quantity}  (₹${item.price * item.quantity})`;
      })
      .join('\n');

    // Structured Message strictly matching customer requirements:
    const whatsappMessage = `🛒 *New Order - Radhe Radhe Cafe*

👤 Name: ${customerName.trim()}
📞 Phone: +91 ${cleanPhone}
📍 Address: ${customerAddress.trim()}

🍽️ Order Details:
${orderDetailsList}

🏪 Outlet: ${selectedOutlet}
🕒 Timing: ${activeOutletTiming}
━━━━━━━━━━━━━━━━━━━
💰 Items Total: ₹${subtotal}
🚚 Delivery Fee: ${currentDeliveryFee === 0 ? 'FREE (within 2km)' : `₹${currentDeliveryFee}`}
📦 Packaging: ₹${packagingFee}
💵 *TOTAL AMOUNT: ₹${grandTotal}*
${notes.trim() ? `\n📝 Cooking Note: ${notes.trim()}` : ''}
━━━━━━━━━━━━━━━━━━━
_Order placed via Radhe Radhe Cafe Web App_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${targetManagerWhatsApp}?text=${encodedMessage}`;

    // Open WhatsApp in new tab after showing bonus toast
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsRedirecting(false);
      setToastMessage('');
    }, 900);
  };

  return (
    <div
      id="order-form-modal-backdrop"
      className="fixed inset-0 z-[60] flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isRedirecting) onClose();
      }}
    >
      <div
        id="order-form-modal-container"
        className="relative w-full max-w-xl bg-white border border-stone-200/90 rounded-3xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden"
      >
        {/* Success Toast Banner (BONUS REQUIREMENT) */}
        {toastMessage && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-stone-900 font-['Outfit'] leading-tight">
                Place Your Order • Radhe Radhe Cafe
              </h2>
              <p className="text-[11px] sm:text-xs text-red-600 font-bold font-hindi-body">
                सीधे चयनित आउटलेट मैनेजर के व्हाट्सएप पर ऑर्डर भेजें
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-stone-800">
          <form onSubmit={handlePlaceOrder} className="space-y-4">

            {/* 1. SELECT OUTLET WITH TIMINGS (CRITICAL REQUIREMENT) */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                isSelectedOutletOpen
                  ? 'bg-gradient-to-br from-red-50/70 to-amber-50/60 border-red-200/90'
                  : 'bg-rose-50/60 border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="outlet-select"
                  className="block text-xs font-black uppercase text-red-700 tracking-wider flex items-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-red-600" />
                  <span>आउटलेट चुनें (Select Outlet) *</span>
                </label>
                
                {/* Live Open / Closed indicator tag */}
                {isSelectedOutletOpen ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Open Now
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Closed Now
                  </span>
                )}
              </div>

              {/* Outlet Dropdown with Timing Example: "Thekma 1.0 (10 AM – 10 PM)" */}
              <div className="relative">
                <select
                  id="outlet-select"
                  value={selectedOutlet}
                  onChange={(e) => {
                    setSelectedOutlet(e.target.value);
                    setErrorMsg('');
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-stone-900 font-extrabold text-xs sm:text-sm focus:outline-none focus:ring-2 shadow-xs cursor-pointer ${
                    isSelectedOutletOpen
                      ? 'border-red-300 focus:ring-red-600/20 focus:border-red-600'
                      : 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                  }`}
                >
                  {sortedOutlets.map((outlet) => {
                    const open = isOutletOpen(outlet);
                    return (
                      <option
                        key={outlet.id}
                        value={outlet.title}
                        className={open ? 'text-stone-900 font-bold' : 'text-stone-500 font-normal'}
                      >
                        {outlet.title} ({outlet.timing}) • {open ? '🟢 Open Now' : '🔴 Closed'}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Dynamic Status / Timing Note */}
              <div className="pt-2">
                {isSelectedOutletOpen ? (
                  <div className="flex items-center justify-between text-xs text-stone-700 bg-white/80 p-2 rounded-xl border border-stone-200/70">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bold text-emerald-800">
                        🕒 खुला है ({activeOutletTiming})
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">
                      मैनेजर: <strong className="text-stone-800">{activeOutletObj?.manager}</strong>
                    </span>
                  </div>
                ) : (
                  /* CLOSED OUTLET WARNING (CRITICAL REQUIREMENT) */
                  <div className="p-3 rounded-xl bg-rose-100/80 border border-rose-300 text-rose-900 text-xs font-semibold space-y-1 animate-fade-in">
                    <div className="flex items-center gap-1.5 font-black text-rose-800">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>आउटलेट अभी बंद है (Outlet Currently Closed)</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-rose-800 font-medium">
                      <strong>Selected outlet is currently closed. Please choose another outlet or try later.</strong>
                      <br />
                      <span>(इस आउटलेट का समय {activeOutletTiming} है। कृपया खुला हुआ आउटलेट चुनें।)</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 2. ORDER ITEMS & CART SUMMARY */}
            <div className="bg-[#faf8f5] rounded-2xl p-3.5 border border-stone-200/90 space-y-2.5">
              <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                <span className="text-xs font-black text-stone-900 uppercase tracking-wider font-['Outfit'] flex items-center gap-1.5">
                  <span>🍽️ Order Items ({cartItems.length})</span>
                </span>
                <span className="text-xs font-bold text-stone-600">
                  Subtotal: <strong className="text-stone-900 font-['Outfit']">₹{subtotal}</strong>
                </span>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-6 text-center text-xs text-stone-500 font-hindi-body">
                  आपकी कार्ट खाली है! कृपया पहले मेन्यू से व्यंजन जोड़ें।
                </div>
              ) : (
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-xl bg-white border border-stone-200/70 shadow-2xs"
                    >
                      {/* Name & Variant (Full / Half) */}
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <div className="truncate">
                          <span className="font-bold text-stone-900 font-hindi-body">
                            {item.hindiName || item.name}
                          </span>
                          {item.variant ? (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-red-700 border border-red-200">
                              {item.variant}
                            </span>
                          ) : item.plateType ? (
                            <span className="ml-1.5 text-[10px] text-stone-500 font-semibold">
                              ({item.plateType})
                            </span>
                          ) : null}
                          <div className="text-[10px] text-stone-400">
                            {item.name} • ₹{item.price} each
                          </div>
                        </div>
                      </div>

                      {/* Quantity Selector (+/-) */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded bg-white hover:bg-stone-200 text-red-600 flex items-center justify-center transition font-bold"
                          >
                            <Minus className="w-2.5 h-2.5 stroke-[2.5]" />
                          </button>
                          <span className="w-5 text-center font-black text-xs text-stone-900 font-['Outfit']">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition font-bold"
                          >
                            <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-black text-xs text-stone-900 font-['Outfit'] min-w-[45px] text-right">
                          ₹{item.price * item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. CUSTOMER DETAILS (NAME & PHONE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Customer Name (Required) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Customer Name (ग्राहक का नाम) <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="उदा. अमित गुप्ता (Amit Gupta)"
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border text-xs sm:text-sm font-medium text-stone-900 outline-none transition-all ${
                      customerName.trim()
                        ? 'border-stone-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/15'
                        : 'border-stone-300 focus:border-red-500'
                    }`}
                  />
                </div>
              </div>

              {/* Phone Number (Required) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Phone Number (मोबाइल नंबर) <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-stone-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-white border text-xs sm:text-sm font-medium text-stone-900 outline-none transition-all ${
                      isPhoneValid
                        ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15'
                        : 'border-stone-300 focus:border-red-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* 4. FULL DELIVERY ADDRESS (REQUIRED) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-stone-700">
                  Full Delivery Address (पूरा डिलीवरी पता) <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-stone-400">मकान/दुकान, गली, गांव या कस्बा</span>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-stone-400 pointer-events-none" />
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="उदा. मकान नं. 12, मेन मार्केट, सरायमोहन, ठेकमा..."
                  className={`w-full pl-9 pr-3 py-2 rounded-xl bg-white border text-xs sm:text-sm font-medium text-stone-900 outline-none resize-none transition-all ${
                    customerAddress.trim()
                      ? 'border-stone-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/15'
                      : 'border-stone-300 focus:border-red-500'
                  }`}
                />
              </div>
            </div>

            {/* 5. 📍 SERVICEABLE DELIVERY AREAS (MANDATORY READ-ONLY SECTION) */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-stone-700 tracking-wider flex items-center gap-1.5 font-['Outfit']">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Delivery Areas (डिलीवरी क्षेत्र • 22 प्रमुख गांव व कस्बे):</span>
                </span>
                <span className="text-[10px] text-stone-400 font-semibold">
                  टैप करके पते में जोड़ें
                </span>
              </div>

              {/* 22 Delivery Areas as Clean Badge Pills */}
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {DELIVERY_AREAS.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => handleQuickAddArea(area)}
                    title={`Click to add ${area} to address`}
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-white hover:bg-red-50 text-stone-700 hover:text-red-700 border border-stone-200/80 transition-colors shadow-2xs active:scale-95 cursor-pointer"
                  >
                    📍 {area}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone-500 font-hindi-body">
                उपरोक्त सभी 22 क्षेत्रों में राधे राधे कैफे की त्वरित होम डिलीवरी सेवा उपलब्ध है।
              </p>
            </div>

            {/* Special Cooking Note (Optional) */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Special Cooking Instructions (वैकल्पिक निर्देश - Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="उदा. कम तीखा बनाएं, एक्स्ट्रा हरी चटनी दें, फोन करके आएं"
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:border-red-600 text-xs text-stone-900 outline-none shadow-2xs"
              />
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Pricing Summary */}
            <div className="p-3 rounded-2xl bg-[#FAFAFA] border border-stone-200/90 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>व्यंजनों का योग (Items Subtotal):</span>
                <span className="font-bold text-stone-900 font-['Outfit']">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>डिलीवरी शुल्क:</span>
                <span className={currentDeliveryFee === 0 ? 'text-emerald-700 font-bold' : 'font-bold text-stone-900'}>
                  {currentDeliveryFee === 0 ? 'मुफ्त (FREE on ₹300+)' : `₹${currentDeliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>हाइजीन व पैकिंग:</span>
                <span className="font-bold text-stone-900 font-['Outfit']">₹{packagingFee}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>कुल देय राशि (Total Amount):</span>
                <span className="text-base text-red-600 font-['Outfit']">₹{grandTotal}</span>
              </div>
            </div>

            {/* 6. BIG "PLACE ORDER" BUTTON & SUBMISSION */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                id="place-order-whatsapp-btn"
                disabled={!isFormValid || isRedirecting}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-all duration-300 ${
                  isFormValid && !isRedirecting
                    ? 'bg-gradient-to-r from-red-600 via-red-700 to-[#800000] hover:from-red-700 hover:to-red-900 text-white shadow-red-600/30 active:scale-98 cursor-pointer'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                }`}
              >
                {isRedirecting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Redirecting to WhatsApp...</span>
                  </>
                ) : !isSelectedOutletOpen ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-stone-400" />
                    <span>Outlet Currently Closed ({activeOutletTiming})</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Place Order to {selectedOutlet} (व्हाट्सएप पर ऑर्डर भेजें)</span>
                    <span className="font-['Outfit'] text-base ml-1">₹{grandTotal}</span>
                  </>
                )}
              </button>

              {/* Informational Subtext */}
              <p className="text-[11px] text-center text-stone-500 font-hindi-body">
                {isSelectedOutletOpen ? (
                  `ऑर्डर बटन दबाते ही ${selectedOutlet} मैनेजर (+${targetManagerWhatsApp}) के व्हाट्सएप पर विवरण खुल जाएगा।`
                ) : (
                  <span className="text-rose-600 font-bold">
                    ⚠️ यह आउटलेट अभी बंद है। कृपया खुला हुआ आउटलेट चुनें।
                  </span>
                )}
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
