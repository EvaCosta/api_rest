-- public.categoria definition

-- Drop table

-- DROP TABLE public.categoria;

CREATE TABLE public.categoria (
	categoria_id serial NOT NULL,
	nome_categoria varchar(20) NULL,
	descricao_categoria varchar(200) NULL,
	CONSTRAINT categoria_pkey PRIMARY KEY (categoria_id)
);

-- public.cliente definition

-- Drop table

-- DROP TABLE public.cliente;
CREATE TABLE public.cliente (
	cliente_id serial NOT NULL,
	email varchar(50) NULL,
	username varchar(15) NULL,
	senha varchar(200) NULL,
	nome varchar(200) NULL,
	cpf varchar(11) NOT NULL,
	telefone varchar(11) NULL,
	data_nascimento date NULL,
	endereco_id int4 NOT NULL,
	CONSTRAINT cliente_cpf_key UNIQUE (cpf),
	CONSTRAINT cliente_pkey PRIMARY KEY (cliente_id)
);

-- public.endereco definition

-- Drop table

-- DROP TABLE public.endereco;

CREATE TABLE public.endereco (
	endereco_id serial NOT NULL,
	cep varchar(9) NULL,
	rua varchar(100) NULL,
	bairro varchar(30) NULL,
	cidade varchar(30) NULL,
	numero varchar(10) NULL,
	complemento varchar(100) NULL,
	uf varchar(2) NULL,
	CONSTRAINT endereco_pkey PRIMARY KEY (endereco_id)
);

-- public.pedido definition

-- Drop table

-- DROP TABLE public.pedido ;

CREATE TABLE public.pedido (
	pedido_id serial NOT NULL,
	numero_pedido int4 NULL,
	valor_total_pedido numeric NULL,
	data_pedido date NOT NULL DEFAULT now(),
	status bool NULL,
	cliente_id int4 NOT NULL,
	CONSTRAINT pedido_pkey PRIMARY KEY (pedido_id)
);


-- public.pedido foreign keys

ALTER TABLE public.pedido ADD CONSTRAINT pedido_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.cliente(cliente_id);

-- public.produto definition

-- Drop table

-- DROP TABLE public.produto;

CREATE TABLE public.produto (
	produto_id serial NOT NULL,
	nome_produto varchar(50) NULL,
	descricao_produto varchar(200) NULL,
	preco_produto numeric NULL,
	qtd_estoque int4 NULL,
	data_cadastro_produto date NULL DEFAULT now(),
	categoria_id int4 NOT NULL,
	imagem varchar NULL,
	CONSTRAINT produto_pkey PRIMARY KEY (produto_id)
);


-- public.produto foreign keys

ALTER TABLE public.produto ADD CONSTRAINT produto_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categoria(categoria_id);

-- public.produto_pedido definition

-- Drop table

-- DROP TABLE public.produto_pedido;

CREATE TABLE public.produto_pedido (
	produto_pedido_id serial NOT NULL,
	qtd_produto_pedido int4 NULL,
	preco_produto_pedido numeric NULL,
	produto_id int4 NULL,
	pedido_id int4 NULL,
	CONSTRAINT produto_pedido_pkey PRIMARY KEY (produto_pedido_id)
);


-- public.produto_pedido foreign keys

ALTER TABLE public.produto_pedido ADD CONSTRAINT produto_pedido_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedido(pedido_id);
ALTER TABLE public.produto_pedido ADD CONSTRAINT produto_pedido_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produto(produto_id);


-- Inserts de Dados de Exemplo

INSERT INTO public.categoria (nome_categoria, descricao_categoria) VALUES 
('Eletrônicos', 'Categoria de produtos eletrônicos'),
('Roupas', 'Categoria de roupas'),
('Alimentos', 'Categoria de alimentos');

INSERT INTO public.cliente (email, username, senha, nome, cpf, telefone, data_nascimento, endereco_id) VALUES 
('exemplo1@gmail.com', 'exemplo1', 'senha123', 'Fulano de Tal', '12345678901', '123456789', '1990-01-01', 1),
('exemplo2@gmail.com', 'exemplo2', 'senha456', 'Ciclano de Tal', '98765432109', '987654321', '1985-05-15', 2);

INSERT INTO public.endereco (cep, rua, bairro, cidade, numero, complemento, uf) VALUES 
('12345-678', 'Rua Exemplo 1', 'Centro', 'Cidade Exemplo', '123', 'Próximo ao parque', 'XX'),
('98765-432', 'Rua Exemplo 2', 'Bairro Novo', 'Cidade Nova', '987', 'Perto do mercado', 'YY');

INSERT INTO public.pedido (numero_pedido, valor_total_pedido, data_pedido, status, cliente_id) VALUES 
(001, 100.00, '2024-06-01', true, 1),
(002, 50.00, '2024-06-02', false, 2);

INSERT INTO public.produto (nome_produto, descricao_produto, preco_produto, qtd_estoque, categoria_id, imagem) VALUES 
('Celular', 'Smartphone com câmera de alta resolução', 1500.00, 10, 1, 'celular.jpg'),
('Camiseta', 'Camiseta de algodão com estampa', 30.00, 50, 2, 'camiseta.jpg'),
('Arroz', 'Arroz branco tipo 1', 5.00, 100, 3, NULL);

INSERT INTO public.produto_pedido (qtd_produto_pedido, preco_produto_pedido, produto_id, pedido_id) VALUES 
(2, 300.00, 1, 1),
(3, 90.00, 2, 2),
(5, 25.00, 3, 2);