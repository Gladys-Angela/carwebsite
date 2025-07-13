import axios from 'axios';

// Updated API configuration for production deployment
const api = axios.create({
  baseURL: 'https://carwebsite-1-fnsd.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
