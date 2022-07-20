import { GameContext } from "context/GameContext";
import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  FunctionComponent,
  memo,
  useContext,
} from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  inputValue: string;
}

export const WordBox: FunctionComponent<Props> = ({ inputValue, ...rest }) => {
  const { wordBank, gameState, currentWordIndex } = useContext(GameContext);

  return (
    <div className="flex flex-wrap border-2 max-w-[800px]" {...rest}>
      {wordBank.map((word, index) => {
        if (index === currentWordIndex) {
          return (
            <span className="bg-lime-200 px-1 pb-2 rounded-lg" key={index}>
              {word}
            </span>
          );
        } else {
          return (
            <span className="px-1 pb-2" key={index}>
              {word}
            </span>
          );
        }
      })}
    </div>
  );
};

WordBox.displayName = "WordInput";
