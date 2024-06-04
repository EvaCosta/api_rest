import { FastifyRequest, FastifyReply } from "fastify";
import Produto from "../entities/Produto";
import Categoria from "../entities/Categoria";

export async function criarProduto(
  request: FastifyRequest<{
    Body: {
      nome_produto: string;
      descricao_produto: string;
      preco_produto: number;
      qtd_estoque: number;
      data_cadastro_produto: string;
      categoria_id: number;
      imagem: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      nome_produto,
      descricao_produto,
      preco_produto,
      qtd_estoque,
      data_cadastro_produto,
      categoria_id,
      imagem,
    } = request.body;

    const categoriaExistente = await Categoria.findByPk(categoria_id);
    if (!categoriaExistente) {
      reply.code(400).send({ error: "Categoria não encontrada" });
      return;
    }

    const novoProduto = await Produto.create({
      nome_produto,
      descricao_produto,
      preco_produto,
      qtd_estoque,
      data_cadastro_produto: data_cadastro_produto
        ? new Date(data_cadastro_produto)
        : undefined,
      categoria_id,
      imagem,
    });
    reply.code(201).send(novoProduto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function atualizarProduto(
  request: FastifyRequest<{
    Params: { id: number };
    Body: {
      nome_produto?: string;
      descricao_produto?: string;
      preco_produto?: number;
      qtd_estoque?: number;
      data_cadastro_produto?: string;
      categoria_id?: number;
      imagem?: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const produto = await Produto.findByPk(request.params.id);
    if (produto) {
      if (request.body.categoria_id) {
        const categoriaExistente = await Categoria.findByPk(
          request.body.categoria_id,
        );
        if (!categoriaExistente) {
          reply.code(400).send({ error: "Categoria não encontrada" });
          return;
        }
      }

      await produto.update({
        ...request.body,
        data_cadastro_produto: request.body.data_cadastro_produto
          ? new Date(request.body.data_cadastro_produto)
          : produto.data_cadastro_produto,
      });
      reply.send(produto);
    } else {
      reply.code(404).send({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function obterProdutoPorId(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const produto = await Produto.findByPk(request.params.id);
    if (produto) {
      reply.send(produto);
    } else {
      reply.code(404).send({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function listarProdutos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const produtos = await Produto.findAll();
    reply.send(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function excluirProduto(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const produto = await Produto.findByPk(request.params.id);
    if (produto) {
      await produto.destroy();
      reply.send({ message: "Produto excluído com sucesso" });
    } else {
      reply.code(404).send({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}
