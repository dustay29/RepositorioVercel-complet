import { Usuarios } from "../models/usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// login
export const login = async (req, res) => {
  const { email,senha } = req.body;

  try {
    const usuario = await Usuarios.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    // ✅ Inclui o perfil no token
    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil },
      process.env.SEGREDO_JWT,
      { expiresIn: "2h" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: { id: usuario.id, nome: usuario.nome, perfil: usuario.perfil }
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
// Criar usuário

export const criarUsuario = async (req, res) => {
  const { nome, email, senha, perfil } = req.body;

  try {
    const existeUsuario = await Usuarios.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    // 🔒 Criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10); // 10 = número de "salt rounds"

    const novoUsuario = await Usuarios.create({
      nome,
      email,
      senha: senhaCriptografada,
      perfil
    });

    // 🚫 Não retornar a senha no response
    const { senha: _, ...dadosUsuario } = novoUsuario.toJSON();

    res.status(201).json(dadosUsuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};


// Buscar usuário por ID
// Buscar usuário por ID (sem senha)
export const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuarios.findByPk(id, {
      attributes: ["id", "nome", "email", "perfil"] // 👈 evita enviar senha
    });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Atualizar usuário
export const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        usuario.nome = nome ?? usuario.nome;
        usuario.email = email ?? usuario.email;
        usuario.senha = senha ?? usuario.senha;

        await usuario.save();
        res.json(usuario);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

// Deletar usuário
export const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        await usuario.destroy();
        res.json({ mensagem: "Usuário deletado com sucesso" });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};
