import Game from "./Game";
import { LineDirection } from "./Line";
import { deconstructLineDirection, getLineCoords } from "./utils";

export enum DotState {
  Closed = 0,
  Opened, // Either initial opened dots (cross formation) or a hovered dot
  StartOfIncomingLine,
  EndOfIncomingLine
}

class Dot {
  static diameter: number = 14;
  static radius = (): number => Dot.diameter / 2;
  static padding = (): number => 0.4 * Dot.diameter;
  static squareSideLength = (): number => Dot.diameter + Dot.padding() * 2;
  xIndex: number;
  yIndex: number;
  lineDirections = Array<LineDirection>();
  private stateOnBoard: DotState | undefined;
  private desiredState: DotState | undefined;
  private isInitial: boolean;
  get requiresRerender(): boolean {
    return !!this.desiredState && this.stateOnBoard !== this.desiredState;
  }
  get neighborIndices(): Array<{ x: number; y: number }> {
    return [
      { x: this.xIndex - 1, y: this.yIndex + 1 }, // bottom-left
      { x: this.xIndex - 1, y: this.yIndex }, // left
      { x: this.xIndex - 1, y: this.yIndex - 1 }, // top-left
      { x: this.xIndex, y: this.yIndex - 1 }, // top
      { x: this.xIndex + 1, y: this.yIndex - 1 }, // top-right
      { x: this.xIndex + 1, y: this.yIndex }, // right
      { x: this.xIndex + 1, y: this.yIndex + 1 }, // bottom-right
      { x: this.xIndex, y: this.yIndex + 1 }, // bottom
    ];
  }

  constructor(xIndex: number, yIndex: number, isInitial = false) {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.isInitial = isInitial;
    if (this.isInitial) this.desiredState = DotState.Opened;
    else this.desiredState = DotState.Closed;
  }
  get state() {
    return !!this.desiredState ? this.desiredState : this.stateOnBoard;
  }
  requestState(s: DotState): Dot {
    if (this.stateOnBoard !== s) {
      if (!(this.isInitial && s === DotState.Closed)) {
        this.desiredState = s;
      }
    }
    return this.draw();
  }
  startX = (withPadding: boolean = true): number =>
    this.xIndex * (Dot.diameter + Dot.padding() * 2) +
    (withPadding ? Dot.padding() : 0);
  startY = (withPadding: boolean = true): number =>
    this.yIndex * (Dot.diameter + Dot.padding() * 2) +
    (withPadding ? Dot.padding() : 0);
  endX = (withPadding: boolean = true): number =>
    this.startX(withPadding) +
    (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
  endY = (withPadding: boolean = true): number =>
    this.startY(withPadding) +
    (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
  centerX = (): number => this.startX() + Dot.padding() + Dot.radius();
  centerY = (): number => this.startY() + Dot.padding() + Dot.radius();
  equals(other?: Dot | null): boolean {
    return (
      !!other && other.xIndex === this.xIndex && other.yIndex === this.yIndex
    );
  }
  clear(): void {
    Game.context.clearRect(
      this.startX(),
      this.startY(),
      Dot.squareSideLength(),
      Dot.squareSideLength()
    );
  }
  draw(): Dot {
    this.clear();
    const path = new Path2D();
    path.arc(
      this.centerX(),
      this.centerY(),
      this.desiredState === DotState.Closed ? Dot.radius() / 3.3 : Dot.radius(),
      0,
      360
    );
    Game.context.stroke(path);
    if (this.desiredState === DotState.StartOfIncomingLine)
      Game.context.fill(path);
    for (const lineDirection of this.lineDirections) {
      const { startX, startY, endX, endY } = getLineCoords(this, lineDirection);
      let path = new Path2D();
      path.lineTo(endX, endY);
      Game.context.moveTo(startX, startY);
      Game.context.stroke(path);
    }
    // Canvas was updated - clear state flags
    this.stateOnBoard = this.desiredState;
    this.desiredState = undefined;
    return this;
  }
}

export default Dot;
