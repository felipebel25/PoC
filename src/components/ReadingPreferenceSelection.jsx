import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './ReadingPreferenceSelection.css';

const categories = [
  {
    id: 'story',
    name: 'Story',
    icon: '📚',
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: '🗺️',
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    icon: '🧙',
  },
];

function ReadingPreferenceSelection() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isAdult = user.userType === 'adult';

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCreateInput = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      updateUser({ readingInput: inputText.trim() });
      navigate('/generated-book');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = { readingCategory: selectedCategory };
    if (isAdult && inputText.trim()) {
      updates.readingInput = inputText.trim();
    }
    updateUser(updates);
    navigate('/generated-book');
  };

  return (
    <div className="reading-preference-container">
      <h1 className="reading-preference-title">What do you want to read today?</h1>
      
      {isAdult && (
        <form onSubmit={handleCreateInput} className="reading-preference-form">
          <div className="input-with-button">
            <input
              type="text"
              className="reading-preference-input"
              placeholder="I want to read about the England Soccer story..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="create-button"
              disabled={!inputText.trim()}
            >
              Create
            </button>
          </div>
        </form>
      )}

      <div className="reading-preference-examples">
        <h2 className="examples-label">Examples</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        className="reading-preference-submit"
        onClick={handleSubmit}
        disabled={!selectedCategory}
      >
        Continue
      </button>
    </div>
  );
}

export default ReadingPreferenceSelection;

