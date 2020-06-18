import { getDirectionForCoords, getAngleForDirection } from "./utils";
import Coords from "./Coords";
import { Direction, coordsToString, dissectDirection } from "./Direction";
import log from "./Log";
import Game from "./Game";
import Cell from "./Cell";
import { decorate, computed, observable } from "mobx";
import { LINE_THICKNESS } from "../components/LineComponent";

class LineModel {
  get transformOrigin(): string | number | undefined {
    const dd = dissectDirection(this.direction);
    return dd.isDiagonal || dd.isHorizontal
      ? `0 50%`
      : dd.isVertical
      ? `0 100%`
      : undefined;
  }
  get dimensions(): {
    offsetX: number;
    offsetY: number;
    lengthPx: number;
    rotationDeg: number;
  } {
    const dd = dissectDirection(this.direction);
    const firstTd = this.firstCell!.tdRef!.current!;
    const lastTd = this.lastCell!.tdRef!.current!;
    const cellWidth = firstTd.offsetWidth;
    const cellHeight = firstTd.offsetHeight;

    let [offsetX, offsetY, lengthPx] = [0, 0, 0];
    if (dd.isHorizontal) {
      offsetY = firstTd.offsetTop + cellHeight / 2 - LINE_THICKNESS / 2;
      if (dd.isRight) {
        lengthPx =
          Math.abs(firstTd.offsetLeft - lastTd.offsetLeft) + 0.5 * cellWidth;
        offsetX = firstTd.offsetLeft + 0.25 * cellWidth;
      } else {
        lengthPx =
          Math.abs(lastTd.offsetLeft - firstTd.offsetLeft) + 0.5 * cellWidth;
        offsetX = firstTd.offsetLeft + 0.75 * cellWidth;
      }
    } else if (dd.isVertical) {
      offsetX =
        firstTd.offsetLeft +
        cellWidth / 2 +
        LINE_THICKNESS / (dd.isUp ? 2 : -2);
      offsetY = firstTd.offsetTop + cellHeight * (dd.isDown ? 0.2 : 0.8) - LINE_THICKNESS;
      const endY = lastTd.offsetTop + cellHeight * (dd.isUp ? 0.2 : 0.8) - LINE_THICKNESS;
      lengthPx = Math.abs(endY - offsetY);
    } else if (dd.isDiagonal) {
      const endX = lastTd.offsetLeft + (dd.isLeft ? 0 : cellWidth);
      const endY = lastTd.offsetTop + (dd.isUp ? 0 : cellHeight);
      offsetX = firstTd.offsetLeft + (dd.isRight ? 0 : cellWidth);
      offsetY = firstTd.offsetTop + (dd.isDown ? 0 : cellHeight);
      lengthPx = Math.floor(
        Math.sqrt(
          // Pythagoras
          Math.pow(Math.floor(endX - offsetX), 2) +
            Math.pow(Math.ceil(endY - offsetY), 2)
        )
      );
    } else throw new Error("Invalid direction");
    return {
      offsetX,
      offsetY,
      lengthPx,
      rotationDeg: getAngleForDirection(this.direction),
    };
  }
  direction: Direction;
  firstCell: Cell;
  lastCell: Cell;
  constructor(public coords: Coords[], private game: Game) {
    this.direction = getDirectionForCoords(coords[0], coords[1]);
    this.firstCell = this.game.cellAt(this.coords[0].x, this.coords[0].y)!;
    this.lastCell = this.game.cellAt(
      this.coords[this.coords.length - 1].x,
      this.coords[this.coords.length - 1].y
    )!;
  }
}

decorate(LineModel, {
  firstCell: observable,
  lastCell: observable,
  direction: observable,
  dimensions: computed,
  transformOrigin: computed,
});

export { LineModel };
