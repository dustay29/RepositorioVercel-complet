import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="app-navbar">
      <div className="nav-left">
        <Link to="/chamados" className="nav-link">Meus Chamados</Link>
        {usuario?.perfil === "tecnico" && (
          <Link to="/chamados/todos" className="nav-link">Todos Chamados</Link>
        )}
        <Link to="/chamados/novo" className="nav-link">Novo Chamado</Link>
      </div>

      <div className="nav-right">
        {/* Nome do usuário agora é link para o perfil */}
        <Link to="/perfil" className="nav-link">{usuario?.nome}</Link>
        <button onClick={handleLogout} className="btn btn--ghost">Sair</button>
      </div>
    </nav>
  );
}