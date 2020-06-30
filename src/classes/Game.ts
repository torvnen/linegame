import {
  initialCellCoords,
  getNextCoords,
  sumUntilNotZero,
  directionsOverlap,
} from "./utils";
import Coords, { areCoordsEqual as coordsAreEqual } from "./Coords";
import { RowProps } from "../components/Row";
import { decorate, observable, computed, autorun } from "mobx";
import { allDirections, coordsToString, directionToString } from "./Direction";
import Cell from "./Cell";
import log, { LogLevel, decreaseLogLevel, setLogLevel } from "../classes/Log";
import { LineModel } from "./LineModel";
import { loadGame } from "../App";

class Game {
  static readonly origo = { x: 0, y: 0 };
  readonly lines = Array<LineModel>();
  selectedCellCoords: Coords | undefined;
  readonly cells = Array<Cell>();
  get highlightedCoords(): Array<Coords> {
    if (!this.selectedCellCoords) return [];
    else
      return this.possibleLines
        .map((l) => l.coords)
        .reduce((prev, curr) => prev.concat(curr), []);
  }
  get lineCount(): number {
    return this.lines?.length || 0;
  }
  get endOfLineCoords(): Array<Coords> {
    if (!this.selectedCellCoords) return [];
    else return this.possibleLines.map((l) => l.coords[l.coords.length - 1]);
  }
  get rows() {
    const rows = Array<RowProps>();
    this.cells
      .slice() // MobX
      .sort((a, b) => a.coords.x - b.coords.x)
      .slice()
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
        this.cells.push(new Cell({ x, y }));

    this.initiateBoardAsync().then(() => {
      let previousLineCount = 0;
      autorun(() => {
        // As {this.lines} is a MobX observable,
        // * this will run each times the collection is updated.
        if (previousLineCount > this.lines.length) {
          // A line was deleted (Undo was requested)
          // Close all dots
          this.cells.forEach((c) => (c.isOpened = false));
          // Re-open initial dots
          this.initiateBoard();
        }
        this.lines.forEach(({ coords, direction }) => {
          // Open each cell that has a line over them
          coords.forEach(({ x, y }) => {
            const cell = this.cellAt(x, y)!;
            if (!cell.isOpened) cell.isOpened = true;
            if (!cell.lineDirections.some((ld) => ld === direction)) {
              cell.lineDirections.push(direction);
              log.d(
                "Added direction (%o) to cell at %o",
                directionToString(direction),
                coordsToString(cell!.coords)
              );
            }
          });
        });
        previousLineCount = this.lines.length;
      });
    });
  }
  initiateBoard() {
    for (const coord of initialCellCoords) {
      this.cellAt(coord.x, coord.y)!.isOpened = true;
    }
  }
  async initiateBoardAsync(animDelayMs: number = 8) {
    for (const coord of initialCellCoords) {
      await new Promise((r: any) =>
        setTimeout(() => {
          this.cellAt(coord.x, coord.y)!.isOpened = true;
          r(true);
        }, animDelayMs)
      );
    }
  }
  cellAt(x: number, y: number): Cell | undefined {
    return this.cells.find((c) => c.coords.x === x && c.coords.y === y);
  }
  /**
   * Get all lines that can be drawn from coords
   * @param {Coords} coords The x and y positions of the cell (something within [-9...9])
   */
  get possibleLines(): LineModel[] {
    const ll = log.MIN_LEVEL;
    if (ll < LogLevel.Info) setLogLevel(LogLevel.Info); // skip debug logs for a while
    const possibleLines = Array<LineModel>();
    for (const direction of allDirections()) {
      let { x, y } = this.selectedCellCoords!!;
      let lineLength = 0;
      let unopenedCells = 0;
      let lineCoords = Array<Coords>();
      for (let i = 0; i < 5; i++) {
        lineCoords.push({ x, y });
        const cell = this.cellAt(x, y);
        if (!cell?.isOpened) unopenedCells++;
        if (
          !cell?.lineDirections?.some(
            (ld) => ld === direction || directionsOverlap(ld, direction)
          )
        ) {
          lineLength++;
        }

        let next = getNextCoords({ x, y }, direction);
        x = next.x;
        y = next.y;
      }
      if (lineLength === 5 && unopenedCells <= 1) {
        const l = new LineModel(lineCoords, this);
        log.i(
          "Possible line from coords %s to direction %s: %s",
          coordsToString({ x, y }),
          directionToString(direction),
          coordsToString(lineCoords)
        );
        possibleLines.push(l);
      }
    }
    setLogLevel(ll);
    return possibleLines;
  }
  tryCompleteLine(c2: Coords) {
    const c1 = this.selectedCellCoords;
    if (!c1) {
      log.w("Could not complete line due to selected coords being falsy.");
      return;
    } else {
      log.i(
        "Attempting to complete line from %o to %o",
        coordsToString(c1),
        coordsToString(c2)
      );
      const line = this.getLineForCoords(c1, c2)!;
      for (const { x, y } of line.coords) {
        const c = this.cellAt(x, y);
        if (!c!.isOpened) {
          c!.isOpened = true;
          log.i("Opened cell at ", coordsToString(c!.coords));
        }
      }
      this.lines.push(line);
      log.d(
        "Added line at %s. Line count: %o.",
        coordsToString(line.coords),
        this.lineCount
      );
      this.selectedCellCoords = undefined;
      log.d("Reset selected cell coords.");
    }
  }
  getLineForCoords(c1: Coords, c2: Coords): LineModel | undefined {
    return this.possibleLines.find((l) =>
      l.coords.some((c) => coordsAreEqual(c, c2))
    );
  }
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
