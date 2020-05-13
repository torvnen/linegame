import React from "react";
import Game, { Line } from "./classes/Game";
import { Board } from "./components/Board";
import { decorate, observable } from "mobx";
import { observer } from "mobx-react";

// Because React will not re-render by default if the 'game' object
// * changes, we'll use MobX to strongly bind it.
class GameWrapper {
  game: Game = new Game();
}
decorate(GameWrapper, {
  game: observable,
});
const gameWrapper = new GameWrapper();

const App = observer(function () {
  return <Board game={gameWrapper.game} />;
});

export function newGame() {
  gameWrapper.game = new Game();
}

export function saveGame() {
  const linesJson = JSON.stringify(gameWrapper.game.lines);
  localStorage.setItem("game_lines", linesJson);
}

export async function loadGame(): Promise<Boolean> {
  const linesJson = localStorage.getItem("game_lines");
  if (!!linesJson) {
    try {
      const lines = JSON.parse(linesJson) as Line[];
      gameWrapper.game = new Game();
      gameWrapper.game.lines.splice(0, gameWrapper.game.lines.length); // Empty array
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
