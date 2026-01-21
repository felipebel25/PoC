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
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
  },
  {
    id: 'space',
    name: 'Space',
    icon: '🚀',
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
  },
  {
    id: 'music',
    name: 'Music',
    icon: '🎵',
  },
  {
    id: 'art',
    name: 'Art',
    icon: '🎨',
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍕',
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: '✈️',
  },
  {
    id: 'mythology',
    name: 'Mythology',
    icon: '⚡',
  },
  {
    id: 'crime',
    name: 'Crime',
    icon: '🕵️',
  },
  {
    id: 'romance',
    name: 'Romance',
    icon: '💕',
  },
  {
    id: 'comedy',
    name: 'Comedy',
    icon: '😂',
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    icon: '🤔',
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
  },
  {
    id: 'health',
    name: 'Health',
    icon: '💪',
  },
  {
    id: 'culture',
    name: 'Culture',
    icon: '🌍',
  },
];

const textStyles = [
  {
    id: 'article',
    name: 'Article',
    icon: '📰',
  },
  {
    id: 'tale',
    name: 'Tale',
    icon: '📖',
  },
  {
    id: 'biography',
    name: 'Biography',
    icon: '👤',
  },
  {
    id: 'mystery',
    name: 'Mystery',
    icon: '🔍',
  },
  {
    id: 'travelogue',
    name: 'Travelogue',
    icon: '✈️',
  },
  {
    id: 'memoir',
    name: 'Memoir',
    icon: '📝',
  },
  {
    id: 'fable',
    name: 'Fable',
    icon: '🦁',
  },
  {
    id: 'legend',
    name: 'Legend',
    icon: '⚔️',
  },
];

const vocabularyDifficulties = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

const sentenceComplexities = [
  { id: 'simple', name: 'Simple' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'complex', name: 'Complex' },
];

const tones = [
  { id: 'formal', name: 'Formal' },
  { id: 'casual', name: 'Casual' },
  { id: 'humorous', name: 'Humorous' },
  { id: 'serious', name: 'Serious' },
  { id: 'conversational', name: 'Conversational' },
];

const pointsOfView = [
  { id: 'first', name: 'First Person' },
  { id: 'second', name: 'Second Person' },
  { id: 'third', name: 'Third Person' },
];

const timePeriods = [
  { id: 'modern', name: 'Modern' },
  { id: 'historical', name: 'Historical' },
  { id: 'futuristic', name: 'Futuristic' },
];

// Grammar tenses - comprehensive for English
const englishTenses = [
  { id: 'present-simple', name: 'Present Simple', description: 'I go, he goes' },
  { id: 'present-continuous', name: 'Present Continuous', description: 'I am going' },
  { id: 'present-perfect', name: 'Present Perfect', description: 'I have gone' },
  { id: 'present-perfect-continuous', name: 'Present Perfect Continuous', description: 'I have been going' },
  { id: 'past-simple', name: 'Past Simple', description: 'I went' },
  { id: 'past-continuous', name: 'Past Continuous', description: 'I was going' },
  { id: 'past-perfect', name: 'Past Perfect', description: 'I had gone' },
  { id: 'past-perfect-continuous', name: 'Past Perfect Continuous', description: 'I had been going' },
  { id: 'future-simple', name: 'Future Simple', description: 'I will go' },
  { id: 'future-continuous', name: 'Future Continuous', description: 'I will be going' },
  { id: 'future-perfect', name: 'Future Perfect', description: 'I will have gone' },
  { id: 'future-perfect-continuous', name: 'Future Perfect Continuous', description: 'I will have been going' },
  { id: 'conditional', name: 'Conditional', description: 'I would go' },
  { id: 'conditional-perfect', name: 'Conditional Perfect', description: 'I would have gone' },
];

// Basic tenses for other languages
const basicTenses = [
  { id: 'present', name: 'Present', description: 'Present tense' },
  { id: 'past', name: 'Past', description: 'Past tense' },
  { id: 'future', name: 'Future', description: 'Future tense' },
  { id: 'conditional', name: 'Conditional', description: 'Conditional tense' },
  { id: 'subjunctive', name: 'Subjunctive', description: 'Subjunctive mood' },
  { id: 'imperative', name: 'Imperative', description: 'Commands' },
];

const emotions = [
  { id: 'nostalgic', name: 'Nostalgic', icon: '🌅' },
  { id: 'sad', name: 'Sad', icon: '😢' },
  { id: 'motivational', name: 'Motivational', icon: '💪' },
  { id: 'happy', name: 'Happy', icon: '😊' },
  { id: 'excited', name: 'Excited', icon: '🎉' },
  { id: 'peaceful', name: 'Peaceful', icon: '🕊️' },
  { id: 'mysterious', name: 'Mysterious', icon: '🔮' },
  { id: 'romantic', name: 'Romantic', icon: '💕' },
  { id: 'adventurous', name: 'Adventurous', icon: '🗺️' },
  { id: 'hopeful', name: 'Hopeful', icon: '✨' },
  { id: 'melancholic', name: 'Melancholic', icon: '🌙' },
  { id: 'inspiring', name: 'Inspiring', icon: '🌟' },
  { id: 'playful', name: 'Playful', icon: '🎈' },
  { id: 'contemplative', name: 'Contemplative', icon: '🤔' },
  { id: 'energetic', name: 'Energetic', icon: '⚡' },
];

function ReadingPreferenceSelection() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTextStyle, setSelectedTextStyle] = useState(null);
  const [vocabularyDifficulty, setVocabularyDifficulty] = useState(null);
  const [sentenceComplexity, setSentenceComplexity] = useState(null);
  const [tone, setTone] = useState(null);
  const [pointOfView, setPointOfView] = useState(null);
  const [includeDialogue, setIncludeDialogue] = useState(true);
  const [includeDescriptions, setIncludeDescriptions] = useState(true);
  const [culturalContext, setCulturalContext] = useState('');
  const [timePeriod, setTimePeriod] = useState(null);
  const [includeComprehensionQuestions, setIncludeComprehensionQuestions] = useState(false);
  const [grammarTense, setGrammarTense] = useState(null);
  const [emotion, setEmotion] = useState(null);
  const isAdult = user.userType === 'adult';

  // Get available tenses based on learning language
  const availableTenses = user.learnLanguage === 'english' ? englishTenses : basicTenses;

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleTextStyleSelect = (styleId) => {
    setSelectedTextStyle(styleId);
  };

  const handleOptionSelect = (setter) => (value) => {
    setter(value);
  };

  const handleCreateInput = (e) => {
    e.preventDefault();
    if (inputText.trim() && selectedTextStyle) {
      updateUser({ 
        readingInput: inputText.trim(),
        readingTextStyle: selectedTextStyle,
        vocabularyDifficulty,
        sentenceComplexity,
        tone,
        pointOfView,
        includeDialogue,
        includeDescriptions,
        culturalContext: culturalContext.trim() || null,
        timePeriod,
        includeComprehensionQuestions,
        grammarTense,
        emotion,
      });
      navigate('/generated-book');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = { 
      readingCategory: selectedCategory,
      readingTextStyle: selectedTextStyle,
      vocabularyDifficulty,
      sentenceComplexity,
      tone,
      pointOfView,
      includeDialogue,
      includeDescriptions,
      culturalContext: culturalContext.trim() || null,
      timePeriod,
      includeComprehensionQuestions,
      grammarTense,
      emotion,
    };
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
              disabled={!inputText.trim() || !selectedTextStyle}
            >
              Create
            </button>
          </div>
        </form>
      )}

      <div className="reading-preference-examples">
        <h2 className="examples-label">Choose a Category</h2>
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

      <div className="reading-preference-examples">
        <h2 className="examples-label">Choose a Text Style</h2>
        <div className="categories-grid">
          {textStyles.map((style) => (
            <button
              key={style.id}
              className={`category-button ${selectedTextStyle === style.id ? 'selected' : ''}`}
              onClick={() => handleTextStyleSelect(style.id)}
            >
              <div className="category-icon">{style.icon}</div>
              <div className="category-name">{style.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">Vocabulary Difficulty</h2>
        <div className="option-buttons-row">
          {vocabularyDifficulties.map((option) => (
            <button
              key={option.id}
              className={`option-button ${vocabularyDifficulty === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(setVocabularyDifficulty)(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">Sentence Complexity</h2>
        <div className="option-buttons-row">
          {sentenceComplexities.map((option) => (
            <button
              key={option.id}
              className={`option-button ${sentenceComplexity === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(setSentenceComplexity)(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">Tone/Voice</h2>
        <div className="option-buttons-row">
          {tones.map((option) => (
            <button
              key={option.id}
              className={`option-button ${tone === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(setTone)(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">Point of View</h2>
        <div className="option-buttons-row">
          {pointsOfView.map((option) => (
            <button
              key={option.id}
              className={`option-button ${pointOfView === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(setPointOfView)(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">Time Period/Era</h2>
        <div className="option-buttons-row">
          {timePeriods.map((option) => (
            <button
              key={option.id}
              className={`option-button ${timePeriod === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(setTimePeriod)(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">What Grammar Tense Do You Want to Practice?</h2>
        <div className="tense-grid">
          {availableTenses.map((tense) => (
            <button
              key={tense.id}
              className={`tense-button ${grammarTense === tense.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(setGrammarTense)(tense.id)}
            >
              <div className="tense-name">{tense.name}</div>
              <div className="tense-description">{tense.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">What Emotion Do You Want to Feel?</h2>
        <div className="categories-grid">
          {emotions.map((emotionOption) => (
            <button
              key={emotionOption.id}
              className={`category-button ${emotion === emotionOption.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(setEmotion)(emotionOption.id)}
            >
              <div className="category-icon">{emotionOption.icon}</div>
              <div className="category-name">{emotionOption.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">Content Options</h2>
        <div className="toggle-options">
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={includeDialogue}
              onChange={(e) => setIncludeDialogue(e.target.checked)}
            />
            <span>Include Dialogue</span>
          </label>
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={includeDescriptions}
              onChange={(e) => setIncludeDescriptions(e.target.checked)}
            />
            <span>Include Descriptions</span>
          </label>
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={includeComprehensionQuestions}
              onChange={(e) => setIncludeComprehensionQuestions(e.target.checked)}
            />
            <span>Include Comprehension Questions</span>
          </label>
        </div>
      </div>

      <div className="reading-preference-examples">
        <h2 className="examples-label">Cultural Context (Optional)</h2>
        <input
          type="text"
          className="reading-preference-input"
          placeholder="e.g., Spanish from Spain, Mexican Spanish..."
          value={culturalContext}
          onChange={(e) => setCulturalContext(e.target.value)}
        />
      </div>

      <button
        className="reading-preference-submit"
        onClick={handleSubmit}
        disabled={!selectedCategory || !selectedTextStyle}
      >
        Continue
      </button>
    </div>
  );
}

export default ReadingPreferenceSelection;

