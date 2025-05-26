import { getToken, checkLoginStatus } from './auth.js';
import { fetchProducts } from './api.js';

const API_URL = "http://localhost:3000/api/cart";

document.addEventListener('DOMContentLoaded', async () => {
  if (!getToken()) {
    document.getElementById('cart-items').innerHTML = "<p>Please log in to view your cart.</p>";
    return;
  }

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const data = await res.json();

    if (!data.success || !data.data || data.data.productInfo.length === 0) {
      document.getElementById('cart-items').innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    const cartItems = data.data.productInfo;
    const allProducts = await fetchProducts();

    const enrichedItems = cartItems.map(item => {
      const product = allProducts.find(p => p.productId === item.productId);
      return {
        ...item,
        name: product?.name || "Unknown",
        image: product?.image || "",
        price: product?.price || 0
      };
    });

    renderCart(enrichedItems);
  } catch (err) {
    console.error('Error loading cart:', err);
    document.getElementById('cart-items').innerHTML = "<p>Error loading cart.</p>";
  }
});

function renderCart(items) {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';

  let total = 0;

  items.forEach(item => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100">
      <h4>${item.name}</h4>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: $${itemTotal.toFixed(2)}</p>
      <button class="remove" data-id="${item.productId}">Remove</button>
    `;
    container.appendChild(div);
  });

  document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;

  container.addEventListener('click', async (e) => {
    if (e.target.classList.contains('remove')) {
      const productId = e.target.dataset.id;
      await removeItem(productId);
      location.reload(); // Reload cart after removal
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  // loadCart();

  const continueShoppingBtn = document.getElementById('continue-shopping');
  const checkoutBtn = document.getElementById('checkout-button');

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }
});



async function removeItem(productId) {
  try {
    const res = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const data = await res.json();
    if (!data.success) {
      alert("Failed to remove item from cart");
    }
  } catch (err) {
    console.error('Remove error:', err);
    alert("Error removing item from cart");
  }
}
