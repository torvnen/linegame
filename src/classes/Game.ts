import { initialCellCoords } from "./utils";
import Coords from "./Coords";
import { BOARD_MATRIX_SIZE } from "./constants";
import { Cell, CellProps } from "../components/Cell";
import { RowProps } from "../components/Row";
import { decorate, observe, observable } from "mobx";

class Game {
  readonly grid = Array<RowProps>();
  get orderedGrid(): Array<Array<CellProps>> | null {
    return null;
  }
  selectedCellCoords: Coords | undefined
  static readonly origo = { x: 0, y: 0 };
  constructor() {
    for (let y = -9; y <= 9; y++) {
      if (y === 0) continue;
      let cells = Array<CellProps>();
      for (let x = -9; x <= 9; x++) {
        if (x === 0) continue;
        cells.push({ coords: { x, y } });
      }
      this.grid.push({ yIndex: y, cells });
    }
    this.initiateBoard();
  }
  async initiateBoard() {
    for (const coord of initialCellCoords) {
      const cell = this.cellAt(coord.x, coord.y);
      if (!cell) throw new Error("Initial cell not found");
      cell.isOpened = true;
    }
  }
  rowAt(y: number) {
    return this.grid.find((r) => r.yIndex === y);
  }
  cellAt(x: number, y: number) {
    const row = this.rowAt(y);
    if (!row) return null;
    return row.cells.find((c) => c.coords.x === x);
  }
}

export enum GameState {
  NotStarted = 0,
  Started,
  Finished,
}

decorate(Game, {
  selectedCellCoords: observable
})

export default Game