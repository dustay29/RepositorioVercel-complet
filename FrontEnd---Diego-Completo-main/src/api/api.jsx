// src/api/api.js

import axios from "axios";

// ** CORREÇÃO FINAL **: URL do seu Serviço Web (Back-end) no Render.
const BACKEND_URL = "https://repositoriovercel-complet.onrender.com"; 

const api = axios.create({
  baseURL: BACKEND_URL, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
