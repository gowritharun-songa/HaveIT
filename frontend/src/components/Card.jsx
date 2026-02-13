import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

const Card = ({ merchant }) => {
  const hasImage = merchant.images && merchant.images.length > 0;
  const firstImage = hasImage ? merchant.images[0] : null;
  
  return (
    <Link to={`/merchant/${merchant._id}`} className="card-link">
      <div className="card">
        <div className="card-image-wrapper">
          {hasImage ? (
            <img
              src={firstImage}
              alt={merchant.businessName}
              className="card-image"
              loading="lazy"
            />
          ) : (
            <div className="card-image-placeholder">
              <div className="placeholder-icon">✨</div>
            </div>
          )}
          
          <div className="card-image-overlay"></div>
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{merchant.businessName}</h3>
          <p className="card-field">{merchant.field}</p>
          <p className="card-description">
            {merchant.description.substring(0, 120)}...
          </p>
          <span className="card-read-more">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;