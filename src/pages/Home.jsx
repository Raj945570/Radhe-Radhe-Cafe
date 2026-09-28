import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Phone,
  MapPin,
  MessageCircle,
  Store,
} from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';

import Hero from '../components/Hero';
import FoodMenuSection from '../components/FoodMenuSection';
import AboutSection from '../components/AboutSection';
import OutletsSection from '../components/OutletsSection';
import { CAFE_INFO } from '../data/menu';
import radheLogo from '../assets/radhe-radhe-logo.png';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-stone-900">
      
      {/* 1. HERO SECTION (Red gradient background, left typography, center chef, right food with steam, curved wave) */}
      <Hero />

      {/* 2. DYNAMIC FOOD MENU SECTION (11 Categories, Sticky tabs, Add to cart with +/- quantity) */}
      <FoodMenuSection id="menu-section" />

      {/* 3. PREMIUM ABOUT SECTION (EXACT reference design: Left Story & Brush Tagline, 4 Feature Cards, Right Chef + 3 Overlapping Polaroids, Bottom Red Curved Wave) */}
      <AboutSection />

      {/* 4. OUR OUTLETS SECTION (3 Premium Cards: THEKMA 1.0, THEKMA 2.0, LALGANJ 3.0 with exact manager & phone data) */}
      <OutletsSection />

      {/* 5. CONTACT & BRAND SECTION: White Background (#ffffff) with Official Logo & Locations */}
      <section id="contact-section" className="bg-[#faf8f5] py-16 sm:py-20 border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            
            {/* Header Branding with Official Logo */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white p-1 border border-stone-200 shadow-sm shrink-0">
                  <img
                    src={radheLogo}
                    alt="Radhe Radhe Cafe Official Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-900 font-['Outfit']">
                    {CAFE_INFO.name} ({CAFE_INFO.shortName})
                  </h4>
                  <p className="text-xs text-stone-500 font-hindi-body">
                    {CAFE_INFO.taglineHindi} • Thekma & Lalganj, Azamgarh
                  </p>
                </div>
              </div>

              {/* Instagram Icon ONLY (No text) */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-stone-500 hidden md:inline">
                  Official Instagram:
                </span>
                <a
                  href="https://www.instagram.com/radheradhechatcorner"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Follow @radheradhechatcorner on Instagram"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform active:scale-95"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Head Office / Main Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#b30000] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-stone-900 font-['Outfit']">Head Office</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    {CAFE_INFO.address}, {CAFE_INFO.city}
                  </p>
                  <p className="text-[11px] text-[#b30000] font-bold mt-1">
                    Serving at Thekma 1.0, Thekma 2.0 & Lalganj 3.0
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#b30000] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-stone-900 font-['Outfit']">Operating Hours</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    {CAFE_INFO.timing}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                    ● Dine-in, Takeaway & Delivery Available
                  </p>
                </div>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#b30000] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-stone-900 font-['Outfit']">Direct Contact & WhatsApp</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Customer Care: <a href={`tel:${CAFE_INFO.phone}`} className="font-bold text-[#b30000] hover:underline">{CAFE_INFO.displayPhone}</a>
                  </p>
                  <a
                    href={`https://wa.me/${CAFE_INFO.phone}?text=${encodeURIComponent(
                      `Hello ${CAFE_INFO.name}! I would like to place an order or inquire about your outlets.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline mt-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                    <span>WhatsApp Quick Inquiry</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
