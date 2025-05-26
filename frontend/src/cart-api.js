import { getToken } from './auth.js';

const API_URL = "http://localhost:3000/api/cart";

export async function getCart() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
}

export async function clearCart() {
  return fetch(API_URL, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
}

export async function getProductById(productId) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function addToCart(productId, quantity) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    return res.json();
  } catch (error) {
    console.error('Failed to add to cart:', error);
    throw error;
  }
}