// database.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const database = new Sequelize(process.env.BANCO_DE_DADOS)

try {
  await database.authenticate();
  console.log("Conexão com o banco de dados estabelecida com sucesso.");
} catch (error) {
  console.error("Não foi possível conectar ao banco de dados:", error);
}

export  {database};