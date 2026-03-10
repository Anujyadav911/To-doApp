import { useNavigate } from 'react-router-dom';
import { Todo } from '../types';

interface Props {
  todo: Todo;
}

// Inline SVG keeps things self-contained - no icon library needed for one shape
const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function TodoCard({ todo }: Props) {
  const navigate = useNavigate();

  return (
    <div className="todo-card">
      <div className={`check-icon ${todo.completed ? 'completed' : 'incomplete'}`}>
        <CheckIcon />
      </div>
      <div className="todo-info">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <button className="view-btn" onClick={() => navigate(`/todo/${todo.id}`)}>
        VIEW
      </button>
    </div>
  );
}
