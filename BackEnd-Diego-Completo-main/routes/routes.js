import express from "express";
import {
    criarUsuario,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario,
    login
} from "../controllers/auth.controllers.js";
import {
    criarChamado,
    listarChamados,
    buscarChamadoPorId,
    atualizarChamado,
    deletarChamado,
    listarTodosChamados
} from "../controllers/chamadosController.js";
import { autenticar , verificarTecnico  } from "../middlewares/autenticacao.js";
const router = express.Router();
// Rotas para usuários
router.post("/usuarios", criarUsuario); // criação de usuário
router.post("/login",login); // login
router.get("/usuarios/:id", autenticar, buscarUsuarioPorId); // buscar por ID
router.put("/usuarios/:id", autenticar, atualizarUsuario); // atualizar
router.delete("/usuarios/:id", autenticar, deletarUsuario); // deletar
// Rotas para chamados
router.post("/chamados", autenticar, criarChamado); // criar chamado
router.get("/chamados", autenticar, listarChamados); // listar todos chamados
router.get("/chamados/todos", autenticar, verificarTecnico, listarTodosChamados); // listar todos chamados (técnicos)
router.get("/chamados/:id", autenticar, buscarChamadoPorId); // buscar chamado por ID
router.put("/chamados/:id", autenticar, atualizarChamado); // atualizar chamado
router.delete("/chamados/:id", autenticar, deletarChamado); // deletar chamado
export default router;