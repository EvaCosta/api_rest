import fastify from "fastify";
import sequelize from "./config/database";
import categoriaRoutes from "./routes/categoriaRoutes";
import clienteRoutes from "./routes/clienteRoutes";
import enderecoRoutes from "./routes/enderecoRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import authRoutes from "./routes/authRoutes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOptions,swaggerUiOptions } from "./config/swagger";
import cors from '@fastify/cors'
import { authenticate } from "./utils/auth";



// app.register((app, options, done) => {
//   app.get("/", {
//       schema: {
//           tags: ["Default"],
//           response: {
//               200: {
//                   type: "object",
//                   properties: {
//                       anything: { type: "string" },
//                   },
//               },
//           },
//       },
//       handler: (req, res) => {
//           res.send({ anything: "meaningfull" });
//       },
//   });
//   done();
// });




const startServer = async () => {
  try {
    const app = fastify();
    
    app.addSchema({
      $id: 'Categoria',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        nome_categoria: { type: 'string' },
        descricao_categoria: { type: 'string' }
      }
    });
    
    await app.register(cors, { 
      origin: true
    })

    app.register(fastifySwagger, swaggerOptions);
    app.register(fastifySwaggerUi, swaggerUiOptions);

    app.addHook('preHandler', authenticate);

    authRoutes(app);
    clienteRoutes(app);
    categoriaRoutes(app);
    enderecoRoutes(app);
    pedidoRoutes(app);
    produtoRoutes(app);

    await app.listen({ port: 3000 });
    console.log('Servidor iniciado em http://localhost:3000');
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
}

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
  startServer();
});
