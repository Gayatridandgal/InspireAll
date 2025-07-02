// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '/loo.png';
import GoogleTranslate from './GoogleTranslate';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="logo-section" style={{ textDecoration: 'none' }}>
        <img src={logo} alt="Logo" className="logo-icon" />
        <span className="logo-text">
          <span className="logo-inspire">Inspire</span>
          <span className="logo-all">All</span>
        </span>
      </Link>

      <div className="translate-section">
        <GoogleTranslate />
      </div>

      <div className="auth-buttons">
        <Link to="/SignIn">
          <button className="signin-btn">Sign in</button>
        </Link>
        <Link to="/SignUp">
          <button className="signup-btn">Sign up</button>
        </Link>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}

export default Header;
