/**
 * GRILLHOUSE - Cart Module
 */

const Cart = {
  items: [],

  init() {
    this.items = Storage.getCart();
    this.updateBadge();
  },

  add(mealId) {
    const meals = Storage.getMeals();
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return false;

    const existing = this.items.find(i => i.id === mealId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.image,
        qty: 1,
      });
    }
    this.save();
    this.updateBadge();
    return true;
  },

  remove(mealId) {
    this.items = this.items.filter(i => i.id !== mealId);
    this.save();
    this.updateBadge();
  },

  updateQty(mealId, delta) {
    const item = this.items.find(i => i.id === mealId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    this.save();
  },

  setQty(mealId, qty) {
    const item = this.items.find(i => i.id === mealId);
    if (!item) return;
    if (qty < 1) { this.remove(mealId); return; }
    item.qty = qty;
    this.save();
  },

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  clear() {
    this.items = [];
    Storage.clearCart();
    this.updateBadge();
  },

  save() {
    Storage.saveCart(this.items);
    this.updateBadge();
  },

  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
    document.querySelectorAll('.cart-count-text').forEach(el => {
      el.textContent = count;
    });
  },
};

window.Cart = Cart;
