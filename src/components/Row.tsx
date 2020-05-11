import React from "react";
import { CellProps, Cell } from "./Cell";

export const Row = (props: RowProps) => {
  return (
    <tr>
        {props.cells.map(c => (<Cell key={c.coords.x} {...c} />))}
    </tr>
  );
};

export interface RowProps {
    yIndex: number;
    cells: Array<CellProps>    
}
