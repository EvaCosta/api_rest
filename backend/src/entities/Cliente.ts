import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";


class Cliente extends Model {
  public cliente_id!: number;
  public email?: string;
  public username?: string;
  public senha?: string;
  public nome?: string;
  public cpf!: string;
  public telefone?: string;
  public data_nascimento?: Date;
  public endereco_id!: number;
}


Cliente.init(
  {
    cliente_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "cliente",
    timestamps: false,
  },
);

export default Cliente;
