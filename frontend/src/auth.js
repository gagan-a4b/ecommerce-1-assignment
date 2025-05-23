export function login(username, password, role) {
  if (username === 'admin' && password === 'admin' && role === 'admin') {
    localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }));
    window.location.href = '/admin.html';
    return;
  }

  if (role === 'user') {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(user => user.username === username && user.password === password);
    if (matchedUser) {
      localStorage.setItem('user', JSON.stringify({ username, role: 'user' }));
      window.location.href = '/index.html';
      alert(`logged in as ${username}`);
      return;
    }
  }

  alert('Invalid credentials');
}

export function signup(username, password, email) {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    alert('Username already exists!');
    return false;
  }

  users.push({ username, password, email });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful! Please login.');
  window.location.href = '/login.html';
}

export function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem('user'));
  const loginBtn = document.querySelector('.header__nav a[href="/login.html"]');

  if (user && loginBtn) {
    loginBtn.textContent = 'Logout';
    loginBtn.href = '#';
    loginBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      alert('Logged out successfully.');
      window.location.reload();
    });
  }
}
