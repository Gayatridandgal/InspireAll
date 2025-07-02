// File: src/components/MainPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css'; // Optional: style as needed

const MainPage = () => {
  return (
    <div className="auth-container">
      <h1 className="auth-title">Welcome to InspireAll</h1>
      <p className="message">Complete your profile section. <br />Learn, share, grow...</p>

      <div className="profile-links">
        <Link to="/profiles/EntrepreneurProfile" className="profile-link">
          Entrepreneur Profile
        </Link>
        <Link to="/profiles/InvestorProfile" className="profile-link">
          Investor Profile
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
