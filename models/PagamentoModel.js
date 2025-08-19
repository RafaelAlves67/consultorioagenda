import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Pagamento = db.define("Pagamento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  valor: {type: DataTypes.FLOAT, allowNull: false},
  metodo: {type: DataTypes.STRING, allowNull: false},
  status: {type: DataTypes.ENUM('Pendente', 'Pago', 'Reembolsado'), defaultValue: 'Pendente'}

});

export default Pagamento;