import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, senha });
      login(res.data.usuario, res.data.token);
      navigate("/chamados");
    } catch (err) {
      alert(err.response?.data?.mensagem || "Erro ao logar");
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="page-title" style={{ marginBottom: '1rem' }}>Bem-vindo</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Faça login para acessar o sistema</p>

          <div className="form-group">
            <label>Email</label>
            <input
              className="input"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              className="input"
              placeholder="••••••••"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
            Entrar
          </button>

          <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Não tem conta? </span>
            <Link to="/register" style={{ color: "var(--primary)", fontWeight: "600" }}>
              Crie uma agora
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}