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
import { useThemeSelector } from "../hooks/useThemeSelector";
import Flexbox from "./Flexbox";

const style: CSSProperties = {
  width: BOARD_MATRIX_SIZE * CELL_SIZE,
  margin: "auto",
};

export const Board = observer((props: { game: Game }) => {
  const { game } = props;
  const tableRef = React.useRef<HTMLTableElement>(null);
  const { theme } = useThemeSelector();
  return (
    <Flexbox
      style={{
        background: theme.palette.background.default,
        margin: "auto",
        justifyContent: "center",
        flexFlow: "column",
        border: `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <Flexbox
        style={{
          flexFlow: "column",
          margin: "auto",
          padding: 5,
          borderRadius: theme.spacing(1),
          background: theme.palette.background.paper,
        }}
      >
        <Menu game={game} />
        <table ref={tableRef} cellSpacing={1} style={style}>
          <tbody>
            {game.rows.map((row) => (
              <Row game={game} key={row.yIndex} {...row} />
            ))}
          </tbody>
        </table>
        <LineOverlayComponent game={game} tableRef={tableRef} />
      </Flexbox>
    </Flexbox>
  );
});
