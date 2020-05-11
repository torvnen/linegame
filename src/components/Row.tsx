import React from "react";
import { CellProps, Cell } from "./Cell";
import Game from "../classes/Game";

export const Row = (props: RowProps) => {
  return (
    <tr>
      {props.cells.map((c) => (
        <Cell game={props.game} key={c.coords.x} {...c} />
      ))}
    </tr>
  );
};

export interface RowProps {
  yIndex: number;
  cells: Array<CellProps>;
  game?: Game;
}
