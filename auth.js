// ── AUTH FUNCTIONS ────────────────────────────

function showError(msg) {
  const el = document.getElementById('authError');
  if (el) el.textContent = msg;
}

function loginUser() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!email || !password) return showError('Please fill in all fields.');

  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = 'index.html')
    .catch(err => {
      const msgs = {
        'auth/user-not-found':  'No account found with this email.',
        'auth/wrong-password':  'Incorrect password. Try again.',
        'auth/invalid-email':   'Invalid email address.',
        'auth/too-many-requests': 'Too many attempts. Please try later.'
      };
      showError(msgs[err.code] || err.message);
    });
}

function registerUser() {
  const name     = document.getElementById('regName').value.trim();
  const email    = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm  = document.getElementById('regConfirm').value;

  if (!name || !email || !password || !confirm) return showError('Please fill in all fields.');
  if (password.length < 6) return showError('Password must be at least 6 characters.');
  if (password !== confirm) return showError('Passwords do not match.');

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return cred.user.updateProfile({ displayName: name }).then(() => {
        db.ref('users/' + cred.user.uid).set({
          name, email, createdAt: new Date().toISOString()
        });
        window.location.href = 'index.html';
      });
    })
    .catch(err => {
      const msgs = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email':        'Invalid email address.',
        'auth/weak-password':        'Password is too weak.'
      };
      showError(msgs[err.code] || err.message);
    });
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      db.ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastLogin: new Date().toISOString()
      });
      window.location.href = 'index.html';
    })
    .catch(err => showError(err.message));
}

function togglePw(id, icon) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.type === 'password') { el.type = 'text'; icon.classList.replace('fa-eye','fa-eye-slash'); }
  else { el.type = 'password'; icon.classList.replace('fa-eye-slash','fa-eye'); }
}

// Allow Enter key on login
document.addEventListener('DOMContentLoaded', () => {
  const pw = document.getElementById('loginPassword');
  if (pw) pw.addEventListener('keydown', e => { if (e.key === 'Enter') loginUser(); });
  const cp = document.getElementById('regConfirm');
  if (cp) cp.addEventListener('keydown', e => { if (e.key === 'Enter') registerUser(); });
});
