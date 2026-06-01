// ── CART PAGE LOGIC ───────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
});

function loadCart() {
  const user = auth.currentUser;
  auth.onAuthStateChanged(u => {
    if (u) {
      db.ref('carts/' + u.uid).on('value', snap => {
        const data = snap.val() || {};
        const items = Object.values(data);
        renderCart(items, true, u.uid);
      });
    } else {
      const items = JSON.parse(localStorage.getItem('guestCart') || '[]');
      renderCart(items, false, null);
    }
  });
}

function renderCart(items, isLoggedIn, uid) {
  const container = document.getElementById('cartItems');
  const summary   = document.getElementById('cartSummary');
  const countEl   = document.getElementById('cartCount');

  if (!items.length) {
    container.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="index.html">Shop now</a></p>';
    if (summary) summary.style.display = 'none';
    if (countEl) countEl.textContent = '0';
    return;
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  if (countEl) countEl.textContent = totalQty;
  if (summary) summary.style.display = 'block';

  container.innerHTML = items.map(item => `
    <div class="cart-item" id="ci-${item.id}">
      <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/100?text=No+Image'"/>
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <div class="cart-item-price">${item.price.toLocaleString()}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id},-1,'${isLoggedIn}','${uid}')">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1,'${isLoggedIn}','${uid}')">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id},'${isLoggedIn}','${uid}')">Remove</button>
      </div>
      <div class="cart-item-total">${(item.price * item.qty).toLocaleString()}</div>
    </div>
  `).join('');

  document.getElementById('subtotal').textContent = '₹' + total.toLocaleString();
  document.getElementById('totalAmt').textContent = '₹' + total.toLocaleString();
}

function changeQty(id, delta, isLoggedIn, uid) {
  if (isLoggedIn === 'true' && uid !== 'null') {
    const ref = db.ref(`carts/${uid}/${id}`);
    ref.once('value').then(snap => {
      const item = snap.val();
      if (!item) return;
      const newQty = item.qty + delta;
      if (newQty <= 0) ref.remove();
      else ref.update({ qty: newQty });
    });
  } else {
    let cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    const idx = cart.findIndex(i => i.id === id);
    if (idx < 0) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    localStorage.setItem('guestCart', JSON.stringify(cart));
    renderCart(cart, false, null);
  }
}

function removeItem(id, isLoggedIn, uid) {
  if (isLoggedIn === 'true' && uid !== 'null') {
    db.ref(`carts/${uid}/${id}`).remove();
  } else {
    let cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('guestCart', JSON.stringify(cart));
    renderCart(cart, false, null);
  }
}

function checkout() {
  const user = auth.currentUser;
  if (!user) {
    showToast('Please sign in to checkout', 2500);
    setTimeout(() => window.location.href = 'login.html', 1500);
    return;
  }
  alert('✓ Order placed successfully! (Demo — no real payment)');
  db.ref('carts/' + user.uid).remove();
}

function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}
