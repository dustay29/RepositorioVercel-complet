import jwt from "jsonwebtoken";

// Middleware para verificar o token
export const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SEGREDO_JWT);
    req.usuarioId = decoded.id;
    req.perfil = decoded.perfil; // ✅ salva o perfil dentro do request
    next();
  } catch (erro) {
    res.status(401).json({ mensagem: "Token inválido" });
  }
};

// Middleware para permitir apenas técnicos
export const verificarTecnico = (req, res, next) => {
  if (req.perfil !== "tecnico") {
    return res.status(403).json({
      mensagem: "Acesso negado. Apenas técnicos podem realizar esta ação."
    });
  }
  next();
};
