import { CONFIG } from "config/config";
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { shuffle } from "lodash";

interface GameContextType {
  gameState: GameState;
  wordBank: string[];
  currentWord: string;
  currentWordIndex: number;

  submittedWords: WordResult[];
  correctWords: number;
  incorrectWords: number;

  submitWord: (userInput: string) => void;
  startGame: () => void;
  finishGame: () => void;
  restartGame: () => void;
}

interface WordResult {
  word: string;
  userInput: string;
  isCorrect: boolean;
}

type GameState = "waiting" | "started" | "finished";

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [gameState, setGameState] = useState<GameState>("waiting");

  const [wordBank, setWordBank] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  const [submittedWords, setSubmittedWords] = useState<WordResult[]>([]);
  const correctWords = useMemo(
    () => submittedWords.filter(({ isCorrect }) => isCorrect).length,
    [submittedWords]
  );
  const incorrectWords = useMemo(
    () => submittedWords.filter(({ isCorrect }) => !isCorrect).length,
    [submittedWords]
  );

  useEffect(() => {
    setWordBank(shuffle(CONFIG.GAME.WORD_BANK));
  }, []);

  const submitWord = (userInput: string) => {
    const currentWord = wordBank[currentWordIndex];
    console.log(userInput);
    setSubmittedWords((words) => [
      ...words,
      {
        word: currentWord,
        isCorrect: currentWord === userInput,
        userInput,
      },
    ]);

    setCurrentWordIndex((current) => current + 1);
  };

  const startGame = () => {
    setGameState("started");
  };

  const finishGame = () => {
    setGameState("finished");
  };

  const restartGame = () => {
    setGameState("waiting");
    setCurrentWordIndex(0);
    setSubmittedWords([]);
    setWordBank(shuffle(CONFIG.GAME.WORD_BANK));
  };

  return (
    <GameContext.Provider
      value={{
        submittedWords,
        correctWords,
        incorrectWords,
        wordBank,
        currentWord: wordBank[currentWordIndex],
        currentWordIndex,
        gameState,

        startGame,
        submitWord,
        finishGame,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
