export const swaggerOptions = {
    swagger: {
      info: {
        title: "API REST",
        description: "Documentação da API REST",
        version: "1.0.0",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "Categoria", description: "Operações relacionadas a categorias" },
        { name: "Cliente", description: "Operações relacionadas a clientes" },
        { name: "Endereço", description: "Operações relacionadas a endereços" },
        { name: "Pedido", description: "Operações relacionadas a pedidos" },
        { name: "Produto", description: "Operações relacionadas a produtos" },
        { name: "Autenticação", description: "Operações relacionadas à autenticação" }
      ],
    },
  };
  
export   const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };