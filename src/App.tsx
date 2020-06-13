import React from "react";
import Game, { Line } from "./classes/Game";
import { Board } from "./components/Board";
import { decorate, observable } from "mobx";
import { observer } from "mobx-react";

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
const App = observer(function () {
  return <Board game={gameWrapper.game} />;
});

/** Starts a new game
 * TODO: Maybe this should save the new game into Local?
 * TODO: Maybe this should end the previous game and display score/end?
 */
export function newGame(): void {
  gameWrapper.game = new Game();
}

/** Save the current line state to Local. 
 * Only the lines matter. The game has no other saveable states.
 */
export function saveGame(): void {
  const linesJson = JSON.stringify(gameWrapper.game.lines);
  localStorage.setItem("game_lines", linesJson);
}

/** @returns Promise. Resolved true if a game was loaded successfully - false if not. */
export async function loadGame(): Promise<Boolean> {
  // Load the saved state from local
  const linesJson = localStorage.getItem("game_lines");
  if (!!linesJson) {
    try {
      const lines = JSON.parse(linesJson) as Line[];
      gameWrapper.game = new Game();
      // Delete all previous lines
      gameWrapper.game.lines.splice(0, gameWrapper.game.lines.length);
      // Add the saved lines to the game
      lines.forEach((l) => {
        l = new Line(l.coords); // Copy object, otherwise the getter for Direction will not work.
        gameWrapper.game.lines.push(l);
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

export default App;
