import { CONFIG } from "config/config";
import { GameContext } from "context/GameContext";
import { useStopWatch } from "hooks/useStopWatch";
import { forwardRef, useContext, useEffect } from "react";

import styles from "./styles.module.scss";

export const GameTimer = forwardRef<HTMLDivElement, {}>(function GameTimer({}, ref) {
  const { gameState, restartGame } = useContext(GameContext);

  const { count, restart, start } = useStopWatch(CONFIG.GAME.DURATION_IN_SECONDS);

  useEffect(() => {
    if (gameState === "started") {
      start();
    }
  }, [gameState]);

  return (
    <div className={styles.container}>
      <span>{count}</span>
      <button
        className="border-2 px-1 border-slate-900 rounded bg-red-200 font-bold hover:bg-red-300"
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
