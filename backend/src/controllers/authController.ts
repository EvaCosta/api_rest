import Cliente from "../entities/Cliente";
import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(
    request: FastifyRequest<{
      Body: {
        email: string;
        username: string;
        senha: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    try {
      const {
        email,
        username,
        senha,
      } = request.body;
  

      const clienteExistente = await Cliente.findOne({ where: { email } });
      
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

  