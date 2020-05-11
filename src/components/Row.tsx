import React from "react";
import { CellProps, Cell } from "./Cell";
import Game from "../classes/Game";
import CellModel from "../classes/CellModel";

export const Row = (props: RowProps) => {
  return (
    <tr>
      {props.cells.map((cell) => (
        <Cell game={props.game} key={cell.coords.x} {...cell} />
      ))}
    </tr>
  );
};

export interface RowProps {
  yIndex: number;
  game: Game;
  cells: Array<CellModel>;
}
