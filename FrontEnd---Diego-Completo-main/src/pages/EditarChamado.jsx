import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function EditarChamado() {
  const { id } = useParams();
  const [chamado, setChamado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarChamado = async () => {
      try {
        const res = await api.get(`/chamados/${id}`);
        setChamado(res.data);
      } catch {
        alert("Erro ao carregar chamado");
        navigate("/chamados");
      }
    };
    carregarChamado();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/chamados/${id}`, chamado);
      alert("Chamado atualizado com sucesso!");
      navigate("/chamados");
    } catch {
      alert("Erro ao atualizar chamado");
    }
  };

  if (!chamado) return <div className="app-container"><p style={{textAlign: 'center'}}>Carregando dados...</p></div>;

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="page-title" style={{ margin: 0, fontSize: '1.5rem', textAlign: 'left' }}>Editar Chamado</h2>
              <span className="badge" style={{ background: '#e2e8f0' }}>#{id}</span>
            </div>
            
            <div className="form-group">
               <label>Título</label>
               <input className="input" value={chamado.titulo} onChange={e => setChamado({ ...chamado, titulo: e.target.value })} />
            </div>
            
            <div className="form-group">
              <label>Descrição</label>
              <textarea className="input" rows="5" value={chamado.descricao} onChange={e => setChamado({ ...chamado, descricao: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Status Atual</label>
              <select className="input" value={chamado.status} onChange={e => setChamado({ ...chamado, status: e.target.value })}>
                <option value="aberto">Aberto</option>
                <option value="em andamento">Em andamento</option>
                <option value="fechado">Fechado</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn--ghost" onClick={() => navigate("/chamados")}>Voltar</button>
              <button type="submit" className="btn btn--primary">Salvar Alterações</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}