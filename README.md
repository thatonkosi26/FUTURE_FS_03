# GrillHouse — Premium Fast Food Web Application

![GrillHouse](assets/images/ChatGPT%20Image%20May%207,%202026,%2012_28_33%20PM.png)

> A fully functional, frontend-only fast food ordering web application built with plain HTML, CSS, and JavaScript. No frameworks. No build tools. Just open and run.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Functionality](#pages--functionality)
- [Admin Dashboard](#admin-dashboard)
- [Data & Storage](#data--storage)
- [Adding Your Burger Image](#adding-your-burger-image)
- [Deployment](#deployment)
- [Customisation](#customisation)
- [Credentials](#credentials)
- [Known Limitations](#known-limitations)
- [License](#license)

---

## Overview

GrillHouse is a premium fast food restaurant web app designed for the South African market. Customers can browse a menu, add items to a persistent cart, place delivery orders with Cash on Delivery (COD), and download printable receipts. Restaurant staff can manage the menu, categories, and orders through a protected admin dashboard — all without a backend or database.

All data is stored in the browser's `localStorage`, making this a fully self-contained, zero-dependency application that can be hosted on any static file host.

---

## Live Demo

After downloading and unzipping, simply open `index.html` in any modern browser — no server required.

For a live hosted version, see the [Deployment](#deployment) section.

---

## Features

### Customer Side

- **Home page** — hero section, stats band, category browser, bestsellers, promo banner, chef's picks, testimonials, and footer
- **Menu page** — filter by category, live search, meal cards with images, descriptions, and ZAR prices
- **Cart** — add / remove / update quantities, persistent across page refreshes via `localStorage`
- **Checkout** — delivery details form with SA phone number validation, Cash on Delivery payment
- **Order confirmation** — unique order ID, full order summary, printable receipt
- **Order history** — view all past orders with status badges and detail modal
- **Fully responsive** — mobile-first design, works on all screen sizes

### Admin Side

- **Login** — protected with hardcoded credentials (easily replaceable)
- **Overview** — revenue, total orders, menu item count, pending order count, recent orders table
- **Category management** — add, edit, delete categories with icon selection
- **Meal management** — add, edit, delete meals with name, price, description, image URL, category, and badge
- **Order management** — view all orders, update status (Pending → Preparing → Out for Delivery → Delivered), view full order detail modal

### General

- Smooth scroll-reveal animations on all sections
- Toast notifications for all user actions
- Amber/dark unified design across every page
- Scroll-to-top button
- No external JavaScript libraries or frameworks

---

## Tech Stack

| Layer   | Technology                                          |
| ------- | --------------------------------------------------- |
| Markup  | HTML5 (semantic)                                    |
| Styling | CSS3 (custom properties, grid, flexbox, animations) |
| Logic   | Vanilla JavaScript (ES6+)                           |
| Fonts   | Google Fonts — Bebas Neue, Nunito                   |
| Icons   | Inline SVG (no icon library dependency)             |
| Storage | Browser `localStorage`                              |
| Images  | Unsplash CDN (replaceable with local files)         |

---

## Project Structure

```
fast-food-website/
│
├── index.html            ← Homepage
├── menu.html             ← Full menu with filter & search
├── cart.html             ← Shopping cart
├── checkout.html         ← Delivery form & order placement
├── confirmation.html     ← Order confirmed + printable receipt
├── orders.html           ← Customer order history
├── admin.html            ← Admin dashboard (login + all panels)
│
├── css/
│   ├── styles.css        ← Unified theme for all customer pages
│   └── admin.css         ← Admin dashboard styles
│
├── js/
│   ├── storage.js        ← All localStorage operations + default data
│   ├── cart.js           ← Cart state management
│   ├── app.js            ← Home page rendering & navbar logic
│   ├── menu.js           ← Menu page filtering & search
│   ├── auth.js           ← Admin login / logout / guard
│   └── admin.js          ← Full admin CRUD logic
│
├── utils/
│   └── helpers.js        ← Shared utilities (formatPrice, generateOrderId, toast, etc.)
│
└── assets/
    └── images/
        └── burger-hero.png   ← Place your hero burger image here (see below)
```

---

## Getting Started

### Option 1 — Open directly in browser

```bash
# 1. Unzip the project
unzip grillhouse-website.zip

# 2. Open in your browser
open fast-food-website/index.html
# or on Windows: start fast-food-website/index.html
```

No installation, no npm, no build step required.

### Option 2 — Serve locally (recommended for development)

Using Python (comes pre-installed on most systems):

```bash
cd fast-food-website
python3 -m http.server 5500
# Open http://localhost:5500
```

Using Node.js:

```bash
npx serve fast-food-website
# or
npx live-server fast-food-website
```

Using VS Code — install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.

---

## Pages & Functionality

### `index.html` — Homepage

The main landing page. Sections rendered dynamically from `localStorage` data:

- **Hero** — tagline, headline, CTA buttons, delivery badge, and burger image with atmospheric glow
- **Stats band** — rating, customer count, delivery time, hours
- **Categories** — clickable cards linking to filtered menu view
- **Bestsellers** — meals with `badge: 'bestseller'` or `badge: 'hot'`
- **Promo banner** — Family Feast promotion
- **Chef's Picks (Featured)** — first 3 meals as large feature cards
- **Testimonials** — static reviews with star ratings
- **Footer** — links, contact info, social icons

### `menu.html` — Menu

- Sidebar with category filters + item counts
- Live search (debounced, 220ms)
- Responsive grid of meal cards
- Add to cart with animated button feedback
- URL parameter support: `menu.html?cat=cat-1` pre-selects a category

### `cart.html` — Cart

- Lists all cart items with image, name, unit price
- Quantity increment/decrement controls
- Per-item subtotal and order total
- Delivery fee (R35) calculated automatically
- Persistent via `localStorage` — survives page refresh
- "Clear All" with confirmation

### `checkout.html` — Checkout

- Full name, phone number (SA format validation), delivery address, optional notes
- COD payment panel — only payment method
- Live order summary panel
- Validation before order is placed — inline error messages
- On success: order saved to `localStorage`, cart cleared, redirect to confirmation

### `confirmation.html` — Order Confirmed

- Unique order ID (format: `GH-XXXXXXXX`)
- Full order detail breakdown
- Print receipt button — triggers browser print with a clean receipt layout
- Links to order history and menu

### `orders.html` — Order History

- All orders from `localStorage`, newest first
- Status badges with colour coding
- "View Details" opens a modal with full item breakdown
- "Receipt" links to the confirmation page for that order

---

## Admin Dashboard

Navigate to `admin.html` to access the admin panel.

### Login

| Field    | Value            |
| -------- | ---------------- |
| Username | `admin`          |
| Password | `grillhouse2024` |

Session is stored in `localStorage`. Closing the tab does not log you out — click **Logout** to end the session.

### Overview

- 4 stat cards: Revenue (delivered orders only), Total Orders, Menu Items, Pending Orders
- Recent Orders table with live status dropdowns

### Categories

- Add new categories with a name and icon style
- Edit existing categories inline
- Delete categories (counts shown for reference)
- Available icons: Burger, Chicken, Sides, Drink, Combo, Dessert, Pizza, Default

### Meals

- Search meals by name or description
- Filter by category
- Add meals: name, price (ZAR), description, image URL, category, optional badge
- Edit any existing meal
- Delete meals (with confirmation dialog)

### Orders

- Search by order ID or customer name
- Filter by status
- Update order status via inline dropdown — changes save instantly
- **View** button opens full order detail modal

---

## Data & Storage

All data lives in `localStorage` under these keys:

| Key             | Contents                   |
| --------------- | -------------------------- |
| `gh_categories` | Array of category objects  |
| `gh_menu`       | Array of meal objects      |
| `gh_cart`       | Array of cart item objects |
| `gh_orders`     | Array of order objects     |
| `gh_admin_auth` | Admin session object       |

### Default Data

If `localStorage` is empty (first visit or cleared), the app seeds itself with:

- **6 default categories** — Burgers, Chicken, Sides, Drinks, Combos, Desserts
- **14 default meals** — spread across all categories with images, descriptions, and prices in ZAR

To reset to defaults, open browser DevTools → Application → Local Storage → clear all `gh_*` keys and refresh.

### Order Object Structure

```json
{
  "id": "GH-AB12CD34",
  "createdAt": "2025-05-09T10:24:00.000Z",
  "status": "pending",
  "customer": {
    "name": "Sipho Dlamini",
    "phone": "082 000 0000",
    "address": "12 Main Street, Sandton, Johannesburg",
    "notes": "Gate code: 1234"
  },
  "items": [
    {
      "id": "meal-1",
      "name": "Smoky BBQ Burger",
      "price": 115,
      "qty": 2,
      "image": "..."
    }
  ],
  "subtotal": 230,
  "delivery": 35,
  "total": 265,
  "payment": "cod"
}
```

---

## Adding Your Burger Image

The hero section has a placeholder that loads a fallback Unsplash image until you add your own:

1. Prepare a **PNG file with a transparent background** of a burger
2. Place it in the `assets/images/` folder
3. Name it exactly: **`burger-hero.png`**
4. The `<img>` tag in `index.html` is already pointing to this path — no code changes needed

To use a different filename, find this line in `index.html` and update the `src`:

```html
<img src="assets/images/burger-hero.png" ... />
```

---

## Deployment

The site is a collection of static files — it can be hosted anywhere that serves HTML.

### Netlify (Recommended — drag and drop)

1. Go to [netlify.com](https://netlify.com) and sign up free
2. Click **Add new site → Deploy manually**
3. Drag and drop the entire `fast-food-website/` folder onto the page
4. Live in under 30 seconds at a URL like `https://grillhouse-abc123.netlify.app`
5. Optional: set a custom subdomain under **Site settings → Domain management**

### GitHub Pages

1. Create a free account at [github.com](https://github.com)
2. Create a new **public** repository
3. Upload all files maintaining the exact folder structure
4. Go to **Settings → Pages → Source → Deploy from branch → main / root**
5. Live at `https://yourusername.github.io/repo-name`

### Vercel

```bash
npm i -g vercel
cd fast-food-website
vercel
```

Follow the prompts — live in under a minute.

### Any Static Host

Upload the contents of `fast-food-website/` to:

- Amazon S3 (static website hosting)
- Cloudflare Pages
- Firebase Hosting
- Surge.sh (`npm i -g surge && surge fast-food-website/`)

---

## Customisation

### Change the restaurant name

Search and replace `GrillHouse` across all HTML files.

### Change prices

Edit meal prices in the Admin Dashboard → Meals, or directly in `js/storage.js` inside the `getDefaultMeals()` function.

### Change the delivery fee

Find `const DELIVERY = 35` in `cart.html` and `checkout.html` and update the value.

### Change admin credentials

Open `js/auth.js` and update:

```js
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "grillhouse2024",
};
```

### Change the colour scheme

All colours are defined as CSS custom properties at the top of both `css/styles.css` and `css/admin.css`:

```css
:root {
  --amber: #f5a623; /* Primary accent */
  --amber-d: #d98e1a; /* Darker amber hover */
  --red: #e8261a; /* Danger / remove */
  --bg: #111010; /* Page background */
  --bg3: #1d1a17; /* Card background */
}
```

### Add a new page

1. Copy the navbar and footer blocks from any existing page
2. Link `css/styles.css`, `utils/helpers.js`, `js/storage.js`, `js/cart.js`
3. Add your page link to the `nav-links` section and `mobile-drawer` in all other pages

---

## Credentials

| Role  | Username | Password         |
| ----- | -------- | ---------------- |
| Admin | `admin`  | `grillhouse2024` |

---

## Known Limitations

- **No backend** — all data is stored in the browser's `localStorage`. Data does not sync between devices or browsers.
- **No real payments** — only Cash on Delivery is supported. No card or EFT processing.
- **Admin credentials are hardcoded** — suitable for demo/prototype use. For production, replace with a real authentication system.
- **Images are hosted externally** — default meal images load from Unsplash CDN. For offline use, download and host images locally.
- **localStorage capacity** — browsers typically allow 5–10MB per origin. For high order volumes, old orders may need to be cleared periodically.
- **No real-time updates** — the admin dashboard does not automatically refresh when a customer places an order. Reload the page to see new orders.

---

## License

This project is released for personal and commercial use. Attribution appreciated but not required.

---

_Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no nonsense._
