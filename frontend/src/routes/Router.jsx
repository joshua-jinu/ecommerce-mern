import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/SignUp'
import Home from '../pages/Home';
import ProductEntry from '../pages/ProductEntry';
import UpdateEntry from '../pages/updateEntry';
import SingleProductPage from '../pages/SingleProductPage';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import AddAddress from '../pages/AddAddress';
import SelectAddress from '../pages/SelectAddress';
import OrderConfirmation from '../pages/OrderConfirmation';
import OrderHistory from '../pages/OrderHistory';

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
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path='/add-address' element={<AddAddress/>}/>
      <Route path='/select-address' element={<SelectAddress/>}/>
      <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
      <Route path='/orders' element={<OrderHistory/>}/>
    </Routes>
  )
}

export default Router;
