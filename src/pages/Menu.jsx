import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Utensils, AlertCircle } from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import FoodCard from '../components/FoodCard';
import { MENU_ITEMS, CATEGORIES, CAFE_INFO } from '../data/menu';
import radheLogo from '../assets/radhe-radhe-logo.png';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'chaat';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

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

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Sort items
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.price || a.halfPrice || 0) - (b.price || b.halfPrice || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.price || b.fullPrice || 0) - (a.price || a.fullPrice || 0));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const currentCatObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 pb-32">
        
        {/* Header with Official Circular Logo & Cafe Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div className="space-y-2">
            
            {/* Small Branding Pill with Official Logo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white border border-red-200 shadow-xs">
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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-['Outfit']">
              Complete Food Menu
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl font-hindi-body font-medium">
              100% शुद्ध शाकाहारी एवं ताज़ा भोजन • सभी 20 श्रेणियों का डिजिटल मेन्यू
            </p>
          </div>
        </div>

        {/* Sticky Category Tabs Bar */}
        <div className="sticky top-18 sm:top-20 z-30 bg-[#FDFBF9]/95 backdrop-blur-md py-3.5 -mx-4 px-4 sm:mx-0 sm:px-0 border-y border-stone-200/70 shadow-xs">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            itemCounts={itemCounts}
          />
        </div>

        {/* Category Header & Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{currentCatObj?.icon}</span>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-hindi-body">
              {currentCatObj?.name}
            </h2>
            <span className="text-stone-400 font-medium ml-1">
              • {filteredItems.length} {filteredItems.length === 1 ? 'व्यंजन' : 'व्यंजन'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-stone-500 flex items-center gap-1 font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
              <span>Sort by:</span>
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white text-stone-800 text-xs font-bold py-1.5 px-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-600 cursor-pointer shadow-xs"
            >
              <option value="recommended">डिफ़ॉल्ट क्रम</option>
              <option value="price-low">दाम: कम से ज्यादा</option>
              <option value="price-high">दाम: ज्यादा से कम</option>
            </select>
          </div>
        </div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                {currentCatObj?.name} मेन्यू अपडेट हो रहा है
              </h3>
              <p className="text-xs text-stone-500 font-hindi-body">
                {searchQuery
                  ? `"${searchQuery}" से मेल खाता कोई व्यंजन नहीं मिला।`
                  : 'मेन्यू कार्ड के अनुसार इस श्रेणी के व्यंजन अपडेट किए जा रहे हैं।'}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('chaat');
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-xs active:scale-95"
            >
              चाट श्रेणी देखें
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
