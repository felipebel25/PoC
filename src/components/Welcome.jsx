import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const LANGUAGE_EXAMPLES = [
  {
    native: 'Spanish',
    learn: 'English',
    sentence: [
      { text: 'El gato', lang: 'native' },
      { text: ' se subió al árbol para ', lang: 'native' },
      { text: 'catch', lang: 'learn' },
      { text: ' un pájaro', lang: 'native' },
    ],
    translation: 'The cat climbed the tree to catch a bird',
  },
  {
    native: 'French',
    learn: 'English',
    sentence: [
      { text: 'Le chat', lang: 'native' },
      { text: ' est monté dans ', lang: 'native' },
      { text: 'the tree', lang: 'learn' },
      { text: ' pour attraper un oiseau', lang: 'native' },
    ],
    translation: 'The cat climbed the tree to catch a bird',
  },
  {
    native: 'Portuguese',
    learn: 'English',
    sentence: [
      { text: 'O gato', lang: 'native' },
      { text: ' subiu na árvore para ', lang: 'native' },
      { text: 'catch', lang: 'learn' },
      { text: ' um pássaro', lang: 'native' },
    ],
    translation: 'The cat climbed the tree to catch a bird',
  },
  {
    native: 'Spanish',
    learn: 'French',
    sentence: [
      { text: 'El niño', lang: 'native' },
      { text: ' quiere ', lang: 'native' },
      { text: 'manger', lang: 'learn' },
      { text: ' una manzana', lang: 'native' },
    ],
    translation: 'The child wants to eat an apple',
  },
  {
    native: 'English',
    learn: 'Spanish',
    sentence: [
      { text: 'The dog', lang: 'native' },
      { text: ' is playing in ', lang: 'native' },
      { text: 'el parque', lang: 'learn' },
      { text: ' with a ball', lang: 'native' },
    ],
    translation: 'The dog is playing in the park with a ball',
  },
  {
    native: 'English',
    learn: 'French',
    sentence: [
      { text: 'I love', lang: 'native' },
      { text: ' to read ', lang: 'native' },
      { text: 'des livres', lang: 'learn' },
      { text: ' every day', lang: 'native' },
    ],
    translation: 'I love to read books every day',
  },
];

function Welcome() {
  const navigate = useNavigate();
  const [currentExample, setCurrentExample] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % LANGUAGE_EXAMPLES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const example = LANGUAGE_EXAMPLES[currentExample];

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Trynity</h1>
        
        <p className="welcome-slogan">
         Learn a new language by reading. It's as easy as reading this.
        </p>

        <div className="welcome-phone-demo">
          <div className="phone-frame">
            <div className="phone-screen">
              <div className="example-sentence">
                {example.sentence.map((part, index) => (
                  <span
                    key={index}
                    className={`sentence-part ${part.lang === 'learn' ? 'learn-language' : 'native-language'}`}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="welcome-indicators">
          {LANGUAGE_EXAMPLES.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentExample ? 'active' : ''}`}
              onClick={() => setCurrentExample(index)}
            />
          ))}
        </div>
      </div>

      <div className="welcome-footer">
        <button className="welcome-get-started" onClick={() => navigate('/language-selection')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Welcome;

