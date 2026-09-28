import React from 'react';
import heroChef from '../assets/hero_chef_feathered.png';

export default function Hero() {
  return (
    <section
      id="home-hero"
      className="relative w-full bg-[#fbf9f6] border-b border-stone-200 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        
        {/* Left Side (Desktop) / Top (Mobile): Main Typography */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start space-y-4 sm:space-y-6">
          
          {/* Main Heading: राधे राधे कैफे */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-hindi-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#8e1012] tracking-wide leading-none drop-shadow-xs">
              राधे राधे
            </h1>
            
            <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3">
              {/* Left Leaf Accent */}
              <span className="text-[#8e1012] opacity-80 text-xl sm:text-2xl md:text-3xl select-none" aria-hidden="true">
                🍃
              </span>
              <h2 className="font-hindi-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#8e1012] tracking-wide leading-none drop-shadow-xs">
                कैफे
              </h2>
              {/* Right Leaf Accent */}
              <span className="text-[#8e1012] opacity-80 text-xl sm:text-2xl md:text-3xl select-none scale-x-[-1] inline-block" aria-hidden="true">
                🍃
              </span>
            </div>
          </div>

          {/* Subheading: ताजे और स्वादिष्ट खाने के साथ, हर पल बने खास */}
          <p className="font-hindi-body text-stone-800 text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed max-w-sm sm:max-w-md drop-shadow-xs">
            ताजे और स्वादिष्ट खाने के साथ, <br /> हर पल बने खास
          </p>

          {/* Pure Vegetarian Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-red-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-bold text-stone-800 font-hindi-body">
              100% शुद्ध शाकाहारी • स्वाद जो हमेशा रहे याद
            </span>
          </div>

        </div>

        {/* Right Side (Desktop) / Bottom (Mobile): Character & Food Scene */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end overflow-hidden">
          <div className="relative w-full max-w-lg md:max-w-none flex items-center justify-center">
            <img
              src={heroChef}
              alt="Radhe Radhe Cafe Chef with Special Food"
              className="w-full max-h-[260px] sm:max-h-[300px] md:max-h-[480px] lg:max-h-[540px] object-contain md:object-cover rounded-2xl md:rounded-none drop-shadow-md transition-transform duration-300"
              loading="eager"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
