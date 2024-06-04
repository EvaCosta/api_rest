import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Categoria extends Model {
  public categoria_id!: number;
  public nome_categoria?: string;
  public descricao_categoria?: string;
}

Categoria.init(
  {
    categoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_categoria: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    descricao_categoria: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Categoria",
    tableName: "categoria",
    timestamps: false,
  },
);

export default Categoria;
