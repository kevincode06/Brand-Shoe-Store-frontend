import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Brand Shoe Store</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <div 
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="dropdown-toggle">Welcome, {user.email}</span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile">Profile</Link>
                  {user.role === 'admin' && <Link to="/admin">Admin</Link>}
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
