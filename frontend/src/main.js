import { checkLoginStatus } from './auth.js';
import { getProducts } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  initializePagination();
});

function initializePagination() {
  const products = getProducts();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  let currentPage = 1;

  const productList = document.getElementById('product-list');
  const paginationContainer = document.getElementById('pagination');

  function renderProducts(page) {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const productsToShow = products.slice(start, end);

    productList.innerHTML = productsToShow.map(p => `
      <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; border-radius: 8px;">
        <img src="${p.imageURL}" alt="${p.name}" style="width: 150px; height: 150px;">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    `).join('');
  }

  function renderPagination() {
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = (i === currentPage) ? 'active' : '';
      btn.addEventListener('click', () => {
        currentPage = i;
        renderProducts(currentPage);
        renderPagination();
      });
      paginationContainer.appendChild(btn);
    }
  }

  renderProducts(currentPage);
  renderPagination();

  // Event delegation for "Add to Cart"
  productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === productId);
      if (product) {
        addToCart(product);
      }
    }
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    alert(`${product.name} is already in the cart.`);
    return;
  }

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
