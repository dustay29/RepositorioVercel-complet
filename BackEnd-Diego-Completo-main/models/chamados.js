import {database} from "../database.js";
import { DataTypes } from "sequelize";
import { Usuarios } from "./usuarios.js";

export const Chamados = database.define("Chamados", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING(150) },
    descricao: { type: DataTypes.TEXT },
    categoria: { type: DataTypes.STRING(150), allowNull: true },
    prioridade: { type: DataTypes.STRING(20), allowNull: true },
    status: { type: DataTypes.ENUM('aberto', 'em andamento', 'fechado'), defaultValue: 'aberto' },
    criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    atualizado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: "Chamados",
    timestamps: false
});

// 🧩 associação entre tabelas
Usuarios.hasMany(Chamados, { foreignKey: "usuario_id" });
Chamados.belongsTo(Usuarios, { foreignKey: "usuario_id" });