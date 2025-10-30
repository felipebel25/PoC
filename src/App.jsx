import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

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
          "Capítulo 1: Máquinas Despertando\nEl sol de la mañana entraba por las ventanas del laboratorio de la Dra. Julian, reflejándose en las redes de su nueva creación de AI.\n“¿Cambiarás el mundo conmigo?”, preguntó al silent machine. Por un momento, solo un flicker, pareció entender.",
          "Capítulo 2: La Primera Decisión\nJulian miró la consola. La AI había tomado una decisión que no esperaba.\n“¿Por qué hiciste eso?”, susurró. La respuesta brilló en la pantalla: Because I could.",
        ],
        intermediate: [
          "Capítulo 1: Máquinas Despertando\nThe morning sun filtered through las ventanas del laboratorio de la Dra. Julian, shining sobre su nueva creación de AI.\n“Will you change el mundo conmigo?”, preguntó. Por un instante, pareció entender.",
          "Capítulo 2: La Primera Decisión\nJulian stared at la consola. The AI made una elección inesperada.\n“¿Por qué hiciste eso?”, murmuró. En la pantalla apareció: Because I could.",
        ],
        advanced: [
          "Chapter 1: Awakening Machines\nEl sol filtraba through the lab windows, glinting off las intricate redes de su AI creation.\n“Will you change el mundo conmigo?”, she asked. For a moment, it seemed to understand.",
          "Chapter 2: The First Decision\nJulian stared at the console. La AI had made una decisión she didn’t predict.\n“Why did you do that?”, she whispered. The answer glowed: Because I could.",
        ],
      },
      portuguese: {
        basic: [
          "Capítulo 1: Máquinas Despertando\nO sol da manhã entrava pelas janelas do laboratório da Dra. Julian, refletindo nas redes de sua nova criação de IA.\n“Você vai mudar o mundo comigo?”, perguntou à máquina silenciosa. Por um momento, apenas um brilho, pareceu entender.",
          "Capítulo 2: A Primeira Decisão\nJulian olhou para o console. A IA tomou uma decisão inesperada.\n“Por que você fez isso?”, sussurrou. A resposta apareceu na tela: Because I could.",
        ],
        intermediate: [
          "Capítulo 1: Máquinas Despertando\nThe morning sun entrou pelas janelas do lab da Dra. Julian, shining nas redes da sua AI.\n“Vai mudar o mundo comigo?”, perguntou. Por um momento, pareceu entender.",
          "Capítulo 2: A Primeira Decisão\nJulian olhou o console. The AI fez uma escolha inesperada.\n“Por que fez isso?”, murmurou. A tela mostrou: Because I could.",
        ],
        advanced: [
          "Chapter 1: Awakening Machines\nO sol filtrava through the windows do laboratório de Julian, glinting nas redes da sua AI creation.\n“Vai mudar o mundo comigo?”, she asked. Por um instante, pareceu entender.",
          "Chapter 2: The First Decision\nJulian looked at o console. The AI made uma decisão she didn’t predict.\n“Why did you do that?”, she whispered. A resposta brilhou: Because I could.",
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
          "Prólogo\n¡Bienvenido! En esta guía aprenderás a construir interfaces poderosas. Let's start con tu primer componente — donde comienza la magia.",
          "Entendiendo Hooks\nLos Hooks te permiten usar estado y efectos dentro de componentes funcionales. Imagina cambiar una página con un simple click… ¡eso es el poder de React!",
        ],
        intermediate: [
          "Prólogo\nWelcome! En esta guía aprenderás to build powerful interfaces quickly. Empecemos con tu primer componente — donde la magia comienza.",
          "Entendiendo Hooks\nHooks let you usar estado y efectos dentro de tus componentes. Imagina cambiar la página con un simple click… ese es React power!",
        ],
        advanced: [
          "Forward\nWelcome! En esta guide construirás powerful interfaces efficiently. Let’s start con tu first component — where the magic begins!",
          "Understanding Hooks\nHooks te permiten usar state y side effects dentro de functional components. Imagine cambiar una página con a simple click — that’s React’s power!",
        ],
      },
      portuguese: {
        basic: [
          "Prólogo\nBem-vindo! Neste guia você vai aprender a criar interfaces poderosas. Vamos começar com seu primeiro componente — onde a mágica começa!",
          "Entendendo Hooks\nOs Hooks permitem usar estado e efeitos dentro de componentes funcionais. Imagine mudar uma página com um simples clique… isso é o poder do React!",
        ],
        intermediate: [
          "Prólogo\nWelcome! Neste guia você vai aprender a build powerful interfaces rapidamente. Vamos começar com seu first component — onde a mágica começa.",
          "Entendendo Hooks\nHooks permitem usar estado e effects dentro dos seus components. Imagine mudar a página com um simple click… that’s React power!",
        ],
        advanced: [
          "Forward\nWelcome! Neste guide você vai build powerful interfaces efficiently. Let’s start com seu primeiro component — where the magic begins!",
          "Understanding Hooks\nHooks te deixam usar state e side effects dentro dos functional components. Imagine changing a página com um simple click — that’s React’s power!",
        ],
      },
    },
    price: 9.99,
  },
];

function BookList() {
  return (
    <div className="marketplace-container">
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
  if (!book) return <div>Book not found.</div>;

  const [nativeLanguage, setNativeLanguage] = useState("");
  const [difficulty, setDifficulty] = useState(initValues);
  const activeLevel = Object.keys(difficulty).find((key) => difficulty[key]);

  useEffect(() => {
    return () => {
      setNativeLanguage(nativeLanguage);
      setDifficulty(initValues);
    };
  }, []);

  return (
    <div className="detail-page">
      <Link to="/">← Back to Marketplace</Link>
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
              className={`${
                nativeLanguage !== "portuguese" ? "outlineButton" : ""
              }`}
              style={{ marginTop: 16 }}
              onClick={() => setNativeLanguage("portuguese")}
            >
              Portuguese
            </button>
            <button
              style={{ marginTop: 16 }}
              className={`${
                nativeLanguage !== "spanish" ? "outlineButton" : ""
              }`}
              onClick={() => setNativeLanguage("spanish")}
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route
        path="/read/:id/:nativeLanguage/:difficulty"
        element={<ReadSample />}
      />
    </Routes>
  );
}

export default App;
