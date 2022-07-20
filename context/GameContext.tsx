import { CONFIG } from "config/config";
import { createContext, PropsWithChildren, useState } from "react";
import { shuffle } from "lodash";

interface GameContextType {
  gameState: GameState;
  wordBank: string[];
  currentWord: string;
  currentWordIndex: number;

  correctWords: string[];
  incorrectWords: IncorrectWord[];

  submitWord: (userInput: string) => void;
  startGame: () => void;
  finishGame: () => void;
  restartGame: () => void;
}

interface IncorrectWord {
  word: string;
  userInput: string;
}

type GameState = "waiting" | "started" | "finished";

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [gameState, setGameState] = useState<GameState>("waiting");

  const [wordBank, setWordBank] = useState<string[]>(CONFIG.GAME.WORD_BANK);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<IncorrectWord[]>([]);

  const submitWord = (userInput: string) => {
    // if (gameState === "waiting") {
    //   setGameState("started");
    // }
    const currentWord = wordBank[currentWordIndex];
    console.log(userInput);
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
    setCorrectWords([]);
    setIncorrectWords([]);
    setWordBank(shuffle(CONFIG.GAME.WORD_BANK));
  };

  return (
    <GameContext.Provider
      value={{
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
