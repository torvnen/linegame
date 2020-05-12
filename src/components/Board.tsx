import React, { CSSProperties } from "react";
import Game from "../classes/Game";
import { initialGameGrid } from "../classes/utils";
import { Cell } from "./Cell";
import { BOARD_MATRIX_SIZE, CELL_SIZE } from "../classes/constants";
import { Row } from "./Row";
import { autorun } from "mobx";
import { observer } from "mobx-react";

const style: CSSProperties = {
  width: BOARD_MATRIX_SIZE * CELL_SIZE,
  margin: "auto"
};

export const Board = observer((props: { game: Game }) => {
  React.useEffect(() => {
    autorun(() => {
      console.debug("highlightedCoords: ", props.game!.highlightedCoords);
    });
  }, [props.game]);
  return (
    <table cellSpacing={0} style={style}>
      <tbody>
        {props.game.rows.map((row) => (
          <Row game={props.game} key={row.yIndex} {...row} />
        ))}
      </tbody>
    </table>
  );
});
