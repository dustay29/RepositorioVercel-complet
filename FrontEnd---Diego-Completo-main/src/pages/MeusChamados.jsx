import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function MeusChamados() {
  const [chamados, setChamados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ titulo: "", descricao: "", categoria: "", prioridade: "", status: "" });

  const carregarChamados = async () => {
    const res = await api.get("/chamados");
    setChamados(res.data);
  };

  useEffect(() => { carregarChamados(); }, []);

  const deletarChamado = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este chamado?")) return;
    try {
      await api.delete(`/chamados/${id}`);
      alert("Chamado deletado com sucesso!");
      carregarChamados();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao deletar chamado");
    }
  };

  const editarChamado = (chamado) => {
    setEditando(chamado.id);
    setForm({ ...chamado });
  };

  const salvarEdicao = async (id) => {
    try {
      await api.put(`/chamados/${id}`, form);
      alert("Chamado atualizado com sucesso!");
      setEditando(null);
      carregarChamados();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao atualizar chamado");
    }
  };

  // Funções Auxiliares de Estilo
  const getPrioBadge = (prio) => {
    const map = { alta: 'badge-prio-alta', media: 'badge-prio-media', baixa: 'badge-prio-baixa' };
    return `badge ${map[prio] || ''}`;
  };
  
  const getStatusBadge = (status) => {
    const map = { aberto: 'badge-status-aberto', 'em andamento': 'badge-status-andamento', fechado: 'badge-status-fechado' };
    return `badge ${map[status] || ''}`;
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="page-title" style={{ margin: 0 }}>Meus Chamados</h2>
        </div>

        {chamados.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>Você ainda não abriu nenhum chamado.</p>
          </div>
        ) : (
          <ul className="chamado-list">
            {chamados.map((c) => (
              <li key={c.id} className="chamado-item">
                {editando === c.id ? (
                  // MODO EDIÇÃO
                  <div style={{ gridColumn: '1 / -1' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Editando Chamado #{c.id}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group"><label>Título</label><input className="input" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} /></div>
                      <div className="form-group"><label>Categoria</label><input className="input" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} /></div>
                    </div>
                    <div className="form-group"><label>Descrição</label><textarea className="input" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group"><label>Prioridade</label><select className="input" value={form.prioridade} onChange={(e) => setForm({ ...form, prioridade: e.target.value })}><option value="baixa">Baixa</option><option value="media">Média</option><option value="alta">Alta</option></select></div>
                      <div className="form-group"><label>Status</label><select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="aberto">Aberto</option><option value="em andamento">Em andamento</option><option value="fechado">Fechado</option></select></div>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
                      <button onClick={() => salvarEdicao(c.id)} className="btn btn--primary">Salvar</button>
                      <button onClick={() => setEditando(null)} className="btn btn--ghost">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  // MODO VISUALIZAÇÃO
                  <>
                    <div className="chamado-info">
                      <h3>{c.titulo}</h3>
                      <p className="chamado-desc">{c.descricao}</p>
                    </div>
                    
                    <div className="chamado-meta">
                      <div className="meta-row"><strong>Categ:</strong> {c.categoria}</div>
                      <div className="meta-row"><strong>Status:</strong> <span className={getStatusBadge(c.status)}>{c.status}</span></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <span className={getPrioBadge(c.prioridade)}>{c.prioridade}</span>
                    </div>

                    <div className="chamado-actions">
                      <button onClick={() => editarChamado(c)} className="btn btn--primary btn--sm">Editar</button>
                      <button onClick={() => deletarChamado(c.id)} className="btn btn--danger btn--sm">Excluir</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}