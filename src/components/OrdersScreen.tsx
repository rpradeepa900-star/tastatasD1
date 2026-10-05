import React, { useState } from 'react';
import { ActiveDelivery, PastOrder } from '../data/mockData';

interface OrdersScreenProps {
  activeDelivery: ActiveDelivery | null;
  pastOrders: PastOrder[];
  onReorder: (pastOrder: PastOrder) => void;
  onAdvanceOrderStep?: () => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  activeDelivery,
  pastOrders,
  onReorder,
  onAdvanceOrderStep,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showCallModal, setShowCallModal] = useState<boolean>(false);
  const [showChatModal, setShowChatModal] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'courier' | 'user'; text: string; time: string }>>([
    { sender: 'courier', text: "Bonsoir Alex! I've just picked up your thermally sealed order from Maison Gusto. Estimated arrival in 15 minutes.", time: '20:30' },
    { sender: 'user', text: 'Thank you Marcus, please leave at the penthouse concierge or front door.', time: '20:31' },
    { sender: 'courier', text: 'Understood. Navigating up Boulevard Saint-Germain now.', time: '20:32' },
  ]);
  const [newChatInput, setNewChatInput] = useState<string>('');

  const handleSendChatMessage = () => {
    if (!newChatInput.trim()) return;
    const userMsg = newChatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Now' },
    ]);
    setNewChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'courier',
          text: 'Got it! I am 2 blocks away now. Delivering with white-glove discreet protocol.',
          time: 'Now',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="w-full relative min-h-screen pb-32">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#111413]/85 backdrop-blur-md px-5 py-3.5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1d201f] border border-[#44483d]/40 flex items-center justify-center text-[#c3e2a0]">
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </div>
          <span className="text-base font-bold tracking-wider uppercase text-[#e1e3e1]">TASTATAS</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#a8c686]/10 border border-[#a8c686]/30 text-[10px] font-bold text-[#c3e2a0] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c3e2a0] animate-ping"></span>
            Live Sanctuary
          </span>
        </div>
      </header>

      {/* Screen Title */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#e1e3e1] tracking-tight">My Orders</h1>
            <p className="text-xs text-[#c4c8ba] mt-0.5">Track live culinary deliveries</p>
          </div>
        </div>

        {/* Segmented Switcher */}
        <div className="mt-4 p-1 rounded-full bg-white/[0.04] border border-white/10 flex items-center">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeTab === 'active'
                ? 'bg-[#a8c686] text-[#3a531f] shadow-md font-bold'
                : 'text-[#c4c8ba] hover:text-white'
            }`}
          >
            Active Orders ({activeDelivery ? 1 : 0})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-[#a8c686] text-[#3a531f] shadow-md font-bold'
                : 'text-[#c4c8ba] hover:text-white'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="px-5 pt-4 space-y-6">
        {activeTab === 'active' ? (
          activeDelivery ? (
            <div className="space-y-4">
              {/* Order Status Card */}
              <div className="glass-card-level2 rounded-2xl p-5 border border-white/10 space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#c4c8ba] tracking-wider font-mono">
                        {activeDelivery.orderNumber}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c3e2a0]"></span>
                    </div>
                    <p className="text-xs text-[#8e9285] mt-1">Estimated Delivery</p>
                    <p className="text-2xl font-bold text-[#e1e3e1] font-mono tracking-tight">
                      {activeDelivery.estimatedDeliveryTime}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#191c1b] border border-[#a8c686]/40 text-xs font-bold text-[#c3e2a0] font-mono">
                    {activeDelivery.etaMinutes} mins away
                  </span>
                </div>

                {/* Vertical Stepper */}
                <div className="relative pl-7 space-y-6">
                  {/* Vertical connecting line */}
                  <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#a8c686] via-[#a8c686] to-[#44483d]/40"></div>

                  {activeDelivery.steps.map((step, idx) => {
                    const isDone = idx < activeDelivery.currentStepIndex;
                    const isCurrent = idx === activeDelivery.currentStepIndex;

                    return (
                      <div key={step.title} className="relative">
                        {/* Step Marker Dot */}
                        <div
                          className={`absolute -left-7 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isDone
                              ? 'bg-[#a8c686] text-[#3a531f]'
                              : isCurrent
                              ? 'bg-[#191c1b] border-2 border-[#c3e2a0] text-[#c3e2a0] ring-4 ring-[#c3e2a0]/20'
                              : 'bg-[#191c1b] border border-[#44483d] text-[#8e9285]'
                          }`}
                        >
                          {isDone ? (
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          ) : isCurrent ? (
                            <span className="w-2 h-2 rounded-full bg-[#c3e2a0] animate-ping"></span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e9285]"></span>
                          )}
                        </div>

                        {/* Step Text Info */}
                        <div className="flex items-baseline justify-between">
                          <h4
                            className={`text-xs font-semibold ${
                              isDone || isCurrent ? 'text-[#e1e3e1]' : 'text-[#8e9285]'
                            }`}
                          >
                            {step.title}
                          </h4>
                          {step.time && (
                            <span
                              className={`text-[10px] font-mono font-bold ${
                                isCurrent ? 'text-[#c3e2a0] uppercase tracking-wider' : 'text-[#8e9285]'
                              }`}
                            >
                              {step.time}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#c4c8ba] mt-0.5">{step.detail}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Advance Stepper Test Simulator (Helpful for reviewing live states!) */}
                {onAdvanceOrderStep && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-[#8e9285] uppercase tracking-wider">Demo Simulator:</span>
                    <button
                      onClick={onAdvanceOrderStep}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-[#c3e2a0] border border-white/10 active:scale-95 transition-all"
                    >
                      Advance Status →
                    </button>
                  </div>
                )}

                {/* Courier Info Card */}
                <div className="p-3.5 rounded-2xl bg-[#191c1b]/80 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={activeDelivery.courier.avatar}
                        alt={activeDelivery.courier.name}
                        className="w-11 h-11 rounded-full object-cover border border-white/10"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#a8c686] border border-[#191c1b] flex items-center justify-center text-[8px] text-[#1f3606] font-bold">
                        ✓
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{activeDelivery.courier.name}</span>
                        <span className="material-symbols-outlined text-[#c3e2a0] text-[14px]">verified</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#c4c8ba] mt-0.5">
                        <span className="material-symbols-outlined text-[13px]">electric_scooter</span>
                        <span>{activeDelivery.courier.vehicle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCallModal(true)}
                      aria-label="Call Courier"
                      className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                    </button>
                    <button
                      onClick={() => setShowChatModal(true)}
                      aria-label="Message Courier"
                      className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                    </button>
                  </div>
                </div>

                {/* Culinary Selection Summary */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e9285] block mb-1">
                    Culinary Selection
                  </span>
                  <div className="space-y-1">
                    {activeDelivery.items.map((it) => (
                      <div key={it.name} className="flex justify-between text-xs">
                        <span className="text-white">
                          {it.name} <span className="text-[#c3e2a0] font-bold">x{it.quantity}</span>
                        </span>
                        <span className="text-[#8e9285] font-mono">${(it.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Map View Button */}
                <button
                  onClick={() => setShowMapModal(true)}
                  className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 group"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#c3e2a0]">map</span>
                  <span>Live Map View</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center glass-surface rounded-2xl p-8 space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#8e9285]">schedule</span>
              <h3 className="text-sm font-semibold text-white">No Active Deliveries</h3>
              <p className="text-xs text-[#c4c8ba]">
                All placed orders are safely delivered. Explore our curated dishes to order again.
              </p>
            </div>
          )
        ) : (
          /* Order History Tab */
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Recent Orders</h3>
              <span className="text-xs text-[#c3e2a0] font-semibold cursor-pointer">View All</span>
            </div>

            <div className="space-y-3">
              {pastOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="glass-card-level1 rounded-2xl p-4 flex items-center justify-between border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={ord.image}
                      alt={ord.restaurantName}
                      className="w-14 h-14 rounded-xl object-cover border border-white/5"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{ord.restaurantName}</h4>
                        <span className="text-[10px] text-[#8e9285]">• {ord.dateStr}</span>
                      </div>
                      <p className="text-xs text-[#c4c8ba] mt-0.5">
                        {ord.itemCount} items • <span className="font-mono text-white">${ord.totalAmount.toFixed(2)}</span>
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c3e2a0]"></span>
                        <span className="text-[9px] font-bold text-[#c3e2a0] uppercase tracking-wider">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onReorder(ord)}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#a8c686] hover:text-[#3a531f] border border-white/10 text-xs font-semibold text-white flex items-center gap-1 transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[14px]">refresh</span>
                    <span>Reorder</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Live Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#111413] border border-white/15 overflow-hidden shadow-2xl space-y-0">
            {/* Header */}
            <div className="p-4 bg-[#191c1b] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c3e2a0] animate-ping"></span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Valet Transit</h3>
              </div>
              <button onClick={() => setShowMapModal(false)} className="text-[#8e9285] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Stylized Vector Satellite Map Canvas */}
            <div className="relative w-full h-72 bg-[#0c0f0e] overflow-hidden">
              {/* City Grid Lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(#323534 1px, transparent 1px), linear-gradient(90deg, #323534 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              ></div>

              {/* River Seine / Avenue Vector Curve */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* River */}
                <path
                  d="M -20,180 Q 90,140 180,210 T 400,160"
                  fill="none"
                  stroke="#1d201f"
                  strokeWidth="32"
                  strokeLinecap="round"
                />
                {/* Transit Route Line */}
                <path
                  d="M 60,70 L 140,110 L 220,130 L 290,210 L 320,230"
                  fill="none"
                  stroke="#44483d"
                  strokeWidth="6"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 60,70 L 140,110 L 220,130"
                  fill="none"
                  stroke="#a8c686"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              {/* Restaurant Node */}
              <div className="absolute top-12 left-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#191c1b] border-2 border-[#a8c686] flex items-center justify-center text-[#c3e2a0] shadow-lg">
                  <span className="material-symbols-outlined text-[16px]">restaurant</span>
                </div>
                <span className="text-[9px] bg-[#111413]/90 px-1.5 py-0.5 rounded text-[#c4c8ba] mt-1 border border-white/10 font-bold">
                  Maison Gusto
                </span>
              </div>

              {/* Courier Moving Node */}
              <div className="absolute top-28 left-48 flex flex-col items-center animate-bounce">
                <div className="w-9 h-9 rounded-full bg-[#a8c686] text-[#3a531f] flex items-center justify-center shadow-[0_0_20px_rgba(168,198,134,0.6)]">
                  <span className="material-symbols-outlined text-[20px]">electric_scooter</span>
                </div>
                <span className="text-[9px] bg-[#a8c686] px-1.5 py-0.5 rounded text-[#1f3606] font-bold mt-1 shadow">
                  Marcus (18m)
                </span>
              </div>

              {/* Destination Node */}
              <div className="absolute bottom-8 right-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#282b29] border-2 border-white text-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                </div>
                <span className="text-[9px] bg-[#111413]/90 px-1.5 py-0.5 rounded text-white mt-1 border border-white/10 font-bold">
                  Penthouse 14
                </span>
              </div>

              {/* Live Status Overlay Pill */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-[#111413]/90 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c3e2a0] animate-pulse"></span>
                <span className="text-[11px] text-white font-mono">Traversing Blvd Saint-Germain</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#191c1b] border-t border-white/10 flex justify-between items-center text-xs">
              <div>
                <p className="text-[#8e9285]">Destination</p>
                <p className="text-white font-medium">720 Grand Avenue, NY</p>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="px-4 py-2 rounded-full bg-[#a8c686] text-[#3a531f] font-bold hover:brightness-105"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courier Phone Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-xs rounded-3xl bg-[#1d201f] border border-white/15 p-6 text-center space-y-4 shadow-2xl">
            <div className="w-20 h-20 rounded-full mx-auto relative p-1 bg-[#a8c686]/20 border border-[#a8c686]/40">
              <img
                src={activeDelivery?.courier.avatar}
                alt="Marcus"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{activeDelivery?.courier.name}</h3>
              <p className="text-xs text-[#c3e2a0]">Connecting Private Call...</p>
              <p className="text-[11px] text-[#8e9285] mt-1 font-mono">{activeDelivery?.courier.phone}</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-[#c4c8ba]">
              "Hello Alex! I am currently turning onto your street. Shall I leave at your apartment door?"
            </div>

            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-3 rounded-full bg-[#ffb4ab]/20 hover:bg-[#ffb4ab]/30 border border-[#ffb4ab]/40 text-[#ffb4ab] text-xs font-bold transition-all"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Courier Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm h-[480px] rounded-3xl bg-[#1d201f] border border-white/15 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="p-4 bg-[#191c1b] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={activeDelivery?.courier.avatar}
                  alt="Marcus"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1">
                    {activeDelivery?.courier.name} <span className="text-[#c3e2a0]">✓</span>
                  </h3>
                  <span className="text-[10px] text-[#c4c8ba]">Courier En Route</span>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-[#8e9285] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
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
                value={newChatInput}
                onChange={(e) => setNewChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Type instructions for Marcus..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-[#8e9285] focus:outline-none focus:border-[#a8c686]"
              />
              <button
                onClick={handleSendChatMessage}
                className="w-9 h-9 rounded-full bg-[#a8c686] text-[#3a531f] flex items-center justify-center hover:brightness-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
