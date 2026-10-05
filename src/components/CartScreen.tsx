import React, { useState } from 'react';
import { CartItem } from '../data/mockData';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onBack: () => void;
  onProceedToCheckout: () => void;
  deliveryAddress: { label: string; address: string; eta: string };
  onChangeAddress: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBack,
  onProceedToCheckout,
  deliveryAddress,
  onChangeAddress,
}) => {
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [showPromoInput, setShowPromoInput] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 2.50 : 0;
  const discount = promoApplied && cartItems.length > 0 ? 3.50 : 0;
  const tax = cartItems.length > 0 ? 1.80 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount + tax);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleApplyCustomPromo = () => {
    if (promoCodeInput.trim().toUpperCase() === 'VIP' || promoCodeInput.trim().toUpperCase() === 'TASTA-VIP' || promoCodeInput.trim().toUpperCase() === 'EPICURE') {
      setPromoApplied(true);
      setShowPromoInput(false);
      setPromoError(null);
    } else {
      setPromoError('Invalid promo code. Try "TASTA-VIP" or "EPICURE"');
    }
  };

  return (
    <div className="w-full relative min-h-screen flex flex-col justify-between pb-36">
      {/* Top Navigation Anchor */}
      <header className="sticky top-0 z-40 bg-[#111413]/85 backdrop-blur-md px-5 py-3.5 flex items-center justify-between border-b border-white/5">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-[#e1e3e1] active:scale-95 transition-transform hover:text-[#c3e2a0]"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold tracking-tight text-[#e1e3e1]">My Cart</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#c3e2a0]/10 text-[#c3e2a0] border border-[#c3e2a0]/20">
            {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <button
          onClick={onClearCart}
          disabled={cartItems.length === 0}
          className="text-xs font-semibold text-[#c4c8ba] hover:text-[#ffb4ab] disabled:opacity-40 transition-all active:scale-95"
        >
          Clear
        </button>
      </header>

      {/* Main Content Area */}
      <main className="px-5 pt-3 space-y-5 flex-1">
        {/* Delivery Destination Capsule */}
        <section className="glass-surface rounded-2xl p-3 px-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#a8c686]/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#c3e2a0] text-[18px] fill">location_on</span>
            </div>
            <div className="truncate">
              <p className="text-[10px] text-[#8e9285] uppercase tracking-wider font-bold">Delivery Destination</p>
              <p className="text-xs text-[#e1e3e1] truncate font-medium">
                {deliveryAddress.address} • <span className="text-[#c3e2a0] font-semibold">{deliveryAddress.eta}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onChangeAddress}
            aria-label="Change address"
            className="shrink-0 pl-2 text-[#c4c8ba] hover:text-[#c3e2a0] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
        </section>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="py-16 text-center glass-surface rounded-2xl p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-[#8e9285]">
              <span className="material-symbols-outlined text-3xl">shopping_basket</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Your Cart is Empty</h3>
              <p className="text-xs text-[#c4c8ba] mt-1 max-w-xs mx-auto">
                Explore our Michelin-curated selection and add exquisite dishes to begin your order.
              </p>
            </div>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-full bg-[#a8c686] text-[#3a531f] text-xs font-bold hover:brightness-105 active:scale-95 transition-all shadow-md"
            >
              Browse Haute Menu
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <section aria-label="Order Cart Items" className="space-y-3.5">
              {cartItems.map((item) => (
                <article
                  key={item.cartItemId}
                  className="glass-surface rounded-2xl p-3.5 flex gap-3.5 items-center relative overflow-hidden transition-all duration-200"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#282b29] border border-white/5 relative">
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
                    <div className="flex justify-between items-start gap-1">
                      <h2 className="text-sm font-semibold text-[#e1e3e1] truncate">{item.dish.name}</h2>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        aria-label={`Remove ${item.dish.name}`}
                        className="text-[#c4c8ba]/60 hover:text-[#ffb4ab] transition-colors p-0.5 -mr-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#c4c8ba] truncate">
                      {item.portionLabel}
                      {item.intensity ? `, ${item.intensity}` : ''}
                      {item.selectedAddons.length > 0 ? ` +${item.selectedAddons.length} addons` : ''}
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-base font-bold text-[#c3e2a0] font-mono">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="glass-pill rounded-full px-2 py-1 flex items-center gap-2.5">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[#c4c8ba] hover:text-[#e1e3e1] active:scale-90 transition-transform"
                        >
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span className="text-xs text-[#e1e3e1] font-bold w-3 text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[#c4c8ba] hover:text-[#e1e3e1] active:scale-90 transition-transform"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Promo Code Section */}
            {promoApplied ? (
              <section className="glass-surface rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#4a473b]/40 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#c3e2a0] text-[18px]">confirmation_number</span>
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-[#c3e2a0] uppercase font-bold tracking-wider">
                      TASTA-VIP applied
                    </span>
                    <p className="text-xs text-[#c4c8ba] truncate">Membership discount (-$3.50)</p>
                  </div>
                </div>
                <button
                  onClick={() => setPromoApplied(false)}
                  aria-label="Remove promo code"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#c4c8ba] hover:text-[#ffb4ab] active:scale-90 transition-transform shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </section>
            ) : showPromoInput ? (
              <section className="glass-surface rounded-2xl p-3 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter code (e.g. TASTA-VIP)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-[#8e9285] focus:outline-none focus:border-[#a8c686]"
                  />
                  <button
                    onClick={handleApplyCustomPromo}
                    className="px-3 py-1.5 rounded-xl bg-[#a8c686] text-[#3a531f] text-xs font-bold hover:brightness-105"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setShowPromoInput(false)}
                    className="px-2 py-1.5 rounded-xl text-[#8e9285] text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-[#ffb4ab]">{promoError}</p>}
              </section>
            ) : (
              <button
                onClick={() => setShowPromoInput(true)}
                className="w-full glass-surface rounded-2xl p-3 text-left flex items-center justify-between text-xs text-[#c4c8ba] hover:text-[#c3e2a0] hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">sell</span>
                  <span>Have a VIP privilege code?</span>
                </div>
                <span className="text-xs font-semibold text-[#c3e2a0]">Add Promo</span>
              </button>
            )}

            {/* Order Summary Card */}
            <section className="glass-surface rounded-2xl p-4 space-y-3">
              <h3 className="text-base font-semibold text-[#e1e3e1]">Order Breakdown</h3>
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex justify-between items-center text-[#c4c8ba]">
                  <span>Subtotal</span>
                  <span className="text-[#e1e3e1] font-mono font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[#c4c8ba]">
                  <span>Delivery Fee</span>
                  <span className="text-[#e1e3e1] font-mono font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-[#c4c8ba]">
                    <div className="flex items-center gap-1.5">
                      <span>Voucher Discount</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#c3e2a0]/10 text-[#c3e2a0] border border-[#c3e2a0]/20">
                        VIP
                      </span>
                    </div>
                    <span className="text-[#c3e2a0] font-mono font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[#c4c8ba]">
                  <span>Taxes &amp; Service</span>
                  <span className="text-[#e1e3e1] font-mono font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-white/10 my-2 pt-2.5 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-semibold text-[#e1e3e1] block">Total Amount</span>
                  <span className="text-[10px] text-[#c4c8ba]">Includes all duties &amp; packaging</span>
                </div>
                <span className="text-2xl text-[#e8e2d2] font-bold tracking-tight font-mono">
                  ${total.toFixed(2)}
                </span>
              </div>
            </section>

            {/* Epicurean Guarantee Note */}
            <div className="text-center py-1">
              <p className="text-[11px] text-[#8e9285] flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Prepared under certified culinary hygiene protocols
              </p>
            </div>
          </>
        )}
      </main>

      {/* Bottom Sticky Checkout Anchor */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-safe">
          <div className="w-full max-w-[390px] px-5 py-4 glass-dock pointer-events-auto shadow-2xl">
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-6 rounded-full bg-[#a8c686] hover:bg-[#c3e2a0] transition-all duration-200 active:scale-[0.98] flex items-center justify-between shadow-lg shadow-[#a8c686]/20 group"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-[#3a531f] uppercase tracking-wider leading-none">
                  Complete Order
                </span>
                <span className="text-sm font-bold text-[#1f3606]">Proceed to Checkout</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#1f3606] font-mono">
                <span className="text-base font-bold">${total.toFixed(2)}</span>
                <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1">
                  chevron_right
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
