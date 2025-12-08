// src/api/api.js

import axios from "axios";

// O Vite lê a variável VITE_APP_API_URL que você configurou no painel do Render
const API_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  // A baseURL agora aponta para a URL pública do seu Serviço Web (Back-end) no Render
  baseURL: API_URL, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
