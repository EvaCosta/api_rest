import { FastifyInstance } from "fastify";
import * as ClienteController from "../controllers/clienteController";

export default async function clienteRoutes(app: FastifyInstance) {
  app.post("/clientes", ClienteController.criarCliente);
  app.put("/clientes/:id",  ClienteController.atualizarCliente);
  app.get("/clientes", ClienteController.ListarClientes);
  app.get("/clientes/:id", ClienteController.obterClientePorId);
  app.delete("/clientes/:id",  ClienteController.deletarCliente);
}
