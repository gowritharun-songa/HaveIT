import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

import api from '../lib/axios.js';
import NotFound from '../components/NotFound.jsx';
import MerchantCard from '../components/MerchantCard.jsx';
import { useEffect, useState } from 'react';
import Footer from '../components/Fotter.jsx';

function Home() {

  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const fetchMerchants = async() => {
      try {
        const responce = await api.get('/merchants');
        const data = responce.data;
        console.log(data);
        setMerchants(data);
      } catch(error) {
        console.log("Unable to fetch merchants", error.message);
      }
    }
    fetchMerchants();
  }, []);

  return(<>
    <Navbar />
    <Hero />

    <section className="main-content">
      <div className="container">
        <div className="section-content">
          <h2 className="title">Featured Merchants</h2>
            {merchants.length === 0 ? (<NotFound />) : (
              merchants.map((merchant, index) => (
                <MerchantCard key={index} merchant={merchant} />
              ))
            )}
        </div>
      </div>
    </section>

    <Footer />

  </>)
}

export default Home;