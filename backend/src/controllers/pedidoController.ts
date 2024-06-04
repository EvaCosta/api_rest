import { FastifyRequest, FastifyReply } from "fastify";
import Produto from "../entities/Produto";
import Pedido from "../entities/Pedido";
import ProdutoPedido from "../entities/ProdutoPedido";
import Cliente from "../entities/Cliente";

export async function criarPedido(
  request: FastifyRequest<{
    Body: {
      numero_pedido?: number;
      valor_total_pedido?: number;
      data_pedido?: Date;
      status?: boolean;
      cliente_id: number;
      produtos?: Array<{
        produto_id: number;
        qtd_produto_pedido: number;
        preco_produto_pedido: number;
      }>;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const { produtos, cliente_id, numero_pedido, valor_total_pedido, data_pedido, status } = request.body;

    // Verifique se o cliente existe
    const cliente = await Cliente.findByPk(cliente_id);
    if (!cliente) {
      reply.code(400).send({ error: "Cliente não encontrado" });
      return;
    }

    // Verifique se os produtos existem
    if (produtos && produtos.length > 0) {
      for (const produto of produtos) {
        const produtoExistente = await Produto.findByPk(produto.produto_id);
        if (!produtoExistente) {
          reply.code(400).send({ error: `Produto com ID ${produto.produto_id} não encontrado` });
          return;
        }
      }
    }

    // Cria o pedido
    const novoPedido = await Pedido.create({  
      numero_pedido,
      valor_total_pedido,
      data_pedido,
      status,
      cliente_id 
    });

    // Associa os produtos ao pedido
    if (produtos && produtos.length > 0) {
      const produtosPedidos = produtos.map((produto: any) => ({
        produto_id: produto.produto_id,
        pedido_id: novoPedido.pedido_id,
        qtd_produto_pedido: produto.qtd_produto_pedido,
        preco_produto_pedido: produto.preco_produto_pedido,
      }));

      await ProdutoPedido.bulkCreate(produtosPedidos);
    }

    reply.code(201).send(novoPedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}
export async function atualizarPedido(
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      numero_pedido?: number;
      valor_total_pedido?: number;
      data_pedido?: Date;
      status?: boolean;
      cliente_id?: number;
      produtos?: Array<{
        produto_pedido_id?: number;
        produto_id: number;
        qtd_produto_pedido: number;
        preco_produto_pedido: number;
      }>;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    // Verifica se o pedido existe
    const pedido = await Pedido.findByPk(request.params.id, {
      include: [{ model: ProdutoPedido }],
    });

    if (!pedido) {
      reply.code(404).send({ error: "Pedido não encontrado" });
      return;
    }

    // Verifica se o cliente existe, se o cliente_id foi fornecido
    if (request.body.cliente_id) {
      const cliente = await Cliente.findByPk(request.body.cliente_id);
      if (!cliente) {
        reply.code(400).send({ error: "Cliente não encontrado" });
        return;
      }
    }

    // Atualiza os dados do pedido
    await pedido.update({
      numero_pedido: request.body.numero_pedido,
      valor_total_pedido: request.body.valor_total_pedido,
      data_pedido: request.body.data_pedido,
      status: request.body.status,
      cliente_id: request.body.cliente_id,
    });

    // Atualiza os produtos associados ao pedido, se houver
    if (request.body.produtos && request.body.produtos.length > 0) {
      // Primeira etapa: Remover todos os produtos antigos associados ao pedido
      await ProdutoPedido.destroy({ where: { pedido_id: pedido.pedido_id } });

      // Segunda etapa: Adicionar os novos produtos do pedido
      await Promise.all(
        request.body.produtos.map(async (produto: any) => {
          // Verifica se o produto existe antes de tentar atualizar o pedido
          const produtoExistente = await Produto.findByPk(produto.produto_id);
          if (!produtoExistente) {
            // Se o produto não existir, retorna uma mensagem de erro
            reply.code(400).send({ error: `Produto com ID ${produto.produto_id} não encontrado` });
            return;
          }

          // Cria o ProdutoPedido apenas se o produto existir
          await ProdutoPedido.create({
            pedido_id: pedido.pedido_id,
            produto_id: produto.produto_id,
            qtd_produto_pedido: produto.qtd_produto_pedido,
            preco_produto_pedido: produto.preco_produto_pedido,
          });
        }),
      );
    }

    // Retorna o pedido atualizado
    const pedidoAtualizado = await Pedido.findByPk(request.params.id, {
      include: [{ model: ProdutoPedido }],
    });

    reply.send(pedidoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}



export async function obterPedidoPorId(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const pedido = await Pedido.findByPk(request.params.id, {
      include: [{ model: ProdutoPedido }],
    });
    if (!pedido) {
      reply.code(404).send({ error: "Pedido não encontrado" });
      return;
    }
    reply.send(pedido);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function listarPedidos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const pedidos = await Pedido.findAll({
      include: [{ model: ProdutoPedido }],
    });
    reply.send(pedidos);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}

export async function excluirPedido(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {


    const pedido = await Pedido.findByPk(request.params.id, {
      include: [ProdutoPedido], // Inclui os produtos associados ao pedido
    });

    if (!pedido) {
      reply.code(404).send({ error: "Pedido não encontrado" });
      return;
    }

    // Exclui todos os produtos associados ao pedido
    await ProdutoPedido.destroy({ where: { pedido_id: pedido.pedido_id } });


    // Exclui o próprio pedido
    await pedido.destroy();


    reply.send({ message: "Pedido excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    reply.code(500).send({ error: "Erro interno do servidor" });
  }
}
