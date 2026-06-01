// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(PRODUCTS);
  initHeroSlider();
  initHeroDots();
  seedProductsToFirebase();
  updateCartBadge();
});

// ── HERO SLIDER ───────────────────────────────
let slideIndex = 0;
const slides = () => document.querySelectorAll('.hero-slide');

function initHeroSlider() {
  setInterval(() => changeSlide(1), 4000);
}

function initHeroDots() {
  const dotsEl = document.getElementById('heroDots');
  if (!dotsEl) return;
  slides().forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goToSlide(i);
    dotsEl.appendChild(d);
  });
}

function changeSlide(dir) {
  const all = slides();
  all[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + dir + all.length) % all.length;
  all[slideIndex].classList.add('active');
  updateDots();
}

function goToSlide(i) {
  slides()[slideIndex].classList.remove('active');
  slideIndex = i;
  slides()[slideIndex].classList.add('active');
  updateDots();
}

function updateDots() {
  document.querySelectorAll('.hero-dot').forEach((d, i) => {
    d.classList.toggle('active', i === slideIndex);
  });
}

// ── TOAST ─────────────────────────────────────
function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ── CART ──────────────────────────────────────
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const user = auth.currentUser;
  if (user) {
    // Signed-in: store in Firebase
    const ref = db.ref(`carts/${user.uid}/${productId}`);
    ref.once('value').then(snap => {
      const existing = snap.val();
      if (existing) {
        ref.update({ qty: existing.qty + 1 });
      } else {
        ref.set({ ...product, qty: 1 });
      }
      showToast(`✓ "${product.title.slice(0,30)}..." added to cart`);
    });
  } else {
    // Guest: localStorage
    let cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    const idx = cart.findIndex(i => i.id === productId);
    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem('guestCart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`✓ "${product.title.slice(0,30)}..." added to cart`);
  }
}

function updateCartBadge() {
  const el = document.getElementById('cartCount');
  if (!el) return;
  const user = auth.currentUser;
  if (!user) {
    const cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    el.textContent = cart.reduce((s, i) => s + i.qty, 0);
  }
}

// ── AUTH HELPERS ──────────────────────────────
function signOut() {
  auth.signOut().then(() => {
    localStorage.removeItem('guestCart');
    window.location.href = 'index.html';
  });
}

function togglePw(id, icon) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.type === 'password') { el.type = 'text'; icon.classList.replace('fa-eye','fa-eye-slash'); }
  else { el.type = 'password'; icon.classList.replace('fa-eye-slash','fa-eye'); }
}
