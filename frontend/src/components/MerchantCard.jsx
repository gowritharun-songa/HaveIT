import { ArrowLeft, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const MerchantCard = ({merchant}) => {

  const hasImage = merchant.images && merchant.images.length > 0;
  const firstOne = hasImage ? merchant.images[0] : null;

  return (
    <Link to={`/merchant/${merchant._id}`} className="card-link">
      <div className="main-container">
        <div className="content-container">
          <div className="image-holder">
            {hasImage ? (
              <img 
                src={firstOne}
                alt={merchant.businessName}
                className="car-image"
                loading="lazy"
                height={320}
                width={540}
              />
            ) : (
              <Camera size={24}/>
            )}
          </div>

          <div className="card-content">
            <h3 className="card-title">
              {merchant.businessName}
            </h3>
            <p className="merchant-fiels">{merchant.field}</p>
            <p className="merchant-description">
              {merchant.description.substring(0, 90)} ...
            </p>
            <span className="card-read-more">View Details <ArrowLeft size={4}/></span>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default MerchantCard;