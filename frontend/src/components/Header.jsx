import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '/loo.png'; // Ensure this path is correct
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

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/profiles/EntrepreneurProfile">Profile</Link>
        <Link to="/BusinessInfo">Business Info</Link>
        <a href="http://localhost:5173/" target="_blank" rel="noopener noreferrer">Post</a>
        <Link to="/SchemeSearchForm">Schemes</Link>
        {/* <Link to="/resource">Resources</Link>
        import { Link } from 'react-router-dom'; */}

<Link to="/resources" className="text-white hover:underline">Resources</Link>

      </nav>

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