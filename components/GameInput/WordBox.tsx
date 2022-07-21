import classNames from "classnames";
import { GameContext } from "context/GameContext";
import { ComponentPropsWithoutRef, FunctionComponent, useContext } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  inputValue: string;
}

export const WordBox: FunctionComponent<Props> = ({ inputValue, ...rest }) => {
  const { wordBank, gameState, currentWordIndex, submittedWords } =
    useContext(GameContext);

  return (
    <div className="flex flex-wrap border-x-2 text-lg select-none bg-gray-50" {...rest}>
      {submittedWords.map(({ word, isCorrect }, index) => {
        return (
          <span
            className={classNames("px-1 pb-2", {
              "text-lime-600": isCorrect,
              "text-red-600": !isCorrect,
            })}
            key={index}
          >
            {word}
          </span>
        );
      })}
      {wordBank.map((word, index) => {
        if (index < currentWordIndex) return;
        return (
          <span
            className={classNames("px-1 pb-2", {
              "bg-lime-200 rounded-lg": index === currentWordIndex,
              "text-blue-500": index < currentWordIndex,
            })}
            key={word}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

WordBox.displayName = "WordInput";
