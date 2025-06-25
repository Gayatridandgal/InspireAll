import React from 'react';
import './Resource.css';

const ResourceCard = ({ resource }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Guide':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="type-icon">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
        );
      case 'Course':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="type-icon">
            <path d="M2 20h20v-4H2v4zm2-6h16v-2H4v2zm0-4h16V8H4v2zm0-4h16V4H4v2z"></path>
          </svg>
        );
      case 'Article':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="type-icon">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="resource-card">
      <div className="resource-image-container">
        <img
          src={resource.image || 'https://via.placeholder.com/600x400/2a2a2a/888888?text=600x400'}
          alt={resource.title}
          className="resource-image"
        />
        <div className="resource-type-badge">
          {getTypeIcon(resource.type)}
          <span>{resource.type}</span>
        </div>
      </div>
      
      <div className="resource-content">
        <h3 className="resource-title">{resource.title}</h3>
        <p className="resource-description">{resource.description}</p>
        
        <div className="resource-footer">
          <span className="resource-category">{resource.category}</span>
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            View Resource
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="link-icon">
              <path d="M7 17l9.2-9.2M17 17V7H7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;