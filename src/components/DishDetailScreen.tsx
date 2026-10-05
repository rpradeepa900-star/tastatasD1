import React, { useState } from 'react';
import { Dish, AddonOption, PortionOption } from '../data/mockData';

interface DishDetailScreenProps {
  dish: Dish;
  onBack: () => void;
  onAddToCart: (
    dish: Dish,
    portion: PortionOption,
    intensity: string,
    addons: AddonOption[],
    quantity: number
  ) => void;
  isFavorite: boolean;
  onToggleFavorite: (dishId: string) => void;
  onGoToCart?: () => void;
}

export const DishDetailScreen: React.FC<DishDetailScreenProps> = ({
  dish,
  onBack,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  onGoToCart,
}) => {
  const [selectedPortion, setSelectedPortion] = useState<PortionOption>(
    dish.portionOptions[0] || { id: 'single', label: 'Single', extraPrice: 0 }
  );
  const [selectedIntensity, setSelectedIntensity] = useState<string>(
    dish.intensities[1] || dish.intensities[0] || 'Signature'
  );
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleAddon = (addon: AddonOption) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const calculateUnitTotal = () => {
    const addonSum = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return dish.price + selectedPortion.extraPrice + addonSum;
  };

  const calculateGrandTotal = () => {
    return calculateUnitTotal() * quantity;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddToCartClick = () => {
    onAddToCart(dish, selectedPortion, selectedIntensity, selectedAddons, quantity);
    showToast(`${quantity}× ${dish.name} added to cart`);
  };

  const handleFavoriteClick = () => {
    onToggleFavorite(dish.id);
    showToast(!isFavorite ? 'Saved to your favorites' : 'Removed from favorites');
  };

  const unitPrice = calculateUnitTotal();
  const grandTotal = calculateGrandTotal();

  return (
    <div className="w-full relative pb-32">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-[radial-gradient(ellipse_at_top,rgba(168,198,134,0.14),transparent_70%)] pointer-events-none z-10" />

      {/* Floating Glass Header Controls */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-40 px-5 pt-5 pb-3 flex items-center justify-between pointer-events-none">
        <button
          onClick={onBack}
          aria-label="Go Back"
          className="pointer-events-auto w-11 h-11 rounded-full bg-[#1d201f]/70 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[#e1e3e1] hover:text-[#c3e2a0] active:scale-95 transition-all duration-200 shadow-lg"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        <button
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
          className="pointer-events-auto w-11 h-11 rounded-full bg-[#1d201f]/70 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[#e1e3e1] hover:text-[#c3e2a0] active:scale-95 transition-all duration-200 shadow-lg group"
        >
          <span
            className={`material-symbols-outlined text-[20px] transition-colors duration-200 ${
              isFavorite ? 'fill text-[#ffb4ab]' : 'group-hover:text-[#c3e2a0]'
            }`}
          >
            favorite
          </span>
        </button>
      </header>

      {/* Edge-to-Edge Hero Image Section */}
      <section className="relative w-full h-[390px] overflow-hidden select-none">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111413] via-[#111413]/40 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0c0f0e]/80 to-transparent pointer-events-none"></div>

        {/* Provenance badge on Hero */}
        <div className="absolute bottom-14 left-6 z-20 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#282b29]/80 backdrop-blur-md border border-white/10 text-[#e8e2d2] text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a8c686] animate-pulse"></span>
            {dish.provenanceBadge || 'Artisan Reserve'}
          </span>
        </div>
      </section>

      {/* Detail Sheet Card */}
      <section className="relative -mt-10 z-20 rounded-t-[32px] bg-[#1d201f]/85 backdrop-blur-2xl border-t border-white/10 px-5 pt-6 pb-6 shadow-[0_-20px_50px_rgba(0,0,0,0.7)]">
        {/* Sheet Handle */}
        <div className="w-10 h-1 rounded-full bg-[#44483d]/40 mx-auto mb-5"></div>

        {/* Dish Header & Title */}
        <div className="space-y-1.5 mb-5">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-[#e1e3e1] tracking-tight">{dish.name}</h1>
            <span className="text-xl font-bold text-[#a8c686] shrink-0 font-mono">
              ${unitPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-[#c4c8ba] leading-relaxed">{dish.description}</p>
        </div>

        {/* Meta Row (Ratings, Timing, Calories) */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-7 text-center items-center">
          {/* Rating */}
          <div className="flex flex-col items-center border-r border-white/5 pr-1">
            <div className="flex items-center gap-1 text-[#c3e2a0]">
              <span className="material-symbols-outlined text-[16px] fill">star</span>
              <span className="text-sm font-semibold text-[#e1e3e1]">{dish.rating}</span>
            </div>
            <span className="text-[10px] text-[#ccc6b6]">{dish.reviewsCount} reviews</span>
          </div>

          {/* Preparation Time */}
          <div className="flex flex-col items-center border-r border-white/5 px-1">
            <div className="flex items-center gap-1 text-[#e1e3e1]">
              <span className="material-symbols-outlined text-[16px] text-[#c4c8ba]">schedule</span>
              <span className="text-sm font-semibold text-[#e1e3e1]">{dish.prepTime}</span>
            </div>
            <span className="text-[10px] text-[#ccc6b6]">Prep Time</span>
          </div>

          {/* Calories */}
          <div className="flex flex-col items-center pl-1">
            <div className="flex items-center gap-1 text-[#e1e3e1]">
              <span className="material-symbols-outlined text-[16px] text-[#c4c8ba]">local_fire_department</span>
              <span className="text-sm font-semibold text-[#e1e3e1]">{dish.calories}</span>
            </div>
            <span className="text-[10px] text-[#ccc6b6]">Energy</span>
          </div>
        </div>

        <div className="h-px w-full bg-white/[0.06] mb-6"></div>

        {/* Customization Section 1: Portion Size */}
        {dish.portionOptions.length > 0 && (
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-semibold text-[#e1e3e1]">Portion Size</label>
              <span className="text-[10px] font-bold text-[#c3e2a0] uppercase tracking-wider">Required</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {dish.portionOptions.map((portion) => {
                const isSelected = selectedPortion.id === portion.id;
                const portionPrice = dish.price + portion.extraPrice;
                return (
                  <button
                    key={portion.id}
                    type="button"
                    onClick={() => setSelectedPortion(portion)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-150 active:scale-98 ${
                      isSelected
                        ? 'bg-[#282b29]/90 border border-[#a8c686] text-[#e1e3e1] shadow-[0_0_15px_rgba(168,198,134,0.18)]'
                        : 'bg-white/[0.04] border border-white/10 text-[#c4c8ba] hover:border-white/20'
                    }`}
                  >
                    <span className={`text-xs font-semibold ${isSelected ? 'text-[#c3e2a0]' : 'text-[#e1e3e1]'}`}>
                      {portion.label}
                    </span>
                    <span className={`text-xs mt-0.5 ${isSelected ? 'text-white' : 'text-[#ccc6b6]'}`}>
                      {portion.extraPrice === 0 ? `$${portionPrice.toFixed(2)}` : `+$${portion.extraPrice.toFixed(2)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Customization Section 2: Truffle Intensity */}
        {dish.intensities.length > 0 && (
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-semibold text-[#e1e3e1]">Truffle Intensity</label>
              <span className="text-[10px] text-[#ccc6b6] uppercase tracking-wider">Chef Curated</span>
            </div>
            <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10">
              {dish.intensities.map((intensity) => {
                const isActive = selectedIntensity === intensity;
                return (
                  <button
                    key={intensity}
                    type="button"
                    onClick={() => setSelectedIntensity(intensity)}
                    className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#373a38] text-white shadow border border-white/10'
                        : 'text-[#c4c8ba] hover:text-white'
                    }`}
                  >
                    {intensity}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Customization Section 3: Add-ons */}
        {dish.addons.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-semibold text-[#e1e3e1]">Gourmet Add-ons</label>
              <span className="text-[10px] text-[#ccc6b6]">Optional</span>
            </div>
            <div className="space-y-2.5">
              {dish.addons.map((addon) => {
                const isSelected = selectedAddons.some((a) => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 active:scale-[0.99] ${
                      isSelected
                        ? 'border-[#a8c686]/60 bg-white/[0.06] shadow-sm'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#a8c686] border-[#a8c686]'
                            : 'border-[#8e9285]'
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px] text-[#111413]">check</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-[#e1e3e1] font-medium leading-none">{addon.label}</p>
                        <p className="text-xs text-[#ccc6b6] mt-1">{addon.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#a8c686]">
                      +${addon.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chef Note Quote Box */}
        <div className="mt-6 p-4 rounded-2xl bg-[#191c1b]/60 border border-white/5 flex items-start gap-3">
          <span className="material-symbols-outlined text-[#c3e2a0] text-[20px] shrink-0 mt-0.5">room_service</span>
          <p className="text-xs text-[#c4c8ba] italic leading-relaxed">
            "{dish.chefNote || 'Prepared with highest culinary hygiene protocols and premium ingredients in vacuum packaging.'}"
          </p>
        </div>
      </section>

      {/* Bottom Sticky Glass Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto z-50 px-4 py-3.5 bg-[#191c1b]/92 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3">
          {/* Stepped Quantity Selector Capsule */}
          <div className="h-12 px-2.5 rounded-full bg-[#282b29]/90 border border-white/10 flex items-center justify-between gap-3 text-[#e1e3e1]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1e3e1] hover:text-[#c3e2a0] active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="text-base font-bold text-[#e1e3e1] w-4 text-center select-none font-mono">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              aria-label="Increase quantity"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1e3e1] hover:text-[#c3e2a0] active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Primary Add to Cart CTA */}
          <button
            onClick={handleAddToCartClick}
            className="flex-1 h-12 rounded-full bg-[#a8c686] hover:bg-[#c3e2a0] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 px-5 text-[#3a531f] shadow-[0_4px_25px_rgba(168,198,134,0.35)] font-bold group"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110">
              shopping_bag
            </span>
            <span className="text-sm tracking-wide">
              Add to Cart • ${grandTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#323534]/95 backdrop-blur-xl border border-[#c3e2a0]/40 text-[#e1e3e1] shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[#c3e2a0] text-[18px]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
          {onGoToCart && (
            <button
              onClick={onGoToCart}
              className="ml-2 pl-2 border-l border-white/20 text-xs font-bold text-[#c3e2a0] hover:underline"
            >
              View Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};
