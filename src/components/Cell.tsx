import React, { CSSProperties } from "react";
import Coords from "../classes/Coords";
import { initialCellCoords } from "../classes/utils";
import { CELL_SIZE } from "../classes/constants";
import { decorate, observe } from "mobx";
import { observer } from "mobx-react";
import Game from "../classes/Game";

function isCellSelected(props: CellProps): boolean {
  const selectedCellCoords = props.game?.selectedCellCoords;
  return (
    selectedCellCoords?.x === props.coords.x &&
    selectedCellCoords?.y === props.coords.y
  );
}
const style = (props: CellProps): CSSProperties => {
  return {
    width: CELL_SIZE,
    height: CELL_SIZE,
    fontSize: (props.isOpened || isCellSelected(props)) ? 14 : 12,
    textAlign: "center",
    background: isCellSelected(props) ? "rgb(103, 230, 123)" : "#eee",
  };
};

export const Cell = observer((props: CellProps) => {
  return (
    <td
      className="noselect cell"
      style={style(props)}
      onClick={() => {
        if (!!props.game) props.game.selectedCellCoords = props.coords;
      }}
    >
      {props.isOpened || isCellSelected(props) ? "O" : <>&bull;</>}
    </td>
  );
});

export interface CellProps {
  isOpened?: boolean;
  coords: Coords;
  game?: Game;
}
