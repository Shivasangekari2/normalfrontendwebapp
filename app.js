const products = [
  { id: 1, name: "Wireless Headphones", price: 59.99, category: "electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: 2, name: "Smart Watch",         price: 129.99, category: "electronics", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id: 3, name: "Bluetooth Speaker",   price: 39.99,  category: "electronics", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },
  { id: 4, name: "Men's T-Shirt",       price: 19.99,  category: "clothing",    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { id: 5, name: "Women's Jacket",      price: 89.99,  category: "clothing",    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80" },
  { id: 6, name: "Running Shoes",       price: 74.99,  category: "clothing",    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: 7, name: "Table Lamp",          price: 34.99,  category: "home",        img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
  { id: 8, name: "Ceramic Mug Set",     price: 24.99,  category: "home",        img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80" },
  { id: 9, name: "Throw Pillow",        price: 18.99,  category: "home",        img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80" },
];

let cart = [];
let currentFilter = "all";

// Render products
function renderProducts(filter = "all") {
  const grid = document.getElementById("product-grid");
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="product-info">
        <p class="category">${p.category}</p>
        <h3>${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

// Filter products
function filterProducts(category, btn) {
  currentFilter = category;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(category);
}

// Cart logic
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  openCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;

  const cartItems = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
      </div>
      <div class="cart-item-controls">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button class="remove-item" onclick="removeItem(${item.id})">🗑</button>
      </div>
    </div>
  `).join("");
}

// Cart sidebar toggle
function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
}

function openCart() {
  document.getElementById("cart-sidebar").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  alert(`✅ Order placed successfully!\nTotal: $${total.toFixed(2)}\nThank you for shopping at ShopEasy!`);
  cart = [];
  updateCart();
  toggleCart();
}

// Contact form
function handleContact(e) {
  e.preventDefault();
  alert("✅ Message sent! We'll get back to you soon.");
  e.target.reset();
}

// Init
renderProducts();
