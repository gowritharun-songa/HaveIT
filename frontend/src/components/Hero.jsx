import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Have IT</h1>
      <p className="hero-tagline">where craft meets customer</p>
      <p className="hero-description">
        We bridge the gap between passionate artisans and customers who value authentic craftsmanship.
        Browse stunning handmade pieces, or work directly with merchants to bring your custom design vision to life.
        Quality, creativity, and connection — all in one place.
      </p>
    </section>
  );
};

export default Hero;