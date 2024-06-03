# API REST com Fastify e Sequelize

Este projeto é uma API REST desenvolvida com Fastify e Sequelize, conectada a um banco de dados PostgreSQL.

## Configuração do Projeto

### Requisitos

- Node.js
- PostgreSQL

### Instalação

1. Clone o repositório:

   ```bash
   git clone <URL-do-repositorio>
   cd <nome-do-diretorio>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```plaintext
   POSTGRES_DB=nome_do_banco
   POSTGRES_USER=usuario_do_banco
   POSTGRES_PASSWORD=senha_do_banco
   POSTGRES_PORT=5432
   JWT_SECRET=seu_jwt_secret
   ```

### Executando a Aplicação

1. Inicie o servidor:

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

- `src/`
  - `controllers/` - Controladores para as rotas
  - `entities/` - Definição dos modelos Sequelize
  - `routes/` - Definição das rotas da API
  - `utils/` - Utilitários, como autenticação JWT
  - `config/` - Configuração do Sequelize

## Autenticação JWT

A API utiliza JWT (JSON Web Token) para autenticação. Para acessar as rotas protegidas, você precisa fornecer um token válido no cabeçalho da requisição.

### Obtendo um Token

Por enquanto, esta API não implementa endpoints para login e geração de tokens. Você pode gerar um token usando a biblioteca `jsonwebtoken` no Node.js ou usar uma ferramenta online como [jwt.io](https://jwt.io/).

### Usando o Token

Adicione o token no cabeçalho `Authorization` de suas requisições. O formato deve ser:

```plaintext
Authorization: Bearer <seu_token_aqui>
```

### Testando com Insomnia

Para testar as rotas protegidas com Insomnia:

1. Abra o Insomnia e crie uma nova requisição.
2. Selecione o método HTTP e a URL da rota que deseja testar.
3. Vá para a aba "Headers" e adicione um novo cabeçalho:
   - Nome: `Authorization`
   - Valor: `Bearer <seu_token_aqui>`
4. Envie a requisição.

## Exemplo de Rotas

### Categoria

- **POST** `/categorias`
  - Cria uma nova categoria.
  - Exemplo de corpo da requisição:
    ```json
    {
      "nome_categoria": "Cosméticos",
      "descricao_categoria": "Produtos de beleza"
    }
    ```

- **PUT** `/categorias/:id`
  - Atualiza uma categoria existente (Requer autenticação).
  - Exemplo de corpo da requisição:
    ```json
    {
      "nome_categoria": "Cosméticos Atualizados",
      "descricao_categoria": "Produtos de beleza atualizados"
    }
    ```

- **GET** `/categorias/:id`
  - Obtém uma categoria pelo ID (Requer autenticação).

- **GET** `/categorias`
  - Lista todas as categorias (Requer autenticação).

- **DELETE** `/categorias/:id`
  - Deleta uma categoria pelo ID (Requer autenticação).

## Implementação do Middleware de Autenticação

O middleware de autenticação verifica a validade do token JWT em cada requisição protegida. Veja a implementação em `src/utils/authUtils.ts`:

```typescript
import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply, PreHandlerHookHandler } from "fastify";

export const verifyToken: PreHandlerHookHandler = async function (request, reply) {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    reply.code(401).send({ message: "Token de autorização não fornecido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
  } catch (error) {
    reply.code(401).send({ message: "Token de autorização inválido" });
  }
};
```

E sua aplicação nas rotas:

```typescript
import { FastifyInstance } from "fastify";
import * as CategoriaController from "../controllers/categoriaController";
import { verifyToken } from "../utils/authUtils";

export default async function categoriaRoutes(app: FastifyInstance) {
  app.post("/categorias", CategoriaController.criarCategoria);
  app.put("/categorias/:id", { preHandler: verifyToken }, CategoriaController.atualizarCategoria);
  app.get("/categorias/:id", { preHandler: verifyToken }, CategoriaController.obterCategoria);
  app.get("/categorias", { preHandler: verifyToken }, CategoriaController.listarCategorias);
  app.delete("/categorias/:id", { preHandler: verifyToken }, CategoriaController.deletarCategoria);
}
```
