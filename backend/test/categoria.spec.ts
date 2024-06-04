import sequelize from "../src/config/database";
import Categoria from "../src/entities/Categoria";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Recria todas as tabelas no banco de dados
});

afterAll(async () => {
  await sequelize.close(); // Fecha a conexão com o banco de dados
});

describe("Operações CRUD para Categoria", () => {
  test("Inserir uma nova categoria", async () => {
    const novaCategoria = await Categoria.create({
      nome_categoria: "Teste",
      descricao_categoria: "Categoria de teste.",
    });
    expect(novaCategoria.nome_categoria).toBe("Teste");
  });

  test("Listar todas as categorias", async () => {
    const categorias = await Categoria.findAll();
    expect(categorias).toHaveLength(1); // Deve haver uma categoria após a inserção anterior
  });

  // test('Atualizar uma categoria existente', async () => {
  //   const categoria = await Categoria.findOne({ where: { nome_categoria: 'Teste' } });
  //   await categoria.update({ descricao_categoria: 'Nova descrição' });
  //   expect(categoria.descricao_categoria).toBe('Nova descrição');
  // });

  // test('Excluir uma categoria existente', async () => {
  //   const categoria = await Categoria.findOne({ where: { nome_categoria: 'Teste' } });
  //   await categoria.destroy();
  //   const categorias = await Categoria.findAll();
  //   expect(categorias).toHaveLength(0); // Não deve haver categorias após a exclusão
  // });
});
