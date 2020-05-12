import { decorate, observable } from "mobx";
import Coords from "./Coords";
import { Direction, coordsToString, directionToString } from "./Direction";

class CellModel {
  isOpened = false;
  readonly lineDirections = Array<Direction>();
  constructor(public readonly coords: Coords) {}
}

CellModel.prototype.toString = function (): string {
  return `${this.isOpened ? "Opened" : "Closed"} cell ${coordsToString(
    this.coords
  )} (dir=${this.lineDirections.map((d) => directionToString(d)).join(", ")})`;
};

decorate(CellModel, {
  isOpened: observable,
  lineDirections: observable,
});

export default CellModel;
