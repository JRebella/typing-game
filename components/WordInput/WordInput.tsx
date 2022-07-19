import { GameContext } from "context/GameContext";
import { forwardRef, useContext } from "react";

export const WordInput = forwardRef<HTMLInputElement, {}>(function WordInput({}, ref) {
  const {} = useContext(GameContext);

  return <input ref={ref}></input>;
});
