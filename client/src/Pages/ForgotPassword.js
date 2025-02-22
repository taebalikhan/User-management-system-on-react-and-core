import React from "react";
import Header from "../Components/Header";
import {useNavigate } from 'react-router-dom'

export default function Home(){
    const navigate = useNavigate(); 
    
    const handleLoginClick = () => {
        navigate('/'); 
      }; 

    return(
        <>
        <Header/>
        <div className='container'>
        <div className='form-container'>
        <h2 className="forgotpassword">Change Password</h2>
        <div className='form'>
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" title="New password" />

            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" title="Confirm new password" />

            <p class="form-actions">
            <button id='submit' onClick={handleLoginClick}>Change Password</button>
            </p>
            </div>
            </div>
            </div>
        </>
    )
}