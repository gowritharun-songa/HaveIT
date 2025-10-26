import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Removed: import '../styles/MerchantAuth.css'; 

const MerchantAuth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', contactNumber: '' });
  const navigate = useNavigate();

  // --- Color Palette ---
  const DEEP_PURPLE = '#1a0d3d'; // The primary dark color
  const WHITE = '#ffffff';      // The background and text contrast color
  const ACCENT_PURPLE = '#4a258a'; // A slightly lighter purple for hover/focus
  const BORDER_COLOR = '#e5e7eb';  // Light border color

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData); // Debug
    try {
      const endpoint = isSignup ? '/signup' : '/login';
      const res = await axios.post(`http://localhost:5000/api/auth${endpoint}`, formData);
      localStorage.setItem('token', res.data.token);
      navigate('/merchant-form');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error signing up');
    }
  };

  return (
    // 1. Container: Full screen background, centered content
    <div 
      className="auth-container" 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: DEEP_PURPLE, // Deep purple background
      }}
    >
      {/* 2. Auth Box: The white, floating card */}
      <div 
        className="auth-box"
        style={{
          backgroundColor: WHITE,
          padding: '2.5rem',
          borderRadius: '12px',
          boxShadow: `0 20px 25px -5px rgba(26, 13, 61, 0.4), 0 8px 10px -6px rgba(26, 13, 61, 0.2)`,
          width: '100%',
          maxWidth: '400px', // Standard form size
        }}
      >
        {/* 3. Heading */}
        <h2 
          className="auth-heading"
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: DEEP_PURPLE,
          }}
        >
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              {/* Name Input */}
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                // Replaced Tailwind with inline styles for full width, padding, border, and margin
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: `1px solid ${BORDER_COLOR}`,
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  boxSizing: 'border-box',
                }}
                required
              />
              {/* Contact Number Input */}
              <input
                type="tel"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: `1px solid ${BORDER_COLOR}`,
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  boxSizing: 'border-box',
                }}
                required
              />
            </>
          )}
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              width: '100%',
              padding: '1rem',
              border: `1px solid ${BORDER_COLOR}`,
              borderRadius: '6px',
              marginBottom: '1rem',
              boxSizing: 'border-box',
            }}
            required
          />
          
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{
              width: '100%',
              padding: '1rem',
              border: `1px solid ${BORDER_COLOR}`,
              borderRadius: '6px',
              marginBottom: '1.5rem',
              boxSizing: 'border-box',
            }}
            required
          />
          
          {/* Submit Button */}
          <button 
            type="submit" 
            // The button styles are defined directly
            style={{
              width: '100%',
              backgroundColor: DEEP_PURPLE,
              color: WHITE,
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            // Note: Inline styles don't easily support ':hover'. You'd use a CSS module
            // or a CSS-in-JS library for clean hover states in a real app.
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        {/* Toggle Text */}
        <p 
          className="auth-toggle-text"
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: DEEP_PURPLE,
          }}
        >
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          
          {/* Toggle Button */}
          <button 
            onClick={() => setIsSignup(!isSignup)} 
            className="auth-toggle-button"
            style={{
              background: 'none',
              border: 'none',
              color: ACCENT_PURPLE, // Use the accent for the link
              cursor: 'pointer',
              fontWeight: 'bold',
              marginLeft: '0.5rem',
              padding: '0',
            }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default MerchantAuth;