import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AdForm from './components/AdForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AdForm />} />
        <Route path="/categories" element={<h2>Categories</h2>} /> {/* Placeholder for categories */}
      </Routes>
    </Router>
  );
};

export default App;
