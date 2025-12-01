import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './LanguageSelection.css';

const languages = [
  {
    id: 'english',
    name: 'English',
    flag: '🇬🇧',
    learners: '1.5B learners',
  },
  {
    id: 'spanish',
    name: 'Spanish',
    flag: '🇪🇸',
    learners: '36.2M learners',
  },
  {
    id: 'french',
    name: 'French',
    flag: '🇫🇷',
    learners: '21.6M learners',
  },
  {
    id: 'japanese',
    name: 'Japanese',
    flag: '🇯🇵',
    learners: '15.7M learners',
  },
  {
    id: 'korean',
    name: 'Korean',
    flag: '🇰🇷',
    learners: '13.8M learners',
  },
  {
    id: 'german',
    name: 'German',
    flag: '🇩🇪',
    learners: '13.4M learners',
  },
  {
    id: 'hindi',
    name: 'Hindi',
    flag: '🇮🇳',
    learners: '9.56M learners',
  },
  {
    id: 'arabic',
    name: 'Arabic',
    flag: '🇸🇦',
    learners: '8.2M learners',
  },
];

function LanguageSelection() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleLanguageSelect = (languageId) => {
    updateUser({ nativeLanguage: languageId });
    navigate('/learn-language-selection');
  };

  return (
    <div className="language-selection-container">
      <h1 className="language-selection-title">My First Language is</h1>
      <div className="language-grid">
        {languages.map((language) => (
          <div
            key={language.id}
            className="language-card"
            onClick={() => handleLanguageSelect(language.id)}
          >
            <div className="language-flag">{language.flag}</div>
            <div className="language-name">{language.name}</div>
            <div className="language-learners">{language.learners}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelection;

