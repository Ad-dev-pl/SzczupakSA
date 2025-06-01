// src/api.ts
const API_BASE = 'http://localhost:5000/api';

export async function fetchLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function fetchOrders(userId: string) {
  const res = await fetch(`${API_BASE}/orders/user/${userId}`);
  if (!res.ok) throw new Error('Could not fetch orders');
  return res.json();
}

// ... inne endpointy analogicznie
