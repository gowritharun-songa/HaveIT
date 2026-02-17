import { useNavigate } from "react-router-dom";
import { SearchX, Store, ArrowRight } from "lucide-react"; // add these icons

import '../styles/NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="icon-wrapper">
          <SearchX size={80} strokeWidth={1.2} />
        </div>

        <h1 className="not-found-title">No Merchants Found</h1>
        
        <p className="not-found-message">
          It looks like there are no artisans or shops matching your search yet.<br />
          Be the first to bring your unique craft to our community!
        </p>

        <div className="not-found-actions">
          <button 
            className="btn-primary"
            onClick={() => navigate('/merchant-auth')}
          >
            <Store size={18} />
            Become a Merchant
          </button>

          <button 
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;