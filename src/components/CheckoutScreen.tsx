import React, { useState } from 'react';

interface CheckoutScreenProps {
  onBack: () => void;
  onPlaceOrder: (orderData: {
    dropOffInstruction: string;
    paymentMethod: string;
    total: number;
  }) => void;
  subtotal: number;
  total: number;
  deliveryAddress: { label: string; address: string; phone: string };
  onChangeAddress: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onBack,
  onPlaceOrder,
  subtotal,
  total,
  deliveryAddress,
  onChangeAddress,
}) => {
  const [selectedPref, setSelectedPref] = useState<'door' | 'meet' | 'hand'>('door');
  const [selectedPayment, setSelectedPayment] = useState<string>('vip_card');
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  const deliveryFee = 3.60;
  const subtotalAndService = Math.max(0, subtotal > 0 ? subtotal : 24.50);
  const totalPayable = total > 0 ? total : subtotalAndService + deliveryFee;

  const handlePlaceOrderClick = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      const prefLabels = {
        door: 'Leave at door',
        meet: 'Meet at door',
        hand: 'Hand to me',
      };
      const paymentLabels: Record<string, string> = {
        vip_card: 'TASTATAS VIP Card (•••• 4829)',
        apple_pay: 'Apple Pay / Google Pay',
        upi: 'UPI / Instant Banking',
        cod: 'Cash on Delivery',
      };
      onPlaceOrder({
        dropOffInstruction: prefLabels[selectedPref],
        paymentMethod: paymentLabels[selectedPayment] || 'TASTATAS VIP Card',
        total: totalPayable,
      });
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between pb-36">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full px-5 py-3.5 flex items-center justify-between bg-[#111413]/80 backdrop-blur-md border-b border-white/5">
        <button
          onClick={onBack}
          aria-label="Go Back"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[#282b29]/60 text-[#e1e3e1] hover:text-[#c3e2a0] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        <div className="flex flex-col items-center">
          <h1 className="text-base font-bold text-[#e1e3e1] tracking-tight">Checkout</h1>
          <span className="text-[10px] text-[#8e9285] tracking-widest uppercase mt-0.5 font-bold">
            Step 2 of 2
          </span>
        </div>

        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#282b29]/40 text-[#c4c8ba]">
          <span className="material-symbols-outlined text-[18px]">lock</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 px-5 pt-3 space-y-6">
        {/* Section: Delivery Address Card */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e9285]">
              Delivery Destination
            </span>
            <button
              onClick={onChangeAddress}
              className="text-xs font-semibold text-[#c3e2a0] hover:underline transition-colors active:scale-95"
            >
              Change
            </button>
          </div>

          <div className="glass-panel-1 rounded-2xl p-4 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c3e2a0] shrink-0 border border-[#44483d]/30">
                <span className="material-symbols-outlined text-[20px] fill">location_on</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-bold text-[#e1e3e1] truncate">Delivery Address</p>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#282b29]/80 text-[#ccc6b6] border border-[#44483d]/20 tracking-wider">
                    {deliveryAddress.label}
                  </span>
                </div>
                <p className="text-xs text-[#c4c8ba] leading-snug">{deliveryAddress.address}</p>
                <p className="text-[11px] text-[#8e9285] mt-1 font-mono">{deliveryAddress.phone}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Delivery Preference */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e9285]">
              Drop-off Instructions
            </span>
            <span className="text-[11px] text-[#c4c8ba]/70">Estimated 25–35 min</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Option 1: Leave at door */}
            <button
              type="button"
              onClick={() => setSelectedPref('door')}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center transition-all active:scale-95 border ${
                selectedPref === 'door'
                  ? 'bg-[#a8c686] text-[#3a531f] font-bold shadow-sm border-[#a8c686]'
                  : 'bg-[#191c1b]/70 text-[#c4c8ba] border-[#44483d]/20 hover:border-[#44483d]/40'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] mb-1">door_front</span>
              <span className="text-[11px] tracking-normal">Leave at door</span>
            </button>

            {/* Option 2: Meet at door */}
            <button
              type="button"
              onClick={() => setSelectedPref('meet')}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center transition-all active:scale-95 border ${
                selectedPref === 'meet'
                  ? 'bg-[#a8c686] text-[#3a531f] font-bold shadow-sm border-[#a8c686]'
                  : 'bg-[#191c1b]/70 text-[#c4c8ba] border-[#44483d]/20 hover:border-[#44483d]/40'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] mb-1">meeting_room</span>
              <span className="text-[11px] tracking-normal">Meet at door</span>
            </button>

            {/* Option 3: Hand to me */}
            <button
              type="button"
              onClick={() => setSelectedPref('hand')}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center transition-all active:scale-95 border ${
                selectedPref === 'hand'
                  ? 'bg-[#a8c686] text-[#3a531f] font-bold shadow-sm border-[#a8c686]'
                  : 'bg-[#191c1b]/70 text-[#c4c8ba] border-[#44483d]/20 hover:border-[#44483d]/40'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] mb-1">front_hand</span>
              <span className="text-[11px] tracking-normal">Hand to me</span>
            </button>
          </div>
        </section>

        {/* Section: Payment Methods */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="text-sm font-semibold text-[#e1e3e1]">Payment Method</h2>
            <span className="text-[10px] text-[#8e9285] flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[13px] text-[#c3e2a0]">verified_user</span>
              Guaranteed
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Option 1: TASTATAS VIP Card */}
            <div
              onClick={() => setSelectedPayment('vip_card')}
              className={`rounded-2xl p-4 cursor-pointer transition-all relative overflow-hidden active:scale-[0.99] ${
                selectedPayment === 'vip_card' ? 'glass-panel-active' : 'glass-panel-1 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#323534]/60 flex items-center justify-center text-[#a8c686] border border-[#44483d]/30 shrink-0">
                    <span className="material-symbols-outlined text-[22px]">credit_card</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#e1e3e1]">TASTATAS VIP Card</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#c3e2a0]/10 text-[#c3e2a0] border border-[#c3e2a0]/20 font-bold uppercase tracking-wider">
                        VIP
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {/* Mastercard abstract glyph circles */}
                      <div className="flex -space-x-1 items-center">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B]/80 inline-block"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/80 inline-block"></span>
                      </div>
                      <span className="text-xs text-[#e1e3e1] font-mono tracking-wider">•••• 4829</span>
                      <span className="text-xs text-[#8e9285]">•</span>
                      <span className="text-xs text-[#c4c8ba]/80">Alex Morgan</span>
                    </div>
                  </div>
                </div>

                {/* Radio Indicator */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 ${
                    selectedPayment === 'vip_card'
                      ? 'border-2 border-[#c3e2a0] bg-[#c3e2a0]/20'
                      : 'border border-[#44483d]/60'
                  }`}
                >
                  {selectedPayment === 'vip_card' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c3e2a0]"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Option 2: Apple Pay / Google Pay */}
            <div
              onClick={() => setSelectedPayment('apple_pay')}
              className={`rounded-2xl p-4 cursor-pointer transition-all active:scale-[0.99] ${
                selectedPayment === 'apple_pay' ? 'glass-panel-active' : 'glass-panel-1 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c4c8ba] border border-[#44483d]/20 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">contactless</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#e1e3e1]">Apple Pay / Google Pay</p>
                    <p className="text-[11px] text-[#8e9285] mt-0.5">Instant biometric authorization</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedPayment === 'apple_pay'
                      ? 'border-2 border-[#c3e2a0] bg-[#c3e2a0]/20'
                      : 'border border-[#44483d]/60'
                  }`}
                >
                  {selectedPayment === 'apple_pay' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c3e2a0]"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Option 3: UPI / Instant Banking */}
            <div
              onClick={() => setSelectedPayment('upi')}
              className={`rounded-2xl p-4 cursor-pointer transition-all active:scale-[0.99] ${
                selectedPayment === 'upi' ? 'glass-panel-active' : 'glass-panel-1 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c4c8ba] border border-[#44483d]/20 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#e1e3e1]">UPI / Instant Banking</p>
                    <p className="text-[11px] text-[#8e9285] mt-0.5">Instant direct transfer</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedPayment === 'upi'
                      ? 'border-2 border-[#c3e2a0] bg-[#c3e2a0]/20'
                      : 'border border-[#44483d]/60'
                  }`}
                >
                  {selectedPayment === 'upi' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c3e2a0]"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Option 4: Cash on Delivery */}
            <div
              onClick={() => setSelectedPayment('cod')}
              className={`rounded-2xl p-4 cursor-pointer transition-all active:scale-[0.99] ${
                selectedPayment === 'cod' ? 'glass-panel-active' : 'glass-panel-1 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1d201f] flex items-center justify-center text-[#c4c8ba] border border-[#44483d]/20 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#e1e3e1]">Cash on Delivery</p>
                    <p className="text-[11px] text-[#8e9285] mt-0.5">Pay upon arrival at destination</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedPayment === 'cod'
                      ? 'border-2 border-[#c3e2a0] bg-[#c3e2a0]/20'
                      : 'border border-[#44483d]/60'
                  }`}
                >
                  {selectedPayment === 'cod' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c3e2a0]"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Order Total Summary Row */}
        <section className="glass-panel-1 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#c4c8ba]">Subtotal &amp; Service Fee</span>
            <span className="text-[#e1e3e1] font-mono">${subtotalAndService.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#c4c8ba]">White-Glove Delivery</span>
            <span className="text-[#c3e2a0] font-mono">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-[#44483d]/20 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#e1e3e1]">Total Payable</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="material-symbols-outlined text-[12px] text-[#c3e2a0]">shield</span>
                <span className="text-[9px] text-[#8e9285] tracking-wider uppercase font-bold">
                  256-BIT ENCRYPTION
                </span>
              </div>
            </div>
            <span className="text-xl font-bold text-[#c3e2a0] font-mono tracking-tight">
              ${totalPayable.toFixed(2)}
            </span>
          </div>
        </section>
      </main>

      {/* Bottom Sticky Action Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-[390px] mx-auto px-5 py-4 glass-dock">
        <button
          onClick={handlePlaceOrderClick}
          disabled={isPlacingOrder}
          type="button"
          className="w-full py-4 rounded-full bg-[#a8c686] text-[#3a531f] text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#a8c686]/20 hover:bg-[#c3e2a0] transition-all duration-200 active:scale-[0.98] disabled:opacity-75"
        >
          {isPlacingOrder ? (
            <>
              <div className="w-4 h-4 border-2 border-[#3a531f] border-t-transparent rounded-full animate-spin"></div>
              <span>Authorizing Encrypted Payment...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">lock_open</span>
              <span>Place Order • ${totalPayable.toFixed(2)}</span>
            </>
          )}
        </button>
        <div className="w-28 h-1 bg-[#323534]/70 rounded-full mx-auto mt-3"></div>
      </div>
    </div>
  );
};
