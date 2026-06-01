# 🛍️ ShopNow – Amazon Replica E-Commerce Platform

> A fully functional Amazon-inspired e-commerce web application built with HTML, CSS, JavaScript, and Firebase.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)

---

## 🚀 Live Demo

> **[View Live →](https://bhagyasrimaddisetty.github.io/amazon-replica)**  
> *(Deploy to GitHub Pages — see instructions below)*

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 Authentication | Email/Password + Google Sign-In via Firebase Auth |
| 🛒 Shopping Cart | Real-time cart sync with Firebase Realtime DB (signed-in users); localStorage for guests |
| 📦 Product Catalog | 16 products across 5 categories with search, filter & sort |
| 🔍 Search | Live keyword search with category filter |
| 🎨 Responsive UI | Mobile-first, works on all screen sizes |
| 🎠 Hero Slider | Auto-rotating banner with dot navigation |
| 💬 Toast Notifications | Real-time feedback on cart actions |
| 🌙 Category Filter | Click-to-filter by Electronics, Fashion, Home, Books, Sports |

---

## 📁 Project Structure

```
amazon-replica/
├── index.html          # Main homepage
├── login.html          # Sign-in page
├── register.html       # Registration page
├── cart.html           # Shopping cart page
├── css/
│   └── style.css       # All styles (responsive)
├── js/
│   ├── firebase-config.js   # Firebase init + auth observer
│   ├── products.js          # Product data + render + filter/sort/search
│   ├── main.js              # Hero slider, cart add, toast
│   ├── auth.js              # Login, register, Google sign-in
│   └── cart.js              # Cart page: render, qty, remove, checkout
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Bhagyasrimaddisetty/amazon-replica.git
cd amazon-replica
```

### 2. Create Firebase Project
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project** → name it `amazon-replica`
3. Enable **Authentication** → Sign-in methods → Enable **Email/Password** and **Google**
4. Enable **Realtime Database** → Start in **test mode**
5. Go to **Project Settings** → Your apps → Add Web App
6. Copy your config object

### 3. Add Your Firebase Config
Open `js/firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  databaseURL:       "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId:         "YOUR_PROJECT",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

### 4. Run Locally
Just open `index.html` in your browser — no build step needed!

---

## 🚢 Deploy to GitHub Pages

1. Push your code to GitHub (repo name: `amazon-replica`)
2. Go to repo → **Settings** → **Pages**
3. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`
4. Click **Save** → Your site will be live at:  
   `https://bhagyasrimaddisetty.github.io/amazon-replica`

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend/DB:** Firebase Realtime Database
- **Auth:** Firebase Authentication (Email + Google OAuth)
- **Icons:** Font Awesome 6
- **Hosting:** GitHub Pages

---

## 👩‍💻 Developer

**Maddisetty Bhagya Sri**  
B.Tech CSE (AI/ML) | Mohan Babu University  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bhagya-sri-maddisetty-064102305/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/Bhagyasrimaddisetty)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
