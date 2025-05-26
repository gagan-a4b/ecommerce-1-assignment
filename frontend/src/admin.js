import { createProduct, deleteProducts, updateProduct } from './api.js';
import { renderProductsAdmin } from './ui.js';

let currentEditId = null; // <-- This holds the ID being edited

// Handle form submission for adding a new product
document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('product-name').value.trim();
  const price = parseFloat(document.getElementById('product-price').value);
  const image = document.getElementById('product-image').value.trim();
  const description = document.getElementById('product-description').value.trim();

  try {
    await createProduct({ name, price, image, description });
    e.target.reset();
    renderProductsAdmin();
  } catch (error) {
    console.error("Error creating product:", error);
    alert("Failed to create product.");
  }
});


document.getElementById('update-product-form').style.display = 'none';

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    currentEditId = e.target.dataset.id; // Store edit ID in global variable
    document.getElementById('update-product-form').style.display = 'block';

    // Optionally, populate the form fields with current product data (if available in the DOM or via fetch)
    // Example if values are in the dataset:
    document.getElementById('update-product-name').value = e.target.dataset.name || '';
    document.getElementById('update-product-price').value = e.target.dataset.price || '';
    document.getElementById('update-product-image').value = e.target.dataset.imageurl || '';
    document.getElementById('update-product-description').value = e.target.dataset.description || '';
  }
});

document.getElementById('update-product-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!currentEditId) {
    alert('Product ID is required for update.');
    return;
  }

  const name = document.getElementById('update-product-name').value.trim();
  const price = parseFloat(document.getElementById('update-product-price').value);
  const image = document.getElementById('update-product-image').value.trim();
  const description = document.getElementById('update-product-description').value.trim();

  await updateProduct(currentEditId, { name, price, image, description });

  currentEditId = null;
  e.target.reset();
  renderProductsAdmin();
  window.location.reload(); // Reload to reset the form visibility
});

// Re-render products on page load
document.addEventListener('DOMContentLoaded', renderProductsAdmin);

// Delegate delete action
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProducts(id);
      renderProductsAdmin();
    }
  }
});
