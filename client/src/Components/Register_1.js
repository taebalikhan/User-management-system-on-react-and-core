import React, { useState } from 'react';
import axios from 'axios';

export default function Register({_firstName, _lastName, _phoneNo, _email, _password}) {
  const [user, setUser] = useState({ firstName: _firstName, lastName: _lastName, phoneNo: _phoneNo, 
                                        email: _email, password: _password });
  const [userId, setUserId] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/user/register', user);
      setUserId(response.data.id);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
}