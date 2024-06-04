import { FastifyInstance } from "fastify";
import * as CategoriaController from "../controllers/categoriaController";


export default async function categoriaRoutes(app: FastifyInstance) {
  app.post("/categorias", CategoriaController.criarCategoria);
  app.put("/categorias/:id", CategoriaController.atualizarCategoria);
  app.get("/categorias/:id", CategoriaController.obterCategoria);
  app.get("/categorias", CategoriaController.listarCategorias);
  app.delete("/categorias/:id", CategoriaController.deletarCategoria);
}
