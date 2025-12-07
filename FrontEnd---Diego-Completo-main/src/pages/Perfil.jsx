import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Perfil() {
  const { usuario, logout } = useContext(AuthContext);
  const [dados, setDados] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const carregarPerfil = async () => {
      if (!usuario) return;
      try {
        const token = localStorage.getItem("token");
        const resposta = await api.get(`/usuarios/${usuario.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setDados(resposta.data);
        setNome(resposta.data.nome);
        setEmail(resposta.data.email);
      } catch (erro) {
        console.error("Erro ao buscar perfil:", erro);
      }
    };
    carregarPerfil();
  }, [usuario]);

  const handleAtualizar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(`/usuarios/${usuario.id}`, { nome, email, senha }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Perfil atualizado com sucesso!");
      setSenha("");
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao atualizar perfil");
    }
  };

  const handleDeletar = async () => {
    if (!window.confirm("Tem certeza que deseja deletar sua conta?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/usuarios/${usuario.id}`, { headers: { Authorization: `Bearer ${token}` } });
      alert("Conta deletada com sucesso!");
      logout();
      navigate("/login");
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao deletar conta");
    }
  };

  if (!dados) return <div className="app-container"><p style={{textAlign:'center'}}>Carregando perfil...</p></div>;

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="card" style={{ maxWidth: 500, margin: "0 auto" }}>
          <h2 className="page-title">Meu Perfil</h2>

          <form onSubmit={handleAtualizar}>
            <div className="form-group">
               <label>Nome</label>
               <input className="input" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="form-group">
               <label>Email</label>
               <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
               <label>Alterar Senha</label>
               <input className="input" type="password" placeholder="Deixe em branco para manter a atual" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>

            <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '1rem' }}>
              Salvar Alterações
            </button>
          </form>

          <hr style={{ margin: "2rem 0", border: '0', borderTop: '1px solid var(--border)' }} />

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Zona de Perigo</p>
            <button onClick={handleDeletar} className="btn btn--danger" style={{ width: '100%' }}>
              Excluir Minha Conta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}