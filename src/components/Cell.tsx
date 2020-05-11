import React, { CSSProperties } from "react";
import Coords from "../classes/Coords";
import { initialCellCoords } from "../classes/utils";
import { CELL_SIZE } from "../classes/constants";
import { decorate, observe, autorun } from "mobx";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import { Direction } from "../classes/Direction";

function isCellSelected(props: CellProps): boolean {
  const selectedCellCoords = props.game?.selectedCellCoords;
  return (
    selectedCellCoords?.x === props.coords.x &&
    selectedCellCoords?.y === props.coords.y
  );
}
const makeStyle = (props: CellProps, isOpened: Boolean): CSSProperties => {
  const isHighlighted = props.game.highlightedCoords.some(
    (c) => c.x === props.coords.x && c.y === props.coords.y
  );
  return {
    width: CELL_SIZE,
    height: CELL_SIZE,
    fontSize: isOpened || isCellSelected(props) ? 14 : 12,
    textAlign: "center",
    background:
      isCellSelected(props) && !isHighlighted
        ? "red"
        : isCellSelected(props) && isHighlighted
        ? "rgb(103, 230, 123)"
        : isHighlighted
        ? "rgb(90, 190, 150)"
        : "#f9f9f9",
  };
};

export const Cell = observer((props: CellProps) => {
  const cell = props.game.cellAt(props.coords.x, props.coords.y);
  return (
    <td
      className="noselect cell"
      style={makeStyle(props, cell!.isOpened)}
      onClick={() => {
        if (!!props.game) {
          if (
            props.game.selectedCellCoords?.x === props.coords.x &&
            props.game.selectedCellCoords?.y === props.coords.y
          )
            props.game.selectedCellCoords = undefined;
          else props.game.selectedCellCoords = props.coords;
        }
      }}
    >
      {cell!.isOpened || isCellSelected(props) ? <>&#9675;</> : <>&bull;</>}
    </td>
  );
});

export interface CellProps {
  coords: Coords;
  game: Game;
}
