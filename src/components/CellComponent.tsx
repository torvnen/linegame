import React, { CSSProperties } from "react";
import Coords from "../classes/Coords";
import { CELL_SIZE } from "../classes/constants";
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
const makeStyle = (
  isSelected: Boolean,
  isOpened: Boolean,
  isHighlighted: Boolean,
  isEndOfLine: Boolean,
  theme: Theme
): CSSProperties => {
  return {
    width: CELL_SIZE,
    height: CELL_SIZE,
    fontSize: isOpened || isSelected ? 14 : 12,
    textAlign: "center",
    color: isHighlighted
      ? Color(theme.palette.primary.dark).darken(0.2).hex()
      : Color(theme.palette.primary.main).darken(0.2).hex(),
    backgroundColor: isEndOfLine
      ? theme.palette.primary.light
      : isSelected && !isHighlighted
      ? theme.palette.error.light
      : isSelected && isHighlighted
      ? theme.palette.info.main
      : isHighlighted
      ? theme.palette.secondary.light
      : "#f9f9f9",
    backgroundSize: "50%",
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
  const { theme } = useThemeSelector();
  React.useEffect(() => {
    if (!!cell) cell.tdRef = tdRef;
  }, [game, coords, x, y]);
  return (
    <td
      ref={tdRef}
      className={`noselect cell`}
      style={makeStyle(
        isCellSelected(props),
        cell!.isOpened,
        isHighlighted,
        isEndOfLine,
        theme
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
