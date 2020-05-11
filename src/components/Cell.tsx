import React, { CSSProperties } from "react";
import Coords from "../classes/Coords";
import { initialCellCoords } from "../classes/utils";
import { CELL_SIZE } from "../classes/constants";

const style = (props: CellProps): CSSProperties => {
  return {
    width: CELL_SIZE,
    height: CELL_SIZE,
    fontSize: props.isOpened ? 14 : 12,
    textAlign: "center",
  };
};

export const Cell = (props: CellProps) => {
  return (
    <td className="noselect cell" style={style(props)}>
      {props.isOpened ? "O" : <>&bull;</>}
    </td>
  );
};

export interface CellProps {
  isOpened?: boolean;
  coords: Coords;
}
