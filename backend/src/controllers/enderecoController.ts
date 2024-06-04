import { FastifyRequest, FastifyReply } from "fastify";
import Endereco from "../entities/Endereco";
import { validateValueObject } from "../utils/validate";

export async function criarEndereco(
  request: FastifyRequest<{
    Body: {
      cep?: string;
      rua?: string;
      bairro?: string;
      cidade?: string;
      numero?: string;
      complemento?: string;
      uf?: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const { cep, rua, bairro, cidade, numero, complemento, uf } = request.body;
    const stringCep = cep ?? "";
    const cepValidation = validateValueObject(stringCep, "cep");
    if (!cepValidation.valueObject) {
      return reply.code(400).send({ error: cepValidation.errorMessage });
    }
    const novoEndereco = await Endereco.create({
      cep: cepValidation.valueObject.getString(),
      rua,
      bairro,
      cidade,
      numero,
      complemento,
      uf,
    });

    reply.code(201).send(novoEndereco);
  } catch (error) {
    console.error("Erro ao criar endereço:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function atualizarEndereco(
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      cep?: string;
      rua?: string;
      bairro?: string;
      cidade?: string;
      numero?: string;
      complemento?: string;
      uf?: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const endereco = await Endereco.findByPk(request.params.id);
    if (!endereco) {
      reply.code(404).send({ error: "Endereço não encontrado" });
      return;
    }
    await endereco.update(request.body);
    reply.send(endereco);
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function obterEnderecoPorId(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const endereco = await Endereco.findByPk(request.params.id);
    if (!endereco) {
      reply.code(404).send({ error: "Endereço não encontrado" });
      return;
    }
    reply.send(endereco);
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function listarEnderecos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const enderecos = await Endereco.findAll();
    reply.send(enderecos);
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function excluirEndereco(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const endereco = await Endereco.findByPk(request.params.id);
    if (!endereco) {
      reply.code(404).send({ error: "Endereço não encontrado" });
      return;
    }
    await endereco.destroy();
    reply.send({ message: "Endereço excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir endereço:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}
