// Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Tela Principal</h2>
      <ul>
        <li><Link to="/cadastro/categoria">Cadastrar Categoria</Link></li>
        <li><Link to="/cadastro/cliente">Cadastrar Cliente</Link></li>
        <li><Link to="/cadastro/produto">Cadastrar Produto</Link></li>
        <li><Link to="/cadastro/pedido">Cadastrar Pedido</Link></li>
        <li><Link to="/cadastro/endereco">Cadastrar Endereço</Link></li>
      </ul>
    </div>
  );
};

export default Home;
