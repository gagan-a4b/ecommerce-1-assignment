import { getToken } from './auth.js';

const API_URL = "http://localhost:3000/api/orders";

export async function placeOrder() {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
}

export async function getOrders() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
}