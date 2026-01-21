import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    nativeLanguage: null,
    learnLanguage: null,
    userType: null,
    skillLevel: null,
    readingCategory: null,
    readingInput: null,
    readingTextStyle: null,
    vocabularyDifficulty: null,
    sentenceComplexity: null,
    tone: null,
    pointOfView: null,
    includeDialogue: true,
    includeDescriptions: true,
    culturalContext: null,
    timePeriod: null,
    includeComprehensionQuestions: false,
    grammarTense: null,
    emotion: null,
  });

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

