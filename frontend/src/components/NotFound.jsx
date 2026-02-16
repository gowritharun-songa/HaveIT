import { useNavigate } from "react-router-dom";

function NotFound() {

  const navigate = useNavigate();

  return(
    <div className="not-found-container">
      <div className="main-container">
        <h3>
            No Merchants Found
        </h3>

        <button onClick={() => navigate('/merchant-auth')}>
            Become one
        </button>

      </div>
    </div>
  );
}

export default NotFound;