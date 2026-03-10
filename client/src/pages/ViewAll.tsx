import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TodoGridCard from '../components/TodoGridCard';
import { getAllTodos } from '../api/todos';
import { Todo } from '../types';

export default function ViewAll() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTodos()
      .then(setTodos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header showBack />
      <div className="all-todos-container">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet.</p>
            <button className="add-todo-btn" onClick={() => navigate('/add')}>
              Add Your First Todo 📝
            </button>
          </div>
        ) : (
          <div className="todos-grid">
            {todos.map(todo => (
              <TodoGridCard key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
