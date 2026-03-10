import { useNavigate } from 'react-router-dom';

interface Props {
  showBack?: boolean;
}

export default function Header({ showBack = false }: Props) {
  const navigate = useNavigate();

  return (
    <div className="header">
      {showBack && (
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      )}
      <h1>
        TODO <span>LIST</span>
      </h1>
    </div>
  );
}
