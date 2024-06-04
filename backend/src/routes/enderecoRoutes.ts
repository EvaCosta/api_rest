import { FastifyInstance } from "fastify";
import * as EnderecoController from "../controllers/enderecoController";

export default async function enderecoRoutes(app: FastifyInstance) {

  app.post("/enderecos", EnderecoController.criarEndereco);
  app.put("/enderecos/:id", EnderecoController.atualizarEndereco);
  app.get("/enderecos/:id", EnderecoController.obterEnderecoPorId);
  app.get("/enderecos", EnderecoController.listarEnderecos);
  app.delete("/enderecos/:id", EnderecoController.excluirEndereco);
}
