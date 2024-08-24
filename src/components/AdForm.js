import React, { useState } from 'react';
import axios from 'axios';

const AdForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://classified-ads-backend-production.up.railway.app/api/ads', { title, description, price }); // Update to Railway URL
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <button type="submit">Add Ad</button>
    </form>
  );
};

export default AdForm;
