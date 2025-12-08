// server.js (Corrigido para o Render)

import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import router from './routes/routes.js';
// ... (outras imports)
import { database } from './database.js'; 
const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

// Conexão com o Banco de Dados
try {
  database.authenticate();
  console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
  console.error('❌ Não foi possível conectar ao banco de dados:', error);
}

// -----------------------------------------------------
// ⚡ ESSENCIAL PARA O RENDER: Adicionar app.listen() de volta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
// -----------------------------------------------------

// Remova ou comente: export default app;
