import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MerchantAuth from './pages/MerchantAuth';
import MerchantForm from './pages/MerchantForm';
import MerchantDetail from './pages/MerchantDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/merchant-auth' element={<MerchantAuth />} />
        <Route path='/merchant-form' element={<MerchantForm />} />
        <Route path='/merchant/:id' element={<MerchantDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App