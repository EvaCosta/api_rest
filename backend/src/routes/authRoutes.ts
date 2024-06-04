import { FastifyInstance } from "fastify";
import * as AuthController from "../controllers/authController";

export default async function clienteRoutes(app: FastifyInstance) {
  app.post("/auth", AuthController.login);
}
