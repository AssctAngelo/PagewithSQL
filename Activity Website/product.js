const products = [
  { name: 'Adobe Package 1', price: 10.99, image: 'package 1.jpg' },
  { name: 'Adobe Package 2', price: 12.99, image: 'package 2.jpg' },
  { name: 'Adobe Package 3', price: 18.99, image: 'package 3.jpg' },
  { name: 'Adobe Package 4', price: 24.99, image: 'package 4.jpg' },
  { name: 'Adobe Package 5', price: 14.99, image: 'package 5.jpg' },
];

const productContainer = document.getElementById('product-container');
const cartSymbol = document.getElementById('cart-symbol');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartModalTotal = document.getElementById('cart-modal-total');
const notificationElement = document.getElementById('notification');

function addToCart(productName, quantity) {
  updateCartUI(productName, quantity, getProductPrice(productName));
  showNotification(`${quantity} ${productName}(s) added to cart!`);
  updateCartSymbol(); 
}

function removeFromCart(button, productName, quantity, itemPrice) {
  const cartItem = button.parentNode;
  cartItems.removeChild(cartItem);

  const totalPrice = parseFloat(cartTotal.textContent) - itemPrice;
  cartTotal.textContent = totalPrice.toFixed(2);

  updateCartSymbol(); 
}


function buyNow(productName, quantity) {
  updateCartUI(productName, quantity, getProductPrice(productName));
  showNotification(`Proceeding to checkout with ${quantity} ${productName}(s)!`);
}

function showNotification(message) {
  notificationElement.textContent = message;
  notificationElement.style.display = 'block';

  setTimeout(() => {
    notificationElement.style.display = 'none';
  }, 3000);
}



function updateQuantity(inputElement) {
  const quantity = parseInt(inputElement.value);
  const card = inputElement.closest('.card');
  const productName = card.querySelector('h1').innerText;

  const addToCartBtn = card.querySelector('.addToCartBtn');
  const buyNowBtn = card.querySelector('.buyNowBtn');

  addToCartBtn.onclick = function() {
    addToCart(productName, quantity);
  };

  buyNowBtn.onclick = function() {
    buyNow(productName, quantity);
  };
}


function updateCartUI(productName, quantity, itemPrice) {
  const cartItem = document.createElement('li');
  const totalPriceForItem = itemPrice * quantity;

  cartItem.innerHTML = `
    <span>${quantity} ${productName}(s) - $${totalPriceForItem.toFixed(2)}</span>
    <button onclick="removeFromCart(this, '${productName}', ${quantity}, ${itemPrice})">Remove</button>
  `;
  cartItems.appendChild(cartItem);

  const totalPrice = parseFloat(cartTotal.textContent) + totalPriceForItem;
  cartTotal.textContent = totalPrice.toFixed(2);

  const modalTotalPrice = parseFloat(cartModalTotal.textContent) + totalPriceForItem;
  cartModalTotal.textContent = modalTotalPrice.toFixed(2);

  updateCartSymbol();
}

function removeFromCart(button, productName, quantity, itemPrice) {
  const cartItem = button.parentNode;
  cartItems.removeChild(cartItem);

  const totalPrice = parseFloat(cartTotal.textContent) - itemPrice;
  cartTotal.textContent = totalPrice.toFixed(2);

  updateCartSymbol();
}

function updateCartSymbol() {
  const totalItems = cartItems.children.length;
  cartSymbol.textContent = '🛒'; 
}


function showCart() {
  cartModal.style.display = 'block';
}

function hideCart() {
  cartModal.style.display = 'none';
}

function checkout() {
  alert("Redirecting to checkout...");
}

function getProductPrice(productName) {
  const product = products.find(product => product.name === productName);
  return product ? product.price : 0;
}

productContainer.innerHTML = '';


products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'card col-md-4';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="img-fluid mb-3">
    <h1>${product.name}</h1>
    <p class="price">$${product.price.toFixed(2)}</p>
    <label for="${product.name}-quantity">Quantity:</label>
    <input type="number" id="${product.name}-quantity" name="${product.name}-quantity" min="1" value="1" oninput="updateQuantity(this)">
    <button class="btn btn-dark addToCartBtn" onclick="addToCart('${product.name}', 1)">Add to Cart</button>
    <button class="btn btn-primary buyNowBtn" onclick="buyNow('${product.name}', 1)">Buy Now</button>
  `;

  productContainer.appendChild(card);
});

cartSymbol.addEventListener('click', showCart);
