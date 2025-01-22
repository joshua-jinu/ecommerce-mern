import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/SignUp'
import Home from '../pages/Home';
import ProductEntry from '../pages/ProductEntry';
import UpdateEntry from '../pages/updateEntry';
import SingleProductPage from '../pages/SingleProductPage';
import Cart from '../pages/Cart';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/product-entry-page" element={<ProductEntry/>}></Route>
      <Route path="/product-update/:id" element={<UpdateEntry/>}></Route>
      <Route path="/product-details/:id" element={<SingleProductPage/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/profile" element={<h1>Profile</h1>}></Route>
    </Routes>
  )
}

export default Router;
