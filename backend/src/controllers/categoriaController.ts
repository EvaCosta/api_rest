import { FastifyRequest, FastifyReply } from "fastify";
import Categoria from "../entities/Categoria";

export async function criarCategoria(
  request: FastifyRequest<{
    Body: { nome_categoria: string | null; descricao_categoria: string | null };
  }>,
  reply: FastifyReply,
) {
  try {
    const novaCategoria = await Categoria.create(request.body);
    reply.code(201).send(novaCategoria);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function atualizarCategoria(
  request: FastifyRequest<{
    Params: { id: string };
    Body: { nome_categoria?: string; descricao_categoria?: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const categoria = await Categoria.findByPk(request.params.id);
    if (!categoria) {
      reply.code(404).send({ error: "Categoria não encontrada" });
      return;
    }

    await categoria.update(request.body);
    reply.send(categoria);
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function obterCategoria(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const categoria = await Categoria.findByPk(request.params.id);
    if (!categoria) {
      reply.code(404).send({ error: "Categoria não encontrada" });
      return;
    }
    reply.send(categoria);
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function listarCategorias(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const categorias = await Categoria.findAll();
    reply.send(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function deletarCategoria(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const categoria = await Categoria.findByPk(request.params.id);
    if (!categoria) {
      reply.code(404).send({ error: "Categoria não encontrada" });
      return;
    }

    await categoria.destroy();
    reply.send({ message: "Categoria excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}
