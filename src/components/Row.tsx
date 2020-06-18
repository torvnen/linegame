import React from "react";
import { CellComponentProps, CellComponent } from "./CellComponent";
import Game from "../classes/Game";
import Cell from "../classes/Cell";

export const Row = (props: RowProps) => {
  return (
    <tr>
      {props.cells.map((cell) => (
        <CellComponent game={props.game} key={cell.coords.x} {...cell} />
      ))}
    </tr>
  );
};

export interface RowProps {
  yIndex: number;
  game: Game;
  cells: Array<Cell>;
}
