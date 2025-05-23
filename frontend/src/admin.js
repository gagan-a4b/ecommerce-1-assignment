import { saveProduct, getProducts, deleteProduct } from './api.js';
import { renderProductsAdmin } from './ui.js';

document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('product-name').value.trim();
  const price = parseFloat(document.getElementById('product-price').value);
  const imageURL = document.getElementById('product-image').value.trim();
  const description = document.getElementById('product-description').value.trim();
  await saveProduct({ name, price, imageURL, description });
  renderProductsAdmin();
});

document.addEventListener('DOMContentLoaded', renderProductsAdmin);
