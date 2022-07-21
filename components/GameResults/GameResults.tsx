import classNames from "classnames";
import { CONFIG } from "config/config";
import { GameContext } from "context/GameContext";
import { ComponentPropsWithoutRef, FunctionComponent, useContext } from "react";
interface Props extends ComponentPropsWithoutRef<"div"> {}

export const GameResults: FunctionComponent<Props> = (props) => {
  const { submittedWords, correctWords } = useContext(GameContext);
  return (
    <div className="flex flex-col p-4" {...props}>
      <h2 className="text-xl font-bold text-center">Game over</h2>

      <ul className="list-disc children:ml-4">
        <li>
          Words per minute (WPM):{" "}
          <strong>
            {((correctWords / CONFIG.GAME.DURATION_IN_SECONDS) * 60).toFixed(2)}
          </strong>
        </li>

        <li>
          Characters per minute (CPM):{" "}
          <strong>
            {(
              (submittedWords.reduce(
                (count, word) => (word.isCorrect ? count + word.word.length : count),
                0
              ) /
                CONFIG.GAME.DURATION_IN_SECONDS) *
              60
            ).toFixed(2)}
          </strong>
        </li>
        <li>
          Words per second:{" "}
          <strong>{(correctWords / CONFIG.GAME.DURATION_IN_SECONDS).toFixed(2)}</strong>
        </li>
        <li>
          Precision :{" "}
          <strong>{((correctWords / submittedWords.length) * 100).toFixed(1)}%</strong>
        </li>
      </ul>

      <h3 className="text-lg font-bold mt-4">Your mistakes were:</h3>

      <ul className="list-disc children:ml-4">
        {submittedWords
          .filter((word) => !word.isCorrect)
          .map((word) => (
            <li key={word.word}>
              Instead of <strong>&quot;{word.word}&quot;</strong> you wrote{" "}
              <strong>&quot;{word.userInput}&quot;</strong>
            </li>
          ))}
      </ul>
    </div>
  );
};

GameResults.displayName = "WordInput";
