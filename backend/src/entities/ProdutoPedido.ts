import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Produto from "./Produto";
import Pedido from "./Pedido";

class ProdutoPedido extends Model {
  public produto_pedido_id!: number;
  public qtd_produto_pedido?: number;
  public preco_produto_pedido?: number;
  public produto_id?: number;
  public pedido_id?: number;
}

ProdutoPedido.init(
  {
    produto_pedido_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    qtd_produto_pedido: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    preco_produto_pedido: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produto,
        key: "produto_id",
      },
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pedido,
        key: "pedido_id",
      },
    },
  },
  {
    sequelize,
    tableName: "produto_pedido",
    timestamps: false,
  },
);

export default ProdutoPedido;
