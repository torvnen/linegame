import React, { CSSProperties } from "react";
import Game from "../classes/Game";
import { initialGameGrid } from "../classes/utils";
import { CellComponent } from "./CellComponent";
import { BOARD_MATRIX_SIZE, CELL_SIZE } from "../classes/constants";
import { Row } from "./Row";
import { autorun } from "mobx";
import { observer } from "mobx-react";
import Menu from "./Menu";
import { LineOverlayComponent } from "./LineOverlay";

const style: CSSProperties = {
  width: BOARD_MATRIX_SIZE * CELL_SIZE,
  margin: "auto",
};

export const Board = observer((props: { game: Game }) => {
  const { game } = props;
  const tableRef = React.useRef<HTMLTableElement>(null);
  React.useEffect(() => {
    autorun(() => {
      console.debug("highlightedCoords: ", game.highlightedCoords);
    });
  }, [game]);
  return (
    <div style={{ display: "relative" }}>
      <table ref={tableRef} cellSpacing={0} style={style}>
        <Menu game={game} />
        <tbody>
          {game.rows.map((row) => (
            <Row game={game} key={row.yIndex} {...row} />
          ))}
        </tbody>
      </table>
      <LineOverlayComponent game={game} tableRef={tableRef} />
    </div>
  );
});
