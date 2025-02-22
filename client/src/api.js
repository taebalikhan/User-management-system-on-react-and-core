import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request Headers:', config.headers); 
  return config;
});

export default api;