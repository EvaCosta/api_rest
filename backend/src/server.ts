import fastify from "fastify";
import sequelize from "./config/database";
import categoriaRoutes from "./routes/categoriaRoutes";
import clienteRoutes from "./routes/clienteRoutes";
import enderecoRoutes from "./routes/enderecoRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import authRoutes from "./routes/authRoutes";

const app = fastify();


authRoutes(app);
clienteRoutes(app);
categoriaRoutes(app);
enderecoRoutes(app);
pedidoRoutes(app);
produtoRoutes(app);

// Sincroniza os modelos com o banco de dados
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    await sequelize.sync(); // Sincroniza todos os modelos com o banco de dados
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

// Inicializa o servidor apenas após sincronizar os modelos com o banco de dados
syncDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Servidor iniciado em http://localhost:3000");
  });
});
