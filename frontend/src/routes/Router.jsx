import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
  )
}

export default Router;
