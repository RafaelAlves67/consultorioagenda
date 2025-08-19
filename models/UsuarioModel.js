import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Usuario = db.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('Admin', 'Médico', 'Recepcionista', 'Paciente')},
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
  data_nascimento: {type: DataTypes.DATE, allowNull: false}
});

export default Usuario;