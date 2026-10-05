import React, { useState } from 'react';
import { Dish } from '../data/mockData';

interface DiscoverScreenProps {
  dishes: Dish[];
  onSelectDish: (dish: Dish) => void;
  onOpenProfile: () => void;
  onQuickAdd: (dish: Dish) => void;
  favorites: Set<string>;
  onToggleFavorite: (dishId: string) => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  dishes,
  onSelectDish,
  onOpenProfile,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOmakaseModal, setShowOmakaseModal] = useState<boolean>(false);
  const [omakaseReserved, setOmakaseReserved] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  const categories = [
    { label: 'All', icon: 'all_inclusive' },
    { label: 'Gourmet Burgers', icon: 'lunch_dining' },
    { label: 'Artisan Pizza', icon: 'local_pizza' },
    { label: 'Asian Bowls', icon: 'ramen_dining' },
    { label: 'Pastas', icon: 'dinner_dining' },
    { label: 'Desserts', icon: 'icecream' },
  ];

  const featuredDish = dishes.find((d) => d.id === 'smoked-wagyu-brioche') || dishes[1];

  const filteredDishes = dishes.filter((d) => {
    const matchesCategory =
      selectedCategory === 'All' ? true : d.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.bistro.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Top App Bar Header */}
      <header className="sticky top-0 z-40 w-full px-5 py-3.5 bg-[#111413]/85 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#c4c8ba]">Good evening</span>
          <h1 className="text-[20px] font-bold tracking-wider uppercase text-[#e1e3e1]">TASTATAS</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:text-[#c3e2a0] transition-colors duration-200 active:scale-95 text-[#c4c8ba]"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#c3e2a0] rounded-full ring-2 ring-[#111413]"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 p-3.5 rounded-2xl bg-[#1d201f]/95 backdrop-blur-xl border border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#c3e2a0]">Gourmet Dispatch</span>
                  <button onClick={() => setNotificationOpen(false)} className="text-[#8e9285] hover:text-white text-xs">
                    Dismiss
                  </button>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 mb-2">
                  <p className="text-xs font-medium text-white">Autumn White Truffle Shipment</p>
                  <p className="text-[11px] text-[#c4c8ba] mt-0.5">Périgord black truffles have arrived at Maison Gusto today.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <p className="text-xs font-medium text-white">Private Tasting Table Reserved</p>
                  <p className="text-[11px] text-[#c4c8ba] mt-0.5">Your sommelier flight begins Friday 20:00.</p>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar Leading to Profile */}
          <button
            onClick={onOpenProfile}
            aria-label="Open profile"
            className="relative w-10 h-10 rounded-full p-[1px] bg-gradient-to-b from-white/20 to-white/5 border border-white/10 hover:border-[#c3e2a0]/60 transition-all duration-200 active:scale-95"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqif-7KK_oPTZRAbou-qramQ7PjJrhLPFcWvn8TFYMgxA21V9e7fVW6FOcwr0xNYYLRfX-lDE87D6-8CwmnpD16slsSv3un79cTxGdgzYuIlx8rXnMHgI_pczgoLjwgb5srsdG5h4NmtzZfz5WeJU8-Ky9znT5bd_Sy7XCXCl1DkPolC5uXPU6EHSIJ9gbK4EmIvuuWs4oVbG7NopOUDUvfjfEhj2zUF5HgWI-mAC5q6_k8gRW11ga"
              alt="VIP Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#c3e2a0] border-2 border-[#111413] rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Screen Content */}
      <main className="px-5 pt-3 space-y-7 pb-6">
        {/* Search & Filter Capsule */}
        <section>
          <div className="relative flex items-center w-full h-[52px] rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 px-4 transition-all duration-300 focus-within:border-[#a8c686] focus-within:ring-2 focus-within:ring-[#a8c686]/20">
            <span className="material-symbols-outlined text-[#c4c8ba]/60 text-[20px] mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, restaurants or cuisines..."
              className="w-full bg-transparent border-none p-0 text-sm text-[#e1e3e1] placeholder:text-[#c4c8ba]/40 focus:ring-0 focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#8e9285] hover:text-white mr-1"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            ) : null}
            <button
              aria-label="Filter Options"
              onClick={() => setSelectedCategory('All')}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-[#e1e3e1] hover:text-[#c3e2a0] active:scale-90 transition-transform duration-150"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </section>

        {/* Featured Spotlight Hero Card */}
        {featuredDish && !searchQuery && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.14em] text-[#c4c8ba] uppercase">Featured Spotlight</span>
              <button
                onClick={() => onSelectDish(featuredDish)}
                className="text-xs font-semibold text-[#c3e2a0] flex items-center gap-1 hover:underline"
              >
                Curated <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div
              onClick={() => onSelectDish(featuredDish)}
              className="group relative rounded-2xl overflow-hidden bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300 active:scale-[0.99]"
            >
              {/* Hero Food Imagery */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={featuredDish.image}
                  alt={featuredDish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111413] via-[#111413]/40 to-transparent"></div>

                {/* Spotlight Top Pills */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#191c1b]/90 backdrop-blur-md border border-[#c3e2a0]/30 text-[10px] font-bold text-[#c3e2a0] uppercase tracking-[0.12em]">
                    SIGNATURE DISH
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center px-2.5 py-1 rounded-full bg-[#191c1b]/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#e8e2d2]">
                  <span className="material-symbols-outlined text-[#c3e2a0] text-[14px] mr-1 fill">star</span>
                  {featuredDish.rating}
                </div>
              </div>

              {/* Hero Food Details */}
              <div className="p-4 pt-1 space-y-3">
                <div>
                  <p className="text-xs text-[#c4c8ba]">{featuredDish.bistro}</p>
                  <h2 className="text-xl font-semibold text-[#e1e3e1] mt-0.5">{featuredDish.name}</h2>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <div className="flex items-center text-[#c4c8ba] text-xs space-x-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#c3e2a0]">schedule</span>
                    <span>{featuredDish.prepTime} delivery</span>
                    <span>•</span>
                    <span className="text-[#c3e2a0] font-medium">${featuredDish.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDish(featuredDish);
                    }}
                    className="px-4 py-2 rounded-full bg-[#a8c686] text-[#3a531f] text-xs font-bold hover:brightness-105 active:scale-95 transition-all shadow-sm"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Epicurean Categories (Horizontal Scrollable Strip) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#c4c8ba] uppercase">Epicurean Categories</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 py-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`shrink-0 h-[38px] px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-[#a8c686] text-[#3a531f] shadow-sm font-bold'
                      : 'bg-white/[0.05] border border-white/10 hover:border-white/20 text-[#c4c8ba]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Popular Selections (2-Column Asymmetric Glass Grid) */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#e1e3e1]">Popular Selections</h3>
              <p className="text-xs text-[#c4c8ba]">Selected by master sommeliers &amp; chefs</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#c3e2a0] hover:underline"
            >
              View All
            </button>
          </div>

          {filteredDishes.length === 0 ? (
            <div className="py-12 text-center text-[#8e9285] glass-panel-1 rounded-2xl">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
              <p className="text-sm">No dishes matched "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#c3e2a0]"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => onSelectDish(dish)}
                  className="group relative flex flex-col justify-between rounded-2xl p-3 bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-[#c3e2a0]/40 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[#282b29]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#111413]/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#e1e3e1] flex items-center gap-0.5">
                        <span className="text-[#c3e2a0]">★</span> {dish.rating}
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-[#e1e3e1] line-clamp-1 leading-snug">{dish.name}</h4>
                    <p className="text-xs text-[#c4c8ba] line-clamp-1 mt-0.5">{dish.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <span className="text-base font-bold text-[#c3e2a0]">${dish.price.toFixed(2)}</span>
                    <button
                      aria-label={`Add ${dish.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAdd(dish);
                      }}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#a8c686] hover:text-[#3a531f] text-[#e1e3e1] flex items-center justify-center transition-colors active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Chef's Tasting Flight Banner Module */}
        <section className="rounded-2xl p-4 bg-gradient-to-r from-[#1d201f] via-[#282b29] to-[#1d201f] border border-white/10 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#c3e2a0] uppercase">Reserve Private Tasting</span>
            <h4 className="text-base font-semibold text-[#e1e3e1]">7-Course Omakase</h4>
            <p className="text-xs text-[#c4c8ba]">Limited to 8 covers per seating</p>
          </div>
          <button
            onClick={() => setShowOmakaseModal(true)}
            className="h-10 px-4 rounded-full bg-white/5 border border-white/15 text-[#e1e3e1] text-xs font-semibold hover:bg-white/10 active:scale-95 transition-all"
          >
            Reserve
          </button>
        </section>
      </main>

      {/* Omakase Reservation Modal */}
      {showOmakaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#1d201f] border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c3e2a0]">dinner_dining</span>
                <h3 className="text-base font-bold text-white">Private Omakase Sanctuary</h3>
              </div>
              <button onClick={() => setShowOmakaseModal(false)} className="text-[#8e9285] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#c4c8ba] leading-relaxed">
              Curated by Executive Chef Kenjiro. 7 Courses paired with rare vintage Junmai Daiginjo and Grand Cru Burgundy.
            </p>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#c4c8ba]">
                <span>Seating</span>
                <span className="text-white font-medium">Tomorrow • 20:30</span>
              </div>
              <div className="flex justify-between text-[#c4c8ba]">
                <span>Party Size</span>
                <span className="text-white font-medium">2 Guests</span>
              </div>
              <div className="flex justify-between text-[#c4c8ba]">
                <span>Tasting Experience</span>
                <span className="text-[#c3e2a0] font-bold">$180 / cover</span>
              </div>
            </div>

            {omakaseReserved ? (
              <div className="p-3 rounded-2xl bg-[#a8c686]/20 border border-[#a8c686]/40 text-center">
                <span className="material-symbols-outlined text-[#c3e2a0] text-2xl mb-1">check_circle</span>
                <p className="text-xs font-bold text-white">Reservation Confirmed</p>
                <p className="text-[11px] text-[#c4c8ba] mt-0.5">Concierge concierge@tastatas.com has sent confirmation.</p>
              </div>
            ) : (
              <button
                onClick={() => setOmakaseReserved(true)}
                className="w-full py-3.5 rounded-full bg-[#a8c686] text-[#3a531f] text-xs font-bold hover:brightness-105 active:scale-95 transition-all shadow-lg"
              >
                Confirm Private Tasting
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
