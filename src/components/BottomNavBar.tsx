import React from 'react';

export type NavTab = 'discover' | 'orders' | 'cart' | 'profile';

interface BottomNavBarProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  cartCount: number;
  hasActiveOrder: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  cartCount,
  hasActiveOrder,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-4 py-3 max-w-md mx-auto pb-safe bg-[#191c1b]/92 backdrop-blur-xl shadow-2xl border-t border-white/10 rounded-t-2xl">
      {/* Tab 1: Discover */}
      <button
        onClick={() => onChangeTab('discover')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-90 py-1 px-3 ${
          activeTab === 'discover'
            ? 'text-[#c3e2a0] font-bold'
            : 'text-[#c4c8ba]/70 hover:text-white'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'discover' ? 'fill' : ''
          }`}
        >
          restaurant
        </span>
        <span className="text-[10px] mt-0.5 font-medium">Discover</span>
      </button>

      {/* Tab 2: Orders */}
      <button
        onClick={() => onChangeTab('orders')}
        className={`relative flex flex-col items-center justify-center transition-all duration-150 active:scale-90 py-1 px-3 ${
          activeTab === 'orders'
            ? 'text-[#c3e2a0] font-bold'
            : 'text-[#c4c8ba]/70 hover:text-white'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'orders' ? 'fill' : ''
          }`}
        >
          receipt_long
        </span>
        <span className="text-[10px] mt-0.5 font-medium">Orders</span>
        {hasActiveOrder && (
          <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-[#c3e2a0] animate-pulse ring-2 ring-[#111413]"></span>
        )}
      </button>

      {/* Tab 3: Cart */}
      <button
        onClick={() => onChangeTab('cart')}
        className={`relative flex flex-col items-center justify-center transition-all duration-150 active:scale-90 py-1 px-3 ${
          activeTab === 'cart'
            ? 'text-[#c3e2a0] font-bold'
            : 'text-[#c4c8ba]/70 hover:text-white'
        }`}
      >
        <div className="relative">
          <span
            className={`material-symbols-outlined text-[22px] ${
              activeTab === 'cart' ? 'fill' : ''
            }`}
          >
            shopping_bag
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 px-1.5 min-w-[16px] h-4 rounded-full bg-[#c3e2a0] text-[#1f3606] text-[9px] flex items-center justify-center font-bold font-mono">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 font-medium">Cart</span>
      </button>

      {/* Tab 4: Profile */}
      <button
        onClick={() => onChangeTab('profile')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-90 py-1 px-3 ${
          activeTab === 'profile'
            ? 'text-[#c3e2a0] font-bold'
            : 'text-[#c4c8ba]/70 hover:text-white'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'profile' ? 'fill' : ''
          }`}
        >
          person
        </span>
        <span className="text-[10px] mt-0.5 font-medium">Profile</span>
      </button>
    </nav>
  );
};
