
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        Have IT
      </Link>
      <Link to="/merchant-auth">
        <button className="merchant-button">
          Merchant?
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;