import React, { CSSProperties } from "react";
import Coords from "../classes/Coords";
import {
  initialCellCoords,
  getClassNamesForLineDirections,
} from "../classes/utils";
import { CELL_SIZE } from "../classes/constants";
import { decorate, observe, autorun } from "mobx";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import { Direction } from "../classes/Direction";

function isCellSelected(props: CellComponentProps): boolean {
  const selectedCellCoords = props.game?.selectedCellCoords;
  return (
    selectedCellCoords?.x === props.coords.x &&
    selectedCellCoords?.y === props.coords.y
  );
}
const makeStyle = (
  isSelected: Boolean,
  isOpened: Boolean,
  isHighlighted: Boolean,
  isEndOfLine: Boolean
): CSSProperties => {
  return {
    width: CELL_SIZE,
    height: CELL_SIZE,
    fontSize: isOpened || isSelected ? 14 : 12,
    textAlign: "center",
    backgroundColor: isEndOfLine
      ? "rgb(90, 190, 150)"
      : isSelected && !isHighlighted
      ? "red"
      : isSelected && isHighlighted
      ? "rgb(103, 230, 123)"
      : isHighlighted
      ? "rgb(90, 190, 150)"
      : "#f9f9f9",
  };
};

export const CellComponent = observer((props: CellComponentProps) => {
  const tdRef = React.useRef<HTMLTableCellElement>(null);
  const { game, coords } = props;
  const { x, y } = props.coords;
  const cell = props.game.cellAt(x, y);
  const isHighlighted = props.game.highlightedCoords.some(
    (c) => c.x === x && c.y === y
  );
  const isEndOfLine =
    isHighlighted && game.endOfLineCoords.some((c) => c.x === x && c.y === y);
  React.useEffect(() => {
    if (!!cell) cell.tdRef = tdRef;
  }, [game, coords, x, y]);
  return (
    <td
      ref={tdRef}
      className={`noselect cell ${
        "TODO" || getClassNamesForLineDirections(cell!.lineDirections)
      }`}
      style={makeStyle(
        isCellSelected(props),
        cell!.isOpened,
        isHighlighted,
        isEndOfLine
      )}
      onClick={() => {
        if (
          props.game.selectedCellCoords?.x === x &&
          props.game.selectedCellCoords?.y === y
        ) {
          props.game.selectedCellCoords = undefined;
        } else {
          if (isHighlighted) props.game.tryCompleteLine(props.coords);
          else props.game.selectedCellCoords = props.coords;
        }
      }}
      data-coords={`[${x}, ${y}]`}
    >
      {cell!.isOpened || isCellSelected(props) ? <>&#9675;</> : <>&bull;</>}
    </td>
  );
});

export interface CellComponentProps {
  coords: Coords;
  game: Game;
}
