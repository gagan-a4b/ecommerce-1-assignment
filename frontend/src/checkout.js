import { getLoggedInUser, getToken } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const itemsContainer = document.getElementById('checkout-items');
  const totalAmount = document.getElementById('total-amount');
  const payBtn = document.getElementById('pay-btn');

  const user = getLoggedInUser();
  const token = getToken();

  if (!user || !token) {
    alert('Please log in to checkout.');
    window.location.href = '/login.html';
    return;
  }

  try {
    // 1. Fetch cart
    const res = await fetch('http://localhost:3000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const cartResponse = await res.json();
    // console.log("Cart data:", cartResponse);

    const productInfo = cartResponse?.data?.productInfo || [];

    if (productInfo.length === 0) {
      itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      payBtn.style.display = 'none';
      return;
    }

    // 2. Fetch product details for each item
    const productDetails = await Promise.all(productInfo.map(async (item) => {
      const productRes = await fetch(`http://localhost:3000/api/products/${item.productId}`);
      const productData = await productRes.json();
      return {
        ...productData,
        quantity: item.quantity
      };
    }));

    // 3. Render items
    let total = 0;
    itemsContainer.innerHTML = productDetails.map(p => {
      total += p.price * p.quantity;
      return `
        <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
          <img src="${p.image}" alt="${p.name}" style="width: 100px;">
          <h3>${p.name}</h3>
          <p>$${p.price} x ${p.quantity}</p>
        </div>
      `;
    }).join('');
    totalAmount.textContent = `Total: $${total.toFixed(2)}`;

    // 4. Handle payment
    payBtn.addEventListener('click', async () => {
      const response = await fetch('http://localhost:3000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Payment successful! Order placed.');
        window.location.href = './orders.html';
      } else {
        const error = await response.json();
        alert('Failed to place order: ' + error.message);
      }
    });

  } catch (err) {
    console.error('Checkout error:', err);
    itemsContainer.innerHTML = '<p>Something went wrong loading the cart.</p>';
  }
});
