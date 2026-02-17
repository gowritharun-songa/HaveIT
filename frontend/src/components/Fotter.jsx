import { Facebook, Instagram, Twitter, Mail, Heart, Phone } from 'lucide-react';

import '../styles/Fotter.css';

function Footer() {
  return(
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">Have IT</h3>
          <p className="footer-tagline">Where Craft Meets Customer</p>
          <p className="footer-description">
            Connecting passionate artisans with customers who value authentic craftsmanship.
          </p>
          <div className="social-links">
            <a href='#' className='social-icon' aria-label='phone'>
              <Phone size={20} />
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
             <Facebook size={20} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon" aria-label="Email">
              <Mail size={20} />
            </a>
        </div>
    </div>

    <div className="footer-section">
      <h4 className="footer-title">Explore</h4>
      <div className="footer-links">
        <p>Browse Crafts</p>
        <p>Featured Artisans</p>
        <p>How It Works</p>
      </div>
    </div>

    <div className="footer-section">
      <h4 className="footer-title">For Artisans</h4>
    <div className="footer-links">
      <p>Become a Seller</p>
      <p>Merchant Resources</p>
      <p>Success Stories</p>
      <p>Pricing</p>
      <p>Seller Support</p>
    </div>
    </div>

    <div className="footer-section">
        <h4 className="footer-title">Support</h4>
          <div className="footer-links">
            <p>Contact Us 
            </p>
            <p>FAQ</p>
            <p>Shipping & Returns</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
            </div>
        </div>
    </div>

    <div className="footer-bottom">
        <p className="copyright">
        © 2025 Have IT. Made with <Heart size={14} fill="#ff6b6b" color="#ff6b6b" className="heart-icon" /> for artisans and craft lovers.
        </p>
    </div>
    </footer>
    );
}

export default Footer;