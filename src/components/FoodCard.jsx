import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FoodCard({ item }) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(item.halfPrice ? 'full' : null);

  const hasVariants = Boolean(item.halfPrice && item.fullPrice);

  // Determine active item id for cart when variants exist
  const activeItemId = hasVariants ? `${item.id}-${selectedVariant}` : item.id;
  const currentQuantity = getItemQuantity(activeItemId);

  const handleAdd = () => {
    if (hasVariants) {
      const isHalf = selectedVariant === 'half';
      addToCart({
        ...item,
        id: `${item.id}-${selectedVariant}`,
        name: `${item.name} (${isHalf ? 'Half' : 'Full'})`,
        price: isHalf ? item.halfPrice : item.fullPrice,
        variant: isHalf ? 'Half' : 'Full',
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
      className="group flex flex-col justify-between rounded-2xl bg-white border border-stone-200/80 hover:border-red-500/40 transition-all duration-300 shadow-xs hover:shadow-lg overflow-hidden"
    >
      <div>
        {/* Real Image (ONLY if provided, no AI images, no placeholders) */}
        {item.image ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Pure Veg Indicator */}
            {item.isVeg && (
              <span className="absolute top-2.5 left-2.5 w-5 h-5 rounded bg-white/95 border border-emerald-600 flex items-center justify-center p-0.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              </span>
            )}
          </div>
        ) : (
          /* Clean Header when image is not present */
          <div className="pt-3 px-4 pb-0 flex items-center justify-between">
            {item.isVeg && (
              <span className="w-5 h-5 rounded bg-white border border-emerald-600 flex items-center justify-center p-0.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              </span>
            )}
            {item.plateType && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                {item.plateType}
              </span>
            )}
          </div>
        )}

        {/* Item Content: Authentic Hindi Item Name Front & Center */}
        <div className="p-4 space-y-2 text-left">
          <h3 className="font-hindi-body font-bold text-lg sm:text-xl text-stone-900 leading-snug group-hover:text-red-600 transition-colors">
            {item.name}
          </h3>

          {/* Half / Full Pricing Display */}
          {hasVariants ? (
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setSelectedVariant('half')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                    selectedVariant === 'half'
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-red-50/80 text-red-700 border-red-200/80 hover:bg-red-100/70'
                  }`}
                >
                  Half ₹{item.halfPrice}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVariant('full')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                    selectedVariant === 'full'
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-red-50/80 text-red-700 border-red-200/80 hover:bg-red-100/70'
                  }`}
                >
                  Full ₹{item.fullPrice}
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-1">
              <span className="text-xl font-extrabold text-stone-900 font-['Outfit']">
                ₹{item.price}
              </span>
              {item.plateType && (
                <span className="text-xs text-stone-500 font-medium ml-1">
                  / {item.plateType}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer: Add to Cart / Quantity controls */}
      <div className="p-4 pt-3 border-t border-stone-100 bg-[#FAFAFA]/70 flex items-center justify-between">
        {hasVariants && (
          <span className="text-xs font-bold text-stone-500 capitalize">
            Selected: <span className="text-red-600">{selectedVariant}</span>
          </span>
        )}

        {currentQuantity === 0 ? (
          <button
            onClick={handleAdd}
            id={`btn-add-${activeItemId}`}
            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <div className="ml-auto inline-flex items-center rounded-xl bg-white border border-red-600 text-stone-900 shadow-xs overflow-hidden">
            <button
              onClick={() => handleUpdate(-1)}
              id={`btn-minus-${activeItemId}`}
              className="p-1.5 px-2.5 hover:bg-red-50 text-red-600 transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-bold text-xs text-stone-900 min-w-[20px] text-center">
              {currentQuantity}
            </span>
            <button
              onClick={() => handleUpdate(1)}
              id={`btn-plus-${activeItemId}`}
              className="p-1.5 px-2.5 bg-red-600 hover:bg-red-700 text-white transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
