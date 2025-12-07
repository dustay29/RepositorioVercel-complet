// server.js (Corrigido para Vercel)

import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import router from './routes/routes.js';
// import {Usuarios} from './models/usuarios.js';
// import {Chamados} from './models/chamados.js';
import { database } from './database.js'; // Conexão com o Sequelize
const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

// Conexão com o Banco de Dados (sem force: true para produção)
try {
  database.authenticate();
  console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
  console.error('❌ Não foi possível conectar ao banco de dados:', error);
}

// -----------------------------------------------------
// ATENÇÃO: CÓDIGO REMOVIDO PARA SERVERLESS 
// 
// Remova o bloco abaixo para funcionar no Vercel:
/*
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
*/
// -----------------------------------------------------

// ⚡ EXPORTAÇÃO OBRIGATÓRIA PARA SERVERLESS VERCEL (USANDO ESM)
export default app;
