import { getLoggedInUser, getToken } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('orders-list');
  const user = getLoggedInUser();

  if (!user) {
    alert('Please log in to view your orders.');
    window.location.href = '/login.html';
    return;
  }

  const res = await fetch(`http://localhost:3000/api/orders?page=1&limit=10`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  const result = await res.json();
  const orders = result.orders || [];


  if (!orders.length) {
    container.innerHTML = '<p>No orders placed yet.</p>';
    return;
  }

  container.innerHTML = orders.map(order => {
  const items = order.productInfo || order.items || []; // support both keys
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `
    <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
      <h3>Order ID: ${order.id}</h3>
      <p><strong>Placed At:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      <div style="display: flex; flex-wrap: wrap;">
        ${items.map(p => `
          <div style="margin: 10px;">
            <img src="${p.image}" alt="${p.name}" style="width: 80px;">
            <p>${p.name}</p>
            <p>$${p.price} x ${p.quantity}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}).join('');

});
