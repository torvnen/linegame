import { decorate, observable } from "mobx";
import Coords from "./Coords";
import { Direction } from "./Direction";

class CellModel {
  isOpened = false;
  lineDirections = Array<Direction>()
  constructor(public readonly coords: Coords) {}
}

decorate(CellModel, {
  isOpened: observable,
});

export default CellModel;
