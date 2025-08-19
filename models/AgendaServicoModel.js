import { DataTypes } from "sequelize";
import db from "../data/db.js";

const AgendaServico = db.define("AgendaServico", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  valor_total: { type: DataTypes.FLOAT, allowNull: false },
});

export default AgendaServico;