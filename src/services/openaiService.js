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
  technology: 'technology',
  space: 'space',
  nature: 'nature',
  music: 'music',
  art: 'art',
  food: 'food',
  travel: 'travel',
  mythology: 'mythology',
  crime: 'crime',
  romance: 'romance',
  comedy: 'comedy',
  philosophy: 'philosophy',
  business: 'business',
  health: 'health',
  culture: 'culture',
};

const TEXT_STYLE_NAMES = {
  article: 'article',
  tale: 'tale',
  biography: 'biography',
  mystery: 'mystery',
  travelogue: 'travelogue',
  memoir: 'memoir',
  fable: 'fable',
  legend: 'legend',
};

export async function generateBookText(user) {
  const {
    nativeLanguage,
    learnLanguage,
    userType,
    skillLevel,
    readingCategory,
    readingInput,
    readingTextStyle,
    vocabularyDifficulty,
    sentenceComplexity,
    tone,
    pointOfView,
    includeDialogue,
    includeDescriptions,
    culturalContext,
    timePeriod,
    includeComprehensionQuestions,
    grammarTense,
    emotion,
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

  // Determine the text style
  const textStyle = readingTextStyle 
    ? TEXT_STYLE_NAMES[readingTextStyle] || readingTextStyle 
    : 'story';

  // Build prompt with customization options
  let prompt = `Create a ${textStyle} (at least 500 words, aim for 500-700 words) that mixes ${nativeLangName} and ${learnLangName} languages.\n\nCRITICAL REQUIREMENTS - MUST BE FOLLOWED:\n- The text MUST ALWAYS mix both ${nativeLangName} and ${learnLangName} languages throughout the ENTIRE text\n- NEVER write a paragraph, sentence, or section in only one language - both languages must be present in every paragraph\n- Switch between languages naturally within sentences and paragraphs, like "Spanglish" style\n- Example of good mixing: "I was walking down the calle when I saw un perro muy grande. It was so cute que I wanted to pet it."\n- Example of BAD (DO NOT DO THIS): Writing entire paragraphs in only ${nativeLangName} or only ${learnLangName}\n- The text should be approximately ${nativeRatio}% in ${nativeLangName} (the reader's native language) and ${learnRatio}% in ${learnLangName} (the language they're learning)\n- Every single paragraph must contain words, phrases, or sentences in BOTH languages\n\nOther Requirements:\n- The text must be at least 500 words long (aim for 500-700 words)\n- The text style should be: ${textStyle}\n- The topic should be about: ${topic}\n- Make it engaging and appropriate for ${userType === 'kid' ? 'children' : 'adults'}\n`;

  // Add vocabulary difficulty
  if (vocabularyDifficulty) {
    const difficultyMap = {
      beginner: 'Use simple, common vocabulary suitable for beginners',
      intermediate: 'Use intermediate-level vocabulary with some challenging words',
      advanced: 'Use advanced vocabulary and sophisticated expressions',
    };
    prompt += `- Vocabulary level: ${difficultyMap[vocabularyDifficulty]}\n`;
  }

  // Add sentence complexity
  if (sentenceComplexity) {
    const complexityMap = {
      simple: 'Use simple, short sentences (10-15 words average)',
      moderate: 'Use moderate-length sentences with some variety (15-20 words average)',
      complex: 'Use complex sentences with subordinate clauses and varied structures (20+ words average)',
    };
    prompt += `- Sentence complexity: ${complexityMap[sentenceComplexity]}\n`;
  }

  // Add tone
  if (tone) {
    const toneMap = {
      formal: 'Use a formal, professional tone',
      casual: 'Use a casual, relaxed tone',
      humorous: 'Use a humorous, light-hearted tone with wit and jokes',
      serious: 'Use a serious, thoughtful tone',
      conversational: 'Use a conversational, friendly tone as if speaking to a friend',
    };
    prompt += `- Tone: ${toneMap[tone]}\n`;
  }

  // Add point of view
  if (pointOfView) {
    const povMap = {
      first: 'Write in first person (I, we)',
      second: 'Write in second person (you)',
      third: 'Write in third person (he, she, they)',
    };
    prompt += `- Point of view: ${povMap[pointOfView]}\n`;
  }

  // Add dialogue and descriptions
  if (includeDialogue !== undefined) {
    prompt += `- ${includeDialogue ? 'Include' : 'Do NOT include'} dialogue between characters\n`;
  }

  if (includeDescriptions !== undefined) {
    prompt += `- ${includeDescriptions ? 'Include' : 'Do NOT include'} detailed descriptions of settings, characters, and scenes\n`;
  }

  // Add cultural context
  if (culturalContext && culturalContext.trim()) {
    prompt += `- Cultural context: Use ${culturalContext.trim()} cultural references, expressions, and context\n`;
  }

  // Add time period
  if (timePeriod) {
    const periodMap = {
      modern: 'Set in modern times (present day)',
      historical: 'Set in a historical period (specify era if relevant)',
      futuristic: 'Set in the future with futuristic elements',
    };
    prompt += `- Time period: ${periodMap[timePeriod]}\n`;
  }

  // Add grammar tense focus
  if (grammarTense) {
    const tenseMap = {
      // English tenses
      'present-simple': `CRITICAL: Heavily emphasize the Present Simple tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Present Simple). Examples: "I go", "he goes", "they work", "she lives"`,
      'present-continuous': `CRITICAL: Heavily emphasize the Present Continuous tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Present Continuous). Examples: "I am going", "he is working", "they are studying"`,
      'present-perfect': `CRITICAL: Heavily emphasize the Present Perfect tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Present Perfect). Examples: "I have gone", "he has worked", "they have studied"`,
      'present-perfect-continuous': `CRITICAL: Heavily emphasize the Present Perfect Continuous tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Present Perfect Continuous). Examples: "I have been going", "he has been working"`,
      'past-simple': `CRITICAL: Heavily emphasize the Past Simple tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Past Simple). Examples: "I went", "he worked", "they studied"`,
      'past-continuous': `CRITICAL: Heavily emphasize the Past Continuous tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Past Continuous). Examples: "I was going", "he was working", "they were studying"`,
      'past-perfect': `CRITICAL: Heavily emphasize the Past Perfect tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Past Perfect). Examples: "I had gone", "he had worked", "they had studied"`,
      'past-perfect-continuous': `CRITICAL: Heavily emphasize the Past Perfect Continuous tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Past Perfect Continuous). Examples: "I had been going", "he had been working"`,
      'future-simple': `CRITICAL: Heavily emphasize the Future Simple tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Future Simple). Examples: "I will go", "he will work", "they will study"`,
      'future-continuous': `CRITICAL: Heavily emphasize the Future Continuous tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Future Continuous). Examples: "I will be going", "he will be working"`,
      'future-perfect': `CRITICAL: Heavily emphasize the Future Perfect tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Future Perfect). Examples: "I will have gone", "he will have worked"`,
      'future-perfect-continuous': `CRITICAL: Heavily emphasize the Future Perfect Continuous tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Future Perfect Continuous). Examples: "I will have been going", "he will have been working"`,
      'conditional': `CRITICAL: Heavily emphasize the Conditional tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Conditional). Examples: "I would go", "he would work"`,
      'conditional-perfect': `CRITICAL: Heavily emphasize the Conditional Perfect tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Conditional Perfect). Examples: "I would have gone", "he would have worked"`,
      // Basic tenses for other languages
      'present': `CRITICAL: Heavily emphasize the Present tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Present tense)`,
      'past': `CRITICAL: Heavily emphasize the Past tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Past tense)`,
      'future': `CRITICAL: Heavily emphasize the Future tense in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Future tense)`,
      'subjunctive': `CRITICAL: Heavily emphasize the Subjunctive mood in ${learnLangName}. Use it frequently throughout the text (at least 40-50% of verbs in ${learnLangName} should be in Subjunctive)`,
      'imperative': `CRITICAL: Heavily emphasize the Imperative mood in ${learnLangName}. Use it frequently throughout the text (include many commands and instructions in ${learnLangName})`,
    };
    if (tenseMap[grammarTense]) {
      prompt += `- Grammar tense focus: ${tenseMap[grammarTense]}\n`;
    }
  }

  // Add emotion
  if (emotion) {
    const emotionMap = {
      nostalgic: 'Create a nostalgic, wistful atmosphere that evokes memories and longing for the past. Use warm, reflective language that makes the reader feel sentimental and reminiscent',
      sad: 'Create a melancholic, emotional atmosphere that evokes feelings of sadness, loss, or sorrow. Use poignant, touching language that creates an emotional connection',
      motivational: 'Create an inspiring, uplifting atmosphere that motivates and energizes the reader. Use empowering, encouraging language that inspires action and positive thinking',
      happy: 'Create a joyful, cheerful atmosphere filled with happiness and positivity. Use bright, upbeat language that brings smiles and good feelings',
      excited: 'Create an energetic, thrilling atmosphere filled with excitement and anticipation. Use dynamic, enthusiastic language that creates a sense of adventure and eagerness',
      peaceful: 'Create a calm, serene atmosphere that evokes tranquility and inner peace. Use gentle, soothing language that promotes relaxation and mindfulness',
      mysterious: 'Create an enigmatic, intriguing atmosphere filled with mystery and suspense. Use cryptic, intriguing language that keeps the reader curious and engaged',
      romantic: 'Create a romantic, tender atmosphere filled with love and affection. Use warm, passionate language that evokes feelings of romance and connection',
      adventurous: 'Create an exciting, daring atmosphere filled with adventure and exploration. Use bold, dynamic language that creates a sense of thrill and discovery',
      hopeful: 'Create an optimistic, hopeful atmosphere that inspires confidence in the future. Use uplifting, positive language that creates a sense of possibility and promise',
      melancholic: 'Create a thoughtful, introspective atmosphere with a touch of sadness. Use reflective, contemplative language that evokes deep emotions',
      inspiring: 'Create an inspiring, uplifting atmosphere that motivates and moves the reader. Use powerful, meaningful language that creates a sense of purpose and determination',
      playful: 'Create a fun, lighthearted atmosphere filled with playfulness and joy. Use whimsical, cheerful language that brings laughter and enjoyment',
      contemplative: 'Create a thoughtful, reflective atmosphere that encourages deep thinking. Use introspective, philosophical language that promotes self-reflection',
      energetic: 'Create a vibrant, dynamic atmosphere filled with energy and vitality. Use lively, spirited language that creates a sense of enthusiasm and vigor',
    };
    if (emotionMap[emotion]) {
      prompt += `- Emotional tone: ${emotionMap[emotion]}\n`;
    }
  }

  prompt += `- The text should help the reader learn ${learnLangName} while feeling comfortable with ${nativeLangName}\n- Start with a title in both languages\n- Format the text with clear paragraphs\n- Ensure the text is substantial and well-developed, not rushed or too brief\n\nFINAL REMINDER: The text MUST ALWAYS mix both ${nativeLangName} and ${learnLangName} in every paragraph. Never write in only one language. Both languages must appear throughout the entire text, switching naturally within sentences and paragraphs.\n`;

  // Add comprehension questions if requested
  if (includeComprehensionQuestions) {
    prompt += `\nAfter the main text, add a section titled "Comprehension Questions" with 5-7 questions in ${learnLangName} that test understanding of the text. Include both multiple-choice and open-ended questions.\n`;
  }

  prompt += `\nGenerate the ${textStyle} now:`;

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
            content: `You are a creative bilingual writer who creates engaging stories that mix languages naturally to help language learners. CRITICAL: You MUST always mix both languages throughout the entire text. Never write paragraphs or sections in only one language. Both languages must appear in every paragraph, switching naturally within sentences like "Spanglish" style.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 2000,
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

