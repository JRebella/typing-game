import { WordInput } from "components/GameInput/WordInput";
import { WordBox } from "components/GameInput/WordBox";
import { GameContext } from "context/GameContext";
import { GameTimer } from "components/GameTimer/GameTimer";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { GameResults } from "components/GameResults/GameResults";

export const GameArea = ({ ...rest }: ComponentPropsWithoutRef<"div">) => {
  const {
    gameState,
    startGame,
    submitWord,
    currentWordIndex,
    wordBank,
    correctWords,
    incorrectWords,
  } = useContext(GameContext);
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    (value: string) => {
      if (gameState === "waiting") {
        startGame();
      }

      if (value.trim().length > 0 && value[value.length - 1] === " ") {
        setInput("");
        if (inputRef.current) {
          inputRef.current.value = "";
        }

        submitWord(value.trim());
      } else {
        setInput(value.trim());
      }
    },
    [wordBank, currentWordIndex, gameState]
  );

  useEffect(() => {
    if (gameState !== "started" && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [gameState]);

  return (
    <div {...rest} className="w-full flex flex-col border-2 border-gray-900 rounded">
      <div
        className={classNames(
          styles["stats-bar"],
          "border-b-2 border-gray-900 bg-gray-300 flex justify-center"
        )}
      >
        <span>
          <span>Correct words:</span>
          <span className="text-lime-600">{correctWords}</span>
        </span>
        <span>
          <GameTimer />
        </span>
        <span>
          <span>Incorrect words:</span>
          <span className="text-red-600">{incorrectWords}</span>
        </span>
      </div>
      {gameState === "finished" ? <GameResults /> : <WordBox inputValue={input} />}
      {gameState !== "finished" && (
        <>
          <WordInput onChange={onChange} ref={inputRef} />
          <div className="text-center font-light">
            User the spacebar to submit the word
          </div>
        </>
      )}
    </div>
  );
};
