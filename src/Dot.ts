import Game from "./Game";
import { LineDirection } from "./Line";

class Dot {
  static diameter: number = 14;
  static radius = (): number => Dot.diameter / 2;
  static padding = (): number => 0.4 * Dot.diameter;
  static squareSideLength = (): number => Dot.diameter + Dot.padding() * 2;
  xIndex: number;
  yIndex: number;
  isActivated: boolean = false;
  isLocked: boolean;
  lineDirections = Array<LineDirection>();
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

  constructor(xIndex: number, yIndex: number, locked: boolean = false) {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.isLocked = locked;
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
  isLockable(otherDots: Array<Dot>): boolean {
    return true;
  }
  activate(): Dot {
    this.draw(true);
    return this;
  }
  lock(): Dot {
    this.isLocked = true;
    return this;
  }
  draw(activated = true, highlighted = false): Dot {
    this.clear();
    const path = new Path2D();
    // console.debug(`Drawing at (${this.centerX()}, ${this.centerY()})`);
    // console.count("drawn dots");
    if (activated) {
      this.isActivated = true;
    }
    path.arc(
      this.centerX(),
      this.centerY(),
      activated ? Dot.radius() : Dot.radius() / 3.3,
      0,
      360
    );
    Game.context.stroke(path);
    if (highlighted) Game.context.fill(path);
    return this;
  }
}

export default Dot;
