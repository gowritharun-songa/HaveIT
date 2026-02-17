import { ArrowRight, Camera } from "lucide-react"; // ← changed to ArrowRight (more natural for "view more")
import { Link } from "react-router-dom";
import '../styles/MerchantCard.css';

const MerchantCard = ({ merchant }) => {
  const hasImage = merchant.images && merchant.images.length > 0;
  const firstImage = hasImage ? merchant.images[0] : null;

  // Optional: fallback placeholder if you want something prettier than just icon
  const placeholderBg = "linear-gradient(135deg, #6b46c1 0%, #9f7aea 100%)";

  return (
    <Link to={`/merchant/${merchant._id}`} className="card-link">
      <div className="merchant-card">
        <div className="card-image-wrapper">
          {hasImage ? (
            <img
              src={firstImage}
              alt={merchant.businessName || "Merchant"}
              className="card-image"
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder" style={{ background: placeholderBg }}>
              <Camera size={48} strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="card-content">
          <h3 className="card-title">{merchant.businessName || "Unnamed Business"}</h3>
          
          {merchant.field && (
            <div className="category-tag">{merchant.field}</div>
          )}

          <p className="card-description">
            {merchant.description
              ? merchant.description.substring(0, 110) + (merchant.description.length > 110 ? "..." : "")
              : "No description available."}
          </p>

          <div className="card-footer">
            <span className="read-more">View Details</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MerchantCard;