'use client';

import { Todo } from '@/lib/types';
import { updateTodo } from '@/lib/actions';
import { useEffect, useState } from 'react';

export default function UpdateForm({ todo }: { todo: Todo }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const formData = new FormData();
      formData.append('id', todo._id);
      formData.append('title', title);
      formData.append('description', description);

      updateTodo(formData);
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [title, description, todo._id]);

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </form>
  );
}
