// Profile.jsx
import React, { useState } from 'react';
import './investorProfile.css';

const iProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Your full name',
    contactEmail: 'you@example.com',
    phoneNumber: '+91 XXXXX XXXXXX',
    bio: 'Tell us a bit about yourself...',
    companyName: '',
    areasOfInterest: '',
    investmentRange: '',
    linkedinUrl: 'https://linkedin.com/in/yourprofile'
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Profile data submitted:', profileData);
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <section className="profile-section">
          <h1>Your Profile</h1>
          <p className="section-description">Manage your personal and business information.</p>

          <div className="form-group">
            <h2>Full Name</h2>
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <h2>Contact Email</h2>
            <input
              type="email"
              name="contactEmail"
              value={profileData.contactEmail}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <h2>Phone Number (Optional)</h2>
            <input
              type="tel"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="+91 XXXXX XXXXXX"
            />
          </div>

          <div className="form-group">
            <h2>Bio / About Me (Optional)</h2>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-group">
            <h2>Profile Picture</h2>
            <div className="file-upload">
              <label className="file-upload-label">
                <input 
                  type="file" 
                  onChange={handleImageChange} 
                  className="file-input" 
                  accept="image/*"
                />
                Choose File
              </label>
              <span className="file-name">{profileImage ? 'Image selected' : 'No file chosen'}</span>
            </div>
            <p className="upload-hint">Upload a new profile picture.</p>
          </div>
        </section>

        <section className="profile-section">
          <h1>Investor Details</h1>

          <div className="form-group">
            <h2>Company / Fund Name (Optional)</h2>
            <input
              type="text"
              name="companyName"
              value={profileData.companyName}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Village Growth Partners"
            />
          </div>

          <div className="divider"></div>

          <div className="form-group">
            <h2>Areas of Interest (Optional)</h2>
            <input
              type="text"
              name="areasOfInterest"
              value={profileData.areasOfInterest}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Agriculture, Technology, Handicrafts"
            />
            <p className="input-hint">Comma-separated list of industries you are interested in.</p>
          </div>

          <div className="divider"></div>

          <div className="form-group">
            <h2>Typical Investment Range (Optional)</h2>
            <input
              type="text"
              name="investmentRange"
              value={profileData.investmentRange}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., ₹50,000 - ₹5,00,000"
            />
          </div>

          <div className="divider"></div>

          <div className="form-group">
            <h2>LinkedIn Profile URL (Optional)</h2>
            <input
              type="url"
              name="linkedinUrl"
              value={profileData.linkedinUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </section>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default iProfile;