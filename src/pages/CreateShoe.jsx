import React, { useState } from 'react';
import api from '../api/api';
import './CreateShoe.css';

const CreateShoe = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: 'Nike',
    imageUrl: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/shoes', formData);
      alert('Shoe created successfully!');
      setFormData({ name: '', price: '', brand: 'Nike', imageUrl: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to create shoe.');
    }
  };

  return (
    <div className="create-shoe-page">
      <h2>Create New Shoe</h2>
      <form onSubmit={handleSubmit} className="create-shoe-form">
        <input type="text" name="name" placeholder="Shoe Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <select name="brand" value={formData.brand} onChange={handleChange}>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
        </select>
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        <button type="submit">Create Shoe</button>
      </form>
    </div>
  );
};

export default CreateShoe;
