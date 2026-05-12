/**
 * GRILLHOUSE - Helper Utilities
 */

/* ---- Format currency in ZAR ---- */
function formatPrice(amount) {
  return `R${Number(amount).toFixed(2)}`;
}

/* ---- Generate unique IDs ---- */
function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
}

/* ---- Generate Order ID ---- */
function generateOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'GH-';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

/* ---- Format Date ---- */
function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString('en-ZA', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

/* ---- Toast Notifications ---- */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`,
    error:   `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`,
    info:    `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
  };

  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-text">${message}</span>
    <button class="toast-close" onclick="removeToast(this.parentElement)">
      <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
    </button>
  `;
  container.appendChild(toast);
  setTimeout(() => removeToast(toast), 3500);
}

function removeToast(toast) {
  if (!toast || !toast.parentElement) return;
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toast-container';
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}

/* ---- Debounce ---- */
function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/* ---- Validate form fields ---- */
function validateField(input, rules = {}) {
  const value = input.value.trim();
  let error = '';

  if (rules.required && !value) error = 'This field is required.';
  else if (rules.minLength && value.length < rules.minLength) error = `Min ${rules.minLength} characters.`;
  else if (rules.phone && !/^0[6-8]\d{8}$/.test(value.replace(/\s/g, ''))) error = 'Enter a valid SA phone number.';
  else if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email address.';

  const group = input.closest('.form-group');
  if (group) {
    const errEl = group.querySelector('.field-error');
    if (errEl) errEl.textContent = error;
    input.classList.toggle('error', !!error);
  }
  return !error;
}

/* ---- Category SVG Icons ---- */
const CATEGORY_ICONS = {
  burger: `<svg viewBox="0 0 24 24"><path d="M4 15h16a1 1 0 010 2H4a1 1 0 010-2zm0-4h16a1 1 0 010 2H4a1 1 0 010-2zm8-9a8 8 0 018 8H4a8 8 0 018-8zm0 2A6 6 0 006.08 10h11.84A6 6 0 0012 4zM3 19h18v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1z"/></svg>`,
  chicken:`<svg viewBox="0 0 24 24"><path d="M21 7c0-2.21-1.79-4-4-4-1.08 0-2.06.43-2.78 1.13L7 10.27V13h2.73l7.14-7.22C17.37 6.33 18 7.13 18 8H21V7zM2 19l6.5-6.5 1.5 1.5L4 20H2v-1zm19 0v1h-2l-3-3 1.5-1.5L19 17v2zM5 12l1.5 1.5-3 3L2 15l3-3z"/></svg>`,
  sides:  `<svg viewBox="0 0 24 24"><path d="M18 3H6L3 9h18L18 3zM2 11v2h20v-2H2zm2 4v6h16v-6H4zm2 2h12v2H6v-2z"/></svg>`,
  drink:  `<svg viewBox="0 0 24 24"><path d="M3 2l2.01 18.09C5.1 21.17 5.97 22 7.06 22H16.94c1.08 0 1.95-.83 2.04-1.91L21 2H3zm14.8 2l-.54 4.86A3.99 3.99 0 0114 7H10a3.99 3.99 0 01-3.26-1.14L6.2 4H17.8zm.16 1.46L17.51 11H6.49L6.05 7.46A5.98 5.98 0 0010 9h4a5.98 5.98 0 003.96-1.54z"/></svg>`,
  combo:  `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>`,
  dessert:`<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 019 9c0 3.88-2.47 7.21-6 8.46V22H9v-1.54C5.47 19.21 3 15.88 3 12a9 9 0 019-9zm0 2a7 7 0 00-7 7c0 3.07 1.99 5.7 4.8 6.63L11 18.8V20h2v-1.2l1.2-.17C17.01 17.7 19 15.07 19 12a7 7 0 00-7-7zm0 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-3 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-3 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/></svg>`,
  pizza:  `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-9c0-1.66-1.34-3-3-3S9 9.34 9 11h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H9v2h1v1h2v-1c1.66 0 3-1.34 3-3z"/></svg>`,
  default:`<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>`,
};

function getCategoryIcon(iconKey) {
  return CATEGORY_ICONS[iconKey] || CATEGORY_ICONS.default;
}

/* ---- Status label helpers ---- */
function getStatusLabel(status) {
  const labels = {
    'pending': 'Pending',
    'preparing': 'Preparing',
    'out_for_delivery': 'Out for Delivery',
    'delivered': 'Delivered',
  };
  return labels[status] || status;
}

/* ---- Export ---- */
window.formatPrice = formatPrice;
window.generateId = generateId;
window.generateOrderId = generateOrderId;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.showToast = showToast;
window.removeToast = removeToast;
window.debounce = debounce;
window.validateField = validateField;
window.CATEGORY_ICONS = CATEGORY_ICONS;
window.getCategoryIcon = getCategoryIcon;
window.getStatusLabel = getStatusLabel;
