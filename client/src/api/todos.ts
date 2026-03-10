import axios from 'axios';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types';

// In dev, Vite proxies /api → localhost:5000. In production, point to the deployed backend.
const BASE = `${import.meta.env.VITE_API_URL ?? ''}/api/todos`;

export const getAllTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<Todo[]>(BASE);
  return data;
};

export const getTodoById = async (id: string): Promise<Todo> => {
  const { data } = await axios.get<Todo>(`${BASE}/${id}`);
  return data;
};

export const createTodo = async (payload: CreateTodoDto): Promise<Todo> => {
  const { data } = await axios.post<Todo>(BASE, payload);
  return data;
};

export const updateTodo = async (id: string, payload: UpdateTodoDto): Promise<Todo> => {
  const { data } = await axios.put<Todo>(`${BASE}/${id}`, payload);
  return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${BASE}/${id}`);
};
