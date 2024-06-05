export const criarClienteSchema = {
    body: {
      type: 'object',
      required: ['email', 'username', 'senha', 'nome', 'cpf', 'telefone', 'data_nascimento', 'endereco_id'],
      properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        senha: { type: 'string' },
        nome: { type: 'string' },
        cpf: { type: 'string' },
        telefone: { type: 'string' },
        data_nascimento: { type: 'string' },
        endereco_id: { type: 'integer' }
      }
    },
    tags: ['Clientes'],
    summary: 'Cria um novo cliente',
    response: {
      201: {
        description: 'Cliente criado com sucesso',
        type: 'object',
        properties: {
          id: { type: 'integer' },
          email: { type: 'string' },
          username: { type: 'string' },
          nome: { type: 'string' },
          cpf: { type: 'string' },
          telefone: { type: 'string' },
          data_nascimento: { type: 'string' },
          endereco_id: { type: 'integer' }
        }
      }
    }
  };
  
  // Defina outros esquemas de rota do cliente aqui...
  