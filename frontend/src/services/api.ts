import axios, { AxiosError } from 'axios';
import { Categoria } from '../types/Categoria';
import {LoginResponse} from '../types/Login';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do seu backend
});

export const login = async (username: string, senha: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post('/auth', { username, senha });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
      }
      throw new Error('Erro desconhecido ao realizar login.');
    }
  };

export const fetchCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await api.get<Categoria[]>('/categorias');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};

export const fetchCategoria = async (id: number): Promise<Categoria> => {
  try {
    const response = await api.get<Categoria>(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    throw error;
  }
};

export const createCategoria = (data: Partial<Categoria>) => api.post('/categorias', data);
export const updateCategoria = (id: number, data: Partial<Categoria>) => api.put(`/categorias/${id}`, data);
export const deleteCategoria = (id: number) => api.delete(`/categorias/${id}`);

export const fetchClientes = () => api.get('/clientes');
export const createCliente = (data: any) => api.post('/clientes', data);
export const updateCliente = (id: number, data: any) => api.put(`/clientes/${id}`, data);
export const deleteCliente = (id: number) => api.delete(`/clientes/${id}`);
