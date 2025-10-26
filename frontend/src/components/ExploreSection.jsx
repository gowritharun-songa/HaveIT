import React from 'react';
import { Link } from 'react-router-dom';

const ExploreSection = () => {
  return (
    <section className="explore-section">
      {/* Link 1 */}
      <Link to="/browse" className="explore-card">
        <h3 className="explore-title">Browse Crafts</h3>
      </Link>

      {/* Link 2 */}
      <Link to="/artisans" className="explore-card">
        <h3 className="explore-title">Featured Artisans</h3>
      </Link>

      {/* Link 3 */}
      <Link to="/support" className="explore-card">
        <h3 className="explore-title">Support</h3>
      </Link>
    </section>
  );
};

export default ExploreSection;