# MyShop.mm — E-commerce 🇲🇲

responsive e-commerce web app + custom theme & plugin code.

## ▶️ How to Run
1. Open `index.html` in browser (double-click)
2. Pages: `index.html` (Home) → `shop.html` (filter/search/sort) → `product.html?id=7` (detail) → `cart.html` → `checkout.html` (COD order + success)
3. Cart saves in `localStorage`, works offline. Fully responsive (mobile hamburger menu).

## 📁 Structure
```
index.html / shop.html / product.html / cart.html / checkout.html
css/style.css          → responsive design (flex/grid, media queries)
js/products.js         → product data (like WP REST API / WooCommerce)
js/app.js              → cart logic, drawer, search (like theme main.js)
wordpress-theme/myshop-mm/
  style.css            → theme header (name, version, text-domain)
  functions.php        → enqueue, theme-support, CPT, AJAX cart, shortcode
my-shop-plugin/
  my-shop-plugin.php   → order CPT, checkout shortcode, REST endpoint
```

