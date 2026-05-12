/**
 * GRILLHOUSE - Storage Utility
 * Handles all localStorage operations
 */

const KEYS = {
  MENU:       'gh_menu',
  CATEGORIES: 'gh_categories',
  CART:       'gh_cart',
  ORDERS:     'gh_orders',
  ADMIN_AUTH: 'gh_admin_auth',
};

const Storage = {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  },
  remove(key) { localStorage.removeItem(key); },

  /* ---- Categories ---- */
  getCategories() {
    return this.get(KEYS.CATEGORIES) || getDefaultCategories();
  },
  saveCategories(cats) { this.set(KEYS.CATEGORIES, cats); },

  /* ---- Menu ---- */
  getMeals() {
    return this.get(KEYS.MENU) || getDefaultMeals();
  },
  saveMeals(meals) { this.set(KEYS.MENU, meals); },

  /* ---- Cart ---- */
  getCart() { return this.get(KEYS.CART) || []; },
  saveCart(cart) { this.set(KEYS.CART, cart); },
  clearCart() { this.set(KEYS.CART, []); },

  /* ---- Orders ---- */
  getOrders() { return this.get(KEYS.ORDERS) || []; },
  saveOrders(orders) { this.set(KEYS.ORDERS, orders); },
  addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);
  },
  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      orders[idx].status = status;
      this.saveOrders(orders);
      return true;
    }
    return false;
  },
  getOrderById(orderId) {
    return this.getOrders().find(o => o.id === orderId) || null;
  },

  /* ---- Admin Auth ---- */
  isAdminLoggedIn() { return !!this.get(KEYS.ADMIN_AUTH); },
  setAdminLogin(val) { this.set(KEYS.ADMIN_AUTH, val); },
  adminLogout() { this.remove(KEYS.ADMIN_AUTH); },
};

/* ---- Default Data ---- */
function getDefaultCategories() {
  return [
    { id: 'cat-1', name: 'Burgers',     icon: 'burger',  slug: 'burgers' },
    { id: 'cat-2', name: 'Chicken',     icon: 'chicken', slug: 'chicken' },
    { id: 'cat-3', name: 'Sides',       icon: 'sides',   slug: 'sides' },
    { id: 'cat-4', name: 'Drinks',      icon: 'drink',   slug: 'drinks' },
    { id: 'cat-5', name: 'Combos',      icon: 'combo',   slug: 'combos' },
    { id: 'cat-6', name: 'Desserts',    icon: 'dessert', slug: 'desserts' },
  ];
}

function getDefaultMeals() {
  return [
    {
      id: 'meal-1',
      name: 'Smoky BBQ Burger',
      category: 'cat-1',
      price: 115,
      description: 'Juicy flame-grilled beef patty, smoky BBQ sauce, crispy bacon, cheddar cheese & caramelised onions.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
      badge: 'bestseller',
      available: true,
    },
    {
      id: 'meal-2',
      name: 'Double Stack Smash',
      category: 'cat-1',
      price: 135,
      description: 'Two smash-style patties, American cheese, pickles, mustard, ketchup on a brioche bun.',
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
      badge: 'hot',
      available: true,
    },
    {
      id: 'meal-3',
      name: 'Mushroom Swiss Burger',
      category: 'cat-1',
      price: 125,
      description: 'Sautéed mushrooms, Swiss cheese, garlic aioli, fresh lettuce & tomato.',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80',
      badge: '',
      available: true,
    },
    {
      id: 'meal-4',
      name: 'Crispy Chicken Burger',
      category: 'cat-2',
      price: 105,
      description: 'Southern-style fried chicken breast, coleslaw, pickles & signature sauce on a sesame bun.',
      image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=600&q=80',
      badge: 'new',
      available: true,
    },
    {
      id: 'meal-5',
      name: 'Spicy Chicken Strips',
      category: 'cat-2',
      price: 95,
      description: '5-piece hand-breaded chicken strips with a fiery cajun coating. Served with dipping sauce.',
      image: 'https://images.unsplash.com/photo-1619894991209-9f9694be045a?w=600&q=80',
      badge: 'hot',
      available: true,
    },
    {
      id: 'meal-6',
      name: 'Peri-Peri Chicken',
      category: 'cat-2',
      price: 145,
      description: 'Half flame-grilled chicken marinated in our house peri-peri sauce. Served with chips & roll.',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&q=80',
      badge: 'bestseller',
      available: true,
    },
    {
      id: 'meal-7',
      name: 'Loaded Cheese Fries',
      category: 'cat-3',
      price: 75,
      description: 'Crispy golden fries smothered in nacho cheese sauce, jalapeños, sour cream & spring onion.',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
      badge: '',
      available: true,
    },
    {
      id: 'meal-8',
      name: 'Onion Rings',
      category: 'cat-3',
      price: 55,
      description: 'Golden beer-battered onion rings, perfectly crispy. Served with chipotle mayo.',
      image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
      badge: '',
      available: true,
    },
    {
      id: 'meal-9',
      name: 'Classic Milkshake',
      category: 'cat-4',
      price: 65,
      description: 'Thick & creamy hand-spun milkshake. Available in Vanilla, Chocolate or Strawberry.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
      badge: '',
      available: true,
    },
    {
      id: 'meal-10',
      name: 'Ice Cold Craft Cola',
      category: 'cat-4',
      price: 35,
      description: 'Locally brewed craft cola served over ice with a wedge of lemon. 330ml.',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80',
      badge: '',
      available: true,
    },
    {
      id: 'meal-11',
      name: 'The Ultimate Combo',
      category: 'cat-5',
      price: 185,
      description: 'Smoky BBQ Burger + Loaded Fries + Craft Cola. Best value for the hungry one.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
      badge: 'bestseller',
      available: true,
    },
    {
      id: 'meal-12',
      name: 'Family Feast',
      category: 'cat-5',
      price: 420,
      description: '4 burgers of choice + 2 large fries + 4 drinks. Feeds the whole crew.',
      image: 'https://images.unsplash.com/photo-1601004890657-03634a4e6457?w=600&q=80',
      badge: 'hot',
      available: true,
    },
    {
      id: 'meal-13',
      name: 'Churros with Chocolate',
      category: 'cat-6',
      price: 60,
      description: '5 cinnamon-sugar churros served warm with a rich Belgian chocolate dipping sauce.',
      image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898c?w=600&q=80',
      badge: 'new',
      available: true,
    },
    {
      id: 'meal-14',
      name: 'Soft Serve Sundae',
      category: 'cat-6',
      price: 50,
      description: 'Velvety soft serve topped with caramel or chocolate sauce, crushed nuts & a wafer.',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
      badge: '',
      available: true,
    },
  ];
}

/* Export for use in other files */
window.Storage = Storage;
window.STORAGE_KEYS = KEYS;
