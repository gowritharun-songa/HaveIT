import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MerchantForm.css'

const MerchantForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    field: '',
    description: '',
    howTheyCharge: '',
    specialities: '',
    contactNumber: ''
  });
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataToSend = new FormData();
  Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
  images.forEach(image => formDataToSend.append('images', image));
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  console.log('FormData to send:');
  for (let pair of formDataToSend.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  try {
    await axios.post('https://haveit-p7ev.onrender.com/api/merchants/create', formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
    });
    setSubmitted(true);
  } catch (err) {
    console.error('Axios error:', err);
    alert('Error submitting form: ' + (err.message || 'Unknown error'));
  }
};

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  if (submitted) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-message">
          <h2 className="confirmation-title">📞 Clients can consult with you directly!</h2>
          <p className="confirmation-text">
            Once approved, customers will be able to contact you to discuss custom orders and ask questions about your craft.
          </p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="merchant-form">
        <h2 className="form-title">Merchant Form</h2>
        <input
          type="text"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Field (e.g., Photography)"
          value={formData.field}
          onChange={(e) => setFormData({ ...formData, field: e.target.value })}
          className="form-input"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-textarea"
          required
        />
        <input
          type="text"
          placeholder="How they charge (e.g., pricing or hourly rate)"
          value={formData.howTheyCharge}
          onChange={(e) => setFormData({ ...formData, howTheyCharge: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Specialities"
          value={formData.specialities}
          onChange={(e) => setFormData({ ...formData, specialities: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="form-input"
          required
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MerchantForm;
