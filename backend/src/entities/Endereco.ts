import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Endereco extends Model {
  public endereco_id!: number;
  public cep?: string | null;
  public rua?: string | null;
  public bairro?: string | null;
  public cidade?: string | null;
  public numero?: string | null;
  public complemento?: string | null;
  public uf?: string | null;
}

Endereco.init(
  {
    endereco_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cep: {
      type: DataTypes.STRING(9),
      allowNull: true,
    },
    rua: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    complemento: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Endereco",
    tableName: "endereco",
    timestamps: false,
  },
);

export default Endereco;
