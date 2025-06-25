import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Search, Loader, AlertCircle, ExternalLink, Sprout, ShoppingCart, Palette, Zap, TreePine, Fish, Sun, Droplets, Users, Heart, Scissors, Factory, Globe, Coffee, Flower, Award, Star, TrendingUp, Target } from "lucide-react";
import "./SchemeSearchForm.css";

// === Replace this with your real Gemini API Key ===
const genAI = new GoogleGenerativeAI("apikey");

// === Category icons mapping ===
const categoryIcons = {
  agriculture: Sprout,
  dairy: Droplets,
  handicrafts: Palette,
  poultry: Heart,
  sericulture: Scissors,
  aquaculture: Fish,
  horticulture: Flower,
  apiculture: Coffee,
  organic: TreePine,
  textiles: Scissors,
  agroprocessing: Factory,
  livestock: Users,
  fisheries: Fish,
  forestry: TreePine,
  biogas: Zap,
  herbal: Flower,
  spices: Coffee,
  cottage: Award,
  solar: Sun,
  nursery: Sprout,
  retail: ShoppingCart,
  artcraft: Palette,
  // Additional icons for broader search
  business: Factory,
  startup: TrendingUp,
  women: Users,
  youth: Star,
  rural: Globe,
  urban: Globe,
  micro: ShoppingCart,
  small: Factory,
  medium: Factory,
  manufacturing: Factory,
  service: Users,
  technology: Zap,
  innovation: Star,
  export: Globe,
  import: Globe,
  loan: ShoppingCart,
  subsidy: Award,
  grant: Award,
  skill: Users,
  training: Users,
  employment: Users,
  self: Users
};

// === Enhanced Prompt Templates ===
const promptTemplates = {
  agriculture: `List 5 Indian government schemes for farmers and agriculture-based businesses with their key benefits and eligibility.`,
  dairy: `List 5 Indian government schemes or subsidies supporting dairy farming and milk production in rural India with details.`,
  handicrafts: `List 5 schemes that support artisans and handicrafts in India with funding details and application process.`,
  poultry: `List 5 Indian government schemes that support poultry farming in rural areas with subsidy amounts.`,
  sericulture: `List 5 government schemes that promote sericulture (silk farming) in India with complete details.`,
  aquaculture: `List 5 schemes supporting aquaculture or fish farming under Indian government programs with benefits.`,
  horticulture: `List 5 schemes that promote horticulture and vegetable/fruit cultivation in India with subsidy details.`,
  apiculture: `List 5 Indian government schemes that promote beekeeping or apiculture in rural areas with benefits.`,
  organic: `List 5 government initiatives or schemes that promote organic farming in India with complete details.`,
  textiles: `List 5 Indian government schemes that support textile industries or rural weavers with funding details.`,
  agroprocessing: `List 5 schemes that support agro-processing units or value-added agricultural industries with benefits.`,
  livestock: `List 5 government schemes that promote livestock development in rural India with subsidy details.`,
  fisheries: `List 5 schemes that promote fishery-based livelihoods under Indian government programs with complete information.`,
  forestry: `List 5 Indian government initiatives that promote forestry, farm forestry, or agroforestry with details.`,
  biogas: `List 5 Indian schemes or subsidies that support biogas plants or renewable energy from waste with benefits.`,
  herbal: `List 5 government schemes that promote cultivation or business based on medicinal or herbal plants with details.`,
  spices: `List 5 Indian schemes that help spice cultivators or spice export businesses with complete information.`,
  cottage: `List 5 Indian schemes promoting cottage industries and rural crafts with funding and benefits.`,
  solar: `List 5 Indian government schemes that promote solar energy adoption in rural areas with subsidy details.`,
  nursery: `List 5 schemes that support nursery businesses, plant nurseries, or horticultural startups with benefits.`,
  retail: `List 5 Indian government schemes that support retail businesses and small traders with loan and subsidy details.`,
  artcraft: `List 5 schemes that support artisans and craft-based businesses in India with complete funding information.`
};

// === Category suggestions ===
const categoryData = [
  { key: 'agriculture', name: 'Agriculture', color: 'agriculture', description: 'Farming & cultivation schemes' },
  { key: 'dairy', name: 'Dairy', color: 'dairy', description: 'Milk production & processing' },
  { key: 'handicrafts', name: 'Handicrafts', color: 'handicrafts', description: 'Traditional arts & crafts' },
  { key: 'poultry', name: 'Poultry', color: 'poultry', description: 'Chicken & egg production' },
  { key: 'textiles', name: 'Textiles', color: 'textiles', description: 'Weaving & fabric production' },
  { key: 'solar', name: 'Solar Energy', color: 'solar', description: 'Renewable energy solutions' },
  { key: 'fisheries', name: 'Fisheries', color: 'fisheries', description: 'Fish farming & aquaculture' },
  { key: 'organic', name: 'Organic Farming', color: 'organic', description: 'Chemical-free cultivation' }
];
const fallbackData = {
  agriculture: [
    {
      name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      description: "Provides ₹6000 per year income support to eligible farmers in three equal installments of ₹2000 each.",
      link: "https://pmkisan.gov.in/",
    },
    {
      name: "Soil Health Card Scheme",
      description: "Provides soil health cards to farmers to promote balanced use of fertilizers and improve soil fertility.",
      link: "https://soilhealth.dac.gov.in/",
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "Crop insurance scheme providing financial support to farmers suffering crop loss/damage due to natural calamities.",
      link: "https://pmfby.gov.in/",
    }
  ],
  dairy: [
    {
      name: "Dairy Entrepreneurship Development Scheme (DEDS)",
      description: "Provides financial assistance for setting up small dairy farms and infrastructure for milk production and marketing.",
      link: "https://dahd.nic.in/schemes/dairy-entrepreneurship-development-scheme",
    },
    {
      name: "National Programme for Dairy Development (NPDD)",
      description: "Supports milk unions and federations to improve milk procurement, processing and marketing infrastructure.",
      link: "https://dahd.nic.in/schemes/npdd",
    }
  ],
  handicrafts: [
    {
      name: "Ambedkar Hastshilp Vikas Yojana",
      description: "Supports cluster-based skill development and marketing for artisans belonging to Scheduled Castes with financial assistance.",
      link: "https://www.india.gov.in/",
    },
    {
      name: "Scheme of Fund for Regeneration of Traditional Industries (SFURTI)",
      description: "Organizes traditional industries into clusters to make them competitive with modern techniques and marketing support.",
      link: "https://sfurti.msme.gov.in/",
    }
  ],
  poultry: [
    {
      name: "Poultry Venture Capital Fund Scheme",
      description: "Promotes poultry development by offering financial support for infrastructure and poultry units.",
      link: "https://www.nabard.org/",
    },
    {
      name: "National Livestock Mission (NLM)",
      description: "Supports sustainable development of the livestock sector, including poultry, through capacity building and funding.",
      link: "https://nlm.gov.in/",
    }
  ],
  textiles: [
    {
      name: "SAMARTH (Scheme for Capacity Building in Textile Sector)",
      description: "Aims to provide skill development training to boost employment in the textile and apparel industry.",
      link: "https://samarth-textiles.gov.in/",
    },
    {
      name: "Integrated Wool Development Programme (IWDP)",
      description: "Supports wool production, processing and marketing, focusing on infrastructure and quality.",
      link: "https://texmin.nic.in/",
    }
  ],
  solar: [
    {
      name: "PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthan Mahabhiyan)",
      description: "Promotes solar power use among farmers by subsidizing solar pumps and grid-connected renewable energy systems.",
      link: "https://mnre.gov.in/pm-kusum",
    },
    {
      name: "Rooftop Solar Programme Phase II",
      description: "Provides financial support to install rooftop solar panels for homes and small businesses.",
      link: "https://solarrooftop.gov.in/",
    }
  ],
  fisheries: [
    {
      name: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
      description: "Supports sustainable development of fisheries with infrastructure, insurance, and livelihood promotion.",
      link: "https://pmmsy.dof.gov.in/",
    },
    {
      name: "Blue Revolution",
      description: "Enhances fish production through improved breeding, feed, and market infrastructure.",
      link: "https://dof.gov.in/",
    }
  ],
  organic: [
    {
      name: "Paramparagat Krishi Vikas Yojana (PKVY)",
      description: "Promotes organic farming through a cluster approach and participatory guarantee system certification.",
      link: "https://pgsindia-ncof.gov.in/pkvy/index.aspx",
    },
    {
      name: "National Programme for Organic Production (NPOP)",
      description: "Develops organic farming standards, certification, and promotion in domestic and export markets.",
      link: "https://apeda.gov.in/",
    }
  ],
  retail: [
    {
      name: "MUDRA Yojana",
      description: "Provides collateral-free loans up to ₹10 lakh to small and micro businesses under three categories: Shishu, Kishore, and Tarun.",
      link: "https://www.mudra.org.in/",
    },
    {
      name: "Stand Up India Scheme",
      description: "Facilitates bank loans between ₹10 lakh to ₹1 crore to SC/ST and women entrepreneurs for setting up new enterprises.",
      link: "https://www.standupmitra.in/",
    }
  ],
  artcraft: [
    {
      name: "Ambedkar Hastshilp Vikas Yojana",
      description: "Supports cluster-based skill development and marketing for artisans belonging to Scheduled Castes with financial assistance.",
      link: "https://www.india.gov.in/",
    },
    {
      name: "Scheme of Fund for Regeneration of Traditional Industries (SFURTI)",
      description: "Organizes traditional industries into clusters to make them competitive with modern techniques and marketing support.",
      link: "https://sfurti.msme.gov.in/",
    }
  ]
};


const SchemeSearchForm = () => {
  const [query, setQuery] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCategorySelect = (category) => {
    setQuery(category);
    setSelectedCategory(category);
    setError("");
    setSearchAttempted(false);
  };

  const generatePromptFromKeyword = (keyword) => {
    const lowerKeyword = keyword.toLowerCase().trim();
    
    // Check if it's a predefined category
    if (promptTemplates[lowerKeyword]) {
      return promptTemplates[lowerKeyword];
    }
    
    // Generate dynamic prompt for any keyword
    return `List 5 Indian government schemes, subsidies, or programs related to "${keyword}" business, industry, or sector. Include scheme names, key benefits, eligibility criteria, and funding details where available. Focus on schemes that can help entrepreneurs, farmers, or businesses in the ${keyword} sector.`;
  };

  const parseSchemeResponse = (text) => {
    try {
      // Split by double newlines or numbered items
      const blocks = text.split(/\n(?=\d+\.|\*|\-)|(?:\n\s*\n)+/);
      
      const parsedSchemes = blocks
        .map((block) => {
          const lines = block.trim().split("\n").filter(line => line.trim());
          if (lines.length === 0) return null;
          
          // Extract name (first line, remove numbering)
          let name = lines[0]?.replace(/^\d+\.?\s*[\*\-]?\s*/, "").trim();
          
          // Extract description (remaining lines)
          const description = lines.slice(1).join(" ").trim() || 
                            (lines.length === 1 ? "Government scheme details available on official website." : "");
          
          if (!name) return null;
          
          // Clean up name if it contains description
          if (name.length > 100) {
            const sentences = name.split(/[.!?]/);
            name = sentences[0]?.trim() || name.substring(0, 100) + "...";
          }
          
          return { 
            name: name, 
            description: description || "Government scheme supporting the selected sector. Visit official website for detailed information.",
            link: null 
          };
        })
        .filter(scheme => scheme && scheme.name && scheme.name.length > 5);

      return parsedSchemes.length > 0 ? parsedSchemes : null;
    } catch (error) {
      console.error("Error parsing scheme response:", error);
      return null;
    }
  };

  const handleSearch = async () => {
    const keyword = query.toLowerCase().trim();
    
    if (!keyword) {
      setError("Please enter a keyword or select a category to search for schemes.");
      return;
    }

    if (keyword.length < 2) {
      setError("Please enter at least 2 characters to search for schemes.");
      return;
    }

    setError("");
    setLoading(true);
    setSchemes([]);
    setSearchAttempted(true);
    setSelectedCategory(keyword);

    try {
      const prompt = generatePromptFromKeyword(keyword);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      if (!text || text.trim().length === 0) {
        throw new Error("Empty response from AI service");
      }

      const parsedSchemes = parseSchemeResponse(text);

      if (!parsedSchemes || parsedSchemes.length === 0) {
        // Use fallback data or show appropriate message
        const fallbackSchemes = fallbackData[keyword] || fallbackData.default || [];
        
        if (fallbackSchemes.length > 0) {
          setSchemes(fallbackSchemes);
          setError("Showing some relevant schemes. For more specific results, try searching with different keywords.");
        } else {
          setError(`No specific schemes found for "${keyword}". Try searching with related terms like "agriculture", "dairy", "handicrafts", or "retail".`);
        }
      } else {
        setSchemes(parsedSchemes);
      }
    } catch (err) {
      console.error("Search error:", err);
      
      // Try to provide fallback data
      const fallbackSchemes = fallbackData[keyword] || fallbackData.default || [];
      
      if (fallbackSchemes.length > 0) {
        setSchemes(fallbackSchemes);
        setError("Currently experiencing connectivity issues. Showing some relevant schemes from our database.");
      } else {
        setError("Unable to fetch schemes at the moment. Please check your internet connection and try again. You can also try searching for popular categories like 'agriculture', 'dairy', or 'handicrafts'.");
      }
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getIconForQuery = (queryStr) => {
    const lowerQuery = queryStr.toLowerCase();
    
    // Check for exact matches first
    if (categoryIcons[lowerQuery]) {
      return categoryIcons[lowerQuery];
    }
    
    // Check for partial matches
    for (const [key, icon] of Object.entries(categoryIcons)) {
      if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
        return icon;
      }
    }
    
    return Search; // Default icon
  };

  const IconComponent = selectedCategory ? getIconForQuery(selectedCategory) : Search;

  return (
    <div className={`scheme-container ${isVisible ? 'fade-in' : ''}`}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon-wrapper">
            <Target className="hero-icon" />
            <div className="hero-icon-glow"></div>
          </div>
          <h1 className="hero-title">
            Discover Government <span className="gradient-text">Schemes</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered platform to find the perfect government schemes for your business growth
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <Star className="stat-icon" />
              <span>500+ Schemes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <TrendingUp className="stat-icon" />
              <span>AI Powered</span>
            </div>
          </div>
        </div>
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Category Section */}
        <div className="section-wrapper">
          <div className="section-header">
            <Award className="section-icon" />
            <h2 className="section-title">Choose Your Business Category</h2>
            <p className="section-subtitle">Select from popular categories or type your own keyword</p>
          </div>
          
          <div className="categories-grid">
            {categoryData.map((category, index) => {
              const Icon = categoryIcons[category.key];
              return (
                <div
                  key={category.key}
                  className={`category-card ${selectedCategory === category.key ? 'selected' : ''} ${category.color}`}
                  onClick={() => handleCategorySelect(category.key)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="category-icon-wrapper">
                    <Icon className="category-icon" />
                  </div>
                  <div className="category-info">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                  </div>
                  <div className="category-arrow">→</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Section */}
        <div className="section-wrapper">
          <div className="search-wrapper">
            <div className="search-container">
              <div className="search-input-container">
                <IconComponent className="search-input-icon" />
                <input
                  type="text"
                  placeholder="Type any keyword (e.g., agriculture, handicrafts, startup, women, youth, export)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="search-input"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="search-button"
              >
                {loading ? (
                  <>
                    <Loader className="button-icon animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="button-icon" />
                    Find Schemes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-container">
            <AlertCircle className="error-icon" />
            <span className="error-text">{error}</span>
          </div>
        )}

        {/* Loading Animation */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Discovering the best schemes for you...</p>
          </div>
        )}

        {/* Results Section */}
        {schemes.length > 0 && !loading && (
          <div className="section-wrapper">
            <div className="results-header">
              <div className="results-icon-wrapper">
                <IconComponent className="results-icon" />
              </div>
              <h2 className="results-title">
                Found {schemes.length} schemes for <span className="highlight">{selectedCategory || query}</span>
              </h2>
            </div>
            
            <div className="schemes-grid">
              {schemes.map((scheme, index) => (
                <div
                  key={index}
                  className="scheme-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="scheme-header">
                    <div className="scheme-icon-wrapper">
                      <IconComponent className="scheme-icon" />
                    </div>
                    <h3 className="scheme-title">{scheme.name}</h3>
                  </div>
                  <p className="scheme-description">{scheme.description}</p>
                  {scheme.link && (
                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="scheme-link"
                    >
                      <span>Learn More</span>
                      <ExternalLink className="link-icon" />
                    </a>
                  )}
                  <div className="scheme-glow"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && schemes.length === 0 && !error && !searchAttempted && (
          <div className="empty-state">
            <div className="empty-icon-wrapper">
              <Search className="empty-icon" />
              <div className="empty-icon-pulse"></div>
            </div>
            <h3 className="empty-title">Ready to explore schemes?</h3>
            <p className="empty-description">
              Select a category above or type any keyword to discover government schemes tailored for your needs
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeSearchForm;

