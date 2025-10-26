import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import '../styles/Card.css';

const Card = ({ merchant }) => {
  return (
    <Link to={`/merchant/${merchant._id}`} className="card-link">
      <div className="card-image-placeholder">
        <Camera size={48} strokeWidth={1.5} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{merchant.businessName}</h3>
        <p className="card-field">{merchant.field}</p>
        <p className="card-description">
          {merchant.description.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
};

export default Card;