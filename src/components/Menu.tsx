import React from "react";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import Log, { decreaseLogLevel } from "../classes/Log";
import { newGame, saveGame, loadGame } from "../App";

const Menu = observer((props: { game: Game }) => {
  return (
    <thead>
      <tr style={{ height: 40 }}>
        <td colSpan={2}>Points:</td>
        <td colSpan={2}>{props.game.lineCount}</td>
        <td colSpan={3}>
          <button onClick={() => decreaseLogLevel()}>
            LogLevel-- ({Log.minLevel})
          </button>
        </td>
        <td colSpan={2}>
          <button onClick={() => loadGame()}>Load</button>
        </td>
        <td colSpan={2}>
          <button onClick={() => saveGame()}>Save</button>
        </td>
        <td colSpan={5} style={{ textAlign: "right" }}>
          <button onClick={() => newGame()}>New game</button>
        </td>
      </tr>
      {/* <tr style={{ height: 10 }}>
        <td colSpan={99} />
      </tr> */}
    </thead>
  );
});

export default Menu;
