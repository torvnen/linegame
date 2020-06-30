import React from "react";
import Game from "./classes/Game";
import { LineModel } from "./classes/LineModel";
import { Board } from "./components/Board";
import { decorate, observable } from "mobx";
import { observer } from "mobx-react";
import { LOCALSTORAGE_STATE_KEY } from "./classes/constants";
import { ThemeProvider } from "@material-ui/core";
import { themes } from "./mui-themes";
import { useThemeSelector } from "./hooks/useThemeSelector";
import Coords from "./classes/Coords";

/** Because React will not re-render by default if the 'game' object
 * changes, use MobX to strongly bind it.
 * */
class GameWrapper {
  game: Game = new Game();
}
decorate(GameWrapper, {
  game: observable,
});
const gameWrapper = new GameWrapper();

/** Rendering root for React */
const App = observer(() => {
  const { theme } = useThemeSelector();
  React.useEffect(() => {
    console.log(
      "Theme was changed to",
      Object.keys(themes)[Object.values(themes).indexOf(theme)]
    );
  }, [theme]);
  return (
    <ThemeProvider theme={theme}>
      <Board game={gameWrapper.game} />
    </ThemeProvider>
  );
});

/** Starts a new game
 * TODO: Maybe this should save the new game into Local?
 * TODO: Maybe this should end the previous game and display score/end?
 */
export function newGame(): void {
  console.log("newGame()");
  gameWrapper.game = new Game();
}

/** Save the current line state to Local.
 * Only the lines matter. The game has no other saveable states.
 */
export function saveGame(): void {
  const linesJson = JSON.stringify(
    gameWrapper.game.lines.map((line) => line.coords)
  );
  localStorage.setItem(LOCALSTORAGE_STATE_KEY, linesJson);
}

/** @returns Promise. Resolved true if a game was loaded successfully - false if not. */
export async function loadGame(): Promise<Boolean> {
  return new Promise((resolve) => {
    // Load the saved state from local
    const linesJson = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
    if (!!linesJson) {
      // Try-catch could be replaced by a versioning system. CBA.
      try {
        // Delete all previous lines
        gameWrapper.game = new Game();
        const lines = (JSON.parse(linesJson) as Array<Coords[]>).map(
          (coords) => new LineModel(coords, gameWrapper.game)
        );
        // Add the saved lines to the game
        lines.forEach((l) => {
          l = new LineModel(l.coords, gameWrapper.game); // Copy object, otherwise the getter for Direction will not work.
          gameWrapper.game.lines.push(l);
        });
        resolve(true);
      } catch (e) {
        resolve(false);
      }
    }
    resolve(false);
  });
}

export default App;
