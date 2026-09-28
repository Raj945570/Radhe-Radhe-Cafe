import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Phone,
  User,
  Navigation,
  MessageCircle,
  Clock,
  Check,
  Copy,
  Store,
} from 'lucide-react';
import { OUTLETS, isOutletOpen } from '../data/menu';

export default function OutletsSection() {
  const [copiedPhone, setCopiedPhone] = useState(null);

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

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

  return (
    <section
      id="outlets-section"
      className="bg-white py-16 sm:py-20 lg:py-24 border-b border-stone-100 relative"
    >
      {/* Background Soft Accent Circles */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-red-50/50 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-0 w-80 h-80 bg-amber-50/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          
          {/* Rounded Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 shadow-sm mb-4">
            <div className="w-5 h-5 rounded-full bg-[#b30000] text-white flex items-center justify-center shrink-0">
              <Store className="w-3 h-3 stroke-[2.4]" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#b30000] font-['Outfit']">
              OUR OUTLETS & TIMINGS
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 font-['Outfit'] tracking-tight">
            Our <span className="text-[#b30000]">Outlets</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Serving fresh, delicious, and hygienic food across 3 premier locations in Azamgarh. 
            Live operational timings and direct manager contacts.
          </p>
        </div>

        {/* 3 Premium Cards Grid with Live Timing & Open/Closed Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {sortedOutlets.map((outlet) => {
            const isOpen = isOutletOpen(outlet);
            const whatsappText = encodeURIComponent(
              `Hello ${outlet.manager} ji! I would like to place an order at ${outlet.title}.`
            );
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              outlet.mapsQuery
            )}`;

            return (
              <div
                key={outlet.id}
                className={`bg-white rounded-3xl border transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden flex flex-col justify-between ${
                  isOpen
                    ? 'border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(179,0,0,0.12)] hover:border-red-300'
                    : 'border-stone-200/70 bg-stone-50/40 opacity-90 shadow-xs'
                }`}
              >
                {/* Red/Green Accent Top Bar */}
                <div
                  className={`h-1.5 w-full ${
                    isOpen
                      ? 'bg-gradient-to-r from-[#b30000] via-[#dc2626] to-[#b30000]'
                      : 'bg-stone-300'
                  }`}
                />

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  
                  {/* Card Header: Outlet Name & Live Status Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {/* Outlet Icon & Code */}
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black font-['Outfit'] shadow-sm transition-colors duration-300 ${
                            isOpen
                              ? 'bg-red-50 text-[#b30000] group-hover:bg-[#b30000] group-hover:text-white'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          <Store className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                          Branch #{outlet.code}
                        </span>
                      </div>

                      {/* Live Open / Closed Status indicator */}
                      {isOpen ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Open Now
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
                          <span className="w-2 h-2 rounded-full bg-stone-400" />
                          Closed
                        </span>
                      )}
                    </div>

                    {/* Title & Timing subtitle */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Outfit'] tracking-tight group-hover:text-[#b30000] transition-colors">
                      {outlet.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#b30000] font-bold">
                        {outlet.badge}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-xs text-stone-600 font-semibold font-mono">
                        {outlet.timing}
                      </span>
                    </div>
                  </div>

                  {/* Information List */}
                  <div className="space-y-4 pt-2 border-t border-stone-100">
                    
                    {/* Operational Timing Display (REQUIRED) */}
                    <div className="flex items-center gap-3 bg-amber-50/70 p-2.5 rounded-2xl border border-amber-200/80">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-amber-800" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block font-['Outfit']">
                            🕒 Operational Timing
                          </span>
                          <span
                            className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                              isOpen
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {isOpen ? 'Accepting Orders' : 'Reopens at Timing'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold text-stone-900 mt-0.5 font-mono">
                          {outlet.timing}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-red-50 text-[#b30000] flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                          Location
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug mt-0.5">
                          {outlet.location}
                        </p>
                      </div>
                    </div>

                    {/* Manager */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                          Manager
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5">
                          {outlet.manager}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-red-50 text-[#b30000] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                            Direct Phone
                          </span>
                          <a
                            href={`tel:${outlet.phone}`}
                            className="text-sm sm:text-base font-extrabold text-[#b30000] hover:underline font-mono"
                          >
                            {outlet.phone}
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopyPhone(outlet.phone)}
                          title="Copy phone number"
                          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                        >
                          {copiedPhone === outlet.phone ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Action CTA Buttons */}
                  <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-2">
                    
                    {/* Call Button */}
                    <a
                      href={`tel:${outlet.phone}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#b30000] hover:bg-[#8e0c0c] text-white font-bold text-xs shadow-sm transition-all active:scale-95 text-center"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/91${outlet.phone}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm transition-all active:scale-95 text-center ${
                        isOpen
                          ? 'bg-[#25D366] hover:bg-[#20ba59]'
                          : 'bg-stone-500 hover:bg-stone-600'
                      }`}
                      title={isOpen ? 'Chat on WhatsApp' : `Reopens at ${outlet.timing}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{isOpen ? 'Order' : 'Chat'}</span>
                    </a>

                    {/* Directions Button */}
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-all active:scale-95 text-center"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#b30000]" />
                      <span>Map</span>
                    </a>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
