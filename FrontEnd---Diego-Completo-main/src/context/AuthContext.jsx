// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem("usuario"));
      setUsuario(userData);
    }
  }, [token]);

  const login = (dados, jwt) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem("usuario", JSON.stringify(dados));
    setUsuario(dados);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.clear();
    setUsuario(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
