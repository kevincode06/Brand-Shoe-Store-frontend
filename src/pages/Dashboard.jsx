import React, { useEffect, useState } from 'react';
import api from '../api/api';
import './Dashboard.css';

const Dashboard = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const res = await api.get('/shoes');
        setShoes(res.data);
      } catch (error) {
        console.error('Failed to fetch shoes', error);
      }
    };
    fetchShoes();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <div className="shoes-grid">
        {shoes.map(shoe => (
          <div key={shoe._id} className="shoe-card">
            <img src={shoe.imageUrl} alt={shoe.name} className="shoe-img"/>
            <h3>{shoe.name}</h3>
            <p>Price: ${shoe.price}</p>
            <p>Brand: {shoe.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
