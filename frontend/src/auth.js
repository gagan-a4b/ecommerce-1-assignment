const API_BASE = 'http://localhost:3000/api/users';


export async function login(username, password, role) {
  if (role === 'admin') {
    if (username === 'admin' && password === 'admin') {
      // Hardcoded admin login
      const adminUser = { username, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(adminUser));
      window.location.href = '/admin.html';
      return;
    } else {
      alert('Invalid admin credentials');
      return;
    }
  }

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: username, password })
    });

    const data = await res.json();
    if (res.ok && data.token) {
      // Save token and basic user info
      saveToken(data.token);
      saveUser({ username, role: 'user' });
      alert('Login successful');
      window.location.href = '/index.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Error logging in: ' + err.message);
  }
}

// SIGNUP
export async function signup(userId, password, email) {
  try {
    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password, email }) 
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    alert('Signup successful. Please login.');
    window.location.href = '/login.html';
  } catch (err) {
    alert('Signup failed: ' + err.message);
  }
}

// CHECK LOGIN STATUS
export function checkLoginStatus() {
  const user = getLoggedInUser();
  const loginBtn = document.getElementById('loginLink');

  if (!loginBtn) return;

  if (user) {
    loginBtn.textContent = 'Logout';
    loginBtn.href = '#';
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  } else {
    loginBtn.textContent = 'Login';
    loginBtn.href = './login.html';
  }
}


// TOKEN + SESSION UTILITIES
export function getToken() {
  return localStorage.getItem("token");
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getLoggedInUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  alert('Logged out successfully.');
  window.location.href = "/login.html";
}

export function isLoggedIn() {
  return !!getToken();
}
