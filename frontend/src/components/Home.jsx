import React, { useState } from 'react';
import './Header.css';
import logo from '/loo.png'; // Replace this with your actual logo path
import GoogleTranslate from './GoogleTranslate';
import { Link } from 'react-router-dom';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleHeroButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
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
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering every dream <span>with AI Automation</span>
          </h1>
          <p className="hero-subtext">
            An AI-powered platform designed to empower rural entrepreneurs with personalized guidance, marketplace access, and financial literacy — in their own language.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-purple" onClick={handleHeroButtonClick}>Get Started</button>
            <button className="btn btn-green" onClick={handleHeroButtonClick}>Chat with InspireBot</button>
            <button className="btn btn-outline" onClick={handleHeroButtonClick}>Join the Community</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://static.startuptalky.com/2023/12/Rural-Business-Ideas-1.jpg"
            alt="Hero"
            className="image-animation"
          />
        </div>
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            padding: '24px 32px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '16px' }}>First Sign Up</h3>
            <p style={{ marginBottom: '24px' }}>Please sign up before using this feature.</p>
            <Link to="/SignUp">
              <button className="btn btn-purple" style={{ marginRight: '8px' }}>Go to Sign Up</button>
            </Link>
            <button className="btn btn-outline" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;