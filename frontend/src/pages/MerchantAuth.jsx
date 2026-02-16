import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const MerchantAuth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: ''});
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form data:', formData);
    const endpoint = isSignup ? '/signup' : '/login';
    try {
      const res = await api.post(`/auth${endpoint}`, formData);
      localStorage.setItem('token', res.data.token);
      navigate('/merchant-form');
    } catch (err) {
      
      toast.error(() => `Unable to ${endpoint === isSignup ? "Login": "Sing Up"}`);
      console.log(err);
      console.log(err.message);
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