import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/SignUp'
import Home from '../pages/Home';
import ProductEntry from '../pages/ProductEntry';
import UpdateEntry from '../pages/updateEntry';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/product-entry" element={<ProductEntry/>}></Route>
      <Route path="/product-update/:id" element={<UpdateEntry/>}></Route>
    </Routes>
  )
}

export default Router;
