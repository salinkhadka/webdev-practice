import React from 'react';
import './adminNavbarstyle.css';

function AdminNavbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/home";
  };

  return (
    <div className="navbar-admin">
      <h1>Admin Dashboard</h1>
      <a className="logout-link" onClick={handleLogout}>Logout</a>
    </div>
  );
}

export default AdminNavbar;
