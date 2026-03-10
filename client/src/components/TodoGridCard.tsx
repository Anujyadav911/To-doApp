import { useNavigate } from 'react-router-dom';
import { Todo } from '../types';

interface Props {
  todo: Todo;
}

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
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

export default function TodoGridCard({ todo }: Props) {
  const navigate = useNavigate();

  return (
    <div className="todo-grid-card">
      <div className={`check-icon-small ${todo.completed ? 'completed' : 'incomplete'}`}>
        <CheckIcon />
      </div>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <button className="view-btn" onClick={() => navigate(`/todo/${todo.id}`)}>
        VIEW
      </button>
    </div>
  );
}
