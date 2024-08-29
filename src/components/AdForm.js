import React, { useState } from 'react';
import axios from 'axios';

const AdForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve token here
    try {
      await axios.post('https://classified-ads-backend-production.up.railway.app/api/ads', 
        { title, description, price }, 
        { headers: { Authorization: `Bearer ${token}` } } // Use the token in headers
      );
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error adding ad:', error.response.data);
      alert('Failed to add ad. Please make sure you are logged in.');
    }
  };
  
  return (
    <div className="container mt-4">
      <h2>Add a New Ad</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Title" 
            required 
            className="form-control" 
          />
        </div>
        <div className="mb-3">
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description" 
            required 
            className="form-control" 
          />
        </div>
        <div className="mb-3">
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Price" 
            required 
            className="form-control" 
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Ad</button>
      </form>
    </div>
  );
};

export default AdForm;
