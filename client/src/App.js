import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './Pages/LoginRegistration';
import Home from './Pages/Home';
import ForgotPassword from './Pages/ForgotPassword';
import DisplayAll from './Pages/DisplayAll';
import UserDetails from './Pages/UserDetails';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignupForm />} />
      <Route path='/home' element={<Home />} />
      <Route path='/DisplayAll' element={<DisplayAll />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path="/user/:userId" element={<UserDetails />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
