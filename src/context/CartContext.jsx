import React, { createContext, useContext, useState, useEffect } from 'react';
import { CAFE_INFO, calculateDeliveryFee as calcFee } from '../data/menu';

const CartContext = createContext();

const CART_STORAGE_KEY = 'radhe_radhe_cafe_cart_v3';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryDistance, setDeliveryDistance] = useState(2); // in KM

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Add item or increment count
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Remove item completely
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity (+1 or -1)
  const updateQuantity = (id, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get item quantity in cart by id
  const getItemQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  // Derived computations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery Calculation:
  // - Base delivery charge = ₹10 (always applicable)
  // - Distance logic: ≤ 2km -> ₹10, > 2km -> ₹10 + extra_km * ₹20
  const deliveryFee = calcFee(subtotal, deliveryDistance);
  // Packaging fee removed completely as per rules
  const packagingFee = 0;
  // Final bill: (Sum of all item totals) + Delivery Charge
  const grandTotal = subtotal > 0 ? subtotal + deliveryFee : 0;

  const isFreeDeliveryEligible = false;
  const amountNeededForFreeDelivery = 0;

  const openCart = () => {
    setIsCartOpen(true);
    setIsCheckoutOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
  };

  const openCheckout = () => {
    setIsCheckoutOpen(true);
    setIsCartOpen(true);
  };

  const backToCart = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        totalItems,
        subtotal,
        deliveryDistance,
        setDeliveryDistance,
        deliveryFee,
        packagingFee,
        grandTotal,
        isFreeDeliveryEligible,
        amountNeededForFreeDelivery,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        backToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
