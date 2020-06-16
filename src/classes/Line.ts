import { getDirectionForCoords } from "./utils";
import Coords from "./Coords";
import { Direction, coordsToString } from "./Direction";
import log from "./Log";
import Game from "./Game";
import Cell from "./Cell";
export class LineModel {
  get direction(): Direction {
    const d = getDirectionForCoords(this.coords[0], this.coords[1]);
    if (d === Direction.None)
      log.w(
        "Coords %o resulted in a 0-direction.",
        coordsToString([this.coords[0], this.coords[1]])
      );
    return d;
  }
  getFirstCell(game: Game): Cell | undefined {
    const { x, y } = this.coords[0];
    return game.cellAt(x, y);
  }
  getLastCell(game: Game): Cell | undefined {
    const { x, y } = this.coords[this.coords.length - 1];
    return game.cellAt(x, y);
  }
  constructor(public coords: Coords[]) {}
}
