import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategoria, createCategoria, updateCategoria } from '../../services/api';
import { Categoria } from '../../types/Categoria';
import './CategoriaForm.css';

const CategoriaForm: React.FC = () => {
  const [nome_categoria, setNome] = useState('');
  const [descricao_categoria, setDescricao] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCategoria(parseInt(id)).then((categoria: Categoria) => {
        setNome(categoria.nome_categoria);
        setDescricao(categoria.descricao_categoria);
      });
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const categoria: Partial<Categoria> = { nome_categoria, descricao_categoria };

    if (id) {
      await updateCategoria(parseInt(id), categoria);
    } else {
      await createCategoria(categoria);
    }

    navigate('/categorias');
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Editar Categoria' : 'Nova Categoria'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome_categoria}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao_categoria}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
      </form>
    </div>
  );
};

export default CategoriaForm;
