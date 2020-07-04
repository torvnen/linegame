import React, { CSSProperties } from "react";
import Coords from "../classes/Coords";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import { useThemeSelector } from "../hooks/useThemeSelector";
import { Theme } from "@material-ui/core/styles";
import Color from "color";

function isCellSelected(props: CellComponentProps): boolean {
  const selectedCellCoords = props.game?.selectedCellCoords;
  return (
    selectedCellCoords?.x === props.coords.x &&
    selectedCellCoords?.y === props.coords.y
  );
}
export const CellComponent = observer((props: CellComponentProps) => {
  const tdRef = React.useRef<HTMLTableCellElement>(null);
  const { game, coords, cellSize } = props;
  const { x, y } = props.coords;
  const cell = props.game.cellAt(x, y);
  const isHighlighted = props.game.highlightedCoords.some(
    (c) => c.x === x && c.y === y
  );
  const isEndOfLine =
    isHighlighted && game.endOfLineCoords.some((c) => c.x === x && c.y === y);
  const { theme } = useThemeSelector();
  React.useEffect(() => {
    if (!!cell) cell.tdRef = tdRef;
  }, [game, coords, x, y, cell]);
  const isSelected = isCellSelected(props);
  console.log("cellSize", cellSize);
  return (
    <td
      ref={tdRef}
      className={`noselect cell`}
      style={{
        width: cellSize,
        height: cellSize,
        color: isHighlighted
          ? Color(theme.palette.primary.dark).darken(0.2).hex()
          : Color(theme.palette.primary.main).darken(0.2).hex(),
        fontSize: cell?.isOpened ? 15 : 12,
        fontWeight: cell?.isOpened ? 700 : 300,
        backgroundColor: isEndOfLine
          ? theme.palette.primary.light
          : isSelected && !isHighlighted
          ? theme.palette.error.light
          : isSelected && isHighlighted
          ? theme.palette.info.main
          : isHighlighted
          ? theme.palette.secondary.light
          : "#f9f9f9",
      }}
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
  cellSize: number;
}
