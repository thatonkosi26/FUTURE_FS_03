/**
 * GRILLHOUSE - Main App
 * Handles navbar, hero, categories, featured, testimonials
 */

document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  initNavbar();
  initScrollTop();

  // Page-specific init
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
});

/* ---- Navbar ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Set active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ---- Scroll to Top ---- */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Home Page ---- */
function initHome() {
  renderHomeCategories();
  renderBestSellers();
  renderFeatured();
  initScrollReveal();
}

/* ---- Home Categories ---- */
function renderHomeCategories() {
  const grid = document.getElementById('home-categories');
  if (!grid) return;
  const categories = Storage.getCategories();
  const meals = Storage.getMeals();

  grid.innerHTML = categories.map(cat => {
    const count = meals.filter(m => m.category === cat.id).length;
    return `
      <div class="category-card" onclick="window.location.href='menu.html?cat=${cat.id}'">
        <div class="category-icon">${getCategoryIcon(cat.icon)}</div>
        <h4>${cat.name}</h4>
        <span>${count} item${count !== 1 ? 's' : ''}</span>
      </div>
    `;
  }).join('');
}

/* ---- Best Sellers ---- */
function renderBestSellers() {
  const grid = document.getElementById('bestsellers-grid');
  if (!grid) return;
  const meals = Storage.getMeals().filter(m => m.badge === 'bestseller' || m.badge === 'hot').slice(0, 4);
  grid.innerHTML = meals.map(m => mealCardHTML(m)).join('');
  attachAddToCartEvents(grid);
}

/* ---- Featured ---- */
function renderFeatured() {
  const container = document.getElementById('featured-container');
  if (!container) return;
  const meals = Storage.getMeals();
  const featured = meals.slice(0, 3);
  if (featured.length < 1) return;

  container.innerHTML = `
    <div class="featured-card large" onclick="addToCartFromFeatured('${featured[0].id}')">
      <img src="${featured[0].image}" alt="${featured[0].name}" loading="lazy">
      <div class="featured-card-overlay"></div>
      <div class="featured-card-body">
        <span class="tag">${featured[0].badge || 'Featured'}</span>
        <h3>${featured[0].name}</h3>
        <p>${featured[0].description}</p>
        <div class="featured-price">${formatPrice(featured[0].price)}</div>
      </div>
    </div>
    <div>
      ${featured.slice(1).map(m => `
        <div class="featured-card" style="margin-bottom:24px" onclick="addToCartFromFeatured('${m.id}')">
          <img src="${m.image}" alt="${m.name}" loading="lazy">
          <div class="featured-card-overlay"></div>
          <div class="featured-card-body">
            <span class="tag">${m.badge || 'Featured'}</span>
            <h3>${m.name}</h3>
            <p>${m.description}</p>
            <div class="featured-price">${formatPrice(m.price)}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function addToCartFromFeatured(mealId) {
  if (Cart.add(mealId)) {
    showToast('Added to cart!', 'success');
  }
}

/* ---- Meal Card HTML ---- */
function mealCardHTML(meal) {
  const badgeMap = { bestseller: 'Best Seller', hot: 'Hot', new: 'New' };
  const badgeClass = { bestseller: '', hot: 'badge-hot', new: 'badge-new' };
  return `
    <div class="meal-card fade-in">
      <div class="meal-img-wrap">
        <img src="${meal.image}" alt="${meal.name}" loading="lazy">
        ${meal.badge ? `<span class="meal-badge ${badgeClass[meal.badge] || ''}">${badgeMap[meal.badge] || meal.badge}</span>` : ''}
      </div>
      <div class="meal-body">
        <h3 class="meal-name">${meal.name}</h3>
        <p class="meal-desc">${meal.description}</p>
        <div class="meal-footer">
          <div class="meal-price">${formatPrice(meal.price)}</div>
          <button class="add-to-cart-btn" data-meal-id="${meal.id}" aria-label="Add ${meal.name} to cart">
            <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ---- Attach add-to-cart events ---- */
function attachAddToCartEvents(container) {
  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mealId = btn.dataset.mealId;
      if (Cart.add(mealId)) {
        showToast('Added to cart!', 'success');
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = '', 300);
      }
    });
  });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

window.mealCardHTML = mealCardHTML;
window.attachAddToCartEvents = attachAddToCartEvents;
