import { decorate, observable } from "mobx";
import Coords from "./Coords";
import { Direction, coordsToString, directionToString } from "./Direction";

class Cell {
  isOpened = false;
  tdRef?: React.RefObject<HTMLTableCellElement>;
  readonly lineDirections = Array<Direction>();
  constructor(public readonly coords: Coords) {}
}

Cell.prototype.toString = function (): string {
  return `${this.isOpened ? "Opened" : "Closed"} cell ${coordsToString(
    this.coords
  )} (dir=${this.lineDirections.map((d) => directionToString(d)).join(", ")})`;
};

decorate(Cell, {
  isOpened: observable,
  lineDirections: observable,
});

export default Cell;
