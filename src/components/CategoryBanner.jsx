import React from 'react';

/**
 * Clean, premium, non-AI category banner.
 * - 70% White + 30% Red soft gradient blend
 * - Zero food images
 * - Elegant typography: Big, bold, center-aligned category name in deep red / dark brown
 * - Subtle tagline: "स्वाद जो रहेगा याद"
 * - Subtle soft background curves and light refined texture
 */
export default function CategoryBanner({ category, itemCount }) {
  if (!category) return null;

  // Format English display name (e.g. "MAGGI", "BURGER", "COFFEE", etc.)
  const displayName = (category.englishName || category.name || '')
    .replace(/\s*\(.*?\)\s*/g, '') // remove parenthesized extras if any
    .trim()
    .toUpperCase();

  const hindiName = category.name || '';

  return (
    <div
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-100/80 shadow-[0_4px_25px_rgba(179,0,0,0.03)] py-6 sm:py-8 px-4 sm:px-6 mb-4 sm:mb-6 text-center select-none"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 68%, #fff1f2 86%, #fee2e2 100%)',
      }}
    >
      {/* Soft Background Wave Accent (Subtle non-AI curves) */}
      <svg
        className="absolute right-0 top-0 bottom-0 h-full w-2/5 text-red-500/[0.035] pointer-events-none"
        viewBox="0 0 300 150"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,0 C90,60 180,20 300,80 L300,0 Z" />
        <path d="M40,150 C140,90 200,130 300,70 L300,150 Z" opacity="0.6" />
      </svg>

      {/* Gentle 30% soft ambient red glow */}
      <div
        className="absolute -right-10 -top-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-bl from-red-400/10 to-transparent blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle fine corner border accents for premium feel */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-red-200/60 rounded-tl-sm pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-red-200/60 rounded-br-sm pointer-events-none" />

      {/* Banner Content Container */}
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center justify-center space-y-1.5 sm:space-y-2">
        
        {/* Subtle Brand Tagline Top Accent */}
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-red-800/60 font-['Outfit']">
          RADHE RADHE CAFE
        </span>

        {/* Primary Category Name (Big, Bold, Deep Red / Dark Brown, Centered) */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#7a1215] tracking-wider uppercase font-['Outfit'] drop-shadow-[0_2px_4px_rgba(122,18,21,0.07)] leading-tight">
          {displayName}
        </h3>

        {/* Subtle Tagline: "स्वाद जो रहेगा याद" with fine decorative lines */}
        <div className="flex items-center gap-2 sm:gap-3 pt-0.5">
          <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-red-300/80" />
          <p className="text-xs sm:text-sm font-medium font-hindi-body text-stone-500 tracking-wide flex items-center gap-1.5">
            {hindiName && hindiName !== displayName && (
              <span className="font-bold text-red-900/80">{hindiName}</span>
            )}
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 font-normal">स्वाद जो रहेगा याद</span>
          </p>
          <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-red-300/80" />
        </div>

        {/* Item Count Pill (clean, subtle badge) */}
        {typeof itemCount === 'number' && itemCount > 0 && (
          <div className="pt-1">
            <span className="text-[10px] sm:text-[11px] font-bold px-3 py-0.5 rounded-full bg-white/90 border border-stone-200/90 text-stone-600 shadow-2xs font-hindi-body">
              {itemCount} व्यंजन उपलब्ध
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
