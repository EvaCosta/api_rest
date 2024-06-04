import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Categoria from "./Categoria";
import ProdutoPedido from "./ProdutoPedido";

class Produto extends Model {
  public produto_id!: number;
  public nome_produto?: string;
  public descricao_produto?: string;
  public preco_produto?: number;
  public qtd_estoque?: number;
  public data_cadastro_produto?: Date;
  public categoria_id!: number;
  public imagem?: string;

  public readonly produtosPedidos?: ProdutoPedido[];
}

Produto.init(
  {
    produto_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_produto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descricao_produto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preco_produto: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    qtd_estoque: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    data_cadastro_produto: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categoria",
        key: "categoria_id",
      },
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Produto",
    tableName: "produto",
    timestamps: false,
  },
);

Produto.belongsTo(Categoria, { foreignKey: "categoria_id" });

export default Produto;
