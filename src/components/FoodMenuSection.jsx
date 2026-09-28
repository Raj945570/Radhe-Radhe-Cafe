import React, { useState, useMemo } from 'react';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import { MENU_ITEMS, CATEGORIES } from '../data/menu';
import { Utensils, Sparkles, ChefHat } from 'lucide-react';

export default function FoodMenuSection({ id = "menu-section" }) {
  // Default to first category 'chaat'
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]?.id || 'chaat');
  const [searchQuery, setSearchQuery] = useState('');

  // Item counts per category
  const itemCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = MENU_ITEMS.filter((item) => item.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filter items strictly by active category and search
  const filteredItems = useMemo(() => {
    let list = MENU_ITEMS;

    // Filter by active category
    if (activeCategory) {
      list = list.filter((item) => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  // Current category metadata
  const currentCatObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section id={id} className="py-14 sm:py-20 bg-[#FDFBF9] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading (Red + White Cafe Branding) */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-red-200 shadow-xs">
            <Utensils className="w-3.5 h-3.5 text-red-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-['Outfit']">
              100% Pure Vegetarian Cafe Menu
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-['Outfit'] tracking-tight">
            Explore Our <span className="text-red-600">Food Menu</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-hindi-body font-medium">
            ताजा और स्वादिष्ट भोजन • अपनी पसंद की श्रेणी चुनें और असली स्वाद का आनंद लें
          </p>
        </div>

        {/* Sticky Category Bar on Scroll */}
        <div className="sticky top-18 sm:top-20 z-30 bg-[#FDFBF9]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 border-y border-stone-200/70 shadow-xs">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              setSearchQuery('');
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            itemCounts={itemCounts}
          />
        </div>

        {/* Active Category Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">{currentCatObj?.icon}</span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-hindi-body leading-tight">
                {currentCatObj?.name}
              </h3>
              <p className="text-xs text-red-600 font-bold font-hindi-body">
                राधे राधे कैफे विशेष मेन्यू
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 shadow-xs">
            {filteredItems.length} {filteredItems.length === 1 ? 'व्यंजन' : 'व्यंजन'} उपलब्ध
          </span>
        </div>

        {/* Menu Items Grid or Clean Awaiting State */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Clean, Real Cafe Status Container */
          <div className="rounded-3xl bg-white border border-dashed border-red-200 p-8 sm:p-12 text-center space-y-4 shadow-xs max-w-2xl mx-auto my-6">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-600">
              <ChefHat className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-lg sm:text-xl font-bold text-stone-900 font-hindi-body">
                {currentCatObj?.name} मेन्यू अपडेट हो रहा है
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed font-hindi-body">
                मेन्यू रेट कार्ड के अनुसार इस श्रेणी के सभी वास्तविक व्यंजन और उनके सही दाम (Half / Full / Plate) अपडेट किए जा रहे हैं।
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-stone-600 text-xs font-medium">
              <span>20 श्रेणियां उपलब्ध</span> • <span>बिना किसी डमी डेटा के</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
