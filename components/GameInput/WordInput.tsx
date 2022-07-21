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
        className="border-y-2 border-gray-900 bg-lime-300 hover:bg-lime-200 text-center text-lg placeholder-slate-500"
        placeholder={gameState === "waiting" ? "Start typing here..." : ""}
        ref={ref}
        disabled={gameState === "finished"}
        onChange={onChange}
        {...rest}
      />
    );
  })
);

WordInput.displayName = "WordInput";
