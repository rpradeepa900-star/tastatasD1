import { useState } from 'react';
import {
  DISHES,
  Dish,
  INITIAL_CART_ITEMS,
  INITIAL_ACTIVE_DELIVERY,
  PAST_ORDERS,
  CartItem,
  ActiveDelivery,
  PastOrder,
  PortionOption,
  AddonOption,
} from './data/mockData';
import { DiscoverScreen } from './components/DiscoverScreen';
import { DishDetailScreen } from './components/DishDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNavBar, NavTab } from './components/BottomNavBar';
import { ScreenSwitcherHeader, ScreenMode } from './components/ScreenSwitcherHeader';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('discover');
  const [selectedDish, setSelectedDish] = useState<Dish>(DISHES[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [activeDelivery, setActiveDelivery] = useState<ActiveDelivery | null>(INITIAL_ACTIVE_DELIVERY);
  const [pastOrders, setPastOrders] = useState<PastOrder[]>(PAST_ORDERS);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(['truffle-wagyu-brioche', 'woodfired-pizza'])
  );

  const [deliveryAddress, setDeliveryAddress] = useState({
    label: 'RESIDENCE',
    address: 'The Glasshouse, Apt 4B',
    fullAddress: 'Penthouse 14, 720 Grand Avenue, NY',
    eta: '25-30 min',
    phone: '+1 (555) 019-2834',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSelectDish = (dish: Dish) => {
    setSelectedDish(dish);
    setCurrentScreen('dish-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (dishId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(dishId)) {
        next.delete(dishId);
      } else {
        next.add(dishId);
      }
      return next;
    });
  };

  const handleQuickAdd = (dish: Dish) => {
    const defaultPortion = dish.portionOptions[0] || { id: 'single', label: 'Single', extraPrice: 0 };
    handleAddToCart(dish, defaultPortion, dish.intensities[0] || 'Signature', [], 1);
    triggerToast(`Added ${dish.name} to cart`);
  };

  const handleAddToCart = (
    dish: Dish,
    portion: PortionOption,
    intensity: string,
    addons: AddonOption[],
    quantity: number
  ) => {
    const addonPrice = addons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = dish.price + portion.extraPrice + addonPrice;

    const newItem: CartItem = {
      cartItemId: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      dishId: dish.id,
      dish,
      portionId: portion.id,
      portionLabel: portion.label,
      portionExtraPrice: portion.extraPrice,
      intensity,
      selectedAddons: addons,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => {
      // Check if identical configuration exists
      const existingIdx = prev.findIndex(
        (it) =>
          it.dishId === dish.id &&
          it.portionId === portion.id &&
          it.intensity === intensity &&
          it.selectedAddons.length === addons.length &&
          it.selectedAddons.every((a) => addons.some((x) => x.id === a.id))
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        updated[existingIdx].totalPrice = updated[existingIdx].quantity * updated[existingIdx].unitPrice;
        return updated;
      }
      return [newItem, ...prev];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQty, totalPrice: newQty * item.unitPrice }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    triggerToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
    triggerToast('Cart emptied');
  };

  const handlePlaceOrder = (orderData: {
    dropOffInstruction: string;
    paymentMethod: string;
    total: number;
  }) => {
    const newOrderId = `TAS-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const etaMin = 25;
    const etaTime = `${now.getHours()}:${String((now.getMinutes() + etaMin) % 60).padStart(2, '0')}`;

    const itemsSummary = cartItems.map((ci) => ({
      name: ci.dish.name,
      customization: `${ci.portionLabel}${ci.intensity ? `, ${ci.intensity}` : ''}`,
      quantity: ci.quantity,
      price: ci.unitPrice,
    }));

    const newDelivery: ActiveDelivery = {
      orderId: newOrderId,
      orderNumber: `ORDER #${newOrderId}`,
      orderedAt: timeStr,
      estimatedDeliveryTime: etaTime,
      etaMinutes: etaMin,
      currentStepIndex: 1, // Preparing in Kitchen
      steps: [
        { title: 'Order Confirmed', time: timeStr, detail: 'Kitchen accepted receipt' },
        { title: 'Preparing in Kitchen', time: 'ACTIVE', detail: 'Artisan preparation in progress' },
        { title: 'Courier On the Way', time: 'EN ROUTE', detail: 'Dispatched with thermally sealed valet' },
        { title: 'Delivered', time: '', detail: 'Discreet hand-off at private residence' },
      ],
      courier: {
        name: 'Marcus V.',
        verified: true,
        vehicle: 'Electric Scooter',
        phone: '+1 (555) 392-1082',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        rating: 4.95,
      },
      deliveryAddress: {
        label: deliveryAddress.label,
        address: deliveryAddress.fullAddress,
        phone: deliveryAddress.phone,
      },
      dropOffInstruction: orderData.dropOffInstruction,
      paymentMethod: orderData.paymentMethod,
      items: itemsSummary.length > 0 ? itemsSummary : [
        { name: 'Truffle Wagyu Brioche', customization: 'Double Wagyu, Signature Aioli', quantity: 1, price: 20.50 }
      ],
      subtotal: orderData.total - 3.60,
      deliveryFee: 3.60,
      discount: 3.50,
      tax: 1.80,
      total: orderData.total,
    };

    setActiveDelivery(newDelivery);
    setCartItems([]);
    setCurrentScreen('orders');
    triggerToast('Order confirmed! Tracking live courier status.');
  };

  const handleAdvanceOrderStep = () => {
    if (!activeDelivery) return;
    const nextIdx = (activeDelivery.currentStepIndex + 1) % (activeDelivery.steps.length + 1);
    if (nextIdx >= activeDelivery.steps.length) {
      // Completed, archive to past orders
      const newPast: PastOrder = {
        id: `ord-${Date.now()}`,
        restaurantName: 'Maison Gusto',
        dateStr: 'Just now',
        itemCount: activeDelivery.items.reduce((s, it) => s + it.quantity, 0),
        totalAmount: activeDelivery.total,
        status: 'DELIVERED',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=80',
        itemsPreview: activeDelivery.items.map((it) => it.name).join(', '),
      };
      setPastOrders((prev) => [newPast, ...prev]);
      setActiveDelivery(null);
      triggerToast('Order safely delivered!');
    } else {
      setActiveDelivery((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentStepIndex: nextIdx,
          etaMinutes: Math.max(0, prev.etaMinutes - 8),
        };
      });
      triggerToast(`Order status updated to: ${activeDelivery.steps[nextIdx].title}`);
    }
  };

  const handleReorder = (pastOrder: PastOrder) => {
    // Add default dishes to cart
    const dishToAdd = DISHES[0];
    handleAddToCart(
      dishToAdd,
      dishToAdd.portionOptions[0],
      dishToAdd.intensities[0] || 'Signature',
      [],
      1
    );
    triggerToast(`Added ${pastOrder.restaurantName} items to cart`);
    setCurrentScreen('cart');
  };

  const handleChangeAddress = () => {
    const addresses = [
      { label: 'RESIDENCE', address: 'The Glasshouse, Apt 4B', fullAddress: 'Penthouse 14, 720 Grand Avenue, NY', eta: '20-25 min', phone: '+1 (555) 019-2834' },
      { label: 'OFFICE', address: 'Tribeca Studio, 6th Fl', fullAddress: '144 Franklin Street, NY', eta: '15-20 min', phone: '+1 (555) 839-4412' },
      { label: 'VILLA', address: 'Hamptons Retreat', fullAddress: '28 Ocean Dune Way, Sagaponack', eta: '35-40 min', phone: '+1 (555) 291-7731' },
    ];
    const currentIdx = addresses.findIndex((a) => a.label === deliveryAddress.label);
    const nextAddr = addresses[(currentIdx + 1) % addresses.length];
    setDeliveryAddress(nextAddr);
    triggerToast(`Address switched to: ${nextAddr.label}`);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);

  // Map BottomNav tab
  const getNavTab = (): NavTab => {
    if (currentScreen === 'orders') return 'orders';
    if (currentScreen === 'cart') return 'cart';
    if (currentScreen === 'profile') return 'profile';
    return 'discover';
  };

  const handleNavTabChange = (tab: NavTab) => {
    if (tab === 'discover') setCurrentScreen('discover');
    if (tab === 'orders') setCurrentScreen('orders');
    if (tab === 'cart') setCurrentScreen('cart');
    if (tab === 'profile') setCurrentScreen('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#111413] text-[#e1e3e1] flex flex-col items-center selection:bg-[#a8c686] selection:text-[#111413]">
      {/* Top Interactive Screen Switcher Bar */}
      <ScreenSwitcherHeader
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
      />

      {/* Main Viewport Container (App container restricted to 390px-420px for high-fidelity mobile canvas) */}
      <div className="w-full max-w-[390px] min-h-screen relative flex flex-col shadow-2xl bg-[#0c0f0e] border-x border-white/5">
        {/* Ambient Top Lighting Aura */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[radial-gradient(circle_at_top,rgba(168,198,134,0.12),transparent_70%)] pointer-events-none z-0"></div>

        {/* Screen Switching Router */}
        <div className="relative z-10 w-full flex-1">
          {currentScreen === 'discover' && (
            <DiscoverScreen
              dishes={DISHES}
              onSelectDish={handleSelectDish}
              onOpenProfile={() => setCurrentScreen('profile')}
              onQuickAdd={handleQuickAdd}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {currentScreen === 'dish-detail' && (
            <DishDetailScreen
              dish={selectedDish}
              onBack={() => setCurrentScreen('discover')}
              onAddToCart={handleAddToCart}
              isFavorite={favorites.has(selectedDish.id)}
              onToggleFavorite={handleToggleFavorite}
              onGoToCart={() => setCurrentScreen('cart')}
            />
          )}

          {currentScreen === 'cart' && (
            <CartScreen
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onBack={() => setCurrentScreen('discover')}
              onProceedToCheckout={() => setCurrentScreen('checkout')}
              deliveryAddress={{
                label: deliveryAddress.label,
                address: deliveryAddress.address,
                eta: deliveryAddress.eta,
              }}
              onChangeAddress={handleChangeAddress}
            />
          )}

          {currentScreen === 'checkout' && (
            <CheckoutScreen
              onBack={() => setCurrentScreen('cart')}
              onPlaceOrder={handlePlaceOrder}
              subtotal={cartSubtotal}
              total={cartSubtotal > 0 ? cartSubtotal + 3.60 - 3.50 + 1.80 : 28.10}
              deliveryAddress={{
                label: deliveryAddress.label,
                address: deliveryAddress.fullAddress,
                phone: deliveryAddress.phone,
              }}
              onChangeAddress={handleChangeAddress}
            />
          )}

          {currentScreen === 'orders' && (
            <OrdersScreen
              activeDelivery={activeDelivery}
              pastOrders={pastOrders}
              onReorder={handleReorder}
              onAdvanceOrderStep={handleAdvanceOrderStep}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              onBackToDiscover={() => setCurrentScreen('discover')}
              favoritesCount={favorites.size}
            />
          )}
        </div>

        {/* Bottom Navigation Bar */}
        {/* Rendered on main screens: Discover, Orders, Cart, Profile */}
        {currentScreen !== 'dish-detail' && currentScreen !== 'checkout' && (
          <BottomNavBar
            activeTab={getNavTab()}
            onChangeTab={handleNavTabChange}
            cartCount={totalCartCount}
            hasActiveOrder={activeDelivery !== null}
          />
        )}

        {/* Global Floating Toast */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1d201f]/95 backdrop-blur-xl border border-[#c3e2a0]/40 text-[#e1e3e1] shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-[#c3e2a0] text-[18px]">check_circle</span>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
