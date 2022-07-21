import { useCallback, useEffect, useRef, useState } from "react";

export const useStopWatch = (durationInSeconds: number, onFinish?: () => void) => {
  const timerIntervalID = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState<number>(durationInSeconds);

  const start = useCallback(() => {
    if (timerIntervalID.current !== null) {
      throw "Stopwatch is already running";
    } else {
      setCount(durationInSeconds);
      setIsRunning(true);
      timerIntervalID.current = window.setInterval(update, 1000);
    }
  }, []);

  const update = () => {
    setCount((count) => {
      if (count > 0) {
        return count - 1;
      } else {
        onFinish?.();
        setIsRunning(false);
        if (timerIntervalID.current !== null) {
          clearInterval(timerIntervalID.current);
        }
        return 0;
      }
    });
  };

  const stop = useCallback(() => {
    if (timerIntervalID.current !== null) {
      clearInterval(timerIntervalID.current);
      timerIntervalID.current = null;
    }
  }, []);

  const restart = useCallback(() => {
    stop();
    setCount(durationInSeconds);
  }, []);

  useEffect(() => {
    return () => {
      if (timerIntervalID.current !== null) {
        clearInterval(timerIntervalID.current);
      }
    };
  }, []);

  return {
    count,
    start,
    restart,
    stop,
  };
};
