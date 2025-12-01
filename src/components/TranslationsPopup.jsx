import './TranslationsPopup.css';

function TranslationsPopup({ translations, nativeLanguage, learnLanguage, isOpen, onClose }) {
  if (!isOpen) return null;

  const LANGUAGE_NAMES = {
    english: 'English',
    spanish: 'Spanish',
    french: 'French',
    japanese: 'Japanese',
    korean: 'Korean',
    german: 'German',
    hindi: 'Hindi',
    arabic: 'Arabic',
    portuguese: 'Portuguese',
  };

  const nativeLangName = LANGUAGE_NAMES[nativeLanguage] || nativeLanguage;
  const learnLangName = LANGUAGE_NAMES[learnLanguage] || learnLanguage;

  return (
    <div className="translations-popup-overlay" onClick={onClose}>
      <div className="translations-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="translations-popup-header">
          <h2 className="translations-popup-title">
            Key Phrases in {learnLangName}
          </h2>
          <button className="translations-popup-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="translations-popup-body">
          {translations && translations.length > 0 ? (
            <div className="translations-list">
              {translations.map((item, index) => (
                <div key={index} className="translation-item">
                  <div className="translation-phrase">
                    <span className="translation-label">{learnLangName}:</span>
                    <span className="translation-text">{item.phrase}</span>
                  </div>
                  <div className="translation-meaning">
                    <span className="translation-label">{nativeLangName}:</span>
                    <span className="translation-text">{item.translation}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="translations-empty">
              <p>No translations available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TranslationsPopup;

