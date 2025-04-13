// app/page.tsx

import { getTodos } from '@/lib/data';
import { createTodo, deleteTodo } from '@/lib/actions';
import { Todo } from '@/lib/types';
import Link from 'next/link';

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page || '1');
  const { todos, totalPages } = await getTodos(page);

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: '100vh' }}>
        {/* Left Sidebar */}
        <div className="col-12 col-md-4 border-end p-0">
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h4 className="m-0">TODO</h4>
            <form action={createTodo}>
              <button type="submit" className="btn btn-sm btn-dark">
                + Add
              </button>
            </form>
          </div>
          {/* Search Bar */}
          <div className="p-3 border-bottom">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </form>
          </div>
          {/* Todo List */}
          <div className="list-group border-0">
            {todos.map((todo: Todo) => (
              <div
                key={todo._id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <Link href={`/todo/${todo._id}`} className="text-decoration-none text-dark">
                  <div>
                    <div className="fw-bold">{todo.title}</div>
                    <small className="text-muted">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </Link>
                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={todo._id} />
                  <button type="submit" className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="p-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`/?page=${i + 1}`}
                className={`btn btn-sm me-2 ${i + 1 === page ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        </div>
        {/* Right Panel */}
        <div className="col-12 col-md-8 p-4">
          <h2>Welcome to the TODO App</h2>
          <p>Select a todo on the left to view or edit it here.</p>
        </div>
      </div>
    </div>
  );
}
