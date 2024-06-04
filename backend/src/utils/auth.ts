import { FastifyRequest, FastifyReply} from 'fastify';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {

    if (request.url === '/auth') {
      return;
    }


    let token = request?.headers['authorization'];
    if (!token) {
      reply.status(401).send({ error: 'Token não fornecido' });
      return;
    }
    
    token = token.split("Bearer ")[1];

    const decoded = validate(token);
   
    if(!decoded){
      reply.status(403).send({ error: 'Token inválido' });
    }
  } catch (error) {
    reply.status(403).send({ error: 'Token inválido' });
  }
}

function validate (token: string): string | null {
  const generatedToken: any = jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (error, response) => {
      if (error) {
        return null
      }
      return response
    })
  return generatedToken ?? null
}
