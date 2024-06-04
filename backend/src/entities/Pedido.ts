import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Cliente from "./Cliente";
import ProdutoPedido from "./ProdutoPedido";

class Pedido extends Model {
  public pedido_id!: number;
  public numero_pedido?: number;
  public valor_total_pedido?: number;
  public data_pedido!: Date;
  public status?: boolean;
  public cliente_id!: number;

  public readonly produtosPedidos?: ProdutoPedido[];
}

Pedido.init(
  {
    pedido_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_pedido: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valor_total_pedido: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    data_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cliente",
        key: "cliente_id",
      },
    },
  },
  {
    sequelize,
    modelName: "Pedido",
    tableName: "pedido",
    timestamps: false,
  },
);

// Associações
Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });
Pedido.hasMany(ProdutoPedido, { foreignKey: "pedido_id" });

export default Pedido;
