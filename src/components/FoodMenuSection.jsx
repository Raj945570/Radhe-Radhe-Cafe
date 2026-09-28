import React, { useState, useMemo, useEffect, useRef } from 'react';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import CategoryBanner from './CategoryBanner';
import { MENU_ITEMS, CATEGORIES, CAFE_INFO } from '../data/menu';
import { Utensils, Sparkles, ChefHat, Truck, ArrowDownCircle, Search } from 'lucide-react';

export default function FoodMenuSection({ id = "menu-section" }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]?.id || 'lassi');
  const [searchQuery, setSearchQuery] = useState('');
  const [chineseSubGroup, setChineseSubGroup] = useState('all'); // 'all' | 'Rice' | 'Noodles'
  const isUserClickingTab = useRef(false);

  // Item counts per category
  const itemCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = MENU_ITEMS.filter((item) => item.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filter items per category considering search query
  const categoryItemsMap = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const map = {};

    CATEGORIES.forEach((cat) => {
      let items = MENU_ITEMS.filter((item) => item.category === cat.id);

      if (cat.id === 'chinese' && chineseSubGroup !== 'all') {
        items = items.filter((item) => item.subGroup === chineseSubGroup);
      }

      if (q) {
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.hindiName.toLowerCase().includes(q) ||
            (item.subGroup && item.subGroup.toLowerCase().includes(q))
        );
      }

      map[cat.id] = items;
    });

    return map;
  }, [searchQuery, chineseSubGroup]);

  // Total matching items across all categories
  const totalMatchingItems = useMemo(() => {
    return Object.values(categoryItemsMap).reduce((acc, items) => acc + items.length, 0);
  }, [categoryItemsMap]);

  // Smooth scroll to selected category section
  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    isUserClickingTab.current = true;

    const el = document.getElementById(`category-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      isUserClickingTab.current = false;
    }, 800);
  };

  // Scroll spy to update active category tab based on viewport
  useEffect(() => {
    const handleScroll = () => {
      if (isUserClickingTab.current) return;

      const categoryElements = CATEGORIES.map((cat) => ({
        id: cat.id,
        el: document.getElementById(`category-${cat.id}`),
      })).filter((item) => item.el !== null);

      const scrollPosition = window.scrollY + 180;

      for (let i = categoryElements.length - 1; i >= 0; i--) {
        const { id, el } = categoryElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveCategory(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id={id} className="py-10 sm:py-16 bg-[#FDFBF9] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Heading & Delivery Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-red-200 shadow-2xs">
            <Utensils className="w-3.5 h-3.5 text-red-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-['Outfit']">
              100% Pure Vegetarian Cafe Menu
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-['Outfit'] tracking-tight">
            Delicious <span className="text-red-600">Food Menu</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-600 font-hindi-body font-medium max-w-xl mx-auto">
            राधे राधे कैफे का संपूर्ण प्रामाणिक मेन्यू • ताज़ा सामग्री एवं शुद्ध मसालों से बना हर व्यंजन
          </p>

          {/* Special Delivery Logic Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm font-semibold shadow-2xs">
            <Truck className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-hindi-body">
              ₹300 से अधिक के ऑर्डर पर <strong className="text-red-700 underline font-black">मुफ्त होम डिलीवरी (Free Delivery within 2km)</strong> • 2km के बाद मात्र ₹20/km
            </span>
          </div>
        </div>

        {/* Sticky Category Tabs Strip */}
        <div className="sticky top-16 sm:top-20 z-30 bg-[#FDFBF9]/95 backdrop-blur-md py-2.5 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 border-y border-stone-200/80 shadow-xs">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            itemCounts={itemCounts}
          />
        </div>

        {/* Search Result Counter (when searching) */}
        {searchQuery && (
          <div className="flex items-center justify-between bg-white border border-red-200/80 rounded-2xl p-3 px-4 shadow-2xs text-xs">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-red-600" />
              <span className="font-hindi-body text-stone-700 font-bold">
                "{searchQuery}" के लिए <strong className="text-red-600 font-black font-['Outfit']">{totalMatchingItems}</strong> व्यंजन मिले
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-stone-500 hover:text-red-600 font-bold text-xs underline cursor-pointer"
            >
              सर्च हटाएं (Clear)
            </button>
          </div>
        )}

        {/* Category Sections: Each Category in a Separate Card Section */}
        <div className="space-y-8 sm:space-y-12">
          {CATEGORIES.map((cat) => {
            const items = categoryItemsMap[cat.id] || [];

            // If searching and this category has 0 items, hide the section
            if (searchQuery && items.length === 0) {
              return null;
            }

            return (
              <div
                key={cat.id}
                id={`category-${cat.id}`}
                className="scroll-mt-36 sm:scroll-mt-40 rounded-3xl bg-white border border-stone-200/90 p-3.5 sm:p-6 shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Clean, Premium, Non-AI Category Banner (70% White + 30% Red, No Food Images) */}
                <CategoryBanner category={cat} itemCount={items.length} />

                {/* Subgroup Toggle for Chinese (Rice & Noodles) */}
                {cat.id === 'chinese' && (
                  <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                    <span className="text-xs font-bold text-stone-500 font-hindi-body shrink-0">
                      चाइनीज प्रकार:
                    </span>
                    <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setChineseSubGroup('all')}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          chineseSubGroup === 'all'
                            ? 'bg-red-600 text-white shadow-2xs'
                            : 'text-stone-700 hover:text-red-600'
                        }`}
                      >
                        सभी (All 18)
                      </button>
                      <button
                        type="button"
                        onClick={() => setChineseSubGroup('Rice')}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          chineseSubGroup === 'Rice'
                            ? 'bg-red-600 text-white shadow-2xs'
                            : 'text-stone-700 hover:text-red-600'
                        }`}
                      >
                        चावल (Rice 10)
                      </button>
                      <button
                        type="button"
                        onClick={() => setChineseSubGroup('Noodles')}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          chineseSubGroup === 'Noodles'
                            ? 'bg-red-600 text-white shadow-2xs'
                            : 'text-stone-700 hover:text-red-600'
                        }`}
                      >
                        नूडल्स (Noodles 8)
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile Responsive Grid: 2 Columns on Mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
                  {items.map((item) => (
                    <FoodCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Result State */}
        {searchQuery && totalMatchingItems === 0 && (
          <div className="rounded-3xl bg-white border border-dashed border-red-200 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-600">
              <ChefHat className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900 font-hindi-body">
                कोई व्यंजन नहीं मिला
              </h3>
              <p className="text-xs text-stone-500 font-hindi-body">
                "{searchQuery}" नाम से मेन्यू में कोई व्यंजन नहीं मिला। कृपया स्पेलिंग जांचें या अन्य नाम से खोजें।
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              पूरा मेन्यू देखें (Show All)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
