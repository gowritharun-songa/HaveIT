import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios.js';
import '../styles/MerchantAuth.css';

const MerchantAuth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', contactNumber: '' });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const endpoint = isSignup ? '/signup' : '/login';
      const res = await api.post(`/auth${endpoint}`, formData);
      localStorage.setItem('token', res.data.token);
      navigate('/merchant-form');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error signing up');
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-heading">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="auth-input"
                required
              />
              <input
                type="tel"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="auth-input"
                required
              />
            </>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="auth-input"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="auth-input"
            required
          />
          
          <button type="submit" className="auth-submit-button">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        <p className="auth-toggle-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="auth-toggle-button"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default MerchantAuth;