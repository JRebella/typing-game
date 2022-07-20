import { CONFIG } from "config/config";
import { GameContext } from "context/GameContext";
import { useStopWatch } from "hooks/useStopWatch";
import { forwardRef, useContext, useEffect } from "react";

export const GameTimer = forwardRef<HTMLDivElement, {}>(function GameTimer({}, ref) {
  const { gameState, restartGame } = useContext(GameContext);

  const { count, restart, start } = useStopWatch(CONFIG.GAME.DURATION_IN_SECONDS);

  useEffect(() => {
    if (gameState === "started") {
      start();
    }
  }, [gameState]);

  return (
    <div className="mt-4 p-4 border-red-400 border-4">
      <div>Count: {count}</div>
      <button
        onClick={() => {
          restart();
          restartGame();
        }}
      >
        Restart
      </button>
    </div>
  );
});
