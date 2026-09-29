const PRODUCTS = [
  { id: 1, name: "Premium Myanmar Longyi (Men)", name_mm: "ပုဆိုး", price: 35000, oldPrice: 45000, category: "fashion", rating: 4.8, reviews: 124, badge: "SALE", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", desc: "High-quality cotton longyi, comfortable for daily wear. Made in Myanmar." },
  { id: 2, name: "Shwe Thanaka Face Cream", name_mm: "သနပ်ခါး", price: 12000, oldPrice: null, category: "beauty", rating: 4.9, reviews: 230, badge: "BEST", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80", desc: "Pure natural thanaka cream for bright & cool skin. Chemical free." },
  { id: 3, name: "Shan Highland Coffee 500g", name_mm: "ရှမ်းကော်ဖီ", price: 28000, oldPrice: null, category: "food", rating: 4.7, reviews: 89, badge: "", img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80", desc: "Arabica beans from Shan State, medium roast, rich aroma." },
  { id: 4, name: "Wireless Bluetooth Headphones", name_mm: "နားကြပ်", price: 95000, oldPrice: 120000, category: "electronics", rating: 4.6, reviews: 312, badge: "SALE", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", desc: "40h battery, noise cancelling, deep bass. 1 year warranty." },
  { id: 5, name: "Running Sneakers - Red Edition", name_mm: "ဖိနပ်", price: 85000, oldPrice: null, category: "fashion", rating: 4.5, reviews: 156, badge: "NEW", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", desc: "Lightweight sport shoes, breathable, perfect for running & gym." },
  { id: 6, name: "Travel Backpack 35L", name_mm: "ကျောပိုးအိတ်", price: 55000, oldPrice: 68000, category: "fashion", rating: 4.7, reviews: 98, badge: "SALE", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", desc: "Water-resistant, laptop compartment, USB charging port." },
  { id: 7, name: "Smart Watch Series 8", name_mm: "စမတ်နာရီ", price: 180000, oldPrice: 220000, category: "electronics", rating: 4.8, reviews: 421, badge: "HOT", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", desc: "Heart-rate, SpO2, GPS, 10-day battery. Myanmar language support." },
  { id: 8, name: "Organic Green Tea (100 bags)", name_mm: "လက်ဖက်", price: 15000, oldPrice: null, category: "food", rating: 4.4, reviews: 67, badge: "", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80", desc: "Premium highland green tea, fresh & healthy." },
  { id: 9, name: "Handmade Ceramic Vase", name_mm: "ပန်းအိုး", price: 42000, oldPrice: null, category: "home", rating: 4.9, reviews: 45, badge: "NEW", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80", desc: "Handcrafted by Bagan artisans. Perfect home decoration." },
  { id: 10, name: "Classic Sunglasses", name_mm: "နေကာမျက်မှန်", price: 32000, oldPrice: 40000, category: "fashion", rating: 4.3, reviews: 78, badge: "SALE", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80", desc: "UV400 protection, polarized lens, stylish design." },
  { id: 11, name: "Cotton T-Shirt (Unisex)", name_mm: "တီရှပ်", price: 18000, oldPrice: null, category: "fashion", rating: 4.5, reviews: 190, badge: "", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", desc: "100% cotton, 5 colors available, S-XXL sizes." },
  { id: 12, name: "Wireless Keyboard + Mouse", name_mm: "ကီးဘုတ်", price: 65000, oldPrice: null, category: "electronics", rating: 4.6, reviews: 134, badge: "BEST", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80", desc: "Silent keys, 2.4G wireless, long battery life. For work & gaming." }
];

const CATEGORIES = [
  { slug: "all", label: "All / အားလုံး", icon: "bi-grid-fill" },
  { slug: "fashion", label: "Fashion", icon: "bi-bag-fill" },
  { slug: "electronics", label: "Electronics", icon: "bi-phone-fill" },
  { slug: "beauty", label: "Beauty", icon: "bi-gem" },
  { slug: "food", label: "Food", icon: "bi-cup-hot-fill" },
  { slug: "home", label: "Home", icon: "bi-house-fill" }
];

function formatMMK(n) {
  return n.toLocaleString("en-US") + " Ks";
}
