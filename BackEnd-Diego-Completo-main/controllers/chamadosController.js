import { Chamados } from "../models/chamados.js";
import { Usuarios } from "../models/usuarios.js";

// Listar todos chamados
export const listarTodosChamados = async (req, res) => {
    try {
        const chamados = await Chamados.findAll();
        res.json(chamados);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

// ✅ Criar chamado do usuário logado
export const criarChamado = async (req, res) => {
  const { titulo, descricao, categoria, prioridade, status } = req.body;

  try {
    // o middleware "autenticar" já definiu req.usuarioId
    const chamado = await Chamados.create({
      titulo,
      descricao,
      categoria,
      prioridade,
      status,
      usuario_id: req.usuarioId  // 👈 associa ao usuário logado
    });

    res.status(201).json(chamado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// ✅ Listar chamados do usuário logado
export const listarChamados = async (req, res) => {
  try {
    const chamados = await Chamados.findAll({
      where: { usuario_id: req.usuarioId }, // 👈 apenas do usuário logado
      include: [
        {
          model: Usuarios,
          attributes: ["id", "nome", "email"]
        }
      ]
    });
    res.json(chamados);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Buscar chamado por ID (verifica se pertence ao usuário)
export const buscarChamadoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const chamado = await Chamados.findOne({
      where: { id, usuario_id: req.usuarioId } // 👈 garante que é do usuário logado
    });

    if (!chamado) {
      return res.status(404).json({ mensagem: "Chamado não encontrado" });
    }

    res.json(chamado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Atualizar chamado (somente se pertencer ao usuário ou se for um  técnico)
export const atualizarChamado = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, categoria, prioridade, status } = req.body;

  try {
    // Buscar chamado pelo ID
    const chamado = await Chamados.findByPk(id);

    if (!chamado) {
      return res.status(404).json({ mensagem: "Chamado não encontrado" });
    }

    // Verificar se o usuário pode atualizar
    if (req.perfil !== "tecnico" && chamado.usuario_id !== req.usuarioId) {
      return res.status(403).json({ mensagem: "Acesso negado" });
    }

    // Atualizar campos
    Object.assign(chamado, {
      titulo: titulo ?? chamado.titulo,
      descricao: descricao ?? chamado.descricao,
      categoria: categoria ?? chamado.categoria,
      prioridade: prioridade ?? chamado.prioridade,
      status: status ?? chamado.status,
      atualizado_em: new Date()
    });

    await chamado.save();
    res.json(chamado);

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};


// Deletar chamado (somente se pertencer ao usuário ou se for um técnico)
export const deletarChamado = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar o chamado pelo ID
    const chamado = await Chamados.findByPk(id);

    if (!chamado) {
      return res.status(404).json({ mensagem: "Chamado não encontrado" });
    }

    // Verificar permissões
    if (req.perfil !== "tecnico" && chamado.usuario_id !== req.usuarioId) {
      return res.status(403).json({ mensagem: "Acesso negado" });
    }

    await chamado.destroy();
    res.json({ mensagem: "Chamado deletado com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

