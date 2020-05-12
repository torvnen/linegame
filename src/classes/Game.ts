import {
  initialCellCoords,
  getDirectionForCoords,
  getNextCoords,
  sumUntilNotZero,
} from "./utils";
import Coords from "./Coords";
import { RowProps } from "../components/Row";
import { decorate, observable, computed, autorun } from "mobx";
import {
  allDirections,
  Direction,
  coordsToString,
  directionToString,
} from "./Direction";
import CellModel from "./CellModel";
import log, { LogLevel } from "../classes/Log";

class Game {
  static readonly origo = { x: 0, y: 0 };
  readonly lines = Array<Line>();
  selectedCellCoords: Coords | undefined;
  readonly cells = Array<CellModel>();
  get highlightedCoords(): Array<Coords> {
    if (!this.selectedCellCoords) return [];
    else
      return this.getPossibleLines(this.selectedCellCoords)
        .map((l) => l.coords)
        .reduce((prev, curr) => prev.concat(curr), []);
  }
  get lineCount(): number {
    return this.lines?.length || 0;
  }
  get endOfLineCoords(): Array<Coords> {
    if (!this.selectedCellCoords) return [];
    else
      return this.getPossibleLines(this.selectedCellCoords).map(
        (l) => l.coords[l.coords.length - 1]
      );
  }
  get rows() {
    const rows = Array<RowProps>();
    this.cells
      .sort((a, b) => a.coords.x - b.coords.x)
      .sort((a, b) => b.coords.y - a.coords.y) // Note: because Y axis decreases downwards, reverse this sorting.
      .forEach((c) => {
        const { y } = c.coords;
        const row = rows.find((r) => r.yIndex === y);
        if (!row) rows.push({ yIndex: y, cells: [c], game: this });
        else row.cells.push(c);
      });
    return rows;
  }
  constructor() {
    for (let y = 9; y >= -9; y = sumUntilNotZero(y, -1))
      for (let x = -9; x <= 9; x = sumUntilNotZero(x, 1))
        this.cells.push(new CellModel({ x, y }));

    this.initiateBoard();
    autorun(() => {
      // As {this.lines} is a MobX observable,
      // * this will run each times the collection is updated.
      this.lines.forEach((l) => {
        l.coords.forEach(({ x, y }) => {
          const cell = this.cellAt(x, y);
          const d = l.direction;
          if (!cell!.lineDirections.some((ld) => ld === d)) {
            cell!.lineDirections.push(d);
            log.d(
              "Added direction (%o) to cell at %o",
              directionToString(d),
              coordsToString(cell!.coords)
            );
          }
        });
      });
    });
  }
  async initiateBoard() {
    for (const coord of initialCellCoords) {
      await new Promise((r: any) =>
        setTimeout(() => {
          this.cellAt(coord.x, coord.y)!.isOpened = true;
          r(true);
        }, 8)
      );
    }
  }
  cellAt(x: number, y: number): CellModel | undefined {
    return this.cells.find((c) => c.coords.x === x && c.coords.y === y);
  }
  getPossibleLines(coords: Coords): Line[] {
    const possibleLines = Array<Line>();
    for (const direction of allDirections()) {
      let { x, y } = coords;
      let lineLength = 0;
      let unopenedCells = 0;
      let lineCoords = Array<Coords>();
      for (let i = 0; i < 5; i++) {
        lineCoords.push({ x, y });
        const cell = this.cellAt(x, y);
        if (!cell?.isOpened) unopenedCells++;
        if (!cell?.lineDirections?.some((ld) => ld === direction)) lineLength++;

        let next = getNextCoords({ x, y }, direction);
        x = next.x;
        y = next.y;
      }
      if (lineLength === 5 && unopenedCells <= 1)
        possibleLines.push(new Line(lineCoords));
    }
    return possibleLines;
  }
  tryCompleteLine(c2: Coords) {
    const c1 = this.selectedCellCoords;
    if (!c1) {
      log.w("Could not complete line due to selected coords being falsy.");
      return;
    } else {
      const line = this.getLineForCoords(c1, c2);
      for (const { x, y } of line.coords) {
        const c = this.cellAt(x, y);
        if (c!.isOpened) {
          c!.isOpened = true;
          log.i("Opened cell at ", coordsToString(c!.coords));
        }
      }
      this.lines.push(line);
      log.d(
        "Added line to collection. There are now %o lines.",
        this.lineCount
      );
      this.selectedCellCoords = undefined;
      log.d("Reset selected cell coords.");
    }
  }
  getLineForCoords(c1: Coords, c2: Coords): Line {
    const d = getDirectionForCoords(c1, c2);
    let c = c1;
    const l = new Line(
      [c1].concat(
        Array(4)
          .fill(0)
          .map((_) => {
            c = getNextCoords(c, d);
            return c;
          })
      )
    );
    log.d(
      "Line for coords %o in direction %s: %o",
      coordsToString([c1, c2]),
      directionToString(d),
      coordsToString(l.coords)
    );
    return l;
  }
}

export class Line {
  get direction(): Direction {
    return getDirectionForCoords(this.coords[0], this.coords[1]);
  }
  constructor(public coords: Coords[]) {}
}

export enum GameState {
  NotStarted = 0,
  Started,
  Finished,
}

decorate(Game, {
  selectedCellCoords: observable,
  highlightedCoords: computed,
  endOfLineCoords: computed,
  lines: observable,
  rows: computed,
  cells: observable,
  lineCount: computed,
});

export default Game;
