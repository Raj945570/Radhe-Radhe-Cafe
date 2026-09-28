import React, { useState } from 'react';
import {
  ChefHat,
  Leaf,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import rightCompositionImg from '../assets/about_right_feathered.png';
import brushTaglineImg from '../assets/about_brush_transparent.png';
import insta1 from '../assets/insta_1.jpg';
import insta2 from '../assets/insta_2.jpg';
import insta3 from '../assets/insta_3.jpg';

export default function AboutSection() {
  const [activePhoto, setActivePhoto] = useState(null);

  // 4 Core Value Feature Cards matching exact reference design
  const featureCards = [
    {
      id: 'fresh',
      title: 'Fresh Ingredients',
      subtitle: 'Always Fresh',
      icon: Leaf,
    },
    {
      id: 'hygiene',
      title: 'Hygienic Cooking',
      subtitle: 'Clean & Safe',
      icon: ChefHat,
    },
    {
      id: 'taste',
      title: 'Great Taste',
      subtitle: 'Loved by Everyone',
      icon: Users,
    },
    {
      id: 'prices',
      title: 'Affordable Prices',
      subtitle: 'Quality in Budget',
      icon: ShieldCheck,
    },
  ];

  // 3 Polaroid photo cards matching the right side of reference
  const polaroids = [
    {
      id: 1,
      title: 'Freshly Made',
      img: insta1,
      rotation: '-rotate-3',
      alt: 'Freshly made snacks and chaat prep at Radhe Radhe Cafe',
    },
    {
      id: 2,
      title: 'Hygienic Cooking',
      img: insta2,
      rotation: 'rotate-3',
      alt: 'Hygienic cooking and beverage preparation at Radhe Radhe Cafe',
    },
    {
      id: 3,
      title: 'Desi Swad',
      img: insta3,
      rotation: '-rotate-2',
      alt: 'Authentic Desi Swad served by our head chef at Radhe Radhe Cafe',
    },
  ];

  return (
    <section
      id="about-section"
      className="relative bg-[#fcfbf7] overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 border-b border-stone-200/60"
    >
      {/* Background Decorative Food Doodle Watermark (matching reference subtle line art) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] select-none"
        style={{
          backgroundImage: `radial-gradient(#b30000 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Ambient background glow for warmth */}
      <div
        className="absolute top-10 left-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 right-10 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Layout matching EXACT reference composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ===================== LEFT COLUMN ===================== */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6">
            
            {/* 1. Small Rounded Tag: "ABOUT US" with red icon */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 shadow-sm transition-transform hover:scale-105">
                <div className="w-5 h-5 rounded-full bg-[#b30000] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ChefHat className="w-3 h-3 stroke-[2.4]" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#b30000] font-['Outfit']">
                  ABOUT US
                </span>
              </div>
            </div>

            {/* 2. Big Heading: "Our Story" & "Radhe Radhe Cafe" (highlighted in red) */}
            <div className="space-y-1">
              <h2 className="font-story-title text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.08]">
                Our Story
              </h2>
              <h2 className="font-story-title text-4xl sm:text-5xl lg:text-6xl font-black text-[#b30000] tracking-tight leading-[1.08]">
                Radhe Radhe Cafe
              </h2>
            </div>

            {/* 3. Story Paragraph Text: Hindi Translation */}
            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-hindi-body font-normal max-w-xl">
              <p>
                <strong className="text-stone-900 font-bold font-['Outfit']">राधे राधे कैफे</strong> में, हमारा मानना है कि खाना सिर्फ एक भोजन नहीं – बल्कि एक एहसास है। स्वादिष्ट, हाइजीनिक और किफायती खाने के जुनून के साथ शुरू हुआ हमारा सफर, हर एक बाइट में खुशियां परोसने का है।
              </p>
              <p>
                कुरकुरे स्नैक्स से लेकर रिफ्रेशिंग ड्रिंक्स तक, हम आपके लिए लेकर आते हैं स्वाद, क्वालिटी और प्यार का बेहतरीन संगम – बिल्कुल घर जैसा।
              </p>
            </div>


            {/* 4. Brush style highlight text: "Swad jo hamesha yaad rahe..." */}
            <div className="pt-1">
              <div className="inline-block relative group">
                <img
                  src={brushTaglineImg}
                  alt="Swad jo hamesha yaad rahe..."
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>

            {/* 5. 4 Feature Cards (Pill shape, clean white, red icon, subtitle) */}
            <div className="pt-2 sm:pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                {featureCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.id}
                      className="bg-white rounded-2xl p-3.5 sm:p-4 text-center border border-stone-200/80 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(179,0,0,0.12)] hover:border-red-200 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group"
                    >
                      {/* Red circular icon badge */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#b30000] text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 group-hover:bg-[#8e0c0c] transition-all duration-300">
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      
                      {/* Title */}
                      <h4 className="font-bold text-xs sm:text-[13px] text-stone-900 font-['Outfit'] leading-tight">
                        {card.title}
                      </h4>
                      
                      {/* Small Subtitle */}
                      <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium mt-0.5 leading-tight">
                        {card.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ===================== RIGHT COLUMN ===================== */}
          {/* Main image (Chef holding drinks) + 3 overlapping photo cards (Freshly Made, Hygienic Cooking, Desi Swad) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center mt-4 lg:mt-0">
            
            {/* Desktop & Tablet: High-fidelity seamless composition from reference design */}
            <div className="relative w-full max-w-lg lg:max-w-none group">
              
              {/* Main Visual Composition */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/60 bg-stone-900">
                <img
                  src={rightCompositionImg}
                  alt="Head Chef at Radhe Radhe Cafe holding signature chocolate milkshakes with Freshly Made, Hygienic Cooking, and Desi Swad photos"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.015] transition-transform duration-700"
                  loading="eager"
                />

                {/* Subtle light reflections */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Accent Badge on visual */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-md hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#b30000] animate-pulse" />
                <span className="text-[11px] font-bold text-stone-800 font-['Outfit']">
                  Authentic Real Flavors
                </span>
              </div>

              {/* Mobile Quick Preview of the 3 Cards */}
              <div className="grid grid-cols-3 gap-2 mt-3 lg:hidden">
                {polaroids.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setActivePhoto(p)}
                    className="bg-white p-1.5 rounded-xl shadow-sm border border-stone-200 text-center cursor-pointer active:scale-95 transition-transform"
                  >
                    <img
                      src={p.img}
                      alt={p.alt}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <span className="font-brush text-[#b30000] text-xs font-bold block mt-1">
                      {p.title}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>



      {/* Interactive Photo Modal for Mobile / Inspection */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white p-3 sm:p-4 rounded-2xl max-w-sm w-full shadow-2xl border border-stone-200 transform scale-100 transition-all text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.img}
              alt={activePhoto.alt}
              className="w-full aspect-square object-cover rounded-xl shadow-inner"
            />
            <div className="mt-3 flex items-center justify-between px-2">
              <span className="font-brush text-[#b30000] text-xl font-bold">
                {activePhoto.title}
              </span>
              <button
                onClick={() => setActivePhoto(null)}
                className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
