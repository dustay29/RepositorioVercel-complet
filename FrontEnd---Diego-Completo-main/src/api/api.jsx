// src/api/api.js (Código Final Corrigido)

import axios from "axios";

const api = axios.create({
  // CORREÇÃO CRÍTICA: Removido "http://localhost:3000".
  // Usando "" (string vazia) ou "/" o Axios usará o domínio atual do Vercel
  // como base, e a chamada será resolvida pela sua Serverless Function.
  baseURL: "/", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
