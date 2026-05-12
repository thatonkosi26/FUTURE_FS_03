/**
 * GRILLHOUSE - Auth Module
 */

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'grillhouse2024',
};

const Auth = {
  login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      Storage.setAdminLogin({ username, loggedAt: new Date().toISOString() });
      return true;
    }
    return false;
  },
  logout() {
    Storage.adminLogout();
    window.location.href = 'admin.html';
  },
  isLoggedIn() {
    return Storage.isAdminLoggedIn();
  },
  guard() {
    if (!this.isLoggedIn()) {
      document.getElementById('login-section').style.display = 'flex';
      document.getElementById('dashboard-section').style.display = 'none';
    } else {
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('dashboard-section').style.display = 'flex';
    }
  },
};

window.Auth = Auth;
