export interface PortionOption {
  id: string;
  label: string;
  extraPrice: number;
}

export interface AddonOption {
  id: string;
  label: string;
  desc: string;
  price: number;
}

export interface Dish {
  id: string;
  name: string;
  bistro: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  prepTime: string;
  calories: string;
  image: string;
  category: string;
  isSignature?: boolean;
  provenanceBadge?: string;
  portionOptions: PortionOption[];
  intensities: string[];
  addons: AddonOption[];
  chefNote?: string;
}

export interface CartItem {
  cartItemId: string;
  dishId: string;
  dish: Dish;
  portionId: string;
  portionLabel: string;
  portionExtraPrice: number;
  intensity: string;
  selectedAddons: AddonOption[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderItemSummary {
  name: string;
  customization?: string;
  quantity: number;
  price: number;
}

export interface ActiveDelivery {
  orderId: string;
  orderNumber: string;
  orderedAt: string;
  estimatedDeliveryTime: string;
  etaMinutes: number;
  currentStepIndex: number; // 0: confirmed, 1: preparing, 2: en route, 3: delivered
  steps: {
    title: string;
    time: string;
    detail: string;
  }[];
  courier: {
    name: string;
    verified: boolean;
    vehicle: string;
    phone: string;
    avatar: string;
    rating: number;
  };
  deliveryAddress: {
    label: string;
    address: string;
    phone: string;
  };
  dropOffInstruction: string;
  paymentMethod: string;
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
}

export interface PastOrder {
  id: string;
  restaurantName: string;
  dateStr: string;
  itemCount: number;
  totalAmount: number;
  status: 'DELIVERED' | 'CANCELLED';
  image: string;
  itemsPreview: string;
}

export const DISHES: Dish[] = [
  {
    id: 'truffle-wagyu-brioche',
    name: 'Truffle Wagyu Brioche',
    bistro: 'Maison Gusto • Haute Bistro',
    description: 'Double prime wagyu patty, black truffle aioli, aged Gruyère, caramelized shallot jam, warm toasted brioche.',
    price: 16.50,
    rating: 4.9,
    reviewsCount: 380,
    prepTime: '15–20 min',
    calories: '680 kcal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9y67piKPYi9vWSXoWQiGCvsvD5PDqesnNmiOZo-2iRsYK9ARGewFGYsTmvvUesR9-9TFH09d5TLHAmpL8m0ExBoaBAz0wWtLDuEHhE-t4rLNk4nL2EllQaZshzqTmACbDdPWhCLp38lIx_0n1zeRT4UoiaPe7YN6KMzF56ABcruGatqEsHubybeqRGAmPCEWGxV6IDPruxmpeteqR7ZgV_7TJajx2IdqbpaRyjpt-H-K60pFQQosi',
    category: 'Gourmet Burgers',
    isSignature: true,
    provenanceBadge: 'Artisan Reserve',
    chefNote: 'Prepared medium rare with house-infused Périgord black truffle emulsion. Delivered in thermally sealed ventilated packaging.',
    portionOptions: [
      { id: 'single', label: 'Single', extraPrice: 0 },
      { id: 'double', label: 'Double', extraPrice: 4.00 },
      { id: 'triple', label: 'Triple', extraPrice: 7.50 },
    ],
    intensities: ['Mild', 'Signature', 'Intense'],
    addons: [
      { id: 'gruyere', label: 'Extra Aged Gruyère', desc: 'Melted artisan alpine cheese', price: 1.80 },
      { id: 'bacon', label: 'Applewood Smoked Bacon', desc: 'Crispy thick-cut cured strips', price: 2.20 },
      { id: 'truffle-fries', label: 'Hand-Cut Truffle Fries', desc: 'Parmesan tossed with herb aioli', price: 4.50 },
    ],
  },
  {
    id: 'smoked-wagyu-brioche',
    name: 'Smoked Wagyu Brioche',
    bistro: 'Maison Gusto • Haute Bistro',
    description: 'Caramelized balsamic onions, aged cave-ripened cheddar, delicate rosemary smoke on warm artisan brioche.',
    price: 24.00,
    rating: 4.9,
    reviewsCount: 420,
    prepTime: '20–30 min',
    calories: '720 kcal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaGpac84naR2aPDtu_0mjMAlb8wrEd7Wiz9HIzdssHcVPDYyOT9rRWmOCLfMRDL3UNDRIX3BBnARcr7V0QNXuul4YIoesAe_AcfSaufGwtJrlOKpc_A0Wf8jI2RahsO1EX-y9i7gAiVeZeZpoPlBmIV8YxXTcHsOKklaV6Z0HF2IIFgBbJbr8VM50grGTLxKnB93zURA8mOw9g04jcQvcKVeAKyVdqkyZLA6GmjL0_f3oClu9pyTDN',
    category: 'Gourmet Burgers',
    isSignature: true,
    provenanceBadge: 'Master Selection',
    chefNote: 'Cold-smoked over French applewood chips prior to final searing. Served with signature balsamic onion reduction.',
    portionOptions: [
      { id: 'single', label: 'Single Wagyu', extraPrice: 0 },
      { id: 'double', label: 'Double Reserve', extraPrice: 6.00 },
    ],
    intensities: ['Light Smoke', 'Signature Smoke', 'Deep Ember'],
    addons: [
      { id: 'gruyere', label: 'Cave-Aged Cheddar', desc: '24-month aged English cheddar', price: 2.00 },
      { id: 'truffle-butter', label: 'Foie Gras Glaze', desc: 'Pan-seared torchon glaze', price: 5.50 },
    ],
  },
  {
    id: 'truffle-smash',
    name: 'Truffle Smash',
    bistro: 'L’Atelier du Burger',
    description: 'Double smashed USDA Prime, melted Gruyère, black Périgord shavings, glossy butter potato bun.',
    price: 14.50,
    rating: 4.8,
    reviewsCount: 295,
    prepTime: '15 min',
    calories: '610 kcal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4oVESxGCbuu8675QqaJytSa1ktmbf4H0OduN7w34x6qxa8uIXzcGFtvyvgOrgz39CkcLPVOPHbzjaGv2WV6MC_-EtiCUYQBaJus67u3OG9UHFuasK9I3xrscfsclqC0d4sxWpdeMc9VDfL7EE3CGfA_61QTWogGUfsDL_M9bgaXPbeAWIZ4d7poNDwATnuOOwN-SNaina7ZWThdFPIjw2WvOje5bM2RrY1WLSoU8VHMC0clCnoLlL',
    category: 'Gourmet Burgers',
    portionOptions: [
      { id: 'double-smash', label: 'Double Smash', extraPrice: 0 },
      { id: 'triple-smash', label: 'Triple Smash', extraPrice: 3.50 },
    ],
    intensities: ['Classic Aioli', 'Truffle Aioli', 'Extra Truffle Aioli'],
    addons: [
      { id: 'parm-crisp', label: 'Parmesan Crisp Disk', desc: 'Toasted reggiano lace', price: 1.50 },
      { id: 'pickled-shallots', label: 'Balsamic Shallots', desc: 'Sweet tangy pickled onion', price: 1.20 },
    ],
  },
  {
    id: 'woodfired-pizza',
    name: 'Woodfired Pizza',
    bistro: 'Trattoria Bella Napoli',
    description: 'Blistered 72hr fermented crust, fresh buffalo mozzarella pearls, San Marzano DOP reduction, torn wild basil.',
    price: 16.00,
    rating: 4.9,
    reviewsCount: 512,
    prepTime: '15–25 min',
    calories: '820 kcal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHN_ft53ESDGAeVaO-eTA5nyHSyLSAEu3emVh-77rm5SCf_bkp1KhpKhRBcT49KjyHaR-FDc2DzuAhz6rLSP62sTGCT0s8KRdQ_iy1mxNcm32mfWF1mS0iV8qkkogAbvlPoG60UsSRwsLwl-zmCgKpLH6KCJwfFGfdbJm5GfbWUS7aiQvHrflRSerCdEFYhHxguA_fLDXZjIbFkBXcuGbKzjT7-9Ng0b2g6mi7ahtkFmHnDrqVQ9El',
    category: 'Artisan Pizza',
    portionOptions: [
      { id: 'personal', label: '11" Personal', extraPrice: 0 },
      { id: 'sharing', label: '14" Sharing', extraPrice: 5.00 },
    ],
    intensities: ['San Marzano Classic', 'Spicy Calabrian Infused'],
    addons: [
      { id: 'burrata-crown', label: 'Whole Creamy Burrata', desc: 'Center molten burrata ball', price: 4.00 },
      { id: 'prosciutto', label: 'San Daniele Prosciutto 24mo', desc: 'Paper-thin cured ribbons', price: 3.50 },
    ],
  },
  {
    id: 'salmon-teriyaki',
    name: 'Salmon Teriyaki Don',
    bistro: 'Kyoto Omakase Bar',
    description: 'Glazed King salmon fillet, seasoned Koshihikari rice, sliced Hass avocado, edamame, toasted nori sesame.',
    price: 18.20,
    rating: 4.7,
    reviewsCount: 184,
    prepTime: '20 min',
    calories: '540 kcal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqL3sBVG1xkDXTEPSVrB2n2CpjwjcXZ9b1p9xtu9EZAahpDmIOKHeJF2zEHeC36wgVUJUpsc0nW7uouN0XUqLOpfSMhzV3JGnfs4ekEg27IcZyI70RjUXSO0yfNnvvNg2UFkZCVVqfB7aiWVc3rT0c-5jOFMpjOj3gNS1kQSE1tuK2W7wInhlvDdRNwk_4AHaJ6XdLGQlLbhlNNoGj_2lAYINNzyYU99JbWWuqNJkEkJbhnqcpBcwj',
    category: 'Asian Bowls',
    portionOptions: [
      { id: 'standard', label: 'Standard Bowl', extraPrice: 0 },
      { id: 'double-protein', label: 'Double Salmon Portion', extraPrice: 6.50 },
    ],
    intensities: ['Traditional Tare', 'Spicy Togarashi Tare'],
    addons: [
      { id: 'onsen-egg', label: '63°C Onsen Egg', desc: 'Slow-poached silken yolk', price: 1.80 },
      { id: 'ikura', label: 'Hokkaido Salmon Roe', desc: 'Briny popping pearls', price: 4.50 },
    ],
  },
  {
    id: 'chocolate-fondant',
    name: 'Chocolate Fondant',
    bistro: 'Pâtisserie Noir',
    description: 'Valrhona molten center lava cake, Madagascar vanilla bean gelato, dusted 24k gold leaf flakes.',
    price: 8.50,
    rating: 5.0,
    reviewsCount: 310,
    prepTime: '12 min',
    calories: '420 kcal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdV4yQTE8fmasbo-0tRMq0RRrM2-a_X9ApyCWuxx4CYg-LAN_-Yuu-tYKztHWE07TiVNvDs-88srmrrKTlKuNchKUvUrPnqlvK3wAuh9mboorwkgksPG9Y6YGO2vB1Pc1tsVSXU70Ltk6fcSR8qY6lmHVr9Sr6L4XtoK83Uqk_-1ILk-kv3mr9lHsbQatk6WTs7_ldULsTjP1cLXtMkg7oFdYco8-iT8jJTTn38UnKSpG18Wm4z9AY',
    category: 'Desserts',
    portionOptions: [
      { id: 'single', label: 'Single Dome', extraPrice: 0 },
      { id: 'duo', label: 'Duo Sharing', extraPrice: 6.00 },
    ],
    intensities: ['70% Dark Guanaja', '85% Extra Bittersweet'],
    addons: [
      { id: 'extra-gelato', label: 'Extra Vanilla Bean Gelato', desc: 'House-churned cream', price: 2.50 },
      { id: 'raspberry-coulis', label: 'Wild Berry Coulis', desc: 'Tart fresh raspberry reduction', price: 1.50 },
    ],
  },
  {
    id: 'truffle-parmesan-crisps',
    name: 'Truffle Parmesan Crisps',
    bistro: 'Maison Gusto • Haute Bistro',
    description: 'Herb dusted with roasted garlic dip and micro-planed 36-month aged Reggiano.',
    price: 6.80,
    rating: 4.9,
    reviewsCount: 160,
    prepTime: '10 min',
    calories: '310 kcal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbypkp0NBU8OxHzeOnGP9KvQFM3-6DRSVPsjA2__FLkKZ5tS4wGe7iaen8gsB_PJ6xmt8ojAr0dzd_z-D7AiOfRYN-3tMja1sAxEWxUqEI8GAFuZrHrBT7KCGY2XyI2U0G9ec8Q7KwZgNRifakRB5pESOtvCeqmH9SZ-pFKEvdNWmcJCdwGbBs0MwJB5tGuNPqn8ZcPo_pn5HxAR63-agug97Lb9o8hSoUvip14d3KjJdG9Si5r5hu',
    category: 'Gourmet Burgers',
    portionOptions: [
      { id: 'standard', label: 'Artisan Bowl', extraPrice: 0 },
      { id: 'truffle-mountain', label: 'Grand Reserve Bowl', extraPrice: 3.50 },
    ],
    intensities: ['Classic Aioli', 'Truffle Garlic Dip'],
    addons: [
      { id: 'black-truffle-dip', label: 'Extra Truffle Aioli', desc: 'Double Périgord emulsion', price: 2.00 },
    ],
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    cartItemId: 'item-1',
    dishId: 'truffle-wagyu-brioche',
    dish: DISHES[0],
    portionId: 'double',
    portionLabel: 'Double Wagyu',
    portionExtraPrice: 4.00,
    intensity: 'Signature',
    selectedAddons: [],
    quantity: 1,
    unitPrice: 20.50,
    totalPrice: 20.50,
  },
  {
    cartItemId: 'item-2',
    dishId: 'truffle-parmesan-crisps',
    dish: DISHES[6],
    portionId: 'standard',
    portionLabel: 'Artisan Bowl',
    portionExtraPrice: 0,
    intensity: 'Truffle Garlic Dip',
    selectedAddons: [],
    quantity: 1,
    unitPrice: 6.80,
    totalPrice: 6.80,
  },
];

export const INITIAL_ACTIVE_DELIVERY: ActiveDelivery = {
  orderId: 'TAS-9482',
  orderNumber: 'ORDER #TAS-9482',
  orderedAt: '20:12',
  estimatedDeliveryTime: '20:45',
  etaMinutes: 18,
  currentStepIndex: 2, // Courier On the Way
  steps: [
    {
      title: 'Order Confirmed',
      time: '20:12',
      detail: 'Kitchen accepted receipt',
    },
    {
      title: 'Preparing in Kitchen',
      time: '20:25',
      detail: 'Finishing artisan brioche & crisps',
    },
    {
      title: 'Courier On the Way',
      time: 'EN ROUTE',
      detail: 'Traversing Boulevard Saint-Germain',
    },
    {
      title: 'Delivered',
      time: '',
      detail: 'Discreet hand-off at private residence',
    },
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
    label: 'RESIDENCE',
    address: 'Penthouse 14, 720 Grand Avenue, NY',
    phone: '+1 (555) 019-2834',
  },
  dropOffInstruction: 'Leave at door',
  paymentMethod: 'TASTATAS VIP Card (•••• 4829)',
  items: [
    { name: 'Truffle Wagyu Brioche', customization: 'Double Wagyu, Signature Aioli', quantity: 1, price: 20.50 },
    { name: 'Truffle Parmesan Crisps', customization: 'Herb dusted with roasted garlic dip', quantity: 1, price: 6.80 },
  ],
  subtotal: 27.30,
  deliveryFee: 2.50,
  discount: 3.50,
  tax: 1.80,
  total: 28.10,
};

export const PAST_ORDERS: PastOrder[] = [
  {
    id: 'ord-101',
    restaurantName: 'Atelier Bistrot',
    dateStr: 'Yesterday',
    itemCount: 2,
    totalAmount: 32.40,
    status: 'DELIVERED',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=80',
    itemsPreview: 'Pan-Roasted Duck Breast, Duck Fat Truffle Pommes',
  },
  {
    id: 'ord-102',
    restaurantName: 'Kyoto Omakase',
    dateStr: 'Oct 28',
    itemCount: 3,
    totalAmount: 54.00,
    status: 'DELIVERED',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150&auto=format&fit=crop&q=80',
    itemsPreview: 'Toro Nigiri Duo, Salmon Teriyaki Don, Miso Soup',
  },
  {
    id: 'ord-103',
    restaurantName: 'Pâtisserie Noir',
    dateStr: 'Oct 19',
    itemCount: 2,
    totalAmount: 22.00,
    status: 'DELIVERED',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=80',
    itemsPreview: 'Dark Chocolate Fondant, Raspberry Tartlet',
  },
];
