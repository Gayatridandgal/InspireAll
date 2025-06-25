import React, { useState } from 'react';
import ResourceCard from '../components/Resource';
import './Resources.css';

const sampleData = [
  {
    title: "Financial Planning Video Tutorial",
    type: "Video",
    description: "A visual guide to managing finances for small businesses.",
    image: "https://img.youtube.com/vi/LspR6URaK7Q/0.jpg",
    link: "https://youtu.be/LspR6URaK7Q?si=biJ8ZmlVgvQsv31V",
    category: "Finance",
  },
  {
    title: "Digital Marketing Explained",
    type: "Video",
    description: "Beginner-friendly introduction to online marketing strategies.",
    image: "https://img.youtube.com/vi/SizoX50BNdA/0.jpg",
    link: "https://youtu.be/SizoX50BNdA?si=BPHbCUFJ7_5APQzt",
    category: "Marketing",
  },
  {
    title: "Government Schemes Walkthrough",
    type: "Video",
    description: "Understand MSME government schemes through a detailed video.",
    image: "https://img.youtube.com/vi/-QwXaCI4898/0.jpg",
    link: "https://youtu.be/-QwXaCI4898?si=Pfr8lBVGL2xpJegy",
    category: "Government Schemes",
  },
  {
    title: "Beginner's Guide to Financial Planning for Small Businesses",
    type: "Guide",
    description: "Comprehensive guide covering budgeting, cash flow management, and financial planning strategies for MSMEs.",
    image: "https://via.placeholder.com/600x400",
    link: "https://example.com/finance-guide",
    category: "Finance",
  },
  {
    title: "Digital Marketing 101: Reaching Your Customers Online",
    type: "Course",
    description: "Learn the fundamentals of digital marketing including social media, SEO, and online advertising.",
    image: "https://via.placeholder.com/600x400",
    link: "https://example.com/digital-marketing",
    category: "Marketing",
  },
];

const categories = ["All Categories", "Finance", "Marketing", "Government Schemes", "Legal", "Trade", "Technology"];
const types = ["All Types", "Guide", "Course", "Article", "Video"];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');

  const filteredResources = sampleData.filter(resource => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All Types' || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="resources-page">
      <header className="resources-header">
        <h1 className="resources-title">Educational Resources</h1>
        <p className="resources-subtitle">
          Empower yourself with knowledge. Access guides, articles, and courses to boost your skills.
        </p>
      </header>

      <div className="resources-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="filter-select">
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource, index) => <ResourceCard key={index} resource={resource} />)
        ) : (
          <div className="no-results">
            <h3>No resources found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;