import React, { useState, useEffect } from 'react';
import AdList from './AdList';
import NavBar from './NavBar';
import axios from 'axios';

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['Electronics', 'Furniture', 'Vehicles', 'Real Estate']); // Sample categories

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axios.get('https://classified-ads-backend-production.up.railway.app/api/ads');
      setAds(response.data);
    };
    fetchAds();
  }, []);

  // Filter ads based on search term
  const filteredAds = ads.filter(ad =>
    ad.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Classified Ads</h1>
      <NavBar />
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search advertisements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Section */}
      <h2>Categories</h2>
      <ul className="list-group mb-4">
        {categories.map((category, index) => (
          <li key={index} className="list-group-item">{category}</li>
        ))}
      </ul>

      {/* Latest Ads Section */}
      <h2>Latest Advertisements</h2>
      <AdList ads={filteredAds} /> {/* Pass the filtered ads here */}
    </div>
  );
};

export default HomePage;
