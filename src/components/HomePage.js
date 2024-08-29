import React, { useState, useEffect } from 'react';
import AdList from './AdList';
import Dashboard from './Dashboard'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faChair, faCar, faHome } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';
import logo from '../images/logo.jpg';
import Login from './Login'; 
import Register from './Register'; 

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]); // State for filtered ads
  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState([
    { name: 'Electronics', icon: faTv },
    { name: 'Furniture', icon: faChair },
    { name: 'Vehicles', icon: faCar },
    { name: 'Real Estate', icon: faHome },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showLoginForm, setShowLoginForm] = useState(false); 
  const [showRegisterForm, setShowRegisterForm] = useState(false); 
  const [showDashboard, setShowDashboard] = useState(false); 
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Fetch all ads when component mounts
  useEffect(() => {
    const fetchAds = async () => {
      const response = await axios.get('https://classified-ads-backend-production.up.railway.app/api/ads');
      setAds(response.data);
      setFilteredAds(response.data); // Set initial filtered ads to all ads
    };
    fetchAds();
  }, [token]);

  // Filter ads based on search term
  useEffect(() => {
    const filtered = ads.filter(ad =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAds(filtered); // Update filtered ads based on search term
  }, [searchTerm, ads]);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setShowLoginForm(false);
    console.log('User logged in:', userData);
    
    // Save the token in local storage
    localStorage.setItem('token', userData.token); // Ensure you access the token from the correct source
  };

  const handleRegisterSuccess = (user, token) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem('token', token); // Store the token in local storage
    setShowRegisterForm(false);
    console.log('User registered:', user);
  };

  const handleProfileClick = () => {
    setShowDashboard(true); // Show the dashboard when profile is clicked
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
    setShowDashboard(false); // Hide the dashboard
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowDashboard(false); // Hide the dashboard
  };

  const handleLogout = () => {
    // Remove token from local storage or cookie
    localStorage.removeItem('token');
    // Reset login state
    setIsLoggedIn(false);
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowDashboard(false); // Hide the dashboard
    console.log('User logged out');
  };

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="hero bg-success text-white text-center py-4 mb-4">
        <img src={logo} alt="Logo" className="img-fluid mb-2" style={{ width: '150px' }} />
        <h1>Classified Ads Marketplace</h1>
      </div>

      {/* Search Bar */}
      {!showDashboard && ( // Hide the search bar when the dashboard is shown
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search advertisements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Categories Section */}
      {!showDashboard && ( // Hide the categories section when the dashboard is shown
        <div>
          <h2>Categories</h2>
          <div className="row mb-4">
            {categories.map((category, index) => (
              <div key={index} className="col-6 col-md-3 mb-3">
                <div className="category-card d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={category.icon} className="me-2" size="3x" />
                  <span>{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Login, Register, and Logout Buttons */}
      <div className="text-center mb-4">
        {!isLoggedIn ? (
          <>
            <button className="btn btn-success me-2" onClick={handleLoginClick}>Login</button>
            <button className="btn btn-secondary" onClick={handleRegisterClick}>Register</button>
          </>
        ) : (
          <>
            <button className="btn btn-info me-2" onClick={handleProfileClick}>Profile</button>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      {/* Show Login Form */}
      {showLoginForm && <Login onLoginSuccess={handleLoginSuccess} />}

      {/* Show Register Form */}
      {showRegisterForm && <Register onRegisterSuccess={handleRegisterSuccess} />}

      {/* Show User Dashboard or Latest Ads Section */}
      {showDashboard ? (
        <Dashboard isLoggedIn={isLoggedIn} />
      ) : (
        <AdList ads={filteredAds} /> // Pass filtered ads to AdList
      )}
    </div>
  );
};

export default HomePage;
