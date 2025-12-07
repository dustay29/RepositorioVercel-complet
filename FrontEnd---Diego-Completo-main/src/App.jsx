import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MeusChamados from "./pages/MeusChamados";
import NovoChamado from "./pages/NovoChamado";
import EditarChamado from "./pages/EditarChamado";
import TodosChamados from "./pages/TodosChamados";
import Perfil from "./pages/perfil";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chamados"
            element={
              <ProtectedRoute>
                <MeusChamados />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chamados/novo"
            element={
              <ProtectedRoute>
                <NovoChamado />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chamados/editar/:id"
            element={
              <ProtectedRoute>
                <EditarChamado />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chamados/todos"
            element={
              <ProtectedRoute>
                <TodosChamados />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
