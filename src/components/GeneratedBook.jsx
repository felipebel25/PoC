import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { generateBookText } from '../services/openaiService';
import TranslationsPopup from './TranslationsPopup';
import './GeneratedBook.css';

function GeneratedBook() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [bookText, setBookText] = useState('');
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTranslations, setShowTranslations] = useState(false);
  const hasGeneratedRef = useRef(false);
  const lastUserKeyRef = useRef('');

  useEffect(() => {
    // Create a unique key from user preferences
    const userKey = JSON.stringify({
      nativeLanguage: user.nativeLanguage,
      learnLanguage: user.learnLanguage,
      readingCategory: user.readingCategory,
      readingTextStyle: user.readingTextStyle,
      readingInput: user.readingInput,
      vocabularyDifficulty: user.vocabularyDifficulty,
      sentenceComplexity: user.sentenceComplexity,
      tone: user.tone,
      pointOfView: user.pointOfView,
      includeDialogue: user.includeDialogue,
      includeDescriptions: user.includeDescriptions,
      culturalContext: user.culturalContext,
      timePeriod: user.timePeriod,
      grammarTense: user.grammarTense,
      emotion: user.emotion,
    });

    // Only generate if preferences changed or haven't been generated yet
    if (hasGeneratedRef.current && lastUserKeyRef.current === userKey) {
      return;
    }

    const fetchBook = async () => {
      if (!user.nativeLanguage || !user.learnLanguage) {
        setError('Missing language preferences. Please go back and select your languages.');
        setLoading(false);
        return;
      }

      // Mark as generated and store the key
      hasGeneratedRef.current = true;
      lastUserKeyRef.current = userKey;

      try {
        setLoading(true);
        setError(null);
        const result = await generateBookText(user);
        if (typeof result === 'object' && result.bookText) {
          setBookText(result.bookText);
          setTranslations(result.translations || []);
        } else {
          // Fallback for old format
          setBookText(result);
          setTranslations([]);
        }
      } catch (err) {
        console.error('Error generating book:', err);
        setError(err.message || 'Failed to generate book. Please try again.');
        // Reset on error so user can retry
        hasGeneratedRef.current = false;
        lastUserKeyRef.current = '';
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [user]);

  const formatText = (text) => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="book-paragraph">
        {paragraph.split('\n').map((line, lineIndex, array) => (
          <span key={lineIndex}>
            {line}
            {lineIndex < array.length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="generated-book-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Creating your personalized story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="generated-book-container">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="back-button" onClick={() => navigate('/')}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="generated-book-container">
      <div className="book-header-actions">
        <button className="back-button" onClick={() => navigate('/reading-preference')}>
          ← Back
        </button>
        {translations && translations.length > 0 && (
          <button 
            className="translations-button" 
            onClick={() => setShowTranslations(true)}
          >
            📖 View Translations
          </button>
        )}
      </div>
      <div className="book-content">
        <div className="book-text">
          {formatText(bookText)}
        </div>
      </div>
      <TranslationsPopup
        translations={translations}
        nativeLanguage={user.nativeLanguage}
        learnLanguage={user.learnLanguage}
        isOpen={showTranslations}
        onClose={() => setShowTranslations(false)}
      />
    </div>
  );
}

export default GeneratedBook;

