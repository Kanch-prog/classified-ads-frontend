import React, { useState } from 'react';
import axios from 'axios';

const AdForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://classified-ads-backend-production.up.railway.app/api/ads', { title, description, price });
    setTitle('');
    setDescription('');
    setPrice('');
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
