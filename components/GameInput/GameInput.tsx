import { WordInput } from "components/GameInput/Input";
import { WordBox } from "components/GameInput/WordBox";
import { GameContext } from "context/GameContext";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

export const GameInput = ({ ...rest }: ComponentPropsWithoutRef<"div">) => {
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

  return (
    <div {...rest}>
      <div>
        <span>Correct words: {correctWords.length}</span>
        <span>Incorrect words: {incorrectWords.length}</span>
      </div>

      <WordBox inputValue={input} />
      <WordInput onChange={onChange} ref={inputRef} />
    </div>
  );
};
