// src/components/Headertwo.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Headertwo.css';
import logo from '/loo.png';
import GoogleTranslate from './GoogleTranslate';
import { useAuth } from '../context/AuthContext';

function Headertwo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth(); // 👈 use logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears user and localStorage
    navigate("/"); // redirects to home, where Header is shown
  };

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

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
       
        <Link to="/BusinessInfo">Business Info</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/post">Post</Link>   
        <Link to="/SchemeSearchForm">Schemes</Link>
         <Link to="/profiles/EntrepreneurProfile">Profile</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button> {/* 👈 logout */}
      </nav>

      

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}

export default Headertwo;
