document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-items');
  const clearCartBtn = document.getElementById('clear-cart');
  const continueShoppingBtn = document.getElementById('continue-shopping');
  const checkoutBtn = document.getElementById('checkout');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      if (clearCartBtn) clearCartBtn.style.display = 'none';
      if (checkoutBtn) checkoutBtn.style.display = 'none';
      if (continueShoppingBtn) continueShoppingBtn.style.display = 'block';
      return;
    }

    let total = 0;
    cartContainer.innerHTML = cart.map(p => {
      total += p.price;
      return `
        <div style="border: 1px solid #ccc; margin: 10px; padding: 10px; border-radius: 5px;">
          <img src="${p.imageURL}" alt="${p.name}" style="width: 100px; height: 100px; object-fit: cover;">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
        </div>
      `;
    }).join('');

    cartContainer.innerHTML += `<p style="font-weight: bold; font-size: 1.2rem; margin-top: 10px;">Total: $${total.toFixed(2)}</p>`;

    if (clearCartBtn) clearCartBtn.style.display = 'inline-block';
    if (checkoutBtn) checkoutBtn.style.display = 'inline-block';
  }

  renderCart();

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      localStorage.removeItem('cart');
      cart = [];
      renderCart();
      alert('Cart cleared!');
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      window.location.href = '/index.html';
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        localStorage.setItem('checkout_cart', JSON.stringify(cart));
        window.location.href = './checkout.html';
      }
    });
  }
});
