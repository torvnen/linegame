import React, { CSSProperties } from "react";
import Game from "../classes/Game";
import { initialGameGrid } from "../classes/utils";
import { Cell } from "./Cell";
import { BOARD_MATRIX_SIZE, CELL_SIZE } from "../classes/constants";
import { Row } from "./Row";

const style: CSSProperties = {
  width: BOARD_MATRIX_SIZE * CELL_SIZE,
  margin: "auto",
};

export const Board = (props: { game: Game }) => {
  React.useEffect(() => {}, [props.game, props.game.grid]);
  return (
    <table style={style}>
      <tbody>
        {props.game.grid.map((row) => (
          <Row key={row.yIndex} {...row} />
        ))}
      </tbody>
    </table>
  );
};
