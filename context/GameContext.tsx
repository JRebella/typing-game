import { CONFIG } from "config/config";
import { createContext, PropsWithChildren, useState } from "react";
import { shuffle } from "lodash";

interface GameContextType {
  wordBank: string[];
  currentWordIndex: number;
  correctWords: string[];
  incorrectWords: IncorrectWord[];

  submitWord: (word: string, userInput: string) => void;
  finishGame: () => void;
  restartGame: () => void;
}

interface IncorrectWord {
  word: string;
  userInput: string;
}

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [gameState, setGameState] = useState<"waiting" | "started" | "finished">(
    "waiting"
  );

  const [wordBank, setWordBank] = useState<string[]>(shuffle(CONFIG.GAME.WORD_BANK));
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<IncorrectWord[]>([]);

  const submitWord = (userInput: string) => {
    if (gameState === "waiting") {
      setGameState("started");
    }
    const currentWord = wordBank[currentWordIndex];
    if (currentWord === userInput) {
      setCorrectWords((correctWords) => [...correctWords, currentWord]);
    } else {
      setIncorrectWords((incorrectWords) => [
        ...incorrectWords,
        {
          word: currentWord,
          userInput,
        },
      ]);
    }
  };

  const finishGame = () => {
    setGameState("finished");
  };

  const restartGame = () => {
    setGameState("waiting");
    setWordBank(shuffle(CONFIG.GAME.WORD_BANK));
  };

  return (
    <GameContext.Provider
      value={{
        correctWords,
        incorrectWords,
        wordBank,
        currentWordIndex,

        submitWord,
        finishGame,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
