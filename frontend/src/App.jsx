import { Routes, Route } from 'react-router-dom';
import Router from './routes/Router';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Router/>
    </>
  )
}

export default App;
