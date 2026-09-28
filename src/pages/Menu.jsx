import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Utensils, AlertCircle, Truck } from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import FoodCard from '../components/FoodCard';
import CategoryBanner from '../components/CategoryBanner';
import { MENU_ITEMS, CATEGORIES, CAFE_INFO } from '../data/menu';
import radheLogo from '../assets/radhe-radhe-logo.png';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'lassi';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [chineseSubGroup, setChineseSubGroup] = useState('all');

  // Sync category if query params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setSearchParams({ category: catId });
  };

  // Compute category item counts dynamically
  const itemCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = MENU_ITEMS.filter((item) => item.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Filter by Category
    if (activeCategory) {
      result = result.filter((item) => item.category === activeCategory);
    }

    // Chinese subgroup filter
    if (activeCategory === 'chinese' && chineseSubGroup !== 'all') {
      result = result.filter((item) => item.subGroup === chineseSubGroup);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.hindiName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.subGroup && item.subGroup.toLowerCase().includes(q))
      );
    }

    // Sort items
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.price || a.halfPrice || 0) - (b.price || b.halfPrice || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.price || b.fullPrice || 0) - (a.price || a.fullPrice || 0));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, chineseSubGroup]);

  const currentCatObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-stone-900">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-32">
        
        {/* Header with Official Circular Logo & Cafe Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div className="space-y-2">
            
            {/* Small Branding Pill with Official Logo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white border border-red-200 shadow-2xs">
              <img
                src={radheLogo}
                alt="Radhe Radhe Cafe (RRC) Official Logo"
                className="w-6 h-6 object-contain rounded-full shrink-0"
              />
              <span className="text-xs font-bold text-stone-900 font-['Outfit']">
                {CAFE_INFO.name} ({CAFE_INFO.shortName})
              </span>
              <span className="text-xs text-red-600 font-bold font-hindi-body">
                • 100% शुद्ध शाकाहारी
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-['Outfit']">
              Complete Food Menu
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl font-hindi-body font-medium">
              100% शुद्ध शाकाहारी एवं ताज़ा भोजन • सभी 20 श्रेणियों का प्रामाणिक मेन्यू (125 व्यंजन)
            </p>
          </div>

          {/* Delivery Logic Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs font-bold font-hindi-body shadow-2xs">
            <Truck className="w-4 h-4 text-red-600 shrink-0" />
            <span>₹300+ पर फ्री डिलीवरी (within 2km) • ₹20/km अतिरिक्त</span>
          </div>
        </div>

        {/* Sticky Category Tabs Bar */}
        <div className="sticky top-16 sm:top-20 z-30 bg-[#FDFBF9]/95 backdrop-blur-md py-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 border-y border-stone-200/80 shadow-xs">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            itemCounts={itemCounts}
          />
        </div>

        {/* Clean, Premium, Non-AI Category Banner (70% White + 30% Red, No Food Images) */}
        {currentCatObj && (
          <CategoryBanner category={currentCatObj} itemCount={filteredItems.length} />
        )}

        {/* Filter Toolbar (Sub-group toggle & Sort selector) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          {/* Chinese Subgroup Pill Filter */}
          {activeCategory === 'chinese' ? (
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => setChineseSubGroup('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  chineseSubGroup === 'Noodles'
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-red-600'
                }`}
              >
                नूडल्स (Noodles 8)
              </button>
            </div>
          ) : (
            <div className="text-stone-500 font-hindi-body font-semibold">
              दाम और शुद्धता की गारंटी • राधे राधे कैफे
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="sort-select" className="text-stone-500 flex items-center gap-1 font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
              <span>Sort by:</span>
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white text-stone-800 text-xs font-bold py-1.5 px-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-600 cursor-pointer shadow-2xs"
            >
              <option value="recommended">डिफ़ॉल्ट क्रम</option>
              <option value="price-low">दाम: कम से ज्यादा</option>
              <option value="price-high">दाम: ज्यादा से कम</option>
            </select>
          </div>
        </div>

        {/* Food Items Mobile Responsive Grid (2 columns on mobile) */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty Search / Awaiting State */
          <div className="py-14 text-center space-y-4 rounded-3xl bg-white border border-dashed border-red-200 p-8 max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-stone-900 font-hindi-body">
                कोई व्यंजन नहीं मिला
              </h3>
              <p className="text-xs text-stone-500 font-hindi-body">
                {searchQuery
                  ? `"${searchQuery}" से मेल खाता कोई व्यंजन नहीं मिला।`
                  : 'कृपया कोई अन्य श्रेणी चुनें।'}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('lassi');
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              लस्सी श्रेणी देखें
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
