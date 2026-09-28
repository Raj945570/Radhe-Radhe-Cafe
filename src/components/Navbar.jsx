import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/menu';
import radheLogo from '../assets/radhe-radhe-logo.png';

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello ${CAFE_INFO.name}! I would like to place an order.`
  );
  const whatsappUrl = `https://wa.me/${CAFE_INFO.phone}?text=${whatsappMessage}`;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbf9f6]/95 backdrop-blur-md border-b border-stone-200/70 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Left: Official HD Circular Logo & Brand Name matching reference */}
        <Link
          to="/"
          id="nav-brand-logo"
          className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none"
        >
          {/* Provided Official HD Circular Logo */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white p-0.5 shadow-sm flex items-center justify-center shrink-0 border border-stone-200">
            <img
              src={radheLogo}
              alt="Radhe Radhe Cafe Official Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex flex-col">
              <span className="font-hindi-heading text-xl sm:text-2xl font-black text-[#8e1012] tracking-wide leading-none">
                राधे राधे
              </span>
              <span className="font-hindi-heading text-lg sm:text-xl font-black text-[#8e1012] tracking-wide leading-none mt-0.5">
                कैफे
              </span>
            </div>
            {/* Subtle leaf flourish accent */}
            <span className="text-[#8e1012] text-xs opacity-75 hidden xs:inline">🍃</span>
          </div>
        </Link>

        {/* Center: Clean & Minimal Navigation Links with Active Red Underline */}
        <nav className="hidden md:flex items-center gap-7">
          <NavLink
            to="/"
            id="nav-link-home"
            className={({ isActive }) =>
              `text-sm sm:text-base font-bold tracking-wide transition-colors py-1 ${
                isActive
                  ? 'text-[#8e1012] border-b-2 border-[#8e1012]'
                  : 'text-stone-700 hover:text-[#8e1012]'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/menu"
            id="nav-link-menu"
            className={({ isActive }) =>
              `text-sm sm:text-base font-bold tracking-wide transition-colors py-1 ${
                isActive
                  ? 'text-[#8e1012] border-b-2 border-[#8e1012]'
                  : 'text-stone-700 hover:text-[#8e1012]'
              }`
            }
          >
            Menu
          </NavLink>

          <a
            href="#about-section"
            id="nav-link-about"
            className="text-sm sm:text-base font-bold text-stone-700 hover:text-[#8e1012] transition-colors py-1"
          >
            About
          </a>

          <a
            href="#outlets-section"
            id="nav-link-outlets"
            className="text-sm sm:text-base font-bold text-stone-700 hover:text-[#8e1012] transition-colors py-1"
          >
            Outlets
          </a>

          <a
            href="#contact-section"
            id="nav-link-contact"
            className="text-sm sm:text-base font-bold text-stone-700 hover:text-[#8e1012] transition-colors py-1"
          >
            Contact
          </a>
        </nav>

        {/* Right: Clean minimal action icons (Instagram ONLY icon, Cart trigger, Mobile menu) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Top Right: ONLY Instagram icon (No text) -> opens user specified URL */}
          <a
            href="https://www.instagram.com/radheradhechatcorner"
            target="_blank"
            rel="noopener noreferrer"
            id="nav-instagram-btn"
            aria-label="Instagram @radheradhechatcorner"
            title="Follow us on Instagram"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-rose-50 text-stone-700 hover:text-[#E1306C] border border-stone-200/90 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group"
          >
            <InstagramIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110" />
          </a>



          {/* Quick Cart Trigger if items present */}
          {totalItems > 0 && (
            <button
              onClick={openCart}
              id="nav-cart-btn"
              aria-label="View Shopping Cart"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 shadow-sm flex items-center justify-center transition-colors active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#8e1012]" />
              <span className="absolute -top-1 -right-1 bg-[#8e1012] text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {totalItems}
              </span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-800 hover:bg-stone-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-5 space-y-2 shadow-lg animate-slide-down">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-bold text-[#8e1012] bg-red-50/60"
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-bold text-stone-800 hover:bg-stone-50"
          >
            Our Menu
          </Link>
          <a
            href="#about-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            About Radhe Radhe Cafe
          </a>
          <a
            href="#outlets-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Our Outlets
          </a>
          <a
            href="#contact-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Contact & Timings
          </a>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between px-3">
            <span className="text-xs text-stone-500 font-medium">Follow on Instagram:</span>
            <a
              href="https://www.instagram.com/radheradhechatcorner"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-rose-50 text-[#E1306C] border border-rose-200/80 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

          </div>
        </div>
      )}
    </header>
  );
}
