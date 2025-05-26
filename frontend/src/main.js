import { checkLoginStatus, getToken } from './auth.js';
import { fetchProducts } from './api.js';

const API_URL = "http://localhost:3000/api/cart";

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  initializePagination();
});

async function initializePagination() {
  const products = await fetchProducts();
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  let currentPage = 1;

  const productList = document.getElementById('product-list');
  const paginationContainer = document.getElementById('pagination');

  function renderProducts(page) {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const productsToShow = products.slice(start, end);

    productList.innerHTML = productsToShow.map(p => `
      <div class="product-card" style="border: 1px solid #ccc; padding: 10px; margin: 10px; border-radius: 8px; display: inline-block; height: 300px; width: 200px;">
        <img src="${p.image}" alt="${p.name}" style="width: 150px; height: 150px;">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button class="add-to-cart" data-id="${p.productId}" data-price="${p.price}">Add to Cart</button>
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

  // Add to Cart Handler
  productList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    if (!getToken()) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const productId = parseInt(e.target.dataset.id);
    const price = parseFloat(e.target.dataset.price);
    const quantity = 1;

    if (isNaN(productId)) {
      console.error("Invalid product ID");
      alert("Could not add this item to the cart.");
      return;
    }

    try {
      await addToCart(productId, quantity, price);
    } catch (err) {
      console.error(err);
    }
  }
});
}

async function addToCart(productId, quantity, price) {
  try {
    const res = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ productId, quantity, price })
    });

    const data = await res.json();
    if (data.success) {
      alert("Product added to cart!");
    } else {
      alert(data.message || "Failed to add to cart");
    }
  } catch (error) {
    console.error('Failed to add to cart:', error);
    alert("Error adding to cart.");
  }
}

