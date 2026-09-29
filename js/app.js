// Shared cart + helpers
let cart = JSON.parse(localStorage.getItem("myshop_cart") || "[]");

function saveCart() {
  localStorage.setItem("myshop_cart", JSON.stringify(cart));
  updateCartUI();
}
function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartTotal() {
  return cart.reduce((s, i) => {
    const p = PRODUCTS.find(p => p.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
}
function addToCart(id, qty = 1) {
  const found = cart.find(i => i.id === id);
  if (found) found.qty += qty; else cart.push({ id, qty });
  saveCart();
  const p = PRODUCTS.find(p => p.id === id);
  toast(`${p ? p.name : "Item"} added to cart`);
  openDrawer();
}
function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.innerHTML = `<i class="bi bi-check-circle-fill"></i><span></span>`;
  t.querySelector("span").textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}
function stars(r) {
  let s = "";
  for (let i = 1; i <= 5; i++) {
    s += i <= Math.round(r)
      ? `<i class="bi bi-star-fill"></i>`
      : `<i class="bi bi-star"></i>`;
  }
  return `<span class="stars">${s}&nbsp;${r}</span>`;
}
function productCard(p) {
  return `
  <div class="card">
    <div class="card-img">
      <a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
      ${p.badge ? `<span class="badge ${p.badge}">${p.badge}</span>` : ""}
    </div>
    <div class="card-body">
      <div class="card-cat">${p.category}</div>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      ${stars(p.rating)} <small style="color:#999">(${p.reviews})</small>
      <div class="price-row"><span class="price">${formatMMK(p.price)}</span>
      ${p.oldPrice ? `<span class="old">${formatMMK(p.oldPrice)}</span>` : ""}</div>
      <div class="card-btns">
        <button class="add-btn" onclick="addToCart(${p.id})"><i class="bi bi-cart-plus"></i>Add to Cart</button>
        <a class="view-btn" href="product.html?id=${p.id}" aria-label="View product"><i class="bi bi-eye"></i></a>
      </div>
    </div>
  </div>`;
}

// Drawer
function openDrawer() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("show");
  renderDrawer();
}
function closeDrawer() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("show");
}
function changeQty(id, d) {
  const it = cart.find(i => i.id === id);
  if (!it) return;
  it.qty += d;
  if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(); renderDrawer();
}
function removeItem(id) { cart = cart.filter(i => i.id !== id); saveCart(); renderDrawer(); }
function renderDrawer() {
  const box = document.getElementById("drawerItems");
  if (!box) return;
  if (!cart.length) {
    box.innerHTML = `<div class="drawer-empty"><i class="bi bi-cart-x"></i><p><b>Cart is empty</b><br>ခြင်းတောင်းဗလာ ဖြစ်နေပါတယ်</p></div>`;
  }
  else box.innerHTML = cart.map(i => {
    const p = PRODUCTS.find(p => p.id === i.id);
    if (!p) return "";
    return `<div class="cart-item">
      <img src="${p.img}" alt="">
      <div style="flex:1;min-width:0"><b style="font-size:14px">${p.name}</b>
        <div style="color:var(--primary);font-weight:700">${formatMMK(p.price)}</div>
        <div class="qty"><button onclick="changeQty(${p.id},-1)" aria-label="Decrease"><i class="bi bi-dash"></i></button><b>${i.qty}</b><button onclick="changeQty(${p.id},1)" aria-label="Increase"><i class="bi bi-plus"></i></button>
        <a href="#" class="remove-link" onclick="removeItem(${p.id});return false"><i class="bi bi-trash"></i>Remove</a></div>
      </div></div>`;
  }).join("");
  const t = document.getElementById("drawerTotal");
  if (t) t.textContent = formatMMK(cartTotal());
}
function updateCartUI() {
  document.querySelectorAll(".cart-count").forEach(e => e.textContent = cartCount());
  renderDrawer();
}
function toggleMenu() { document.getElementById("navLinks")?.classList.toggle("show"); }

// Mobile search toggle (header icon -> expandable row)
function toggleSearch() {
  const box = document.getElementById("mobileSearch");
  if (!box) return;
  box.classList.toggle("open");
  if (box.classList.contains("open")) box.querySelector("input")?.focus();
}
function mobileSearchGo() {
  const v = (document.querySelector("#mobileSearch input")?.value || "").trim();
  const shopInput = document.getElementById("searchInput");
  if (shopInput) {
    // Already on shop page -> filter in place
    shopInput.value = v;
    if (window._renderShop) window._renderShop();
    toggleSearch();
    shopInput.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    location.href = "shop.html?q=" + encodeURIComponent(v);
  }
}
// Desktop header search -> shop page
function desktopSearchGo(inputId) {
  const v = document.getElementById(inputId)?.value || "";
  location.href = "shop.html?q=" + encodeURIComponent(v);
}

// Init on every page
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  document.getElementById("overlay")?.addEventListener("click", closeDrawer);
  // live search on shop page
  const s = document.getElementById("searchInput");
  if (s) s.addEventListener("input", () => window._renderShop && window._renderShop());
  // mobile search: Enter key submits
  document.querySelector("#mobileSearch input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") mobileSearchGo();
  });
  // desktop search: Enter key submits
  document.querySelectorAll(".search-box input").forEach(inp => {
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") desktopSearchGo(inp.id);
    });
  });
});
