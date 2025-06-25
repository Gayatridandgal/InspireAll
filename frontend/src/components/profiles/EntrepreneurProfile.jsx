// EntrepreneurProfile.jsx
import React, { useState } from 'react';
import './entrepreneurProfile.css';

const EntrepreneurProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Your full name',
    contactEmail: 'you@example.com',
    phoneNumber: '+91 XXXXX XXXXXX',
    bio: 'Tell us a bit about yourself...',
    companyName: '',
    businessStage: '',
    industry: '',
    fundingNeeds: '',
    linkedinUrl: 'https://linkedin.com/in/yourprofile',
    websiteUrl: ''
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
    <div className="entrepreneur-profile-container">
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
          <h1>Entrepreneur Details</h1>

          <div className="form-group">
            <h2>Company / Startup Name (Optional)</h2>
            <input
              type="text"
              name="companyName"
              value={profileData.companyName}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., My Awesome Startup"
            />
          </div>

          <div className="divider"></div>

          <div className="form-group">
            <h2>Business Stage (Optional)</h2>
            <select
              name="businessStage"
              value={profileData.businessStage}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select your business stage</option>
              <option value="idea">Idea Stage</option>
              <option value="prototype">Prototype Stage</option>
              <option value="early-revenue">Early Revenue</option>
              <option value="scaling">Scaling</option>
              <option value="established">Established</option>
            </select>
          </div>

          <div className="divider"></div>

          <div className="form-group">
            <h2>Industry (Optional)</h2>
            <input
              type="text"
              name="industry"
              value={profileData.industry}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., E-commerce, AgriTech, FinTech"
            />
          </div>

          <div className="divider"></div>

          <div className="form-group">
            <h2>Funding Needs (Optional)</h2>
            <input
              type="text"
              name="fundingNeeds"
              value={profileData.fundingNeeds}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., ₹5,00,000 - ₹50,00,000"
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

          <div className="divider"></div>

          <div className="form-group">
            <h2>Company Website (Optional)</h2>
            <input
              type="url"
              name="websiteUrl"
              value={profileData.websiteUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="https://yourcompany.com"
            />
          </div>
        </section>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default EntrepreneurProfile;