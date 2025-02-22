import React, { useState } from 'react';
import api from '../api';

export default function Login({
  _emailID = '',
  _password = '',
  onSuccessfulLogin
}) {
  const [loginData, setUser] = useState({
    emailID: _emailID, 
    password: _password,
  });

  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
        const response = await api.post('/api/user/login', {
            email: loginData.emailID, 
            password: loginData.password,
          });

        // Save the JWT token to localStorage
        localStorage.setItem('token', response.data.token);
        console.log('JWT Token:', response.data.token);

          const userId = response.data.user.id;

          if (onSuccessfulLogin) {
            onSuccessfulLogin(userId);
          }
        } catch (error) {
    alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="form">
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={loginData.emailID}
          onChange={(e) => setUser({ ...loginData, emailID: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setUser({ ...loginData, password: e.target.value })}
        />
        <br/>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}