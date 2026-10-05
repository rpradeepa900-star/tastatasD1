import React from 'react';

export type ScreenMode = 'discover' | 'dish-detail' | 'cart' | 'checkout' | 'orders' | 'profile';

interface ScreenSwitcherHeaderProps {
  currentScreen: ScreenMode;
  onSelectScreen: (screen: ScreenMode) => void;
  cartCount: number;
}

export const ScreenSwitcherHeader: React.FC<ScreenSwitcherHeaderProps> = ({
  currentScreen,
  onSelectScreen,
  cartCount,
}) => {
  const screens: { id: ScreenMode; label: string; icon: string; badge?: number }[] = [
    { id: 'discover', label: '1. Discover', icon: 'restaurant' },
    { id: 'dish-detail', label: '2. Dish Details', icon: 'lunch_dining' },
    { id: 'cart', label: '3. Cart', icon: 'shopping_bag', badge: cartCount },
    { id: 'checkout', label: '4. Checkout', icon: 'credit_card' },
    { id: 'orders', label: '5. Live Sanctuary', icon: 'moped' },
    { id: 'profile', label: '6. Profile', icon: 'person' },
  ];

  return (
    <div className="w-full bg-[#0c0f0e]/95 backdrop-blur-md border-b border-white/10 px-3 py-2 z-50 sticky top-0 overflow-x-auto no-scrollbar">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-1 text-[11px]">
        <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#c3e2a0] animate-pulse"></span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#c3e2a0]">Screens</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {screens.map((s) => {
            const isActive = currentScreen === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                className={`shrink-0 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#a8c686] text-[#1f3606] shadow-sm font-bold'
                    : 'bg-white/5 text-[#c4c8ba] hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">{s.icon}</span>
                <span>{s.label}</span>
                {s.badge !== undefined && s.badge > 0 && (
                  <span
                    className={`ml-0.5 px-1 rounded-full text-[9px] font-bold ${
                      isActive ? 'bg-[#1f3606] text-[#a8c686]' : 'bg-[#c3e2a0] text-[#1f3606]'
                    }`}
                  >
                    {s.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
