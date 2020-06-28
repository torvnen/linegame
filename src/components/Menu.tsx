import React, { HTMLProps } from "react";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import Log, { decreaseLogLevel } from "../classes/Log";
import { newGame, saveGame, loadGame } from "../App";
import { useTheme } from "../hooks/useTheme";
import { updateOverlay } from "./LineOverlay";
import Flexbox from "./Flexbox";

const MenuButton = (
  props: { onClick?: () => void } & HTMLProps<HTMLButtonElement>
) => {
  const theme = useTheme();
  const [hovering, setHovering] = React.useState<boolean>(false);
  return (
    <button
      style={{
        minHeight: 40,
        margin: "10px 5px",
        color: theme.colors.success,
        background: hovering ? theme.colors.secondary : theme.colors.primary,
        borderRadius: theme.dimensions?.borderRadius || 0,
        border: `1px solid ${
          hovering ? theme.colors.primary : theme.colors.secondary
        }`,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
const Menu = observer((props: { game: Game }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<boolean>(false);
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
          <h1 style={{ color: theme.colors.primary }}>Linegame</h1>
        </Flexbox>
        <Flexbox
          style={{
            color: theme.colors.primary,
            transform: "rotateZ(180deg)",
            paddingBottom: 13,
          }}
        >
          <h1>Linegame</h1>
        </Flexbox>
      </Flexbox>
      {expanded && (
        <Flexbox
          onClick={() => {
            setExpanded(false);
            updateOverlay();
          }}
          style={{
            flexDirection: "column",
          }}
        >
          <Flexbox>
            <Flexbox style={{ flexGrow: 1 }}>
              <hr style={{ height: 2, display: "flex", flexGrow: 1 }} />
            </Flexbox>
            <Flexbox>&#x25B2;</Flexbox>
          </Flexbox>
          <Flexbox>
            <Flexbox>
              <MenuButton onClick={() => loadGame()}>Load</MenuButton>
            </Flexbox>
            <Flexbox>
              <MenuButton onClick={() => saveGame()}>Save</MenuButton>
            </Flexbox>
            <Flexbox>
              <MenuButton onClick={() => newGame()}>New game</MenuButton>
            </Flexbox>
          </Flexbox>
          <Flexbox style={{ paddingBottom: 20 }}>
            <Flexbox style={{ flexGrow: 1 }}>
              <MenuButton onClick={() => decreaseLogLevel()}>
                LogLevel-- ({Log.minLevel})
              </MenuButton>
            </Flexbox>
            <Flexbox style={{ flexGrow: 1 }}>
              <MenuButton onClick={() => props.game.lines.pop()}>
                Undo &laquo;
              </MenuButton>
            </Flexbox>
            <Flexbox>
              <MenuButton onClick={() => loadGame()}>How to Play</MenuButton>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      )}
      {!expanded && (
        <Flexbox
          onClick={() => {
            setExpanded(true);
            updateOverlay();
          }}
        >
          <Flexbox style={{ flexGrow: 1 }}>
            <hr style={{ height: 2, display: "flex", flexGrow: 1 }} />
          </Flexbox>
          <Flexbox>&#x25BC;</Flexbox>
        </Flexbox>
      )}
      <Flexbox>Points: {props.game.lineCount}</Flexbox>
    </Flexbox>
  );
});

export default Menu;
