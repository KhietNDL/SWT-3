import axios from "axios";

// Set config defaults when creating the instance
const api = axios.create({
    baseURL: 'https://reqres.in/api/'
  });
  
// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;