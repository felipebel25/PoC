const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

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

const CATEGORY_NAMES = {
  story: 'story',
  sports: 'sports',
  science: 'science',
  history: 'history',
  adventure: 'adventure',
  fantasy: 'fantasy',
};

export async function generateBookText(user) {
  const {
    nativeLanguage,
    learnLanguage,
    userType,
    skillLevel,
    readingCategory,
    readingInput,
  } = user;

  if (!nativeLanguage || !learnLanguage) {
    throw new Error('Native language and learning language are required');
  }

  const nativeLangName = LANGUAGE_NAMES[nativeLanguage] || nativeLanguage;
  const learnLangName = LANGUAGE_NAMES[learnLanguage] || learnLanguage;

  // Determine language mixing ratio based on user type and skill level
  let nativeRatio, learnRatio;
  
  if (userType === 'kid') {
    // Kids: 70% native, 30% learning
    nativeRatio = 70;
    learnRatio = 30;
  } else {
    // Adults: based on skill level
    switch (skillLevel) {
      case 'basic':
        nativeRatio = 60;
        learnRatio = 40;
        break;
      case 'intermediate':
        nativeRatio = 40;
        learnRatio = 60;
        break;
      case 'advanced':
        nativeRatio = 20;
        learnRatio = 80;
        break;
      default:
        nativeRatio = 50;
        learnRatio = 50;
    }
  }

  // Determine the topic
  let topic = '';
  if (readingInput && readingInput.trim()) {
    topic = readingInput.trim();
  } else if (readingCategory) {
    topic = CATEGORY_NAMES[readingCategory] || readingCategory;
  } else {
    topic = 'an interesting story';
  }

  const prompt = `Create a short story or book chapter (approximately 300-400 words) that mixes ${nativeLangName} and ${learnLangName} languages.

Requirements:
- The text should be approximately ${nativeRatio}% in ${nativeLangName} (the reader's native language) and ${learnRatio}% in ${learnLangName} (the language they're learning)
- The topic should be about: ${topic}
- Mix the languages naturally throughout the text, like "Spanglish" style - switch between languages within sentences and paragraphs
- Make it engaging and appropriate for ${userType === 'kid' ? 'children' : 'adults'}
- Include dialogue, descriptions, and narrative elements
- The text should help the reader learn ${learnLangName} while feeling comfortable with ${nativeLangName}
- Start with a title in both languages
- Format the text with clear paragraphs

Generate the story now:`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a creative bilingual writer who creates engaging stories that mix languages naturally to help language learners.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const bookText = data.choices[0]?.message?.content || 'No content generated';
    
    // Generate translations for key phrases
    const translations = await generateTranslations(bookText, nativeLangName, learnLangName);
    
    return { bookText, translations };
  } catch (error) {
    console.error('Error generating book text:', error);
    throw error;
  }
}

export async function generateTranslations(bookText, nativeLangName, learnLangName) {
  const prompt = `Analyze the following bilingual text and extract 8-12 key phrases or sentences that are written in ${learnLangName} (the learning language).

For each phrase/sentence in ${learnLangName}, provide:
1. The original phrase/sentence in ${learnLangName}
2. Its translation/meaning in ${nativeLangName}

Format your response as a JSON array with this structure:
[
  {
    "phrase": "the phrase in learning language",
    "translation": "translation in native language"
  },
  ...
]

Only include phrases that are primarily or entirely in ${learnLangName}. Ignore phrases that are mostly in ${nativeLangName}.

Text to analyze:
${bookText.substring(0, 2000)}

Return ONLY the JSON array, no other text:`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a language learning assistant. Extract key phrases from bilingual text and provide accurate translations. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';
    
    // Try to parse JSON, handle if it's wrapped in markdown code blocks
    let translations = [];
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        translations = JSON.parse(jsonMatch[0]);
      } else {
        translations = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Error parsing translations JSON:', parseError);
      // Return empty array if parsing fails
      translations = [];
    }
    
    return translations;
  } catch (error) {
    console.error('Error generating translations:', error);
    // Return empty array on error so the book still displays
    return [];
  }
}

