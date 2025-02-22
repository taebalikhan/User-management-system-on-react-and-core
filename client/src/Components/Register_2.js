import React, { useState } from 'react';
import axios from 'axios';

export default function Register({
  _firstName = '',
  _lastName = '',
  _phoneNo = '',
  _email = '',
  _password = '',
  onRegistrationSuccess, // Function to call on successful registration
}) {
  const [user, setUser] = useState({
    firstName: _firstName,
    lastName: _lastName,
    phoneNo: _phoneNo,
    email: _email,
    password: _password,
  });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
        const response = await axios.post('http://localhost:5001/api/user/register', {
            user: user, // Wrap the user object in a "user" field
          });
      setUserId(response.data.id);
      setError(''); // Clear any previous errors
      alert('User registered successfully!');

      // Call the onRegistrationSuccess function to switch back to the login form
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register user. Please try again.');
    }
  };

  return (
    <div className="form">
      <h2>Signup Form</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={user.phoneNo}
          onChange={(e) => setUser({ ...user, phoneNo: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
      {userId && <p>User registered with ID: {userId}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}