import React from 'react';
import heroBgClean from '../assets/hero_bg_clean_no_logos.png';
import { CAFE_INFO } from '../data/menu';

export default function Hero() {
  return (
    <section
      id="home-hero"
      className="relative w-full h-[62vh] sm:h-[75vh] lg:h-[88vh] min-h-[460px] max-h-[850px] bg-cover bg-[position:25%_center] sm:bg-center bg-no-repeat overflow-hidden select-none border-b border-stone-200"
      style={{
        backgroundImage: `url(${heroBgClean})`,
        backgroundColor: '#fbf9f6',
      }}
    >
      {/* Clean, Minimal Hero Content: Only Heading & Subheading with Balanced Spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl space-y-4 sm:space-y-6 py-6 pl-2 sm:pl-4">
          
          {/* Main Heading: राधे राधे कैफे (Corrected proper Hindi spelling) */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-hindi-heading text-5xl sm:text-6xl lg:text-7xl font-black text-[#8e1012] tracking-wide leading-none drop-shadow-sm">
              राधे राधे
            </h1>
            
            <div className="flex items-center gap-3">
              {/* Left Leaf Accent */}
              <span className="text-[#8e1012] opacity-80 text-2xl sm:text-3xl select-none" aria-hidden="true">
                🍃
              </span>
              <h2 className="font-hindi-heading text-5xl sm:text-6xl lg:text-7xl font-black text-[#8e1012] tracking-wide leading-none drop-shadow-sm">
                कैफे
              </h2>
              {/* Right Leaf Accent */}
              <span className="text-[#8e1012] opacity-80 text-2xl sm:text-3xl select-none scale-x-[-1] inline-block" aria-hidden="true">
                🍃
              </span>
            </div>
          </div>

          {/* Subheading: ताजे और स्वादिष्ट खाने के साथ, हर पल बने खास */}
          <p className="font-hindi-body text-stone-800 text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed pt-1 max-w-sm sm:max-w-md drop-shadow-sm">
            ताजे और स्वादिष्ट खाने के साथ, <br /> हर पल बने खास
          </p>

        </div>
      </div>
    </section>
  );
}
