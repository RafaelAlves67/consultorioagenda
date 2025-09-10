import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Medico = db.define("Medico", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: {type: DataTypes.STRING, allowNull: false},
  crm: { type: DataTypes.STRING, unique: true },
  Especialidade: { type: DataTypes.STRING, allowNull: true }
});

export default Medico;