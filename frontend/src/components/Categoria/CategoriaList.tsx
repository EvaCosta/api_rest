import React, { useEffect, useState } from 'react';
import { fetchCategorias, deleteCategoria } from '../../services/api';
import { Categoria } from '../../types/Categoria';
import './CategoriaList.css'; // Importe o arquivo CSS aqui

const CategoriaList: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCategorias();
      setCategorias(result);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCategoria(id);
    setCategorias(categorias.filter(categoria => categoria.categoria_id !== id));
  };

  const handleEdit = (id: number) => {
    // Adicione a lógica para editar a categoria com o ID especificado
    console.log('Editar categoria com ID:', id);
  };

  return (
    <div className="form-container">
      <h2>Lista de Categorias</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.categoria_id}>
            <span>{categoria.nome_categoria}</span>
            <button className="edit" onClick={() => handleEdit(categoria.categoria_id)}>Editar</button>
            <button onClick={() => handleDelete(categoria.categoria_id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaList;
