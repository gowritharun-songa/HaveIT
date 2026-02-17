import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import api from "../lib/axios.js";

import toast from "react-hot-toast";

import '../styles/MerchantDetail.css';


const MerchantDetail = () => {
  const { id } = useParams();
  const [merchant, setMerchant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchRecord = async() => {
      try {
        const responce = await api.get(`/merchants/${id}`);
        const data = responce.data;
        setMerchant(data);
      } catch(error) {
        console.log("Couldn't fetch the merchant", error.message);
        toast.error("Merchant not Found");
      }
    }
    fetchRecord();
  }, [id]);

  if (!merchant) {
    return (
      <div className="detail-loading">
        Loading...
      </div>
    );
  }

  const hasImages = merchant.images && merchant.images.length > 0;
  const mainImage = hasImages ? merchant.images[0] : null;
  const thumbnailImages = hasImages ? merchant.images.slice(1) : [];

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/')} className="detail-back-button">
        <ArrowLeft />
        <span className='back-to-home'>Back</span>
      </button>

      <div className="detail-card">
        <div className="detail-content-wrapper">
          <div className="detail-image-section">
            {hasImages ? (
              <img
                src={mainImage}
                alt={merchant.businessName}
                className="detail-main-image"
                loading="lazy"
              />
            ) : (
              <div className="detail-image-placeholder">
                <Camera size={64} strokeWidth={1.5} />
              </div>
            )}
            {thumbnailImages.length > 0 && (
              <div className="detail-thumbnails">
                {thumbnailImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${merchant.businessName} thumbnail ${index + 2}`}
                    className="detail-thumbnail"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="detail-info-section">
            <h1 className="detail-title">{merchant.businessName}</h1>
            <p className="detail-field">{merchant.field}</p>
            <p className="detail-description">{merchant.description}</p>

            <div className="detail-info-item">
              <strong>How we charge:</strong> {merchant.howTheyCharge}
            </div>
            <div className="detail-info-item">
              <strong>Specialities:</strong> {merchant.specialities}
            </div>
            <div className="detail-info-item">
              <strong>Contact no:</strong> {merchant.contactNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetail;