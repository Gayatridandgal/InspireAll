// Community.jsx
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Community.css';

// Mock email service
const sendEmailNotification = (recipients, subject, message) => {
  console.log(Email sent to: ${recipients});
  console.log(Subject: ${subject});
  console.log(Message: ${message});
  return Promise.resolve();
};

function Community() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [communities, setCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    topic: '',
    email: '',
    members: []
  });
  const [newMember, setNewMember] = useState({ email: '', name: '' });
  const [newAnnouncement, setNewAnnouncement] = useState({
    communityId: '',
    message: '',
    sendEmail: true
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [currentCommunityId, setCurrentCommunityId] = useState(null);
  const [message, setMessage] = useState({ text: '', isError: false });

  // Load data from localStorage on initial render
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedCommunities = localStorage.getItem('communities');
      const savedUserCommunities = localStorage.getItem(userCommunities_${user.email});
      const savedAnnouncements = localStorage.getItem('announcements');

      if (savedCommunities) setCommunities(JSON.parse(savedCommunities));
      if (savedUserCommunities) setUserCommunities(JSON.parse(savedUserCommunities));
      if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements));
    }
  }, [isAuthenticated, user]);

  const handleCommunityChange = (e) => {
    const { name, value } = e.target;
    setNewCommunity(prev => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };

  const addMemberToNewCommunity = () => {
    if (!newMember.email || !newMember.name) {
      setMessage({ text: 'Please fill both email and name', isError: true });
      return;
    }
    
    setNewCommunity(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
    setNewMember({ email: '', name: '' });
    setMessage({ text: 'Member added successfully', isError: false });
  };

  const addMemberToExistingCommunity = () => {
    if (!newMember.email || !newMember.name) {
      setMessage({ text: 'Please fill both email and name', isError: true });
      return;
    }

    try {
      const communityIndex = communities.findIndex(c => c._id === currentCommunityId);
      if (communityIndex === -1) throw new Error('Community not found');

      const updatedCommunity = {
        ...communities[communityIndex],
        members: [...communities[communityIndex].members, newMember]
      };

      const updatedCommunities = [...communities];
      updatedCommunities[communityIndex] = updatedCommunity;

      // Update user communities if the current user is a member
      const updatedUserCommunities = userCommunities.map(comm => 
        comm._id === currentCommunityId ? updatedCommunity : comm
      );

      setCommunities(updatedCommunities);
      setUserCommunities(updatedUserCommunities);
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      localStorage.setItem(userCommunities_${user.email}, JSON.stringify(updatedUserCommunities));

      // Send welcome email to new member
      sendEmailNotification(
        newMember.email,
        Welcome to ${updatedCommunity.name},
        You've been added to the ${updatedCommunity.name} community by ${user.name}.
      );

      setMessage({ text: Member ${newMember.name} added successfully!, isError: false });
      setNewMember({ email: '', name: '' });
      setShowAddMemberForm(false);
    } catch (error) {
      setMessage({ text: 'Error adding member: ' + error.message, isError: true });
    }
  };

  const removeMember = (communityId, memberEmail) => {
    try {
      const communityIndex = communities.findIndex(c => c._id === communityId);
      if (communityIndex === -1) throw new Error('Community not found');

      const updatedCommunity = {
        ...communities[communityIndex],
        members: communities[communityIndex].members.filter(m => m.email !== memberEmail)
      };

      const updatedCommunities = [...communities];
      updatedCommunities[communityIndex] = updatedCommunity;

      // Update user communities if the current user is a member
      const updatedUserCommunities = userCommunities.map(comm => 
        comm._id === communityId ? updatedCommunity : comm
      );

      setCommunities(updatedCommunities);
      setUserCommunities(updatedUserCommunities);
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      localStorage.setItem(userCommunities_${user.email}, JSON.stringify(updatedUserCommunities));

      setMessage({ text: 'Member removed successfully!', isError: false });
    } catch (error) {
      setMessage({ text: 'Error removing member: ' + error.message, isError: true });
    }
  };

  const handleAnnouncementChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const createCommunity = (e) => {
    e.preventDefault();
    try {
      const community = {
        ...newCommunity,
        _id: Date.now().toString(),
        creator: user.email,
        creatorName: user.name,
        members: [...newCommunity.members, { email: user.email, name: user.name }],
        createdAt: new Date().toISOString()
      };

      const updatedCommunities = [...communities, community];
      const updatedUserCommunities = [...userCommunities, community];

      setCommunities(updatedCommunities);
      setUserCommunities(updatedUserCommunities);
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      localStorage.setItem(userCommunities_${user.email}, JSON.stringify(updatedUserCommunities));

      // Send welcome emails to all members
      const memberEmails = community.members.map(m => m.email).join(', ');
      sendEmailNotification(
        memberEmails,
        Welcome to ${community.name},
        You've been added to the ${community.name} community by ${user.name}.
      );

      setMessage({ text: 'Community created successfully!', isError: false });
      setNewCommunity({ name: '', description: '', topic: '', email: '', members: [] });
      setShowCreateForm(false);
    } catch (error) {
      setMessage({ text: 'Error creating community: ' + error.message, isError: true });
    }
  };

  const joinCommunity = (communityId) => {
    try {
      const community = communities.find(c => c._id === communityId);
      if (!community) throw new Error('Community not found');

      const updatedCommunity = {
        ...community,
        members: [...community.members, { email: user.email, name: user.name }]
      };

      const updatedCommunities = communities.map(c => 
        c._id === communityId ? updatedCommunity : c
      );
      const updatedUserCommunities = [...userCommunities, updatedCommunity];

      setCommunities(updatedCommunities);
      setUserCommunities(updatedUserCommunities);
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      localStorage.setItem(userCommunities_${user.email}, JSON.stringify(updatedUserCommunities));

      // Send notification to community admin
      sendEmailNotification(
        community.email,
        New member joined ${community.name},
        ${user.name} (${user.email}) has joined your community.
      );

      setMessage({ text: 'Joined community successfully!', isError: false });
    } catch (error) {
      setMessage({ text: 'Error joining community: ' + error.message, isError: true });
    }
  };

  const leaveCommunity = (communityId) => {
    try {
      const community = userCommunities.find(c => c._id === communityId);
      if (!community) throw new Error('Community not found');

      const updatedCommunity = {
        ...community,
        members: community.members.filter(m => m.email !== user.email)
      };

      const updatedCommunities = communities.map(c => 
        c._id === communityId ? updatedCommunity : c
      );
      const updatedUserCommunities = userCommunities.filter(c => c._id !== communityId);

      setCommunities(updatedCommunities);
      setUserCommunities(updatedUserCommunities);
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      localStorage.setItem(userCommunities_${user.email}, JSON.stringify(updatedUserCommunities));

      // Send notification to community admin
      sendEmailNotification(
        community.email,
        Member left ${community.name},
        ${user.name} (${user.email}) has left your community.
      );

      setMessage({ text: 'Left community successfully!', isError: false });
    } catch (error) {
      setMessage({ text: 'Error leaving community: ' + error.message, isError: true });
    }
  };

  const createAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const community = userCommunities.find(c => c._id === newAnnouncement.communityId);
      if (!community) throw new Error('Community not found');

      const announcement = {
        _id: Date.now().toString(),
        communityId: newAnnouncement.communityId,
        communityName: community.name,
        message: newAnnouncement.message,
        author: user.email,
        authorName: user.name,
        createdAt: new Date().toISOString()
      };

      const updatedAnnouncements = [...announcements, announcement];
      setAnnouncements(updatedAnnouncements);
      localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));

      // Send email notification if enabled
      if (newAnnouncement.sendEmail) {
        const memberEmails = community.members.map(m => m.email).join(', ');
        await sendEmailNotification(
          memberEmails,
          New announcement in ${community.name},
          ${user.name} posted: ${newAnnouncement.message}
        );
      }

      setMessage({ 
        text: 'Announcement posted successfully!' + 
          (newAnnouncement.sendEmail ? ' Emails sent to members.' : ''),
        isError: false
      });
      setNewAnnouncement({ communityId: '', message: '', sendEmail: true });
      setShowAnnouncementForm(false);
    } catch (error) {
      setMessage({ text: 'Error posting announcement: ' + error.message, isError: true });
    }
  };

  const deleteCommunity = (communityId) => {
    if (!window.confirm('Are you sure you want to delete this community?')) return;
    
    try {
      const community = communities.find(c => c._id === communityId);
      if (!community) throw new Error('Community not found');

      const updatedCommunities = communities.filter(c => c._id !== communityId);
      const updatedUserCommunities = userCommunities.filter(c => c._id !== communityId);
      const updatedAnnouncements = announcements.filter(a => a.communityId !== communityId);

      setCommunities(updatedCommunities);
      setUserCommunities(updatedUserCommunities);
      setAnnouncements(updatedAnnouncements);
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      localStorage.setItem(userCommunities_${user.email}, JSON.stringify(updatedUserCommunities));
      localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));

      // Send notification to all members
      const memberEmails = community.members.map(m => m.email).join(', ');
      sendEmailNotification(
        memberEmails,
        Community ${community.name} deleted,
        The community ${community.name} has been deleted by the admin.
      );

      setMessage({ text: 'Community deleted successfully!', isError: false });
    } catch (error) {
      setMessage({ text: 'Error deleting community: ' + error.message, isError: true });
    }
  };

  const openAddMemberForm = (communityId) => {
    setCurrentCommunityId(communityId);
    setShowAddMemberForm(true);
    setNewMember({ email: '', name: '' });
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (!isAuthenticated) return <div className="auth-message">Please login to access community features</div>;

  return (
    <div className="community-container">
      <h1>Community Hub</h1>
      
      {message.text && (
        <div className={message ${message.isError ? 'error' : ''}}>
          {message.text}
        </div>
      )}

      <div className="community-sections">
        {/* Your Communities Section */}
        <section className="section">
          <div className="section-header">
            <h2>Your Communities</h2>
            <button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="btn create-btn"
            >
              {showCreateForm ? 'Cancel' : 'Create Community'}
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={createCommunity} className="create-form">
              <div className="form-group">
                <label>Community Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newCommunity.name}
                  onChange={handleCommunityChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={newCommunity.description}
                  onChange={handleCommunityChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Topic:</label>
                <input
                  type="text"
                  name="topic"
                  value={newCommunity.topic}
                  onChange={handleCommunityChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newCommunity.email}
                  onChange={handleCommunityChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Add Members:</label>
                <div className="member-input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Member email"
                    value={newMember.email}
                    onChange={handleMemberChange}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Member name"
                    value={newMember.name}
                    onChange={handleMemberChange}
                  />
                  <button 
                    type="button" 
                    onClick={addMemberToNewCommunity}
                    className="btn add-member-btn"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {newCommunity.members.length > 0 && (
                <div className="members-list">
                  <h4>Members:</h4>
                  <ul>
                    {newCommunity.members.map((member, index) => (
                      <li key={index}>
                        {member.name} ({member.email})
                        <button 
                          type="button" 
                          onClick={() => {
                            const updatedMembers = [...newCommunity.members];
                            updatedMembers.splice(index, 1);
                            setNewCommunity(prev => ({ ...prev, members: updatedMembers }));
                          }}
                          className="btn remove-member-btn"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button type="submit" className="btn submit-btn">Create Community</button>
            </form>
          )}

          {userCommunities.length > 0 ? (
            <div className="communities-list">
              {userCommunities.map(comm => (
                <div key={comm._id} className="community-card">
                  <h3>{comm.name}</h3>
                  <p className="description">{comm.description}</p>
                  <p className="topic">Topic: {comm.topic}</p>
                  <p className="email">Contact: {comm.email}</p>
                  <div className="members-section">
                    <p className="members-count">Members: {comm.members?.length || 0}</p>
                    {comm.creator === user.email && (
                      <button 
                        onClick={() => openAddMemberForm(comm._id)}
                        className="btn add-member-btn"
                      >
                        Add Member
                      </button>
                    )}
                  </div>
                  <div className="members-list">
                    <ul>
                      {comm.members?.map((member, index) => (
                        <li key={index}>
                          {member.name} ({member.email})
                          {comm.creator === user.email && member.email !== user.email && (
                            <button 
                              onClick={() => removeMember(comm._id, member.email)}
                              className="btn remove-member-btn"
                            >
                              Remove
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="community-actions">
                    <button 
                      onClick={() => leaveCommunity(comm._id)}
                      className="btn leave-btn"
                    >
                      Leave
                    </button>
                    {comm.creator === user.email && (
                      <button 
                        onClick={() => deleteCommunity(comm._id)}
                        className="btn delete-btn"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-communities">You haven't joined any communities yet.</p>
          )}
        </section>

        {/* All Communities Section */}
        <section className="section">
          <div className="section-header">
            <h2>Available Communities</h2>
          </div>

          <div className="communities-list">
            {communities
              .filter(comm => !userCommunities.some(uc => uc._id === comm._id))
              .map(comm => (
                <div key={comm._id} className="community-card">
                  <h3>{comm.name}</h3>
                  <p className="description">{comm.description}</p>
                  <p className="topic">Topic: {comm.topic}</p>
                  <p className="email">Contact: {comm.email}</p>
                  <p className="members">Members: {comm.members?.length || 0}</p>
                  <button 
                    onClick={() => joinCommunity(comm._id)}
                    className="btn join-btn"
                  >
                    Join
                  </button>
                </div>
              ))}
          </div>
        </section>

        {/* Announcements Section */}
        <section className="announcements">
          <div className="section-header">
            <h2>Announcements</h2>
            {userCommunities.length > 0 && (
              <button 
                onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}
                className="btn create-btn"
              >
                {showAnnouncementForm ? 'Cancel' : 'New Announcement'}
              </button>
            )}
          </div>

          {showAnnouncementForm && (
            <form onSubmit={createAnnouncement} className="announcement-form">
              <div className="form-group">
                <label>Community:</label>
                <select
                  name="communityId"
                  value={newAnnouncement.communityId}
                  onChange={handleAnnouncementChange}
                  required
                >
                  <option value="">Select Community</option>
                  {userCommunities.map(comm => (
                    <option key={comm._id} value={comm._id}>{comm.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  name="message"
                  value={newAnnouncement.message}
                  onChange={handleAnnouncementChange}
                  required
                />
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  name="sendEmail"
                  checked={newAnnouncement.sendEmail}
                  onChange={handleAnnouncementChange}
                  id="sendEmail"
                />
                <label htmlFor="sendEmail">Send email notification to members</label>
              </div>
              <button type="submit" className="btn submit-btn">Post Announcement</button>
            </form>
          )}

          {showAddMemberForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Add New Member</h3>
                <div className="form-group">
                  <label>Member Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleMemberChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Member Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newMember.name}
                    onChange={handleMemberChange}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button 
                    onClick={() => setShowAddMemberForm(false)}
                    className="btn leave-btn"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={addMemberToExistingCommunity}
                    className="btn submit-btn"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="announcements-list">
            {announcements.length > 0 ? (
              announcements.map(ann => (
                <div key={ann._id} className="announcement-card">
                  <div className="announcement-header">
                    <h3>{ann.communityName}</h3>
                    <div className="announcement-meta">
                      <span className="author">By {ann.authorName}</span>
                      <span className="date">
                        {new Date(ann.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="message-content">{ann.message}</div>
                </div>
              ))
            ) : (
              <p className="no-announcements">No announcements yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Community;