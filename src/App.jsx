import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartBar from './components/CartBar';
import CartModal from './components/CartModal';
import FloatingCart from './components/FloatingCart';
import Home from './pages/Home';
import Menu from './pages/Menu';
import LoadingScreen from './components/LoadingScreen';
import { CAFE_INFO } from './data/menu';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';
import InstagramIcon from './components/InstagramIcon';
import radheLogo from './assets/radhe-radhe-logo.png';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// Global Clean Footer Component
function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-400 text-xs pt-12 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Cafe Info with Official Circular Logo and description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              {/* White Container for Official Logo */}
              <div className="w-14 h-14 rounded-full bg-white p-1 flex items-center justify-center shrink-0 border border-stone-200">
                <img
                  src={radheLogo}
                  alt="Radhe Radhe Cafe (RRC) Official Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <div>
                <span className="text-xl font-bold text-white tracking-tight font-['Outfit'] block leading-snug">
                  {CAFE_INFO.name} ({CAFE_INFO.shortName})
                </span>
                <p className="text-sm text-yellow-400 font-bold font-hindi-body">
                  स्वाद जो हमेशा रहे याद
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              {CAFE_INFO.subTaglineHindi}। Serving honest, hygienic, and fresh vegetarian snacks, 
              hearty meals, and authentic kulhad beverages in Vrindavan.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% Pure Vegetarian Kitchen</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white font-['Outfit'] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Snacks" className="hover:text-white transition-colors">
                  Snacks & Chaat
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Indian Meals" className="hover:text-white transition-colors">
                  Indian Meals & Thali
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Chai & Beverages" className="hover:text-white transition-colors">
                  Kulhad Chai & Beverages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white font-['Outfit'] uppercase tracking-wider">
              Contact & Hours
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B22222] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}, {CAFE_INFO.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B22222] shrink-0" />
                <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-white transition-colors">
                  {CAFE_INFO.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B22222] shrink-0" />
                <span>{CAFE_INFO.timing}</span>
              </div>
            </div>
            {/* Social Channels - ONLY Instagram icon, no text */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/radheradhechatcorner"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow @radheradhechatcorner on Instagram"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#E1306C] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} {CAFE_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1 justify-center text-stone-400">
              Crafted with <Heart className="w-3 h-3 text-[#B22222] fill-[#B22222]" /> for authentic food lovers
            </p>
            {/* Instagram icon only */}
            <a
              href="https://www.instagram.com/radheradhechatcorner"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-stone-400 hover:text-[#E1306C] transition-colors p-1"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans">
          {/* Logo Loading Screen */}
          <LoadingScreen />

          {/* Top Clean Sticky Navigation with Official Logo */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Floating Cart Icon (Top Right) */}
          <FloatingCart />

          {/* Global Sticky Mobile Cart Bar */}
          <CartBar />

          {/* Global Slide-up Cart Modal & WhatsApp Order Form */}
          <CartModal />

          {/* Global Clean Footer with Official Logo */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
