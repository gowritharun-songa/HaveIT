import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ExploreSection from '../components/ExploreSection';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../styles/Landing.css';

const Landing = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    axios.get('https://haveit-p7ev.onrender.com/api/merchants')
      .then(res => setMerchants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Hero />
      <section className="landing-section">
        <h2 className="landing-heading" style={{color: "#1a0d3d"}}>Featured Merchants</h2>
        <div className="merchant-grid">
          {merchants.map(merchant => (
            <Card key={merchant._id} merchant={merchant} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Landing;
