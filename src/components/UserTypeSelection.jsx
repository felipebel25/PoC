import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './UserTypeSelection.css';

function UserTypeSelection() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleUserTypeSelect = (userType) => {
    updateUser({ userType });
    if (userType === 'adult') {
      navigate('/level-selection');
    } else {
      navigate('/reading-preference');
    }
  };

  return (
    <div className="user-type-selection-container">
      <h1 className="user-type-selection-title">Who are you?</h1>
      <div className="user-type-buttons">
        <button
          className="user-type-button"
          onClick={() => handleUserTypeSelect('kid')}
        >
          Kid
        </button>
        <button
          className="user-type-button"
          onClick={() => handleUserTypeSelect('adult')}
        >
          Adult
        </button>
      </div>
    </div>
  );
}

export default UserTypeSelection;

