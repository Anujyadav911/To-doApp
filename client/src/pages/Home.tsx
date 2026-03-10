import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TodoCard from '../components/TodoCard';
import { getAllTodos } from '../api/todos';
import { Todo } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only show 4 on the home screen - clean preview, not a data dump
    getAllTodos()
      .then(data => setTodos(data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header />
      <div className="home-container">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="todo-list">
            {todos.map(todo => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
        )}
        <div className="home-actions">
          <button className="view-all-link" onClick={() => navigate('/all')}>
            View All
          </button>
          <button className="add-todo-btn" onClick={() => navigate('/add')}>
            Add Todo 📝
          </button>
        </div>
      </div>
    </div>
  );
}
