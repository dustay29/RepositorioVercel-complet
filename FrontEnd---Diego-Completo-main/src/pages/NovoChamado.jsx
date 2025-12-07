import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function NovoChamado() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [prioridade, setPrioridade] = useState("baixa");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/chamados", { titulo, descricao, categoria, prioridade });
      alert("Chamado criado com sucesso!");
      navigate("/chamados");
    } catch {
      alert("Erro ao criar chamado");
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <h2 className="page-title" style={{ textAlign: 'left' }}>Abrir Novo Chamado</h2>
            
            <div className="form-group">
              <label>Título do Problema</label>
              <input className="input" placeholder="Ex: Computador não liga" value={titulo} onChange={e => setTitulo(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <input className="input" placeholder="Ex: Hardware, Software, Rede" value={categoria} onChange={e => setCategoria(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Prioridade</label>
              <select className="input" value={prioridade} onChange={e => setPrioridade(e.target.value)}>
                <option value="baixa">🔵 Baixa</option>
                <option value="media">🟡 Média</option>
                <option value="alta">🔴 Alta</option>
              </select>
            </div>

            <div className="form-group">
              <label>Descrição Detalhada</label>
              <textarea className="input" rows="5" placeholder="Descreva o que aconteceu..." value={descricao} onChange={e => setDescricao(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
               <button type="button" className="btn btn--ghost" onClick={() => navigate('/chamados')}>Cancelar</button>
               <button type="submit" className="btn btn--primary">Criar Chamado</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}