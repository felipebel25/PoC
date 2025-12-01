import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './LevelSelection.css';

function LevelSelection() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    updateUser({ skillLevel: level });
    navigate('/reading-preference');
  };

  return (
    <div className="level-selection-container">
      <h1 className="level-selection-title">What is your level?</h1>
      <div className="level-buttons">
        <button
          className="level-button"
          onClick={() => handleLevelSelect('basic')}
        >
          Basic
        </button>
        <button
          className="level-button"
          onClick={() => handleLevelSelect('intermediate')}
        >
          Intermediate
        </button>
        <button
          className="level-button"
          onClick={() => handleLevelSelect('advanced')}
        >
          Advanced
        </button>
      </div>
    </div>
  );
}

export default LevelSelection;

