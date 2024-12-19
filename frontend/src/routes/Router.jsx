import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/SignUp'
import Home from '../pages/Home';
import ProductEntry from '../pages/ProductEntry';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/product-entry-page" element={<ProductEntry/>}></Route>
    </Routes>
  )
}

export default Router;
