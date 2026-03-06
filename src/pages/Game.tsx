import { useEffect, useState } from "react";
import phrasesData from "../data/phrases.json";

type Phrase = {
  id: number;
  de: string;
  pl: string;
  category: string;
};

const MAX_ATTEMPTS = 3;
const GERMAN_CHARS = ["ä", "ö", "ü", "ß"];

const normalize = (text: string) =>
  text.trim();

const Game = () => {
  const [phrase, setPhrase] = useState<Phrase | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [letterInput, setLetterInput] = useState<string>("");
  const [fullGuess, setFullGuess] = useState<string>("");
  const [activeInput, setActiveInput] = useState<"letter" | "full">("letter");

  const getRandomPhrase = (): Phrase => {
    return phrasesData.phrases[
      Math.floor(Math.random() * phrasesData.phrases.length)
    ];
  };

  const resetGame = () => {
    setPhrase(getRandomPhrase());
    setGuessedLetters([]);
    setAttempts(0);
    setLetterInput("");
    setFullGuess("");
    setActiveInput("letter");
  };

  useEffect(() => {
    resetGame();
  }, []);

  if (!phrase) return null;

  const handleLetterGuess = () => {
    if (!letterInput) return;

    const letter =(letterInput);
    setLetterInput("");

    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!normalize(phrase.de).includes(letter)) {
      setAttempts((prev) => prev + 1);
    }
  };

  const handleFullGuess = () => {
    if (!fullGuess) return;

    if (normalize(fullGuess) === normalize(phrase.de)) {
      const uniqueLetters = normalize(phrase.de)
        .replace(/ /g, "")
        .split("");

      setGuessedLetters(uniqueLetters);
    } else {
      setAttempts((prev) => prev + 1);
    }

    setFullGuess("");
  };

  const handleGermanCharClick = (char: string) => {
    if (activeInput === "letter") {
      setLetterInput(char);
    } else {
      setFullGuess((prev) => prev + char);
    }
  };

  const isGameOver = attempts >= MAX_ATTEMPTS;

  const isWinner = phrase.de
    .toLowerCase()
    .split("")
    .every(
      (char) =>
        char === " " || guessedLetters.includes(char.toLowerCase())
    );

  return (
    <div className="app-container">
      <h2>Kategoria: {phrase.category}</h2>
      <p><strong>Definicja:</strong> {phrase.pl}</p>

      {/* WYŚWIETLANIE HASŁA */}
      <div className="word-display">
        {phrase.de.split("").map((char, index) => {
          if (char === " ") return <span key={index}> </span>;

          return (
            <span key={index}>
              {guessedLetters.includes(char.toLowerCase())
                ? char
                : "_"}
            </span>
          );
        })}
      </div>

      {!isGameOver && !isWinner && (
        <>
          {/* 🔤 Zgadywanie litery */}
          <div>
            <h4>Zgadnij literę</h4>
            <input
              maxLength={1}
              value={letterInput}
              onChange={(e) => setLetterInput(e.target.value)}
              onFocus={() => setActiveInput("letter")}
            />
            <button onClick={handleLetterGuess}>
              Zgadnij literę
            </button>
          </div>

          {/* 🧠 Zgadywanie całego hasła */}
          <div style={{ marginTop: "30px" }}>
            <h4>Lub zgadnij całe hasło</h4>
            <input
              value={fullGuess}
              onChange={(e) => setFullGuess(e.target.value)}
              onFocus={() => setActiveInput("full")}
              style={{ width: "280px" }}
            />
            <button onClick={handleFullGuess}>
              Zgadnij całe hasło
            </button>

            {/* 🇩🇪 Niemieckie znaki */}
            <div className="special-chars">
              {GERMAN_CHARS.map((char) => (
                <button
                  key={char}
                  onClick={() => handleGermanCharClick(char)}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <p style={{ marginTop: "25px" }}>
        Pozostałe próby: <strong>{MAX_ATTEMPTS - attempts}</strong>
      </p>

      {isGameOver && (
        <h3>Przegrałeś 😢 Hasło: {phrase.de}</h3>
      )}
      {isWinner && <h3>Wygrałeś 🎉</h3>}

      {(isGameOver || isWinner) && (
        <button onClick={resetGame}>
          Zagraj ponownie
        </button>
      )}
    </div>
  );
};

export default Game;
