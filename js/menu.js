/**
 * GRILLHOUSE - Menu Page
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'menu') return;
  Cart.init();
  initMenu();
});

function initMenu() {
  const categories = Storage.getCategories();
  const meals = Storage.getMeals();

  // Determine active category from URL
  const urlParams = new URLSearchParams(window.location.search);
  let activeCatId = urlParams.get('cat') || 'all';

  // Build sidebar filters
  const filterList = document.getElementById('filter-list');
  const allCount = meals.length;

  filterList.innerHTML = `
    <div class="filter-item ${activeCatId === 'all' ? 'active' : ''}" data-cat="all">
      All Items <span class="filter-count">${allCount}</span>
    </div>
    ${categories.map(cat => {
      const count = meals.filter(m => m.category === cat.id).length;
      return `
        <div class="filter-item ${activeCatId === cat.id ? 'active' : ''}" data-cat="${cat.id}">
          ${cat.name} <span class="filter-count">${count}</span>
        </div>
      `;
    }).join('')}
  `;

  // Filter click
  filterList.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', () => {
      filterList.querySelectorAll('.filter-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      activeCatId = item.dataset.cat;
      renderMeals(activeCatId, searchInput.value.trim());
    });
  });

  // Search
  const searchInput = document.getElementById('menu-search');
  searchInput.addEventListener('input', debounce(() => {
    renderMeals(activeCatId, searchInput.value.trim());
  }, 250));

  // Initial render
  renderMeals(activeCatId, '');

  function renderMeals(catId, query) {
    const grid = document.getElementById('meals-grid');
    const countEl = document.getElementById('meal-count');
    const q = query.toLowerCase();

    let filtered = meals.filter(m => {
      const matchCat = catId === 'all' || m.category === catId;
      const matchQ = !q || m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    countEl.textContent = `${filtered.length} item${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-meals" style="grid-column:1/-1">
          <svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>
          <h3>No meals found</h3>
          <p>Try a different category or search term.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(m => mealCardHTML(m)).join('');
    attachAddToCartEvents(grid);
  }
}
