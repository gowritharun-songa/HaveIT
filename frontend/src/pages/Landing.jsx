import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';

import Card from '../components/Card';
import Footer from '../components/Footer';
import '../styles/Landing.css';

import api from '../lib/axios.js'

const Landing = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const fetchMerchants = async () => {
      const {data} = await api.get('/merchants');
      setMerchants(data);
    }
    fetchMerchants();
  }, [])

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
