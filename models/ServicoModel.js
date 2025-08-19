import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Servico = db.define("Servico", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: {type: DataTypes.STRING, allowNull: false},
  descricao: {type: DataTypes.STRING, allowNull: true},
  duracao_minutos: {type: DataTypes.INTEGER, allowNull: false},
  valor: {type: DataTypes.FLOAT, allowNull: false}
});

export default Servico;