import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriaForm from './components/Categoria/CategoriaForm';
import CategoriaList from './components/Categoria/CategoriaList';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/categoria/cadastro" element={<CategoriaForm />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/categorias/" element={<CategoriaList/>} />
          <Route path="/categorias/new" element={<CategoriaForm/>} />
          <Route path="/categorias/edit/:id" element={<CategoriaForm/>} />
          {/* Adicione as rotas para Cliente e outras entidades */}
        </Routes>
    </Router>
  );
}

export default App;
