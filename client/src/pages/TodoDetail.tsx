import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getTodoById, updateTodo, deleteTodo } from '../api/todos';
import { Todo } from '../types';

const CheckIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    getTodoById(id)
      .then(data => {
        setTodo(data);
        setTitle(data.title);
        setDescription(data.description);
        setCompleted(data.completed);
      })
      .catch(console.error);
  }, [id]);

  const handleUpdate = async () => {
    if (!id || !title.trim() || !description.trim()) return;
    setSaving(true);
    try {
      await updateTodo(id, { title: title.trim(), description: description.trim(), completed });
      navigate('/');
    } catch (err) {
      console.error('Failed to update:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    // Quick sanity check before nuking the record
    if (!window.confirm('Delete this todo?')) return;
    try {
      await deleteTodo(id);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  if (!todo) return <p className="loading">Loading...</p>;

  return (
    <div>
      <Header showBack />
      <div className="detail-container">
        <div className="finish-section">
          <label>FINISH</label>
          <button
            className={`finish-btn ${completed ? 'completed' : ''}`}
            onClick={() => setCompleted(prev => !prev)}
            type="button"
          >
            <CheckIcon />
          </button>
        </div>

        <div className="form-group">
          <label>TITLE</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>DESCRIPTION</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <button className="update-btn" onClick={handleUpdate} disabled={saving}>
          {saving ? 'SAVING...' : 'UPDATE'}
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          DELETE
        </button>
      </div>
    </div>
  );
}
