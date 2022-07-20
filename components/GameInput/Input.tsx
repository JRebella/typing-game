import { GameContext } from "context/GameContext";
import { ChangeEventHandler, forwardRef, memo, useContext } from "react";

type Props = {
  onChange: (value: string) => void;
};

export const WordInput = memo(
  forwardRef<HTMLInputElement, Props>(({ onChange: onChangeParent }, ref, ...rest) => {
    const { gameState, startGame } = useContext(GameContext);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      onChangeParent(e.target.value);
    };

    return (
      <input
        className="border-2 border-gray-800"
        ref={ref}
        disabled={gameState === "finished"}
        onChange={onChange}
        {...rest}
      />
    );
  })
);

WordInput.displayName = "WordInput";
