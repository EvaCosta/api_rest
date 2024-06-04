import { FastifyInstance } from "fastify";
import * as PedidoController from "../controllers/pedidoController";

export default async function pedidoRoutes(app: FastifyInstance) {
  app.post("/pedidos", PedidoController.criarPedido);
  app.put("/pedidos/:id", PedidoController.atualizarPedido);
  app.get("/pedidos/:id", PedidoController.obterPedidoPorId);
  app.get("/pedidos", PedidoController.listarPedidos);
  app.delete("/pedidos/:id", PedidoController.excluirPedido);
}
