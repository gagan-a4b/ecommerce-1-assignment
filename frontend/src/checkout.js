// document.addEventListener('DOMContentLoaded', () => {
//   const itemsContainer = document.getElementById('checkout-items');
//   const totalAmount = document.getElementById('total-amount');
//   const payBtn = document.getElementById('pay-btn');

//   let cart = JSON.parse(localStorage.getItem('orders')) || [];

//   if (cart.length === 0) {
//     itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
//     payBtn.style.display = 'none';
//     return;
//   }

//   let total = 0;
//   itemsContainer.innerHTML = cart.map(p => {
//     total += p.price;
//     return `
//       <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
//         <img src="${p.imageURL}" alt="${p.name}" style="width: 100px;">
//         <h3>${p.name}</h3>
//         <p>$${p.price}</p>
//       </div>
//     `;
//   }).join('');

//   totalAmount.textContent = `Total: $${total.toFixed(2)}`;

//   payBtn.addEventListener('click', () => {
//     // Save to 'orders' in localStorage
//     const orders = JSON.parse(localStorage.getItem('orders')) || [];
//     const order = {
//       id: Date.now(),
//       items: cart,
//       total,
//       placedAt: new Date().toLocaleString()
//     };
//     orders.push(order);
//     localStorage.setItem('orders', JSON.stringify(orders));

//     // Clear cart
//     localStorage.removeItem('cart');

//     alert('Payment successful! Order placed.');
//     window.location.href = './orders.html';
//   });
// });


document.addEventListener('DOMContentLoaded', () => {
  const itemsContainer = document.getElementById('checkout-items');
  const totalAmount = document.getElementById('total-amount');
  const payBtn = document.getElementById('pay-btn');

  let cart = JSON.parse(localStorage.getItem('checkout_cart')) || [];

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    payBtn.style.display = 'none';
    return;
  }

  let total = 0;
  itemsContainer.innerHTML = cart.map(p => {
    total += p.price;
    return `
      <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
        <img src="${p.imageURL}" alt="${p.name}" style="width: 100px;">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
      </div>
    `;
  }).join('');

  totalAmount.textContent = `Total: $${total.toFixed(2)}`;

  payBtn.addEventListener('click', () => {
    const previousOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      placedAt: new Date().toLocaleString()
    };
    previousOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(previousOrders));

    // Clear cart and checkout_cart
    localStorage.removeItem('cart');
    localStorage.removeItem('checkout_cart');

    alert('Payment successful! Order placed.');
    window.location.href = './orders.html';
  });
});
