import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Agenda = db.define("Agenda", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  data_hora_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  data_hora_fim: { type: DataTypes.DATEONLY, allowNull: false },
  status: {type: DataTypes.ENUM('Agendado', 'Confirmado', 'Cancelado', 'Concluído'), defaultValue: 'Agendado'},
  observacoes: {type: DataTypes.STRING, allowNull: true}
});

export default Agenda;