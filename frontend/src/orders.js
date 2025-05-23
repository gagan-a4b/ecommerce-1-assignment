// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.getElementById('orders-list');
//   const orders = JSON.parse(localStorage.getItem('orders')) || [];

//   if (orders.length === 0) {
//     container.innerHTML = '<p>No orders placed yet.</p>';
//     return;
//   }

//   container.innerHTML = orders.map(order => `
//     <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
//       <h3>Order ID: ${order.id}</h3>
//       <p><strong>Placed At:</strong> ${order.placedAt}</p>
//       <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
//       <div style="display: flex; flex-wrap: wrap;">
//         ${order.items.map(p => `
//           <div style="margin: 10px;">
//             <img src="${p.imageURL}" alt="${p.name}" style="width: 80px;">
//             <p>${p.name}</p>
//             <p>$${p.price.toFixed(2)}</p>
//           </div>
//         `).join('')}
//       </div>
//     </div>
//   `).join('');
// });



document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('orders-list');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  if (!orders || orders.length === 0) {
    container.innerHTML = '<p>No orders placed yet.</p>';
    return;
  }

  container.innerHTML = orders.map(order => `
    <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
      <h3>Order ID: ${order.id}</h3>
      <p><strong>Placed At:</strong> ${order.placedAt}</p>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <div style="display: flex; flex-wrap: wrap;">
        ${order.items.map(p => `
          <div style="margin: 10px;">
            <img src="${p.imageURL}" alt="${p.name}" style="width: 80px;">
            <p>${p.name}</p>
            <p>$${p.price}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
});
