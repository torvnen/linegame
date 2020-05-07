import Game from "./Game";
import Dot from "./Dot";
import { deconstructLineDirection } from "./utils";

class Line {
  private _finished = false;
  private _dots = Array<Dot>();
  start: Dot;
  get finished() {
    return this._finished;
  }
  get endDot(): Dot {
    const lineDirection = this.direction;
    return this._dots.reduce((prev, curr) => {
      if (
        (lineDirection & LineDirection.LeftToRight) ===
        LineDirection.LeftToRight
      )
        return prev.xIndex > curr.xIndex ? prev : curr;
      return prev.xIndex < curr.xIndex ? prev : curr;
    });
  }
  get direction(): LineDirection {
    const dot2 = this._dots.find((d) =>
      this.start.neighborIndices.some(
        ({ x, y }) => d.xIndex === x && d.yIndex === y
      )
    );
    if (!dot2) return LineDirection.None;
    const upOrDown =
      this.start.yIndex === dot2.yIndex
        ? LineDirection.None
        : this.start.yIndex < dot2.yIndex
        ? LineDirection.UpToDown
        : LineDirection.DownToUp;
    const ltrOrRtl =
      this.start.xIndex === dot2.xIndex
        ? LineDirection.None
        : this.start.xIndex < dot2.xIndex
        ? LineDirection.LeftToRight
        : LineDirection.RightToLeft;
    return upOrDown | ltrOrRtl;
  }
  get isLegitimate(): boolean {
    let curr = this.start;
    for (let i = 0; i < 5; i++) {
      let next = this._dots.find((d) =>
        curr.neighborIndices.some(
          ({ x, y }) => d.xIndex === x && d.yIndex === y
        )
      );
      if (!next) return false;
      curr = next;
    }
    return true;
  }
  constructor(start: Dot) {
    this.start = start;
  }
  setDots(dots: Array<Dot>): Line {
    this._dots = dots;
    return this;
  }
  finish(): Line {
    this._finished = true;
    return this;
  }
  destroy(): void {
    for (let dot of this._dots) {
      dot.draw(dot.isLocked, false);
    }
  }
  get coords(): LineCoords | null {
    const d1 = this.start;
    const d2 = this.endDot;
    const { isLtr, isRtl, isUtd, isDtu } = deconstructLineDirection(
      this.direction
    );
    const c: LineCoords = {};
    if (isLtr || isRtl) {
      // It's a horizontal or diagonal line
      c.startX = isLtr ? d1.startX(true) : d1.endX(true);
      c.endX = isLtr ? d2.endX(true) : d2.startX(true);
      if (isUtd) {
        c.startY = d1.startY(true);
        c.endY = d2.endY(true);
      } else if (isDtu) {
        c.startY = d1.endY(true);
        c.endY = d2.startY(true);
      } else {
        c.startY = (d1.startY() + d1.endY()) / 2;
        c.endY = (d2.startY() + d2.endY()) / 2;
      }
    } else {
      // It's a vertical line
      c.startX = (d1.startX(true) + d1.endX(true)) / 2;
      c.endX = c.startX;
      c.startY = isUtd ? d1.startY(true) : d1.endY(true);
      c.endY = isDtu ? d2.endY(true) : d1.startY(true);
    }
    return c;
  }
}

export enum LineDirection {
  None = 0,
  UpToDown = 1 << 0,
  DownToUp = 1 << 1,
  LeftToRight = 1 << 2,
  RightToLeft = 1 << 3,
}

export interface LineCoords {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
}

export default Line;
