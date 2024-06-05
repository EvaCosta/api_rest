import Cliente from "../entities/Cliente";
import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(
    request: FastifyRequest<{
      Body: {
        username: string;
        senha: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    try {
      const {
        username,
        senha,
      } = request.body;
      console.log(username)
      console.log(senha)

      const clienteExistente = await Cliente.findOne({ where: { username } });
      
      if (clienteExistente) {
        const isValidPassword = await bcrypt.compare(senha, clienteExistente.senha! )
        if (isValidPassword) {
            const token = jwt.sign({ key: username }, process.env.JWT_SECRET!,  { expiresIn: '4h' })
            
            return reply.code(200).send({ token });
        }
      }
      return reply.code(401).send({ error: "Dados inválidos." });
      
    } catch (error) {
      console.error("Erro:", error);
      reply.code(500).send({ error: "Erro interno do servidor" });
    }
  }

  