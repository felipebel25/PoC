import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import Welcome from "./components/Welcome";
import LanguageSelection from "./components/LanguageSelection";
import LearnLanguageSelection from "./components/LearnLanguageSelection";
import UserTypeSelection from "./components/UserTypeSelection";
import LevelSelection from "./components/LevelSelection";
import ReadingPreferenceSelection from "./components/ReadingPreferenceSelection";
import GeneratedBook from "./components/GeneratedBook";
import "./App.css";

const books = [
  {
    id: "1",
    title: "The AI Revolution",
    author: "Jane Doe",
    description:
      "Explore the fascinating world of artificial intelligence, its history, and future impact.",
    image: "https://covers.openlibrary.org/b/id/13491772-L.jpg",
    sample: {
      spanish: {
        basic: [
          "Capítulo 1: Las Máquinas Despiertan\nEl sol de la mañana entraba por las ventanas del laboratorio de la Dra. Julian, iluminando las redes de su nueva creación de inteligencia artificial.\n“¿Cambiarás el mundo conmigo?”, preguntó a la máquina silenciosa. For a moment, it seemed to understand.",
          "Capítulo 2: La Primera Decisión\nJulian miró la consola. La inteligencia artificial hizo una elección que ella no esperaba.\n“¿Por qué hiciste eso?”, susurró. The answer appeared on the screen: Because I could.",
        ],
        intermediate: [
          "Chapter 1: Awakening Machines\nEl morning sun filtered through the windows del laboratorio de la Dra. Julian, shining on her AI creation.\n“Will you change el mundo conmigo?”, she asked softly. For a moment, it seemed to understand.",
          "Chapter 2: The First Decision\nJulian stared at la consola. The AI had made una decisión inesperada.\n“Why did you do that?”, she whispered. The answer glowed: Because I could.",
        ],
        advanced: [
          "Chapter 1: Awakening Machines\nThe morning sun filtered through Dr. Julian’s lab windows, glinting off the intricate circuits of her AI creation.\n“Will you change the world conmigo?”, she asked. For a second, it almost understood.",
          "Chapter 2: The First Decision\nJulian stared at the console. The AI made a decision she hadn’t predicted.\n“Why did you do that?”, she whispered. The answer appeared: Because I could.",
        ],
      },
      portuguese: {
        basic: [
          "Capítulo 1: Máquinas Despertando\nO sol da manhã entrava pelas janelas do laboratório da Dra. Julian, iluminando as redes da sua nova criação de inteligência artificial.\n“Você vai mudar o mundo comigo?”, perguntou à máquina silenciosa. For a moment, pareceu entender.",
          "Capítulo 2: A Primeira Decisão\nJulian olhou para o console. A inteligência artificial fez uma escolha inesperada.\n“Por que você fez isso?”, sussurrou. The answer appeared on the screen: Because I could.",
        ],
        intermediate: [
          "Chapter 1: Awakening Machines\nO morning sun entrou pelas janelas do laboratório de Julian, shining nas redes da sua AI creation.\n“Vai mudar o mundo comigo?”, perguntou softly. For a moment, pareceu entender.",
          "Chapter 2: The First Decision\nJulian olhou o console. The AI fez uma decisão que ela não esperava.\n“Why did you do that?”, murmurou. The screen showed: Because I could.",
        ],
        advanced: [
          "Chapter 1: Awakening Machines\nThe morning sun filtered through Julian’s lab windows, glinting on her AI creation.\n“Vai mudar o mundo comigo?”, she asked. For a brief moment, it almost understood.",
          "Chapter 2: The First Decision\nJulian stared at the console. The AI made a decision she hadn’t predicted.\n“Why did you do that?”, she whispered. A resposta brilhou: Because I could.",
        ],
      },
    },
    price: 12.99,
  },
  {
    id: "2",
    title: "Learning React Fast",
    author: "John Smith",
    description:
      "A comprehensive guide for quickly mastering React.js and building dynamic web apps.",
    image: "https://covers.openlibrary.org/b/id/12737376-L.jpg",
    sample: {
      spanish: {
        basic: [
          "Prólogo\n¡Bienvenido! En esta guía aprenderás a construir interfaces poderosas usando React. Let's start con tu primer componente, donde la magia realmente comienza.",
          "Entendiendo Hooks\nLos Hooks te permiten manejar el estado y los efectos dentro de componentes funcionales. Imagina cambiar una página con un simple click… that’s React’s power!",
        ],
        intermediate: [
          "Forward\nWelcome! En esta guía aprenderás to build powerful interfaces quickly. Empecemos con tu primer componente — donde the magic begins.",
          "Understanding Hooks\nHooks let you manejar estado y efectos dentro de functional components. Imagine cambiar la página con a simple click — that’s React’s power!",
        ],
        advanced: [
          "Forward\nWelcome! In this guide you’ll build powerful interfaces efficiently. Let’s start con tu first component — where the magic begins!",
          "Understanding Hooks\nHooks allow you to manage state and side effects within functional components. Imagine changing una página with a single click — that’s React’s power!",
        ],
      },
      portuguese: {
        basic: [
          "Prólogo\nBem-vindo! Neste guia você vai aprender a criar interfaces poderosas com React. Let's start com seu primeiro componente, onde a mágica começa.",
          "Entendendo Hooks\nOs Hooks permitem usar estado e efeitos em componentes funcionais. Imagine mudar uma página com um simples clique… that’s React power!",
        ],
        intermediate: [
          "Forward\nWelcome! Neste guia você vai aprender to build powerful interfaces rapidamente. Vamos começar com seu first component — onde a mágica começa.",
          "Understanding Hooks\nHooks permitem usar estado e efeitos dentro dos seus components. Imagine mudar a página com um simple click — that’s React’s power!",
        ],
        advanced: [
          "Forward\nWelcome! In this guide você vai build powerful interfaces efficiently. Let’s start com seu first component — where the magic begins!",
          "Understanding Hooks\nHooks let you use state e side effects dentro dos functional components. Imagine changing uma página with one click — that’s React’s power!",
        ],
      },
    },
    price: 9.99,
  },
];


function BookList() {
  return (
    <div className="marketplace-container mt-[1rem]">
      <h1>eBook Marketplace</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li className="book-item" key={book.id}>
            <Link to={`/book/${book.id}`}>
              <img src={book.image} alt={book.title} className="book-cover" />
              <div className="book-info">
                <h2>{book.title}</h2>
                <p className="author">by {book.author}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const initValues = {
  basic: false,
  intermediate: false,
  advanced: false,
};

function BookDetail() {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  if (!book) return <div>Book not found.</div>;

  const [nativeLanguage, setNativeLanguage] = useState(user.nativeLanguage || "");
  const [difficulty, setDifficulty] = useState(initValues);
  const activeLevel = Object.keys(difficulty).find((key) => difficulty[key]);

  useEffect(() => {
    if (user.nativeLanguage) {
      setNativeLanguage(user.nativeLanguage);
    }
  }, [user.nativeLanguage]);

  const handleLanguageChange = (lang) => {
    setNativeLanguage(lang);
    updateUser({ nativeLanguage: lang });
  };

  return (
    <div className="detail-page">
      <Link to="/reading-preference">← Back to Marketplace</Link>
      <div className="detail-contents">
        <img
          src={book.image}
          alt={book.title}
          className="book-cover detail-cover"
        />
        <div className="detail-info">
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
          <p>{book.description}</p>
          <h1>Native Language</h1>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              className={`${nativeLanguage !== "portuguese" ? "outlineButton" : ""
                }`}
              style={{ marginTop: 16 }}
              onClick={() => handleLanguageChange("portuguese")}
            >
              Portuguese
            </button>
            <button
              style={{ marginTop: 16 }}
              className={`${nativeLanguage !== "spanish" ? "outlineButton" : ""
                }`}
              onClick={() => handleLanguageChange("spanish")}
            >
              Spanish
            </button>
          </div>
          <h1>Select your level</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className={`${!difficulty.basic ? "outlineButton" : ""}`}
              style={{ marginTop: 16 }}
              onClick={() => setDifficulty({ ...initValues, basic: true })}
            >
              Basic
            </button>
            <button
              style={{ marginTop: 16 }}
              className={`${!difficulty.intermediate ? "outlineButton" : ""}`}
              onClick={() =>
                setDifficulty({ ...initValues, intermediate: true })
              }
            >
              Intermediate
            </button>
            <button
              className={`${!difficulty.advanced ? "outlineButton" : ""}`}
              style={{ marginTop: 16 }}
              onClick={() => setDifficulty({ ...initValues, advanced: true })}
            >
              Advanced
            </button>
          </div>
          {JSON.stringify(initValues) !== JSON.stringify(difficulty) && (
            <button
              style={{ marginTop: 16 }}
              onClick={() =>
                navigate(`/read/${book.id}/${nativeLanguage}/${activeLevel}`)
              }
            >
              Read Sample
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReadSample() {
  const { id, nativeLanguage, difficulty } = useParams();
  const book = books.find((b) => b.id === id);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  // Safe checks for required params
  if (!book || !nativeLanguage || !difficulty)
    return <div>Book not found or invalid parameters.</div>;
  const samples = book.sample[nativeLanguage]?.[difficulty];
  if (!samples || samples.length === 0)
    return <div>Sample not available for this selection.</div>;

  return (
    <div className="sample-page">
      <button className="back-link" onClick={() => navigate(-1)}>
        ← Back to Book
      </button>
      <h1>
        {book.title} <span className="sample-label">Sample</span>
      </h1>
      <h3>{book.author}</h3>
      <div className="sample-content">{samples[page]}</div>
      <div className="sample-controls">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <span>
          Page {page + 1} of {samples.length}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === samples.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useUser();
  
  if (!user.nativeLanguage) {
    return <Navigate to="/language-selection" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/language-selection" element={<LanguageSelection />} />
      <Route path="/learn-language-selection" element={<LearnLanguageSelection />} />
      <Route path="/user-type-selection" element={<UserTypeSelection />} />
      <Route path="/level-selection" element={<LevelSelection />} />
      <Route path="/reading-preference" element={<ReadingPreferenceSelection />} />
      <Route
        path="/generated-book"
        element={
          <ProtectedRoute>
            <GeneratedBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <BookList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <ProtectedRoute>
            <BookDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/read/:id/:nativeLanguage/:difficulty"
        element={
          <ProtectedRoute>
            <ReadSample />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
