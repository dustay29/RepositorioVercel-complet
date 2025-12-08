// server.js (CÓDIGO FINAL CORRIGIDO PARA O RENDER COM CORS ESPECÍFICO)

import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import router from './routes/routes.js';
// import {Usuarios} from './models/usuarios.js';
// import {Chamados} from './models/chamados.js';
import { database } from './database.js'; // Conexão com o Sequelize
const app = express();

// ** CORREÇÃO CRÍTICA DO CORS **
// URL do seu Front-end no Render que será permitida.
const allowedOrigins = ['https://repositoriovercel-complet-1.onrender.com']; 

const corsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem origem (ex: Postman) ou da sua URL Front-end
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions)); // Aplica o CORS específico
app.use(express.json()); 
app.use(router)

// Conexão com o Banco de Dados
try {
  database.authenticate();
  console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
  console.error('❌ Não foi possível conectar ao banco de dados:', error);
}

// ⚡ ESSENCIAL PARA O RENDER: Adicionar app.listen() de volta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Remova ou comente: export default app;
