// src/components/ShoeGallery.jsx
import React, { useState } from 'react';
import './ShoeGallery.css'; // We'll style it here
import nikeShoes from '../assets/nike';
import adidasShoes from '../assets/adidas';
import pumaShoes from '../assets/puma';

const brands = ['all', 'nike', 'adidas', 'puma'];

const ShoeGallery = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');

  const getShoes = () => {
    switch (selectedBrand) {
      case 'nike':
        return nikeShoes;
      case 'adidas':
        return adidasShoes;
      case 'puma':
        return pumaShoes;
      default:
        return [...nikeShoes, ...adidasShoes, ...pumaShoes];
    }
  };

  return (
    <div className="gallery-container">
      <h2 className="title">All Shoes Gallery</h2>
      <div className="brand-filter">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`brand-btn ${selectedBrand === brand ? 'active' : ''}`}
            onClick={() => setSelectedBrand(brand)}
          >
            {brand.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="shoes-grid">
        {getShoes().map((img, i) => (
          <div key={i} className="shoe-card">
            <img src={img} alt={`shoe ${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeGallery;
