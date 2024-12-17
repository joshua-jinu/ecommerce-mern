import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/SignUp'
import Home from '../pages/Home';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
  )
}

export default Router;
