import {  deleteProducts, fetchProducts } from './api.js';

export async function loadProducts() {
  const container = document.getElementById('product-list');
  const products = await fetchProducts();
  console.log('Products loaded:', products);
  container.innerHTML = products.map(p => `
    
    <article class="product-card" style="
  width: 200px;
  height: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  background-color: #ffffff;
  padding: 10px;
  text-align: center;
  font-family: sans-serif;
">
  <img src="${p.image}" alt="${p.name}" class="product-card__image" style="
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 10px;
  ">
  <h2 class="product-card__title" style="
    font-size: 1.1rem;
    color: #333;
    margin: 0 0 5px;
    line-height: 1.3;
  ">${p.name}</h2>
  <p class="product-card__price" style="
    font-weight: bold;
    font-size: 1rem;
    color: #555;
    margin-bottom: 10px;
  ">$${p.price}</p>
  <button href="#" data-id="${p.productId}" class="product-card__button add-to-cart" style="
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 0.9rem;
    transition: background-color 0.3s;
  " onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007bff'">
    Add to Cart
  </button>
</article>

  `).join('');
}

 export async function renderProductsAdmin() {
  const container = document.getElementById('admin-product-list');
  const products = await fetchProducts();
  container.innerHTML = products.map(p => `
    <article class="product-card"
    style="
  width: 200px;
  height: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  background-color: #ffffff;
  padding: 10px;
  text-align: center;
  font-family: sans-serif;
">
<img src="${p.image}" alt="${p.name}" style="
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 10px;
  ">
      <h2 style="
    font-size: 1.1rem;
    color: #333;
    margin: 0 0 5px;
    line-height: 1.3;
  ">${p.name}</h2>
      <p style="
    font-weight: bold;
    font-size: 1rem;
    color: #555;
    margin-bottom: 10px;
  ">$${p.price}</p>
      
      <button data-id="${p.productId}" class="delete-btn">Delete</button>
      <button data-id="${p.productId}" class="edit-btn">Edit</button>
    </article>
  `).join('');
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteProducts(Number(btn.dataset.id));
      renderProductsAdmin();
    });
  });
}
