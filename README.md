Claro! Aqui está a documentação atualizada com a inclusão da rota `/auth`:

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

A rota `/auth` pode ser usada para gerar um token JWT. Você deve enviar uma solicitação POST com as credenciais de usuário (email, username e senha) para receber um token válido.

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

```

E sua aplicação nas rotas:

```typescript
import { authenticate } from "./utils/auth";

const app = fastify();

app.addHook("preHandler", authenticate);
```
## Documentação da API

A documentação da API pode ser encontrada na coleção do Insomnia disponível neste repositório. Você pode importar a coleção para o Insomnia e começar a usar imediatamente.

### Importando a Coleção no Insomnia

Para importar a coleção no Insomnia, siga estas etapas:

1. Abra o Insomnia e vá para a barra lateral esquerda.
2. Clique no botão **Import/Export** (ícone de seta para dentro e para fora).
3. Selecione a opção **Import Data**.
4. Escolha a opção **From File** e navegue até o arquivo da coleção que você deseja importar.
5. Selecione o arquivo da coleção e clique em **Open**.
6. A coleção será importada e aparecerá na barra lateral esquerda do Insomnia, sob a seção **Collections**.

### Arquivo DDL do Banco de Dados

O arquivo DDL (Data Definition Language) usado para criar o banco de dados PostgreSQL está disponível neste repositório. Você pode usar esse arquivo para criar o esquema do banco de dados localmente ou em seu ambiente de desenvolvimento.

