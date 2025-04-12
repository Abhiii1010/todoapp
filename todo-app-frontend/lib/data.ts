// lib/data.ts
import { Todo } from './types';

const API_URL = 'http://localhost:3001/api/todos';

export async function getTodos(page = 1): Promise<{
  todos: Todo[];
  totalPages: number;
}> {
  const res = await fetch(`${API_URL}?page=${page}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  return res.json();
}

export async function getTodoById(id: string): Promise<Todo | null> {
  const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }
  return res.json();
}
