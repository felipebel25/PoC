import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './LearnLanguageSelection.css';

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

function LearnLanguageSelection() {
  const { updateUser, user } = useUser();
  const navigate = useNavigate();
  
  const handleLanguageSelect = (languageId) => {
    updateUser({ learnLanguage: languageId });
    navigate('/user-type-selection');
  };

  return (
    <div className="learn-language-selection-container">
      <h1 className="learn-language-selection-title">Language I Want to Learn</h1>
      <div className="learn-language-grid">
        {languages.filter(lang => lang.id !== user.nativeLanguage).map((language) => (
          <div
            key={language.id}
            className="learn-language-card"
            onClick={() => handleLanguageSelect(language.id)}
          >
            <div className="learn-language-flag">{language.flag}</div>
            <div className="learn-language-name">{language.name}</div>
            <div className="learn-language-learners">{language.learners}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearnLanguageSelection;


