import React, { HTMLProps } from "react";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import Log, { decreaseLogLevel } from "../classes/Log";
import { newGame, saveGame, loadGame } from "../App";

const buttonStyle = { minHeight: 40, margin: "10px 5px" };
const Flexbox = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} style={{ display: "flex", ...props.style }}>
      {props.children}
    </div>
  );
};
const Menu = observer((props: { game: Game }) => {
  return (
    <Flexbox
      style={{
        margin: "auto",
        width: 480,
        flexDirection: "column",
        background: "#eee",
      }}
    >
      <Flexbox style={{ padding: "10px 25px 0 25px" }}>
        <Flexbox style={{ flexGrow: 1 }}>
          <h1>Linegame</h1>
        </Flexbox>
        <Flexbox style={{ transform: "rotateZ(180deg)", paddingBottom: 13 }}>
          <h1>Linegame</h1>
        </Flexbox>
      </Flexbox>
      <Flexbox>
        <Flexbox>
          <button style={buttonStyle} onClick={() => loadGame()}>
            Load
          </button>
        </Flexbox>
        <Flexbox>
          <button style={buttonStyle} onClick={() => saveGame()}>
            Save
          </button>
        </Flexbox>
        <Flexbox>
          <button style={buttonStyle} onClick={() => newGame()}>
            New game
          </button>
        </Flexbox>
      </Flexbox>
      <Flexbox style={{ paddingBottom: 20 }}>
        <Flexbox style={{ flexGrow: 1 }}>
          <button style={buttonStyle} onClick={() => decreaseLogLevel()}>
            LogLevel-- ({Log.minLevel})
          </button>
        </Flexbox>
        <Flexbox style={{ flexGrow: 1 }}>
          <button style={buttonStyle} onClick={() => props.game.lines.pop()}>
            Undo &laquo;
          </button>
        </Flexbox>
        <Flexbox>
          <button style={buttonStyle} onClick={() => loadGame()}>
            How to Play
          </button>
        </Flexbox>
      </Flexbox>
      <Flexbox>Points: {props.game.lineCount}</Flexbox>
    </Flexbox>
  );
});

export default Menu;
