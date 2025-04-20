import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';
import './ShoeGallery.css';
import axios from 'axios';

const ShoeGallery = () => {
  const [shoes, setShoes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { brand: urlBrand } = useParams();
  const navigate = useNavigate();

  const brands = [
    { id: 'nike', name: 'Nike', logo: '/assets/nike-logo.png' },
    { id: 'adidas', name: 'Adidas', logo: '/assets/adidas-logo.png' },
    { id: 'puma', name: 'Puma', logo: '/assets/puma-logo.png' },
  ];

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        let endpoint = '/api/shoes';
        if (urlBrand) {
          endpoint = `/api/shoes/brand/${urlBrand}`;
          setSelectedBrand(urlBrand);
        } else if (user?.role !== 'super_admin' && user?.brand) {
          endpoint = `/api/shoes/brand/${user.brand}`;
          setSelectedBrand(user.brand);
        }
        
        const { data } = await axios.get(endpoint);
        setShoes(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching shoes:', error);
        setIsLoading(false);
      }
    };

    fetchShoes();
  }, [urlBrand, user]);

  const handleBrandSelect = (brandId) => {
    setSelectedBrand(brandId);
    if (brandId === 'all') {
      navigate('/gallery');
    } else {
      navigate(`/gallery/${brandId}`);
    }
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="shoe-gallery-container">
      <h1 className="gallery-title">Shoe Collection</h1>
      
      {(user?.role === 'super_admin' || !user?.brand) && (
        <div className="brand-filter">
          <button 
            className={`brand-btn ${selectedBrand === 'all' ? 'active' : ''}`}
            onClick={() => handleBrandSelect('all')}
          >
            All Brands
          </button>
          {brands.map(brand => (
            <button
              key={brand.id}
              className={`brand-btn ${selectedBrand === brand.id ? 'active' : ''}`}
              onClick={() => handleBrandSelect(brand.id)}
            >
              <img src={brand.logo} alt={brand.name} className="brand-logo" />
              {brand.name}
            </button>
          ))}
        </div>
      )}

      <div className="shoe-grid">
        {shoes.length > 0 ? (
          shoes.map(shoe => (
            <div key={shoe._id} className="shoe-card">
              <div className="shoe-image-container">
                <img 
                  src={`/assets/${shoe.brand}/${shoe.image}`} 
                  alt={shoe.name} 
                  className="shoe-image"
                />
                {user?.role === 'super_admin' && (
                  <div className="admin-badge">Admin View</div>
                )}
              </div>
              <div className="shoe-details">
                <h3>{shoe.name}</h3>
                <p className="shoe-brand">{shoe.brand}</p>
                <p className="shoe-price">${shoe.price}</p>
                {user && (
                  <button 
                    className="view-details-btn"
                    onClick={() => navigate(`/shoes/${shoe._id}`)}
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-shoes">No shoes found</div>
        )}
      </div>
    </div>
  );
};

export default ShoeGallery;