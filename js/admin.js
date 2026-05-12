/**
 * GRILLHOUSE — Admin Dashboard JS
 * Unified amber dark theme
 */

/* ============================================================
   ICON MAP (for category cards)
============================================================ */
const CAT_ICONS = {
  burger:  `<svg viewBox="0 0 24 24"><path d="M4 15h16a1 1 0 010 2H4a1 1 0 010-2zm0-4h16a1 1 0 010 2H4a1 1 0 010-2zm8-9a8 8 0 018 8H4a8 8 0 018-8zm0 2A6 6 0 006.08 10h11.84A6 6 0 0012 4zM3 19h18v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1z"/></svg>`,
  chicken: `<svg viewBox="0 0 24 24"><path d="M21 7c0-2.21-1.79-4-4-4-1.08 0-2.06.43-2.78 1.13L7 10.27V13h2.73l7.14-7.22C17.37 6.33 18 7.13 18 8H21V7zM2 19l6.5-6.5 1.5 1.5L4 20H2v-1zm19 0v1h-2l-3-3 1.5-1.5L19 17v2zM5 12l1.5 1.5-3 3L2 15l3-3z"/></svg>`,
  sides:   `<svg viewBox="0 0 24 24"><path d="M18 3H6L3 9h18L18 3zM2 11v2h20v-2H2zm2 4v6h16v-6H4zm2 2h12v2H6v-2z"/></svg>`,
  drink:   `<svg viewBox="0 0 24 24"><path d="M3 2l2.01 18.09C5.1 21.17 5.97 22 7.06 22H16.94c1.08 0 1.95-.83 2.04-1.91L21 2H3zm14.8 2l-.54 4.86A3.99 3.99 0 0114 7H10a3.99 3.99 0 01-3.26-1.14L6.2 4H17.8z"/></svg>`,
  combo:   `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>`,
  dessert: `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 019 9c0 3.88-2.47 7.21-6 8.46V22H9v-1.54C5.47 19.21 3 15.88 3 12a9 9 0 019-9zm0 2a7 7 0 00-7 7c0 3.07 1.99 5.7 4.8 6.63L11 18.8V20h2v-1.2l1.2-.17C17.01 17.7 19 15.07 19 12a7 7 0 00-7-7z"/></svg>`,
  pizza:   `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-9c0-1.66-1.34-3-3-3S9 9.34 9 11h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H9v2h1v1h2v-1c1.66 0 3-1.34 3-3z"/></svg>`,
  default: `<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>`,
};

const STATUS_LABELS = { pending:'Pending', preparing:'Preparing', out_for_delivery:'Out for Delivery', delivered:'Delivered' };
const STATUS_CLS    = { pending:'badge-pending', preparing:'badge-preparing', out_for_delivery:'badge-out_for_delivery', delivered:'badge-delivered' };
const BADGE_LABELS  = { bestseller:'Best Seller', new:'New', hot:'Hot' };

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Auth.guard();
  if (!Auth.isLoggedIn()) { initLogin(); return; }
  initDashboard();
});

/* ============================================================
   LOGIN
============================================================ */
function initLogin() {
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const u = document.getElementById('admin-username').value.trim();
    const p = document.getElementById('admin-password').value;
    const err = document.getElementById('login-error');
    if (Auth.login(u, p)) {
      window.location.reload();
    } else {
      err.textContent = 'Invalid credentials. Use admin / grillhouse2024';
      err.classList.add('show');
    }
  });
}

/* ============================================================
   DASHBOARD INIT
============================================================ */
function initDashboard() {
  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => Auth.logout());

  // Mobile sidebar
  const toggle  = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const close   = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); };
  toggle.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    overlay.classList.toggle('show', open);
  });
  overlay.addEventListener('click', close);

  // Navigation
  document.querySelectorAll('.sidebar-link[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.dataset.page);
      close();
    });
  });

  // Date in topbar
  document.getElementById('page-subtitle').textContent = new Date().toLocaleDateString('en-ZA', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  // Live filters
  let dt;
  document.getElementById('meal-search')?.addEventListener('input', () => { clearTimeout(dt); dt=setTimeout(renderMealsTable,220); });
  document.getElementById('meal-cat-filter')?.addEventListener('change', renderMealsTable);
  document.getElementById('order-search')?.addEventListener('input', () => { clearTimeout(dt); dt=setTimeout(renderOrdersTable,220); });
  document.getElementById('order-status-filter')?.addEventListener('change', renderOrdersTable);

  updatePendingBadge();
  setInterval(updatePendingBadge, 8000);

  navigateTo('overview');
}

function navigateTo(page) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`page-${page}`)?.classList.add('active');
  document.querySelector(`.sidebar-link[data-page="${page}"]`)?.classList.add('active');
  const titles = { overview:'Overview', categories:'Categories', meals:'Meals', orders:'Orders' };
  document.getElementById('page-title').textContent = titles[page] || page;
  if (page === 'overview')   renderOverview();
  if (page === 'categories') renderCategoriesPage();
  if (page === 'meals')      renderMealsTable();
  if (page === 'orders')     renderOrdersTable();
}

function updatePendingBadge() {
  const count  = Storage.getOrders().filter(o => o.status === 'pending').length;
  const badge  = document.getElementById('pending-badge');
  if (!badge) return;
  badge.textContent = count;
  badge.classList.toggle('show', count > 0);
}

/* ============================================================
   HELPERS
============================================================ */
function fmtDate(iso) {
  return new Date(iso).toLocaleString('en-ZA', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
}
function fmtPrice(n) { return `R${Number(n).toFixed(2)}`; }
function genId(prefix='id') { return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2,5).toUpperCase()}`; }

/* ============================================================
   OVERVIEW
============================================================ */
function renderOverview() {
  const orders = Storage.getOrders();
  const meals  = Storage.getMeals();
  const rev    = orders.filter(o=>o.status==='delivered').reduce((s,o)=>s+o.total,0);
  document.getElementById('stat-revenue').textContent = fmtPrice(rev);
  document.getElementById('stat-orders').textContent  = orders.length;
  document.getElementById('stat-meals').textContent   = meals.length;
  document.getElementById('stat-pending').textContent = orders.filter(o=>o.status==='pending').length;

  const tbody = document.getElementById('recent-orders-body');
  const recent = orders.slice(0, 6);
  tbody.innerHTML = recent.length
    ? recent.map(o => orderRow(o, false)).join('')
    : `<tr><td colspan="6"><div class="empty-state"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg><h4>No orders yet</h4><p>Orders will appear here once customers place them</p></div></td></tr>`;

  bindStatusSelects(tbody);
}

/* ============================================================
   CATEGORIES
============================================================ */
function renderCategoriesPage() {
  const cats  = Storage.getCategories();
  const meals = Storage.getMeals();
  const grid  = document.getElementById('cat-grid');

  grid.innerHTML = cats.length ? cats.map(cat => {
    const count = meals.filter(m => m.category === cat.id).length;
    return `
      <div class="cat-admin-card">
        <div class="cat-admin-icon">${CAT_ICONS[cat.icon]||CAT_ICONS.default}</div>
        <div class="cat-admin-info">
          <strong>${cat.name}</strong>
          <span>${count} meal${count!==1?'s':''}</span>
        </div>
        <div class="cat-admin-actions">
          <button class="btn btn-ghost btn-icon btn-sm" onclick="editCat('${cat.id}')" title="Edit">
            <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="btn btn-danger btn-icon btn-sm" onclick="deleteCat('${cat.id}')" title="Delete">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      </div>`;
  }).join('')
  : `<div class="empty-state" style="grid-column:1/-1"><svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg><h4>No categories yet</h4><p>Add your first category above</p></div>`;
}

function openCatModal(prefill=null) {
  const ov = document.getElementById('cat-modal-overlay');
  document.getElementById('cat-modal-title').textContent = prefill ? 'Edit Category' : 'Add Category';
  document.getElementById('cat-edit-id').value = prefill?.id || '';
  document.getElementById('cat-name').value    = prefill?.name || '';
  document.getElementById('cat-icon').value    = prefill?.icon || 'default';
  ov.classList.add('active');
}

function closeCatModal() { document.getElementById('cat-modal-overlay').classList.remove('active'); }

function editCat(id) {
  const cat = Storage.getCategories().find(c => c.id === id);
  if (cat) openCatModal(cat);
}

function deleteCat(id) {
  showConfirm('Delete Category?', 'This cannot be undone.', () => {
    Storage.saveCategories(Storage.getCategories().filter(c => c.id !== id));
    showToast('Category deleted', 'error');
    renderCategoriesPage();
  });
}

function saveCat() {
  const name  = document.getElementById('cat-name');
  const icon  = document.getElementById('cat-icon').value;
  const editId = document.getElementById('cat-edit-id').value;
  if (!name.value.trim()) { name.classList.add('error'); return; }
  name.classList.remove('error');

  const cats = Storage.getCategories();
  if (editId) {
    const idx = cats.findIndex(c => c.id === editId);
    if (idx !== -1) { cats[idx].name = name.value.trim(); cats[idx].icon = icon; }
    showToast('Category updated', 'success');
  } else {
    cats.push({ id:genId('cat'), name:name.value.trim(), icon, slug:name.value.trim().toLowerCase().replace(/\s+/g,'-') });
    showToast('Category added', 'success');
  }
  Storage.saveCategories(cats);
  closeCatModal();
  renderCategoriesPage();
}

/* ============================================================
   MEALS
============================================================ */
function renderMealsTable() {
  const meals   = Storage.getMeals();
  const cats    = Storage.getCategories();
  const search  = (document.getElementById('meal-search')?.value || '').toLowerCase();
  const catF    = document.getElementById('meal-cat-filter')?.value || 'all';
  const catMap  = Object.fromEntries(cats.map(c => [c.id, c.name]));

  // Populate cat filter
  const catSel = document.getElementById('meal-cat-filter');
  if (catSel) {
    catSel.innerHTML = `<option value="all">All Categories</option>` +
      cats.map(c => `<option value="${c.id}" ${catF===c.id?'selected':''}>${c.name}</option>`).join('');
  }

  let filtered = meals;
  if (catF !== 'all') filtered = filtered.filter(m => m.category === catF);
  if (search) filtered = filtered.filter(m => m.name.toLowerCase().includes(search) || m.description.toLowerCase().includes(search));

  const tbody = document.getElementById('meals-body');
  tbody.innerHTML = filtered.length ? filtered.map(m => `
    <tr>
      <td>
        <div class="meal-cell">
          <img src="${m.image}" alt="${m.name}" class="meal-thumb" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&q=60'">
          <div class="meal-cell-info">
            <strong>${m.name}</strong>
            <span>${m.description.substring(0,50)}…</span>
          </div>
        </div>
      </td>
      <td>${catMap[m.category]||'—'}</td>
      <td><span class="price-cell">${fmtPrice(m.price)}</span></td>
      <td>${m.badge ? `<span class="status-badge badge-meal">${BADGE_LABELS[m.badge]||m.badge}</span>` : '—'}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-ghost btn-icon btn-sm" onclick="editMeal('${m.id}')" title="Edit">
            <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="btn btn-danger btn-icon btn-sm" onclick="deleteMeal('${m.id}')" title="Delete">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      </td>
    </tr>`).join('')
  : `<tr><td colspan="5"><div class="empty-state"><svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg><h4>No meals found</h4><p>Adjust the filter or add a new meal</p></div></td></tr>`;
}

function openMealModal(prefill=null) {
  const cats = Storage.getCategories();
  document.getElementById('meal-modal-title').textContent = prefill ? 'Edit Meal' : 'Add Meal';
  document.getElementById('meal-edit-id').value   = prefill?.id || '';
  document.getElementById('meal-name').value      = prefill?.name || '';
  document.getElementById('meal-price').value     = prefill?.price || '';
  document.getElementById('meal-desc').value      = prefill?.description || '';
  document.getElementById('meal-image').value     = prefill?.image || '';
  document.getElementById('meal-badge').value     = prefill?.badge || '';
  document.getElementById('meal-category').innerHTML =
    `<option value="">Select Category</option>` +
    cats.map(c => `<option value="${c.id}" ${prefill?.category===c.id?'selected':''}>${c.name}</option>`).join('');
  document.getElementById('meal-modal-overlay').classList.add('active');
}

function closeMealModal() { document.getElementById('meal-modal-overlay').classList.remove('active'); }

function editMeal(id) {
  const m = Storage.getMeals().find(m => m.id === id);
  if (m) openMealModal(m);
}

function deleteMeal(id) {
  showConfirm('Delete Meal?', 'This meal will be removed from the menu.', () => {
    Storage.saveMeals(Storage.getMeals().filter(m => m.id !== id));
    showToast('Meal deleted', 'error');
    renderMealsTable();
  });
}

function saveMeal() {
  const fields = {
    name:     document.getElementById('meal-name'),
    price:    document.getElementById('meal-price'),
    desc:     document.getElementById('meal-desc'),
    image:    document.getElementById('meal-image'),
    category: document.getElementById('meal-category'),
  };
  let valid = true;
  Object.values(fields).forEach(f => { f.classList.toggle('error', !f.value.trim()); if (!f.value.trim()) valid=false; });
  const price = parseFloat(fields.price.value);
  if (isNaN(price)||price<=0) { fields.price.classList.add('error'); valid=false; }
  if (!valid) { showToast('Fill in all required fields', 'error'); return; }

  const meals  = Storage.getMeals();
  const editId = document.getElementById('meal-edit-id').value;
  const data   = { name:fields.name.value.trim(), price, description:fields.desc.value.trim(), image:fields.image.value.trim(), category:fields.category.value, badge:document.getElementById('meal-badge').value, available:true };

  if (editId) {
    const idx = meals.findIndex(m => m.id === editId);
    if (idx !== -1) meals[idx] = { ...meals[idx], ...data };
    showToast('Meal updated', 'success');
  } else {
    meals.push({ id:genId('meal'), ...data });
    showToast('Meal added', 'success');
  }
  Storage.saveMeals(meals);
  closeMealModal();
  renderMealsTable();
}

/* ============================================================
   ORDERS
============================================================ */
function renderOrdersTable() {
  const orders  = Storage.getOrders();
  const search  = (document.getElementById('order-search')?.value || '').toLowerCase();
  const statusF = document.getElementById('order-status-filter')?.value || 'all';

  let filtered = orders;
  if (statusF !== 'all') filtered = filtered.filter(o => o.status === statusF);
  if (search) filtered = filtered.filter(o => o.id.toLowerCase().includes(search) || o.customer.name.toLowerCase().includes(search));

  const tbody = document.getElementById('orders-body');
  tbody.innerHTML = filtered.length
    ? filtered.map(o => orderRow(o, true)).join('')
    : `<tr><td colspan="7"><div class="empty-state"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg><h4>No orders found</h4><p>Try a different filter or wait for customers to order</p></div></td></tr>`;

  bindStatusSelects(tbody);
}

function orderRow(o, showView=false) {
  const statuses = ['pending','preparing','out_for_delivery','delivered'];
  return `
    <tr>
      <td><span style="font-family:var(--font-d);letter-spacing:.05em;font-size:1rem">${o.id}</span></td>
      <td><strong style="font-size:.9rem">${o.customer.name}</strong><br><span style="font-size:.76rem;color:var(--muted)">${o.customer.phone}</span></td>
      <td style="font-size:.78rem;color:var(--muted)">${fmtDate(o.createdAt)}</td>
      <td>${o.items.length} item${o.items.length!==1?'s':''}</td>
      <td><span class="price-cell">${fmtPrice(o.total)}</span></td>
      <td>
        <select class="status-select" data-order-id="${o.id}">
          ${statuses.map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${STATUS_LABELS[s]}</option>`).join('')}
        </select>
      </td>
      ${showView?`<td><button class="btn btn-ghost btn-sm" onclick="openOrderModal('${o.id}')">View</button></td>`:''}
    </tr>`;
}

function bindStatusSelects(container) {
  container.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      Storage.updateOrderStatus(sel.dataset.orderId, sel.value);
      showToast('Status updated', 'success');
      updatePendingBadge();
    });
  });
}

function openOrderModal(orderId) {
  const o = Storage.getOrderById(orderId);
  if (!o) return;
  document.getElementById('order-modal-body').innerHTML = `
    <div class="order-info-grid">
      <div class="info-block"><label>Order ID</label><span style="font-family:var(--font-d)">${o.id}</span></div>
      <div class="info-block"><label>Status</label><span>${STATUS_LABELS[o.status]||o.status}</span></div>
      <div class="info-block"><label>Customer</label><span>${o.customer.name}</span></div>
      <div class="info-block"><label>Phone</label><span>${o.customer.phone}</span></div>
      <div class="info-block" style="grid-column:1/-1"><label>Address</label><span>${o.customer.address}</span></div>
      ${o.customer.notes?`<div class="info-block" style="grid-column:1/-1"><label>Notes</label><span>${o.customer.notes}</span></div>`:''}
    </div>
    <h4 style="font-family:var(--font-d);font-size:1.1rem;margin-bottom:12px">Items Ordered</h4>
    <div class="order-modal-items">
      ${o.items.map(item=>`
        <div class="order-modal-item">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100'">
          <div style="flex:1"><div class="item-name">${item.name}</div><div class="item-qty">x${item.qty} &times; ${fmtPrice(item.price)}</div></div>
          <div class="item-price">${fmtPrice(item.price*item.qty)}</div>
        </div>`).join('')}
    </div>
    <div style="border-top:1px solid var(--border);padding-top:14px">
      <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:.88rem;color:var(--muted)"><span>Subtotal</span><span>${fmtPrice(o.subtotal)}</span></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:.88rem;color:var(--muted)"><span>Delivery</span><span>${fmtPrice(o.delivery)}</span></div>
    </div>
    <div class="order-modal-total">
      <span class="label">Total</span>
      <span class="amount">${fmtPrice(o.total)}</span>
    </div>`;
  document.getElementById('order-modal-overlay').classList.add('active');
}

function closeOrderModal() { document.getElementById('order-modal-overlay').classList.remove('active'); }

/* ============================================================
   CONFIRM DIALOG
============================================================ */
let _confirmCb = null;
function showConfirm(title, msg, cb) {
  _confirmCb = cb;
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent   = msg;
  document.getElementById('confirm-overlay').classList.add('active');
}
function doConfirm()    { _confirmCb?.(); document.getElementById('confirm-overlay').classList.remove('active'); _confirmCb=null; }
function cancelConfirm(){ document.getElementById('confirm-overlay').classList.remove('active'); _confirmCb=null; }

/* ============================================================
   TOAST
============================================================ */
function showToast(msg, type='success') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div'); t.className=`toast ${type}`;
  const icons = {
    success:`<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    error:  `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`,
  };
  t.innerHTML=`<span class="t-icon">${icons[type]||icons.success}</span><span class="t-text">${msg}</span><button class="t-close" onclick="this.parentElement.remove()"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></button>`;
  c.appendChild(t);
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),300);},3000);
}

/* Expose globals needed by onclick handlers */
window.navigateTo    = navigateTo;
window.openCatModal  = openCatModal;
window.closeCatModal = closeCatModal;
window.editCat       = editCat;
window.deleteCat     = deleteCat;
window.saveCat       = saveCat;
window.openMealModal = openMealModal;
window.closeMealModal= closeMealModal;
window.editMeal      = editMeal;
window.deleteMeal    = deleteMeal;
window.saveMeal      = saveMeal;
window.openOrderModal  = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.doConfirm     = doConfirm;
window.cancelConfirm = cancelConfirm;
