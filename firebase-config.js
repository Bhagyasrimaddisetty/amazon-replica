// ─────────────────────────────────────────────
//  firebase-config.js
//  Replace the values below with YOUR Firebase
//  project credentials from the Firebase Console
//  https://console.firebase.google.com
// ─────────────────────────────────────────────

const firebaseConfig = {
  apiKey: "AIzaSyDY3Ov6EuW4L5b3OjcrpwKCZAWSobU_niY",
  authDomain: "replica-615fc.firebaseapp.com",
  databaseURL: "https://replica-615fc-default-rtdb.firebaseio.com",
  projectId: "replica-615fc",
  storageBucket: "replica-615fc.firebasestorage.app",
  messagingSenderId: "128466038011",
  appId: "1:128466038011:web:e71d12e55540da1ad7d45e",
  measurementId: "G-ZVMLV21CW5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.database();

// ── Auth state observer ─────────────────────
auth.onAuthStateChanged(user => {
  const signinLink  = document.getElementById('signinLink');
  const cartCountEl = document.getElementById('cartCount');

  if (user) {
    if (signinLink) {
      signinLink.querySelector('.nav-line1').textContent = 'Hello, ' + (user.displayName || user.email.split('@')[0]);
      signinLink.querySelector('.nav-line2').textContent = 'Account & Lists ▾';
    }
    // Sync cart count from DB
    db.ref('carts/' + user.uid).on('value', snap => {
      const cart = snap.val() || {};
      const total = Object.values(cart).reduce((s, i) => s + (i.qty || 1), 0);
      if (cartCountEl) cartCountEl.textContent = total;
    });
  } else {
    if (cartCountEl) {
      const local = JSON.parse(localStorage.getItem('guestCart') || '[]');
      cartCountEl.textContent = local.reduce((s, i) => s + i.qty, 0);
    }
  }
});
