import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("usuario");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios", { nome, email, senha, perfil });
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.mensagem || "Erro ao cadastrar");
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '480px' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="page-title">Criar Conta</h2>
          
          <div className="form-group">
            <label>Nome Completo</label>
            <input className="input" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className="input" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input className="input" type="password" placeholder="Crie uma senha forte" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Tipo de Perfil</label>
            <select className="input" value={perfil} onChange={(e) => setPerfil(e.target.value)}>
              <option value="usuario">Usuário Comum</option>
              <option value="tecnico">Técnico</option>
            </select>
          </div>

          <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
            Cadastrar
          </button>

          <button
            type="button"
            className="btn btn--ghost"
            style={{ width: '100%', marginTop: "1rem" }}
            onClick={() => navigate("/")}
          >
            Voltar para Login
          </button>
        </form>
      </div>
    </div>
  );
} 