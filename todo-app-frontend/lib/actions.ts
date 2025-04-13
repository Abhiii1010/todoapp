// lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createTodo() {
  try {
    await fetch('https://todoweb-service.onrender.com/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'New Additions',
        description: 'To stay representative of framework & new example apps.',
      }),
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Error creating todo:', error);
  }
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get('id') as string;
  try {
    await fetch(`https://todoweb-service.onrender.com/api/todos/${id}`, {
      method: 'DELETE',
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

export async function updateTodo(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  try {
    await fetch(`https://todoweb-service.onrender.com/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    revalidatePath(`/todo/${id}`);
  } catch (error) {
    console.error('Error updating todo:', error);
  }
}
