import React, { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FoodCard({ item }) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const hasVariants = Boolean(item.halfPrice && item.fullPrice);

  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? 'half' : null);

  // Active item ID for cart
  const activeItemId = hasVariants ? `${item.id}-${selectedVariant}` : item.id;
  const currentQuantity = getItemQuantity(activeItemId);

  const handleAdd = () => {
    if (hasVariants) {
      const isHalf = selectedVariant === 'half';
      addToCart({
        ...item,
        id: `${item.id}-${selectedVariant}`,
        name: `${item.name} (${isHalf ? 'Half' : 'Full'})`,
        hindiName: `${item.hindiName} (${isHalf ? 'हाफ' : 'फुल'})`,
        price: isHalf ? item.halfPrice : item.fullPrice,
        variant: isHalf ? 'Half' : 'Full',
        variantLabel: isHalf ? 'हाफ (Half)' : 'फुल (Full)',
      });
    } else {
      addToCart(item);
    }
  };

  const handleUpdate = (delta) => {
    updateQuantity(activeItemId, delta);
  };

  return (
    <div
      id={`food-card-${item.id}`}
      className="group flex flex-col justify-between rounded-2xl bg-white border border-stone-200/90 hover:border-red-500/50 hover:shadow-lg transition-all duration-200 overflow-hidden shadow-xs relative"
    >
      {/* Top Header: Pure Veg & Badge */}
      <div className="p-3 sm:p-4 pb-1">
        <div className="flex items-center justify-between gap-1 mb-2">
          {/* Authentic Pure Veg Icon */}
          <div
            className="w-4 h-4 rounded-[4px] border border-emerald-600 flex items-center justify-center p-0.5 bg-white shrink-0"
            title="100% Pure Vegetarian"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 block" />
          </div>

          {/* Plate type badge if applicable */}
          {item.plateType ? (
            <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80">
              {item.plateType}
            </span>
          ) : item.subGroup ? (
            <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
              {item.subGroup}
            </span>
          ) : null}
        </div>

        {/* Item Title: Hindi + English */}
        <div className="space-y-0.5">
          <h4 className="font-hindi-body font-bold text-sm sm:text-base text-stone-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
            {item.hindiName || item.name}
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-500 font-medium tracking-tight line-clamp-1">
            {item.name}
          </p>
        </div>

        {/* Variant Selector (HALF / FULL) */}
        {hasVariants && (
          <div className="mt-2.5 pt-2 border-t border-stone-100">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              साइज चुनें (Select Size):
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedVariant('half')}
                className={`py-1 px-1.5 rounded-lg text-[11px] font-extrabold transition-all border text-center ${
                  selectedVariant === 'half'
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div>Half</div>
                <div className="font-['Outfit']">₹{item.halfPrice}</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedVariant('full')}
                className={`py-1 px-1.5 rounded-lg text-[11px] font-extrabold transition-all border text-center ${
                  selectedVariant === 'full'
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div>Full</div>
                <div className="font-['Outfit']">₹{item.fullPrice}</div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer: Price + Add Button / Quantity Stepper */}
      <div className="p-3 sm:p-4 pt-2 mt-auto border-t border-stone-100/90 bg-[#faf8f5]/60 flex items-center justify-between gap-2">
        {/* Price Display */}
        <div>
          {hasVariants ? (
            <div>
              <span className="text-[10px] font-bold text-stone-400 block uppercase">
                {selectedVariant === 'half' ? 'हाफ' : 'फुल'}
              </span>
              <span className="text-base sm:text-lg font-black text-stone-900 font-['Outfit'] leading-none">
                ₹{selectedVariant === 'half' ? item.halfPrice : item.fullPrice}
              </span>
            </div>
          ) : (
            <span className="text-base sm:text-lg font-black text-stone-900 font-['Outfit'] leading-none">
              ₹{item.price}
            </span>
          )}
        </div>

        {/* Add Button or Stepper */}
        {currentQuantity === 0 ? (
          <button
            onClick={handleAdd}
            id={`btn-add-${activeItemId}`}
            aria-label={`Add ${item.name} to cart`}
            className="inline-flex items-center justify-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-95 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add</span>
          </button>
        ) : (
          <div className="inline-flex items-center rounded-xl bg-white border border-red-600 text-stone-900 shadow-xs overflow-hidden">
            <button
              onClick={() => handleUpdate(-1)}
              id={`btn-minus-${activeItemId}`}
              className="p-1 px-2 hover:bg-red-50 text-red-600 transition active:scale-90 font-bold"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 stroke-[2.5]" />
            </button>
            <span
              id={`qty-${activeItemId}`}
              className="px-1.5 font-black text-xs text-stone-900 min-w-[18px] text-center font-['Outfit']"
            >
              {currentQuantity}
            </span>
            <button
              onClick={() => handleUpdate(1)}
              id={`btn-plus-${activeItemId}`}
              className="p-1 px-2 bg-red-600 hover:bg-red-700 text-white transition active:scale-90 font-bold"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
