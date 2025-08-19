import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Medico = db.define("Medico", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  crm: { type: DataTypes.STRING, unique: true },
  Especialidade: { type: DataTypes.STRING, allowNull: true },
  agenda_preferida: { type: DataTypes.STRING, allowNull: true },
});

export default Medico;