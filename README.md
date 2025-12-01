# eBook Marketplace

This is a React + Vite app for a personalized eBook marketplace that generates custom bilingual stories using OpenAI.

## Features

- **Language Selection**: Choose your native language and the language you want to learn
- **User Type Selection**: Select if you're a kid or adult
- **Skill Level Selection** (Adults): Choose your proficiency level (Basic, Intermediate, Advanced)
- **Reading Preferences**: Select a category or create a custom reading topic
- **AI-Generated Books**: Personalized bilingual stories that mix your native and learning languages

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 4. Run the Project

```bash
npm run dev
```

Open the dev server URL in your browser (shown in the console).

## How It Works

1. Users select their native language and learning language
2. Choose user type (Kid/Adult) and skill level (for adults)
3. Select a reading category or create a custom topic
4. The app generates a personalized bilingual story using OpenAI
5. The story mixes languages based on:
   - **Kids**: 70% native language, 30% learning language
   - **Adults (Basic)**: 60% native, 40% learning
   - **Adults (Intermediate)**: 40% native, 60% learning
   - **Adults (Advanced)**: 20% native, 80% learning

## Project Structure

- `src/components/` - React components
- `src/contexts/` - React context for user state
- `src/services/` - OpenAI API service
- `src/App.jsx` - Main app with routing

---

Project scaffolded with Vite + React.
