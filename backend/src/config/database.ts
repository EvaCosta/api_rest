import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    port: parseInt(process.env.POSTGRES_PORT as string),
    dialect: "postgres",
  },
);

export default sequelize;
