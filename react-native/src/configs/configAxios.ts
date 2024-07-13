import axios from 'axios';
import Config from 'react-native-config';
const api = axios.create({
  baseURL: 'https://server-shopee3.onrender.com/api/client',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
  },
});
const instance = axios.create();

instance.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

export default api