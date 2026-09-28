import React, { useRef, useEffect } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/menu';

export default function CategoryTabs({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  itemCounts = {},
}) {
  const scrollContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // Keep active tab visible in horizontal scroll view
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tab = activeTabRef.current;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollPos = tabLeft - (containerWidth / 2) + (tabWidth / 2);

      container.scrollTo({
        left: Math.max(0, scrollPos),
        behavior: 'smooth',
      });
    }
  }, [activeCategory]);

  return (
    <div className="w-full space-y-3">
      {/* Search Input Bar */}
      <div className="relative max-w-md mx-auto sm:max-w-none">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="मेन्यू में खोजें (उदा. लस्सी, चाट, पिज्जा, मोमोज, डोसा, शेक, मैगी...)"
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-white text-stone-900 placeholder-stone-400 border border-stone-200/90 focus:border-red-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/15 text-xs sm:text-sm font-medium transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 p-1 rounded-full text-stone-400 hover:text-stone-700 transition"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Scroll Navigation Controls & Tabs Bar */}
      <div className="relative flex items-center">
        {/* Scroll Left Button (desktop) */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll categories left"
          className="hidden md:flex absolute -left-3.5 z-10 w-7 h-7 rounded-full bg-white border border-stone-200 text-stone-700 shadow-md items-center justify-center hover:bg-red-50 hover:text-red-600 transition active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Categories Tab Strip (Horizontal Scroll - Mobile First) */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-1 w-full scroll-smooth"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = itemCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => onSelectCategory(cat.id)}
                id={`cat-tab-${cat.id}`}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]'
                    : 'bg-white text-stone-700 hover:text-red-700 hover:bg-stone-50 border border-stone-200/90 shadow-2xs'
                }`}
              >
                <span className="text-sm leading-none">{cat.icon}</span>
                <span className="font-hindi-body font-bold text-xs sm:text-sm tracking-wide">
                  {cat.name}
                </span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button (desktop) */}
        <button
          onClick={scrollRight}
          aria-label="Scroll categories right"
          className="hidden md:flex absolute -right-3.5 z-10 w-7 h-7 rounded-full bg-white border border-stone-200 text-stone-700 shadow-md items-center justify-center hover:bg-red-50 hover:text-red-600 transition active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
