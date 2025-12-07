import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function TodosChamados() {
  const [chamados, setChamados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ status: "" });

  const carregarChamados = async () => {
    try {
      const res = await api.get("/chamados/todos");
      setChamados(res.data);
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao carregar chamados");
    }
  };

  useEffect(() => { carregarChamados(); }, []);

  const deletarChamado = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este chamado?")) return;
    try {
      await api.delete(`/chamados/${id}`);
      alert("Chamado excluído com sucesso!");
      carregarChamados();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao excluir chamado");
    }
  };

  const editarChamado = (chamado) => {
    setEditando(chamado.id);
    setForm({ status: chamado.status });
  };

  const salvarEdicao = async (id) => {
    try {
      await api.put(`/chamados/${id}`, form);
      alert("Status atualizado com sucesso!");
      setEditando(null);
      carregarChamados();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao atualizar status");
    }
  };

  const getStatusBadge = (status) => {
    const map = { aberto: 'badge-status-aberto', 'em andamento': 'badge-status-andamento', concluido: 'badge-status-concluido', fechado: 'badge-status-fechado' };
    return `badge ${map[status] || ''}`;
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <h2 className="page-title">Painel Técnico - Todos os Chamados</h2>

        {chamados.length === 0 ? (
          <p style={{textAlign: 'center'}}>Nenhum chamado encontrado.</p>
        ) : (
          <ul className="chamado-list">
            {chamados.map((c) => (
              <li key={c.id} className="chamado-item">
                
                {/* Informações (Esquerda) */}
                <div className="chamado-info">
                   <h3>{c.titulo}</h3>
                   <p className="chamado-desc">{c.descricao}</p>
                   <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                      <strong>Categ:</strong> {c.categoria} | <strong>Prioridade:</strong> {c.prioridade}
                   </div>
                </div>

                {/* Status e Edição (Direita) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    {editando === c.id ? (
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                         <select className="input" style={{ padding: '0.4rem', marginBottom: 0 }} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                            <option value="aberto">Aberto</option>
                            <option value="em andamento">Em Andamento</option>
                            <option value="concluido">Concluído</option>
                         </select>
                         <button onClick={() => salvarEdicao(c.id)} className="btn btn--primary btn--sm">OK</button>
                         <button onClick={() => setEditando(null)} className="btn btn--ghost btn--sm">X</button>
                      </div>
                    ) : (
                      <span className={getStatusBadge(c.status)}>{c.status}</span>
                    )}
                </div>

                {/* Botões de Ação */}
                <div className="chamado-actions">
                  {editando !== c.id && (
                     <button onClick={() => editarChamado(c)} className="btn btn--primary btn--sm">Mudar Status</button>
                  )}
                  <button onClick={() => deletarChamado(c.id)} className="btn btn--danger btn--sm">Excluir</button>
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}