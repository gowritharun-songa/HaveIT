import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div>
      <header className="main-header">
        <div className="header-container">
          <div className="heading">
            <h1>Have IT</h1>
          </div>
        </div>

        <div className="btn-container">
          <div className="merch-btn">
            <button
            onClick={() => {navigate('/merchant-auth')
            }}>
                Merchant?</button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar;