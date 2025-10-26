import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import MerchantAuth from './pages/MerchantAuth';
import MerchantForm from './pages/MerchantForm';
import MerchantDetail from './pages/MerchantDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/merchant-auth" element={<MerchantAuth />} />
          <Route path="/merchant-form" element={<MerchantForm />} />
          <Route path="/merchant/:id" element={<MerchantDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;