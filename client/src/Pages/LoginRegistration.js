import React, { useState } from 'react'
import Header from '../Components/Header';
import Register from '../Components/Register';
import Login from '../Components/Login';
import {useNavigate } from 'react-router-dom';

export default function SignupForm() {

  const[isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate(); 

  let handleLoginClick = (userId) => {
    navigate(`/user/${userId}`);
  }; 

  const handleForgotPasswordClick = () => {
    navigate('/forgotpassword'); 
  }; 

  const handleRegistrationSuccess = () => {
    setIsLogin(true); 
  }; 

  return (
    <>
    <Header/>
    <div className='container'>
        <div className='form-container'>
            <div className='form-toggle'>
                <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
                <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>
            {isLogin ? <>
            {/* Login Form */}
            <div className='form'>
              <Login onSuccessfulLogin={handleLoginClick} />
              </div>
            </> : 
            <>
            {/* Signup Form */}
            <div className='form'>
              <Register onRegistrationSuccess={handleRegistrationSuccess} />
            </div>
            </>
            }
        </div>
    </div>
    </>
  )
} 
