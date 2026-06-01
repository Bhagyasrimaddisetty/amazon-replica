// ── PRODUCT DATA ─────────────────────────────
const PRODUCTS = [
  { id:1,  title:"boAt Rockerz 450 Bluetooth Headphones", category:"electronics", price:1299,  oldPrice:2990,  rating:4.2, reviews:12840, prime:true,  badge:"Best Seller",
    img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=180&fit=crop" },
  { id:2,  title:"Fire-Boltt Ninja Call Pro Plus Smartwatch", category:"electronics", price:1499, oldPrice:4999, rating:4.1, reviews:9210, prime:true, badge:"Deal",
    img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=180&fit=crop" },
  { id:3,  title:"Redmi 12 5G Smartphone (128GB, 6GB RAM)", category:"electronics", price:12999, oldPrice:17999, rating:4.3, reviews:21300, prime:true, badge:"",
    img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=180&fit=crop" },
  { id:4,  title:"HP Wireless Mouse – Silent Click, 1600 DPI", category:"electronics", price:499, oldPrice:999, rating:4.0, reviews:6720, prime:false, badge:"",
    img:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=180&fit=crop" },
  { id:5,  title:"Levi's Men's 511 Slim Fit Jeans", category:"fashion", price:1799, oldPrice:3499, rating:4.4, reviews:8900, prime:true, badge:"Best Seller",
    img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=180&fit=crop" },
  { id:6,  title:"Nike Air Max SC Men's Running Shoes", category:"fashion", price:3995, oldPrice:5995, rating:4.5, reviews:4320, prime:true, badge:"New",
    img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=180&fit=crop" },
  { id:7,  title:"Peter England Men's Formal Shirt", category:"fashion", price:699, oldPrice:1299, rating:4.1, reviews:3100, prime:false, badge:"Deal",
    img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=180&fit=crop" },
  { id:8,  title:"Prestige Iris 750W Mixer Grinder", category:"home", price:2299, oldPrice:3999, rating:4.3, reviews:15600, prime:true, badge:"Best Seller",
    img:"https://images.unsplash.com/photo-1585515320310-259814833e62?w=200&h=180&fit=crop" },
  { id:9,  title:"Milton Thermosteel Flask 1 Litre", category:"home", price:599, oldPrice:1199, rating:4.4, reviews:7850, prime:true, badge:"",
    img:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=180&fit=crop" },
  { id:10, title:"Pigeon Induction Cooktop 1800W", category:"home", price:1699, oldPrice:2999, rating:4.2, reviews:5430, prime:true, badge:"Deal",
    img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=180&fit=crop" },
  { id:11, title:"Atomic Habits – James Clear", category:"books", price:399, oldPrice:799, rating:4.7, reviews:34200, prime:true, badge:"Best Seller",
    img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=180&fit=crop" },
  { id:12, title:"Rich Dad Poor Dad – Robert Kiyosaki", category:"books", price:290, oldPrice:595, rating:4.6, reviews:28900, prime:true, badge:"",
    img:"https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=200&h=180&fit=crop" },
  { id:13, title:"Boldfit Resistance Bands Set (Pack of 5)", category:"sports", price:499, oldPrice:999, rating:4.3, reviews:11200, prime:true, badge:"Deal",
    img:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=180&fit=crop" },
  { id:14, title:"Nivia Storm Football (Size 5)", category:"sports", price:449, oldPrice:799, rating:4.2, reviews:6700, prime:false, badge:"",
    img:"https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=200&h=180&fit=crop" },
  { id:15, title:"Xiaomi Smart Band 8 – 16 Days Battery", category:"electronics", price:2999, oldPrice:4999, rating:4.4, reviews:18200, prime:true, badge:"New",
    img:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=180&fit=crop" },
  { id:16, title:"Samsung 980 500GB NVMe SSD", category:"electronics", price:3499, oldPrice:5499, rating:4.5, reviews:9800, prime:true, badge:"",
    img:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=180&fit=crop" },
];
 
// Push products to Firebase Realtime DB once (run once flag)
function seedProductsToFirebase() {
  const ref = db.ref('products');
  ref.once('value').then(snap => {
    if (!snap.exists()) {
      PRODUCTS.forEach(p => ref.child(p.id).set(p));
      console.log('Products seeded to Firebase.');
    }
  });
}
 
// ── RENDER ───────────────────────────────────
let currentProducts = [...PRODUCTS];
 
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  if (!list.length) { grid.innerHTML = '<p style="color:#888;grid-column:1/-1">No products found.</p>'; return; }
  grid.innerHTML = list.map(p => {
    const disc = Math.round((1 - p.price / p.oldPrice) * 100);
    const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(p.rating));
    return `
    <div class="product-card" onclick="quickView(${p.id})">
      <img class="product-img" src="${p.img}" alt="${p.title}" onerror="this.src='https://placehold.co/200x180/cccccc/333333?text=Product'"/>
      <div class="product-body">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-title">${p.title}</div>
        <div class="product-rating">${stars} <span>(${p.reviews.toLocaleString()})</span></div>
        <div class="product-price">
          <span class="price-new">${p.price.toLocaleString()}</span>
          <span class="price-old">${p.oldPrice.toLocaleString()}</span>
          <span class="discount-pct">${disc}% off</span>
        </div>
        ${p.prime ? '<div class="product-prime">Prime delivery</div>' : ''}
        <button class="add-cart-btn" onclick="event.stopPropagation();addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>`;
  }).join('');
}
 
function filterCategory(cat) {
  const title = document.getElementById('sectionTitle');
  if (cat === 'all') {
    currentProducts = [...PRODUCTS];
    if (title) title.textContent = 'All Products';
  } else {
    currentProducts = PRODUCTS.filter(p => p.category === cat);
    if (title) title.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
  }
  renderProducts(currentProducts);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
 
function searchProducts() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const cat = document.getElementById('searchCategory').value;
  let results = PRODUCTS;
  if (cat !== 'all') results = results.filter(p => p.category === cat);
  if (q) results = results.filter(p => p.title.toLowerCase().includes(q) || p.category.includes(q));
  currentProducts = results;
  document.getElementById('sectionTitle').textContent = q ? `Results for "${q}"` : 'All Products';
  renderProducts(currentProducts);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
 
document.addEventListener('DOMContentLoaded', () => {
  const si = document.getElementById('searchInput');
  if (si) si.addEventListener('keydown', e => { if (e.key === 'Enter') searchProducts(); });
});
 
function sortProducts() {
  const val = document.getElementById('sortSelect').value;
  const sorted = [...currentProducts];
  if (val === 'price-low')  sorted.sort((a,b) => a.price - b.price);
  if (val === 'price-high') sorted.sort((a,b) => b.price - a.price);
  if (val === 'rating')     sorted.sort((a,b) => b.rating - a.rating);
  renderProducts(sorted);
}
 
function quickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
}
 
