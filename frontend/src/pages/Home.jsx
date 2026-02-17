import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Fotter';          
import MerchantCard from '../components/MerchantCard';
import NotFound from '../components/NotFound';

import api from '../lib/axios';
import '../styles/Home.css';                        

function Home() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);     

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await api.get('/merchants');
        setMerchants(response.data);
        console.log("Merchants loaded:", response.data);
      } catch (error) {
        console.error("Unable to fetch merchants:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Merchants</h2>

          {loading ? (
            <div className="loading">Loading artisans...</div>
          ) : merchants.length === 0 ? (
            <NotFound />
          ) : (
            <div className="merchants-grid">
              {merchants.map((merchant) => (
                <MerchantCard key={merchant._id} merchant={merchant} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;