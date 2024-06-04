import { FastifyRequest, FastifyReply } from "fastify";
import Cliente from "../entities/Cliente";
import Endereco from "../entities/Endereco";
import Pedido from "../entities/Pedido";
import { validateValueObject } from "../utils/validate";
import bcrypt from 'bcrypt';

export async function criarCliente(
  request: FastifyRequest<{
    Body: {
      email: string;
      username: string;
      senha: string;
      nome: string;
      cpf: string;
      telefone: string;
      data_nascimento: string;
      endereco_id: number;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      email,
      username,
      senha,
      nome,
      cpf,
      telefone,
      data_nascimento,
      endereco_id,
    } = request.body;

    const enderecoExistente = await Endereco.findByPk(endereco_id);
    if (!enderecoExistente) {
      return reply.code(400).send({ error: "Endereço não encontrado" });
    }

    const clienteExistente = await Cliente.findOne({ where: { cpf } });
    if (clienteExistente) {
      return reply.code(400).send({ error: "CPF já registrado" });
    }

    const emailValidation = validateValueObject(email, "email");
    if (!emailValidation.valueObject) {
      return reply.code(400).send({ error: emailValidation.errorMessage });
    }

    const cpfValidation = validateValueObject(cpf, "cpf");
    if (!cpfValidation.valueObject) {
      return reply.code(400).send({ error: cpfValidation.errorMessage });
    }

    const telefoneValidation = validateValueObject(telefone, "telefone");
    if (!telefoneValidation.valueObject) {
      return reply.code(400).send({ error: telefoneValidation.errorMessage });
    }
    const password = await bcrypt.hash(senha,12);

    const novoCliente = await Cliente.create({
      email,
      username,
      senha: password,
      nome,
      cpf,
      telefone,
      data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
      endereco_id,
    });
    reply.code(201).send(novoCliente);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function atualizarCliente(
  request: FastifyRequest<{
    Params: { id: number };
    Body: {
      email?: string;
      username?: string;
      senha?: string;
      nome?: string;
      cpf?: string;
      telefone?: string;
      data_nascimento?: string;
      endereco_id?: number;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const cliente = await Cliente.findByPk(request.params.id);
    if (cliente) {
      await cliente.update({
        ...request.body,
        data_nascimento: request.body.data_nascimento
          ? new Date(request.body.data_nascimento)
          : cliente.data_nascimento,
      });
      reply.send(cliente);
    } else {
      reply.code(404).send({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function obterClientePorId(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const cliente = await Cliente.findByPk(request.params.id);
    if (cliente) {
      reply.send(cliente);
    } else {
      reply.code(404).send({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function ListarClientes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const clientes = await Cliente.findAll();
    reply.send(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}


export async function deletarCliente(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const cliente = await Cliente.findByPk(request.params.id);

    if (!cliente) {
      reply.code(404).send({ error: "Cliente não encontrado" });
      return;
    }

    // Verificar se há pedidos associados ao cliente
    const pedidos = await Pedido.findAll({ where: { cliente_id: cliente.cliente_id } });

    if (pedidos.length > 0) {
      reply.code(409).send({ error: "Este cliente possui pedidos pendentes. Por favor, exclua os pedidos antes de excluir o cliente." });
      return;
    }

    // Se não houver pedidos pendentes, exclui o cliente
    await cliente.destroy();

    reply.send({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}


