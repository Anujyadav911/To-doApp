import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { createTodo } from '../api/todos';

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

export default function AddTodo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Let the user mark a task as already done when adding it - happens more than you'd think
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!title.trim() || !description.trim()) return;
    setSaving(true);
    try {
      await createTodo({ title: title.trim(), description: description.trim(), completed });
      navigate('/');
    } catch (err) {
      console.error('Failed to create todo:', err);
    } finally {
      setSaving(false);
    }
  };

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
            placeholder="Todo Title"
          />
        </div>

        <div className="form-group">
          <label>DESCRIPTION</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What needs to be done?"
          />
        </div>

        <button className="update-btn" onClick={handleAdd} disabled={saving}>
          {saving ? 'ADDING...' : 'ADD TODO'}
        </button>
      </div>
    </div>
  );
}
