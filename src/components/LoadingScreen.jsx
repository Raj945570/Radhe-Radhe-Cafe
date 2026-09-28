import React, { useState, useEffect } from 'react';
import radheLogo from '../assets/radhe-radhe-logo.png';
import { CAFE_INFO } from '../data/menu';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fast initial check: directly show hero image with no heavy animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      id="app-loading-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-white"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Official Circular Logo */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white border-2 border-stone-200 shadow-2xl flex items-center justify-center">
          <img
            src={radheLogo}
            alt="Radhe Radhe Cafe Logo"
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
            {CAFE_INFO.hindiName}
          </h2>
          <p className="text-xs sm:text-sm text-yellow-400 font-semibold font-hindi-body">
            {CAFE_INFO.taglineHindi}
          </p>
        </div>
      </div>
    </div>
  );
}
