import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Puerto de tu backend

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api; 