import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Paciente = db.define("Paciente", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cpf: { type: DataTypes.STRING, unique: true },
  historico_medico: { type: DataTypes.STRING, allowNull: true },
  alergia: { type: DataTypes.STRING, allowNull: true },
  observacoes: { type: DataTypes.STRING, defaultValue: true }
});

export default Paciente;