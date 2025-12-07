// server.js
import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import router from './routes/routes.js';
// import {Usuarios} from './models/usuarios.js';
// import {Chamados} from './models/chamados.js';
import { database } from './database.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(router)
// try{
//   // Força recriar todas as tabelas
  //  await Usuarios.sync({ alter: true });
  //  await Chamados.sync({ alter: true });
//   console.log('Tabelas recriadas com force: true.')
// } catch(erro){
//     console.log(erro)
// }


// iniciando servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});