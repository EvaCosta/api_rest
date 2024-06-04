import { FastifyInstance } from "fastify";
import * as ProdutoController from "../controllers/produtoController";

export default function produtoRoutes(app: FastifyInstance) {
  app.post("/produtos", ProdutoController.criarProduto);
  app.put("/produtos/:id", ProdutoController.atualizarProduto);
  app.get("/produtos/:id", ProdutoController.obterProdutoPorId);
  app.get("/produtos", ProdutoController.listarProdutos);
  app.delete("/produtos/:id", ProdutoController.excluirProduto);
}
