// app/todo/[id]/page.tsx

import { getTodos, getTodoById } from '@/lib/data';
import { updateTodo, deleteTodo, createTodo } from '@/lib/actions';
import { Todo } from '@/lib/types';
import Link from 'next/link';

export default async function TodoPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { page?: string; search?: string };
}) {
  const page = Number(searchParams?.page || '1');
  // Fetch list for sidebar
  const { todos, totalPages } = await getTodos(page);
  // Fetch the selected todo
  const todo = await getTodoById(params.id);

  if (!todo) {
    return (
      <div className="container mt-4">
        <p>Todo not found.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: '100vh' }}>
        {/* Left Sidebar (same as home page) */}
        <div className="col-12 col-md-4 border-end p-0">
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h4 className="m-0">TODO</h4>
            <form action={createTodo}>
              <button type="submit" className="btn btn-sm btn-dark">
                + Add
              </button>
            </form>
          </div>
          <div className="p-3 border-bottom">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </form>
          </div>
          <div className="list-group border-0">
            {todos.map((t: Todo) => (
              <div
                key={t._id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <Link href={`/todo/${t._id}`} className="text-decoration-none text-dark">
                  <div>
                    <div className="fw-bold">{t.title}</div>
                    <small className="text-muted">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </Link>
                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={t._id} />
                  <button type="submit" className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
          <div className="p-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`/todo/${todo._id}?page=${i + 1}`}
                className={`btn btn-sm me-2 ${i + 1 === page ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        </div>
        {/* Right Panel - Editing Selected Todo */}
        <div className="col-12 col-md-8 p-4">
          <h4 className="mb-3">{todo.title}</h4>
          <form action={updateTodo} className="d-flex flex-column gap-3" style={{ maxWidth: '600px' }}>
            <input type="hidden" name="id" value={todo._id} />
            <div>
              <label className="form-label fw-bold">Title</label>
              <input type="text" name="title" defaultValue={todo.title} className="form-control" />
            </div>
            <div>
              <label className="form-label fw-bold">Description</label>
              <textarea name="description" defaultValue={todo.description} className="form-control" rows={6} />
            </div>
            <button type="submit" className="btn btn-primary align-self-start">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
