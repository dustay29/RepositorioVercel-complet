import {database} from "../database.js";
import { DataTypes } from "sequelize";

export const Usuarios = database.define("Usuarios", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  senha: { type: DataTypes.STRING(255), allowNull: false },
  perfil: {
    type: DataTypes.ENUM("usuario", "tecnico"),
    allowNull: false
  },
}, {
  tableName: "Usuarios",
  timestamps: false
});
