import React, { useState } from 'react';

interface ProfileScreenProps {
  onBackToDiscover: () => void;
  favoritesCount: number;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  favoritesCount,
}) => {
  const [sommelierAccess, setSommelierAccess] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('Alex Morgan');
  const [userEmail, setUserEmail] = useState<string>('alex.morgan@epicure.design');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [showPaymentsModal, setShowPaymentsModal] = useState<boolean>(false);
  const [showConciergeModal, setShowConciergeModal] = useState<boolean>(false);
  const [showPrefsModal, setShowPrefsModal] = useState<boolean>(false);
  const [conciergeChat, setConciergeChat] = useState<Array<{ sender: 'sommelier' | 'user'; text: string; time: string }>>([
    {
      sender: 'sommelier',
      text: "Bonsoir Mr. Morgan. I am Julien, your Dedicated Sommelier. For tonight's Wagyu Brioche, I recommend decanting a 2018 Nuits-Saint-Georges.",
      time: '19:40',
    },
  ]);
  const [conciergeInput, setConciergeInput] = useState<string>('');

  // Preference state
  const [spiciness, setSpiciness] = useState<string>('Mild Truffle');
  const [organicOnly, setOrganicOnly] = useState<boolean>(true);
  const [allergens, setAllergens] = useState<string[]>(['No Peanuts']);

  const handleSendConcierge = () => {
    if (!conciergeInput.trim()) return;
    const msg = conciergeInput.trim();
    setConciergeChat((prev) => [
      ...prev,
      { sender: 'user', text: msg, time: 'Now' },
    ]);
    setConciergeInput('');

    setTimeout(() => {
      setConciergeChat((prev) => [
        ...prev,
        {
          sender: 'sommelier',
          text: "Splendid choice. I have instructed the kitchen to reserve two bottles from our private cellar. Enjoy your evening.",
          time: 'Now',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="w-full relative min-h-screen pb-32">
      {/* Top App Bar Header */}
      <header className="sticky top-0 z-40 bg-[#111413]/85 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#282b29] border border-[#44483d]/40 flex items-center justify-center text-[#c3e2a0]">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
          <span className="text-base font-bold tracking-wider uppercase text-[#e1e3e1]">TASTATAS</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConciergeModal(true)}
            aria-label="Notifications"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#c4c8ba] hover:text-[#c3e2a0] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <button
            onClick={() => setShowPrefsModal(true)}
            aria-label="Settings"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#c4c8ba] hover:text-[#c3e2a0] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 px-5 pt-3 space-y-7">
        {/* SECTION 1: User Profile Header Card */}
        <section className="glass-card-level2 rounded-2xl p-5 relative overflow-hidden">
          {/* Ambient subtle glow */}
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#c3e2a0]/10 blur-2xl pointer-events-none"></div>

          <div className="flex items-start gap-4">
            {/* Avatar with subtle sage border ring */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-b from-[#c3e2a0]/60 to-[#c3e2a0]/10">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb8GbA4NxIfDuvYCjjOlfMYLl3CQfzOqEhx-rD07bQ1zH8b8YgmDBvHLCQiDpdmzP-71X0VPs40OE8h1UzMehmuI2UZcAziG5cmUn8gJ6-AfpGi0rE74i1iRCQIpcTntRJ5hUPplEYIUFQT6CT41tqc7Q_rztozCGIo7tGfnNMHba3I78xfHtGbPblWH8GRkuv-k0ZboyBem7m_m4kpSNYDhpxtn9_U8Io6ZLGJ8bU10nJYSacLg6o"
                  alt={userName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-1 w-5 h-5 rounded-full bg-[#191c1b] border-2 border-[#111413] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c3e2a0]"></span>
              </div>
            </div>

            {/* User Identity Meta */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#e1e3e1] truncate tracking-tight">
                  {userName}
                </h1>
                <button
                  onClick={() => setShowEditModal(true)}
                  aria-label="Edit Profile"
                  className="text-[#c4c8ba] hover:text-[#c3e2a0] transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
              <p className="text-xs text-[#c4c8ba]/80 truncate mt-0.5">{userEmail}</p>

              {/* VIP Membership Pill Badge */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1d201f] border border-[#c3e2a0]/30">
                <span className="material-symbols-outlined text-[14px] text-[#c3e2a0] fill">star</span>
                <span className="text-[10px] font-bold text-[#c3e2a0] uppercase tracking-wider">
                  TASTATAS Black Member • Tier 1
                </span>
              </div>
            </div>
          </div>

          {/* Membership Progress Meter / Concierge Access */}
          <div className="mt-5 pt-4 border-t border-[#44483d]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c3e2a0] text-[18px]">workspace_premium</span>
              <span className="text-xs font-semibold text-[#e1e3e1]">Private Sommelier Access</span>
            </div>
            <button
              onClick={() => setSommelierAccess(!sommelierAccess)}
              className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-colors ${
                sommelierAccess
                  ? 'bg-[#c3e2a0]/20 text-[#c3e2a0] border border-[#c3e2a0]/30'
                  : 'bg-white/5 text-[#8e9285]'
              }`}
            >
              {sommelierAccess ? 'Active' : 'Inactive'}
            </button>
          </div>
        </section>

        {/* SECTION 2: Quick Stats Row (Bento Grid) */}
        <section className="grid grid-cols-3 gap-3">
          <div className="glass-card-level1 rounded-xl p-3.5 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-[#c3e2a0] font-mono">28</span>
            <span className="text-xs text-[#c4c8ba] mt-1 font-medium">Orders</span>
            <span className="text-[10px] text-[#c3e2a0]/80 mt-0.5 flex items-center gap-0.5 font-semibold">
              <span className="material-symbols-outlined text-[11px]">north_east</span>
              <span>+3 this mo</span>
            </span>
          </div>

          <div className="glass-card-level1 rounded-xl p-3.5 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-white font-mono">{favoritesCount || 4}</span>
            <span className="text-xs text-[#c4c8ba] mt-1 font-medium">Favorites</span>
            <span className="text-[10px] text-[#e8e2d2]/70 mt-0.5 flex items-center gap-0.5 font-semibold">
              <span className="material-symbols-outlined text-[11px]">restaurant</span>
              <span>Bistros</span>
            </span>
          </div>

          <div className="glass-card-level1 rounded-xl p-3.5 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-[#c3e2a0] font-mono">$42</span>
            <span className="text-xs text-[#c4c8ba] mt-1 font-medium">Saved</span>
            <span className="text-[10px] text-[#c3e2a0]/80 mt-0.5 flex items-center gap-0.5 font-semibold">
              <span className="material-symbols-outlined text-[11px]">verified</span>
              <span>Perks</span>
            </span>
          </div>
        </section>

        {/* SECTION 3: Account Options */}
        <section className="space-y-2">
          <h2 className="px-1 text-xs text-[#c4c8ba] tracking-wider uppercase font-bold">
            Epicurean Portfolio
          </h2>
          <div className="glass-card-level1 rounded-2xl divide-y divide-[#44483d]/20 overflow-hidden">
            {/* Item 1: Saved Addresses */}
            <div
              onClick={() => setShowAddressModal(true)}
              className="flex items-center justify-between p-4 hover:bg-[#282b29]/40 active:bg-[#282b29]/60 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c3e2a0] group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#e1e3e1] group-hover:text-[#c3e2a0] transition-colors">
                    Saved Addresses
                  </p>
                  <p className="text-[11px] text-[#c4c8ba]/70">Home, Penthouse 14, Office</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[#c4c8ba]/60">
                <span className="text-[10px] bg-[#1d201f] px-2 py-0.5 rounded-full text-[#ccc6b6] font-bold">
                  3 Places
                </span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            {/* Item 2: Payment Methods */}
            <div
              onClick={() => setShowPaymentsModal(true)}
              className="flex items-center justify-between p-4 hover:bg-[#282b29]/40 active:bg-[#282b29]/60 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c3e2a0] group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#e1e3e1] group-hover:text-[#c3e2a0] transition-colors">
                    Payment Methods
                  </p>
                  <p className="text-[11px] text-[#c4c8ba]/70">Mastercard ending in 4829, Apple Pay</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[#c4c8ba]/60">
                <span className="w-2 h-2 rounded-full bg-[#c3e2a0]"></span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            {/* Item 3: Culinary Preferences */}
            <div
              onClick={() => setShowPrefsModal(true)}
              className="flex items-center justify-between p-4 hover:bg-[#282b29]/40 active:bg-[#282b29]/60 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c3e2a0] group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">dinner_dining</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#e1e3e1] group-hover:text-[#c3e2a0] transition-colors">
                    Culinary Preferences
                  </p>
                  <p className="text-[11px] text-[#c4c8ba]/70">Dietary, Spice preferences</p>
                </div>
              </div>
              <div className="flex items-center text-[#c4c8ba]/60">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            {/* Item 4: Notifications & Tracking */}
            <div
              onClick={() => setShowConciergeModal(true)}
              className="flex items-center justify-between p-4 hover:bg-[#282b29]/40 active:bg-[#282b29]/60 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c3e2a0] group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#e1e3e1] group-hover:text-[#c3e2a0] transition-colors">
                    Notifications &amp; Tracking
                  </p>
                  <p className="text-[11px] text-[#c4c8ba]/70">SMS, Gourmet dispatches, SMS valet</p>
                </div>
              </div>
              <div className="flex items-center text-[#c4c8ba]/60">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Privileges & Privacy */}
        <section className="space-y-2">
          <h2 className="px-1 text-xs text-[#c4c8ba] tracking-wider uppercase font-bold">
            Privileges &amp; Privacy
          </h2>
          <div className="glass-card-level1 rounded-2xl divide-y divide-[#44483d]/20 overflow-hidden">
            {/* Concierge Support */}
            <div
              onClick={() => setShowConciergeModal(true)}
              className="flex items-center justify-between p-4 hover:bg-[#282b29]/40 active:bg-[#282b29]/60 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c3e2a0] group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-[#e1e3e1] group-hover:text-[#c3e2a0] transition-colors">
                      Concierge Support
                    </p>
                    <span className="px-1.5 py-0.5 rounded bg-[#c3e2a0]/20 text-[#c3e2a0] text-[9px] font-bold uppercase tracking-wide">
                      24/7 VIP
                    </span>
                  </div>
                  <p className="text-[11px] text-[#c4c8ba]/70">Dedicated assistance for table &amp; kitchen</p>
                </div>
              </div>
              <div className="flex items-center text-[#c4c8ba]/60">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="flex items-center justify-between p-4 hover:bg-[#282b29]/40 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#ccc6b6] group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#e1e3e1] group-hover:text-[#c3e2a0] transition-colors">
                    Privacy &amp; Security
                  </p>
                  <p className="text-[11px] text-[#c4c8ba]/70">Biometric log, encrypted vaults</p>
                </div>
              </div>
              <div className="flex items-center text-[#c4c8ba]/60">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            {/* Log Out */}
            <button
              onClick={() => alert('Logged out safely. Session token encrypted.')}
              className="w-full flex items-center justify-between p-4 hover:bg-[#93000a]/20 active:bg-[#93000a]/30 transition-colors text-left group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#93000a]/20 flex items-center justify-center text-[#ffb4ab] group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#ffb4ab]">Log Out</p>
                  <p className="text-[11px] text-[#ffb4ab]/60">Safely sign out of this device</p>
                </div>
              </div>
              <div className="flex items-center text-[#ffb4ab]/60">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </button>
          </div>
        </section>

        {/* App Edition Tagline */}
        <div className="text-center pt-2 pb-6">
          <p className="text-[10px] font-bold text-[#8e9285] tracking-widest uppercase">
            TASTATAS PRIVÉ EDITION • V4.12.0
          </p>
          <p className="text-xs text-[#44483d] mt-0.5">Crafted for Exceptional Epicures</p>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#1d201f] border border-white/15 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Edit Patron Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-[#8e9285] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#8e9285] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#a8c686]"
                />
              </div>

              <div>
                <label className="text-[#8e9285] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#a8c686]"
                />
              </div>
            </div>

            <button
              onClick={() => setShowEditModal(false)}
              className="w-full py-3 rounded-full bg-[#a8c686] text-[#3a531f] text-xs font-bold hover:brightness-105 shadow-md"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* Saved Addresses Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#1d201f] border border-white/15 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Saved Addresses (3)</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-[#8e9285] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-[#a8c686]/60 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#c3e2a0] text-[20px] mt-0.5">home</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Penthouse 14 (Default)</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#c3e2a0]/20 text-[#c3e2a0] font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-[#c4c8ba] mt-0.5">720 Grand Avenue, NY • Residence</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8e9285] text-[20px] mt-0.5">domain</span>
                <div>
                  <span className="text-xs font-bold text-white">Tribeca Studio Office</span>
                  <p className="text-xs text-[#c4c8ba] mt-0.5">144 Franklin Street, NY • 6th Floor</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8e9285] text-[20px] mt-0.5">villa</span>
                <div>
                  <span className="text-xs font-bold text-white">Hamptons Retreat</span>
                  <p className="text-xs text-[#c4c8ba] mt-0.5">28 Ocean Dune Way, Sagaponack</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAddressModal(false)}
              className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payment Methods Modal */}
      {showPaymentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#1d201f] border border-white/15 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Payment Vault</h3>
              <button onClick={() => setShowPaymentsModal(false)} className="text-[#8e9285] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#282b29] to-[#191c1b] border border-[#a8c686]/40 shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest uppercase text-[#a8c686] font-bold">
                  TASTATAS VIP BLACK CARD
                </span>
                <div className="flex -space-x-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B]"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]"></span>
                </div>
              </div>
              <p className="text-base tracking-widest font-mono text-white">•••• •••• •••• 4829</p>
              <div className="flex justify-between text-[11px] text-[#c4c8ba]">
                <span>Alex Morgan</span>
                <span>09 / 28</span>
              </div>
            </div>

            <button
              onClick={() => setShowPaymentsModal(false)}
              className="w-full py-2.5 rounded-full bg-[#a8c686] text-[#3a531f] text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Concierge 24/7 VIP Chat Modal */}
      {showConciergeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm h-[500px] rounded-3xl bg-[#1d201f] border border-white/15 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-[#191c1b] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#a8c686]/20 border border-[#a8c686]/40 flex items-center justify-center text-[#c3e2a0]">
                  <span className="material-symbols-outlined text-[20px]">room_service</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1">
                    Julien • Private Sommelier
                  </h3>
                  <span className="text-[10px] text-[#c3e2a0] uppercase tracking-wider font-bold">
                    24/7 Table &amp; Cellar Valet
                  </span>
                </div>
              </div>
              <button onClick={() => setShowConciergeModal(false)} className="text-[#8e9285] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {conciergeChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#a8c686] text-[#1f3606] font-medium'
                        : 'bg-white/10 text-white border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-[#8e9285] mt-1 font-mono">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-[#191c1b] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={conciergeInput}
                onChange={(e) => setConciergeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendConcierge()}
                placeholder="Ask Julien regarding wine pairing or table requests..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-[#8e9285] focus:outline-none focus:border-[#a8c686]"
              />
              <button
                onClick={handleSendConcierge}
                className="w-9 h-9 rounded-full bg-[#a8c686] text-[#3a531f] flex items-center justify-center hover:brightness-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Culinary Preferences Modal */}
      {showPrefsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#1d201f] border border-white/15 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Culinary Preferences</h3>
              <button onClick={() => setShowPrefsModal(false)} className="text-[#8e9285] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[#8e9285] block mb-2 font-medium">Truffle &amp; Spice Intensity</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Subtle', 'Mild Truffle', 'Intense Black'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpiciness(lvl)}
                      className={`p-2 rounded-xl text-center border font-semibold ${
                        spiciness === lvl
                          ? 'bg-[#a8c686] text-[#3a531f] border-[#a8c686]'
                          : 'bg-white/5 border-white/10 text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <div>
                  <p className="text-white font-medium">Artisan &amp; Bio Sourced Only</p>
                  <p className="text-[11px] text-[#8e9285]">Filter only organic certified bistros</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOrganicOnly(!organicOnly)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    organicOnly ? 'bg-[#a8c686]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      organicOnly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  ></span>
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-white font-medium mb-1">Declared Allergens</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {allergens.map((alg) => (
                    <span
                      key={alg}
                      className="px-2.5 py-1 rounded-full bg-[#111413] border border-[#a8c686]/40 text-[#c3e2a0] text-[10px] font-bold"
                    >
                      {alg}
                    </span>
                  ))}
                  <button
                    onClick={() => setAllergens((prev) => [...prev, 'Gluten Sensitive'])}
                    className="px-2 py-0.5 rounded-full border border-dashed border-white/20 text-[#8e9285] hover:text-white text-[10px]"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPrefsModal(false)}
              className="w-full py-3 rounded-full bg-[#a8c686] text-[#3a531f] text-xs font-bold hover:brightness-105"
            >
              Update Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
